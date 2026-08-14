#!/usr/bin/env python3
"""
CLI Script to generate and compile tailored LaTeX & PDF resumes from career_master.json.

Usage:
    python scripts/generate_cv.py [--jd JOB_DESCRIPTION] [--lang {es,en}] [--output OUTPUT_NAME] [--compile]
"""

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.request
import urllib.error
from pathlib import Path
from typing import Dict, Any, Optional


def clean_tex_str(text: str) -> str:
    """Sanitize raw text strings for LaTeX rendering, escaping special characters."""
    if not text:
        return ""
    res = str(text)
    # Escape special LaTeX characters if not already escaped
    res = re.sub(r'(?<!\\)%', r'\%', res)
    res = re.sub(r'(?<!\\)&', r'\&', res)
    res = re.sub(r'(?<!\\)#', r'\#', res)
    res = re.sub(r'(?<!\\)_', r'\_', res)
    res = re.sub(r'(?<!\\)\$', r'\$', res)
    return res


def load_career_data(data_path: Path) -> Dict[str, Any]:
    """Load master career JSON data."""
    if not data_path.exists():
        print(f"Error: Career data file not found at {data_path}", file=sys.stderr)
        sys.exit(1)
    with open(data_path, "r", encoding="utf-8") as f:
        return json.load(f)


def read_job_description(jd_input: Optional[str]) -> Optional[str]:
    """Read job description from file path or return direct string."""
    if not jd_input:
        return None
    jd_path = Path(jd_input)
    if jd_path.is_file():
        try:
            with open(jd_path, "r", encoding="utf-8") as f:
                return f.read().strip()
        except Exception as e:
            print(f"Warning: Failed to read JD file '{jd_input}': {e}", file=sys.stderr)
            return jd_input.strip()
    return jd_input.strip()


def call_gemini_api(prompt: str, api_key: str) -> Optional[str]:
    """Call Gemini API using google-genai, google.generativeai, or urllib REST API."""
    # 1. Try google-genai package
    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        if response and response.text:
            return response.text
    except Exception:
        pass

    # 2. Try google.generativeai package
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        if response and response.text:
            return response.text
    except Exception:
        pass

    # 3. Fallback to REST API via urllib
    try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        headers = {"Content-Type": "application/json"}
        payload = json.dumps({
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }).encode("utf-8")
        req = urllib.request.Request(url, data=payload, headers=headers, method="POST")
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    return parts[0].get("text", "")
    except Exception as e:
        print(f"Warning: Gemini REST API call failed: {e}", file=sys.stderr)

    return None


def clean_gemini_output(raw_output: str) -> str:
    """Remove markdown code blocks from Gemini response."""
    text = raw_output.strip()
    if text.startswith("```latex"):
        text = text[len("```latex"):].strip()
    elif text.startswith("```"):
        text = text[len("```"):].strip()
    if text.endswith("```"):
        text = text[:-3].strip()
    return text


def build_gemini_prompt(career_data: Dict[str, Any], jd: Optional[str], lang: str) -> str:
    """Construct prompt for Gemini API tailoring."""
    lang_full = "Spanish" if lang == "es" else "English"
    prompt = f"""You are an expert resume writer and LaTeX engineer.
Generate a complete, compilable single-page ATS-friendly LaTeX CV in {lang_full} based on the career data below.
{"Tailor the professional summary, skill ordering, and bullet points to match the provided Job Description." if jd else "Optimize bullet points for maximum impact and ATS scanability."}

CAREER DATA:
{json.dumps(career_data, indent=2, ensure_ascii=False)}

{"JOB DESCRIPTION:\n" + jd if jd else ""}

CRITICAL LATEX FORMATTING RULES:
1. Use standard article class with geometry [letterpaper,margin=0.55in,top=0.45in,bottom=0.5in].
2. MUST fit on EXACTLY 1 page. Keep spacing tight: \\setstretch{{0.97}}, \\vspace spacing small.
3. Sections required:
   - Header (Name, Headline, Location, Phone, Email, LinkedIn, GitHub, Portfolio)
   - Profile / Summary
   - Technical Skills (Categorized)
   - Professional Experience
   - Selected Projects
   - Education
4. Return ONLY valid, compilable LaTeX starting with \\documentclass and ending with \\end{{document}}. Do NOT include extra conversational text or markdown explanation outside code blocks.
"""
    return prompt


def generate_offline_latex(career_data: Dict[str, Any], lang: str, jd: Optional[str] = None) -> str:
    """Generate structured LaTeX CV using local template engine."""
    p_info = career_data.get("personal_info", {})
    summary = career_data.get("summary", {}).get(lang, "")
    skills = career_data.get("skills", {})
    experience = career_data.get("experience", [])
    projects = career_data.get("selected_projects", [])
    edu = career_data.get("education", {})

    is_es = (lang == "es")

    name = clean_tex_str(p_info.get("full_name", ""))
    headline = clean_tex_str(p_info.get(f"headline_{lang}", p_info.get("headline_es", "")))
    location = clean_tex_str(p_info.get(f"location_{lang}", p_info.get("location_es", "")))
    phone = clean_tex_str(p_info.get("phone", ""))
    email = clean_tex_str(p_info.get("email", ""))
    social = p_info.get("social", {})
    linkedin = social.get("linkedin", "")
    github = social.get("github", "")
    portfolio = social.get("portfolio", "")

    sec_profile = "Perfil" if is_es else "Profile"
    sec_skills = "Habilidades Técnicas" if is_es else "Technical Skills"
    sec_exp = "Experiencia Profesional" if is_es else "Professional Experience"
    sec_projects = "Proyectos Seleccionados" if is_es else "Selected Projects"
    sec_edu = "Educación" if is_es else "Education"

    # Format Skills
    skills_lines = []
    for key, sk_group in skills.items():
        cat_name = sk_group.get(f"category_{lang}", sk_group.get("category_es", ""))
        items = sk_group.get("items", [])
        if key == "languages":
            lang_items = []
            for l_obj in items:
                l_name = l_obj.get(f"language_{lang}", l_obj.get("language_es", ""))
                l_prof = l_obj.get(f"proficiency_{lang}", l_obj.get("proficiency_es", ""))
                lang_items.append(f"{l_name} ({l_prof})")
            skills_lines.append(f"\\textbf{{{clean_tex_str(cat_name)}:}} {clean_tex_str(', '.join(lang_items))}.")
        else:
            skills_lines.append(f"\\textbf{{{clean_tex_str(cat_name)}:}} {clean_tex_str(', '.join(items))}.\\\\[0.04em]")

    skills_block = "\n".join(skills_lines)

    # Format Experience
    exp_lines = []
    for exp in experience:
        comp = clean_tex_str(exp.get("company", ""))
        loc = clean_tex_str(exp.get(f"location_{lang}", exp.get("location_es", "")))
        role = clean_tex_str(exp.get(f"role_{lang}", exp.get("role_es", "")))
        raw_period = exp.get("period", "")
        if " / " in raw_period:
            period = clean_tex_str(raw_period.split(" / ")[0] if is_es else raw_period.split(" / ")[1])
        else:
            period = clean_tex_str(raw_period)

        achievements = exp.get(f"achievements_{lang}", exp.get("achievements_es", []))
        stack = clean_tex_str(", ".join(exp.get("stack", [])))

        exp_lines.append(f"\\roleentry{{{comp}}}{{{loc}}}{{{role}}}{{{period}}}")
        exp_lines.append("\\begin{itemize}")
        for ach in achievements:
            exp_lines.append(f"  \\item {{\\small {clean_tex_str(ach)}}}")
        exp_lines.append("\\end{itemize}")
        exp_lines.append(f"\\stack{{{stack}}}")

    exp_block = "\n".join(exp_lines)

    # Format Projects (Limit to top 4 projects and max 1 bullet point per project to guarantee 1-page fit)
    if jd:
        jd_words = set(re.findall(r'\w+', jd.lower()))
        def project_score(p):
            p_text = f"{p.get('name', '')} {p.get(f'subtitle_{lang}', '')} {' '.join(p.get(f'highlights_{lang}', []))} {' '.join(p.get('stack', []))}"
            words = set(re.findall(r'\w+', p_text.lower()))
            return len(words.intersection(jd_words))
        sorted_projects = sorted(projects, key=project_score, reverse=True)[:4]
    else:
        sorted_projects = projects[:4]

    proj_lines = []
    for idx, proj in enumerate(sorted_projects):
        p_name = clean_tex_str(proj.get("name", ""))
        p_year = clean_tex_str(proj.get("year", ""))
        p_sub = clean_tex_str(proj.get(f"subtitle_{lang}", proj.get("subtitle_es", "")))
        p_repo = proj.get("repository", "")
        
        # Display repo clean
        if " / " in p_repo:
            repo_clean = clean_tex_str(p_repo.split(" / ")[0] if is_es else p_repo.split(" / ")[1])
        else:
            repo_clean = clean_tex_str(p_repo)

        if p_repo.startswith("http"):
            repo_display = p_repo.replace("https://github.com/", "github.com/")
            repo_tex = f"\\href{{{p_repo}}}{{{clean_tex_str(repo_display)}}}"
            p_title_tex = f"\\href{{{p_repo}}}{{{p_name}}}"
        else:
            repo_tex = repo_clean
            p_title_tex = p_name

        highlights = proj.get(f"highlights_{lang}", proj.get("highlights_es", []))
        # Keep 1 bullet point per project to guarantee 1-page ATS format
        selected_highlights = highlights[:1]
        stack = clean_tex_str(", ".join(proj.get("stack", [])))

        if idx > 0:
            proj_lines.append(f"\\vspace{{0.13em}}")
        proj_lines.append(f"\\projectentry{{{p_title_tex} -- {p_sub}}}{{{p_year}}}{{{repo_tex}}}")
        proj_lines.append("\\begin{itemize}")
        for h in selected_highlights:
            proj_lines.append(f"  \\item {{\\small {clean_tex_str(h)}}}")
        proj_lines.append("\\end{itemize}")
        proj_lines.append(f"\\stack{{{stack}}}")

    proj_block = "\n".join(proj_lines)

    # Format Education
    inst = clean_tex_str(edu.get("institution", ""))
    edu_loc = clean_tex_str(edu.get(f"location_{lang}", edu.get("location_es", "")))
    degree = clean_tex_str(edu.get(f"degree_{lang}", edu.get("degree_es", "")))
    status = clean_tex_str(edu.get(f"status_{lang}", edu.get("status_es", "")))
    raw_grad = edu.get("graduation_date", "")
    if " / " in raw_grad:
        grad = clean_tex_str(raw_grad.split(" / ")[0] if is_es else raw_grad.split(" / ")[1])
    else:
        grad = clean_tex_str(raw_grad)

    gpa = clean_tex_str(edu.get("gpa", ""))
    focus = clean_tex_str(edu.get(f"focus_{lang}", edu.get("focus_es", "")))

    gpa_lbl = "Promedio" if is_es else "GPA"
    focus_lbl = "Enfoque" if is_es else "Focus"

    edu_block = f"""\\roleentry{{{inst}}}{{{edu_loc}}}{{{degree} -- {status}}}{{{grad}}}
{{\\small {gpa_lbl}: \\textbf{{{gpa}}}. {focus_lbl}: {focus}.}}"""

    summary_clean = clean_tex_str(summary)

    li_display = linkedin.replace("https://", "")
    gh_display = github.replace("https://", "")
    port_display = portfolio.replace("https://", "").rstrip("/")

    doc_title = f"CV - {name}" if is_es else f"Resume - {name}"

    template = f"""% ============================================================
% Patricio Garcia Perez Vela -- CV ({'Espanol' if is_es else 'English'})
% ATS-friendly | Single column | One page | No photo
% ============================================================
\\documentclass[10pt,letterpaper]{{article}}

% ---------- ATS / COPY-PASTE FRIENDLINESS ----------
\\ifdefined\\pdfgentounicode\\pdfgentounicode=1\\fi
\\usepackage{{cmap}}

% ---------- PAGE GEOMETRY ----------
\\usepackage[letterpaper,margin=0.5in,top=0.4in,bottom=0.45in]{{geometry}}

% ---------- FONTS & TEXT ----------
\\usepackage[T1]{{fontenc}}
\\usepackage[utf8]{{inputenc}}
\\usepackage{{lmodern}}
\\usepackage{{microtype}}
\\usepackage{{setspace}}
\\setstretch{{0.95}}
\\setlength{{\\parskip}}{{0pt}}
\\setlength{{\\parindent}}{{0pt}}
\\raggedright
\\sloppy

% ---------- COLORS ----------
\\usepackage{{xcolor}}
\\definecolor{{headingcolor}}{{HTML}}{{1a2744}}
\\definecolor{{textmuted}}{{HTML}}{{555555}}
\\definecolor{{linkcolor}}{{HTML}}{{1a2744}}

% ---------- LINKS ----------
\\usepackage[colorlinks=true,linkcolor=linkcolor,urlcolor=linkcolor,citecolor=linkcolor]{{hyperref}}
\\urlstyle{{same}}
\\hypersetup{{
  pdftitle={{{doc_title}}},
  pdfauthor={{{name}}}
}}

% ---------- SECTION STYLING ----------
\\usepackage{{titlesec}}
\\titleformat{{\\section}}{{\\large\\bfseries\\color{{headingcolor}}}}{{}}{{0em}}{{}}[\\vspace{{-0.55em}}\\textcolor{{headingcolor}}{{\\rule{{\\linewidth}}{{0.7pt}}}}]
\\titlespacing*{{\\section}}{{0pt}}{{0.42em}}{{0.18em}}

% ---------- LISTS ----------
\\usepackage{{enumitem}}
\\setlist[itemize]{{leftmargin=1.15em,label=\\textcolor{{headingcolor}}{{\\textbullet}},nosep,topsep=0.05em,itemsep=0.05em,parsep=0pt}}

% ---------- CUSTOM COMMANDS ----------
\\newcommand{{\\roleentry}}[4]{{%
  \\noindent\\textbf{{#1}}\\hfill{{\\small\\textcolor{{textmuted}}{{#2}}}}\\\\[-0.15em]
  {{\\small\\textit{{#3}}}}\\hfill{{\\small\\textcolor{{textmuted}}{{#4}}}}%
}}

\\newcommand{{\\projectentry}}[3]{{%
  \\noindent\\textbf{{#1}}\\hfill{{\\small\\textcolor{{textmuted}}{{#2}}}}\\\\[-0.15em]
  {{\\small\\textit{{#3}}}}%
}}

\\newcommand{{\\stack}}[1]{{%
  \\vspace{{0.03em}}{{\\scriptsize\\textcolor{{textmuted}}{{\\textit{{Stack: #1}}}}}}%
}}

\\begin{{document}}
\\pagestyle{{empty}}
\\sffamily

% ==================== HEADER ====================
\\begin{{center}}
  {{\\LARGE\\bfseries\\color{{headingcolor}} {name}}}\\\\[0.18em]
  {{\\small {headline}}}\\\\[0.28em]
  {{\\footnotesize {location} \\textbar{{}} {phone} \\textbar{{}} \\href{{mailto:{email}}}{{{email}}}}}\\\\[0.12em]
  {{\\footnotesize \\href{{{linkedin}}}{{{li_display}}} \\textbar{{}} \\href{{{github}}}{{{gh_display}}} \\textbar{{}} \\href{{{portfolio}}}{{{port_display}}}}}
\\end{{center}}

\\vspace{{0.08em}}

% ==================== SUMMARY ====================
\\section{{{sec_profile}}}
{{\\small {summary_clean}}}

% ==================== SKILLS ====================
\\section{{{sec_skills}}}
{{\\small
{skills_block}
}}

% ==================== EXPERIENCE ====================
\\section{{{sec_exp}}}
{exp_block}

% ==================== PROJECTS ====================
\\section{{{sec_projects}}}
{proj_block}

% ==================== EDUCATION ====================
\\section{{{sec_edu}}}
{edu_block}

\\end{{document}}
"""
    return template


def compile_pdf(tex_path: Path, output_dir: Path) -> bool:
    """Compile LaTeX file using tectonic.exe."""
    project_root = tex_path.parent.parent
    tectonic_exe = project_root / "tectonic.exe"
    tectonic_cmd = str(tectonic_exe) if tectonic_exe.exists() else "tectonic"

    cmd = [tectonic_cmd, "-o", str(output_dir), str(tex_path)]
    print(f"Compiling PDF with tectonic: {' '.join(cmd)}")
    try:
        res = subprocess.run(cmd, capture_output=True, text=True, check=False)
        if res.returncode == 0:
            pdf_path = output_dir / (tex_path.stem + ".pdf")
            print(f"[OK] PDF successfully compiled: {pdf_path}")
            return True
        else:
            print(f"[ERROR] Tectonic compilation failed (code {res.returncode}):\n{res.stderr}", file=sys.stderr)
            return False
    except Exception as e:
        print(f"[ERROR] Failed to execute tectonic: {e}", file=sys.stderr)
        return False


def run_verification(project_root: Path) -> bool:
    """Run single page PDF verification script."""
    verify_script = project_root / "scripts" / "verify_single_page.py"
    if not verify_script.exists():
        print(f"Warning: Verification script not found at {verify_script}", file=sys.stderr)
        return False

    print("\nRunning PDF page count verification script...")
    try:
        res = subprocess.run([sys.executable, str(verify_script)], capture_output=True, text=True)
        print(res.stdout)
        if res.stderr:
            print(res.stderr, file=sys.stderr)
        return res.returncode == 0
    except Exception as e:
        print(f"Failed to execute verification script: {e}", file=sys.stderr)
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Generate and compile ATS-friendly LaTeX CVs tailored for specific Job Descriptions."
    )
    parser.add_argument(
        "--jd",
        type=str,
        default=None,
        help="Path to job description file or raw text of the job description."
    )
    parser.add_argument(
        "--lang",
        choices=["es", "en"],
        default="es",
        help="Target language for the CV ('es' or 'en', default: 'es')."
    )
    parser.add_argument(
        "--output",
        type=str,
        default=None,
        help="Base output filename without directory or extension (e.g., 'cv_es_custom')."
    )
    parser.add_argument(
        "--compile",
        action="store_true",
        help="Compile generated .tex into .pdf using tectonic.exe and run single-page verification."
    )

    args = parser.parse_args()

    project_root = Path(__file__).resolve().parent.parent
    data_path = project_root / "data" / "career_master.json"

    career_data = load_career_data(data_path)
    jd_content = read_job_description(args.jd)

    lang = args.lang
    lang_dir = project_root / lang
    lang_dir.mkdir(parents=True, exist_ok=True)

    # Determine default output filename if not provided
    if args.output:
        output_base = args.output
    else:
        if args.jd and Path(args.jd).is_file():
            jd_stem = Path(args.jd).stem.replace(" ", "_").lower()
            output_base = f"cv_{lang}_{jd_stem}"
        elif args.jd:
            output_base = f"cv_{lang}_tailored"
        else:
            output_base = f"cv_{lang}_generated"

    # Check for Gemini API Key
    api_key = os.environ.get("GEMINI_API_KEY")
    latex_code = None

    if api_key:
        print("GEMINI_API_KEY found in environment. Tailoring CV with Gemini API...")
        prompt = build_gemini_prompt(career_data, jd_content, lang)
        raw_response = call_gemini_api(prompt, api_key)
        if raw_response:
            latex_code = clean_gemini_output(raw_response)
            print("Successfully generated tailored LaTeX with Gemini API.")
        else:
            print("Gemini API call failed or returned empty response. Falling back to offline generator.")

    if not latex_code:
        print("Using structured offline LaTeX generator...")
        latex_code = generate_offline_latex(career_data, lang, jd_content)

    # Save LaTeX file
    tex_path = lang_dir / f"{output_base}.tex"
    with open(tex_path, "w", encoding="utf-8") as f:
        f.write(latex_code)
    print(f"LaTeX file written to: {tex_path}")

    # Compile if --compile flag is set
    if args.compile:
        success = compile_pdf(tex_path, lang_dir)
        if success:
            run_verification(project_root)


if __name__ == "__main__":
    main()

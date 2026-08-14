# Patricio García — Personal CV Engine & Interactive Resume Hub

[![Build & Deploy CV Engine](https://github.com/p5Patricio/cv-patricio/actions/workflows/compile.yml/badge.svg)](https://github.com/p5Patricio/cv-patricio/actions/workflows/compile.yml)
[![Live Resume Web](https://img.shields.io/badge/Live_Resume-GitHub_Pages-violet?style=flat&logo=github)](https://p5patricio.github.io/cv-patricio/)

This repository is an **automated Personal CV Engine and Interactive Resume Hub**. It decouples career data from formatting, provides AI-driven resume tailoring powered by **Gemini API**, enforces a strict **1-page ATS verification rule** in CI/CD, and serves a live bilingual web interface.

🌐 **Live Interactive Resume**: [https://p5patricio.github.io/cv-patricio/](https://p5patricio.github.io/cv-patricio/)

---

## ⚡ Core Features

- **Single Source of Truth (`data/career_master.json`)**: Centralized, structured JSON containing complete professional history, projects, metrics, skills, and education.
- **AI Resume Tailorer CLI (`scripts/generate_cv.py`)**: CLI powered by the **Gemini API** (`gemini-2.5-flash`) that analyzes target Job Descriptions (JDs), selects relevant projects, tailors professional summaries, and outputs compilable LaTeX. Includes a structured offline template fallback.
- **Strict 1-Page PDF Verifier (`scripts/verify_single_page.py`)**: Automated Python inspector using `pypdf` that checks compiled PDFs in `es/` and `en/`. If any PDF overflows onto page 2, the build fails intentionally.
- **Automated CI/CD (`.github/workflows/compile.yml`)**: Compiles TeX files via `tectonic`, runs single-page verification, publishes GitHub Releases (`latest`), and deploys the static web app to **GitHub Pages**.
- **Interactive Web Interface (`index.html`, `style.css`, `app.js`)**: Modern, glassmorphic, responsive web portal with bilingual toggle (ES/EN), interactive technology filter, and direct official PDF downloads.

---

## 📁 Repository Structure

```
cv-patricio/
├── data/
│   └── career_master.json      # Master career database (Single Source of Truth)
├── scripts/
│   ├── generate_cv.py          # AI CLI generator using Gemini API
│   └── verify_single_page.py   # PDF 1-page count verification script
├── es/
│   ├── cv_es.tex               # Spanish ATS LaTeX source
│   ├── cv_es_alten_python.tex  # Tailored Spanish LaTeX source (ALTEN Mexico)
│   ├── cv_es.pdf               # Compiled Spanish PDF
│   └── README.md               # Markdown Spanish CV for recruiters & AI agents
├── en/
│   ├── cv_en.tex               # English ATS LaTeX source
│   ├── cv_en_alten_python.tex  # Tailored English LaTeX source (ALTEN Mexico)
│   ├── cv_en.pdf               # Compiled English PDF
│   └── README.md               # Markdown English resume for recruiters & AI agents
├── index.html                  # Interactive Web Resume (GitHub Pages entrypoint)
├── style.css                   # Glassmorphic responsive styling
├── app.js                      # Bilingual toggle & tech filter logic
└── .github/workflows/
    └── compile.yml             # GitHub Actions CI/CD workflow
```

---

## 🚀 Usage

### 1. Generating a Tailored Resume with AI CLI

Pass a job description file or raw text to generate a customized LaTeX resume:

```bash
# Using Gemini API (set GEMINI_API_KEY environment variable)
export GEMINI_API_KEY="your-api-key"

# Generate tailored Spanish CV for a job description
python scripts/generate_cv.py --jd "job_description.txt" --lang es --output cv_es_tailored --compile

# Generate tailored English resume
python scripts/generate_cv.py --jd "job_description.txt" --lang en --output cv_en_tailored --compile
```

### 2. Verifying Single-Page ATS Rule

Run the page count inspector across all generated PDFs:

```bash
python scripts/verify_single_page.py
```

### 3. Manual Compilation with Tectonic

Compiling `.tex` files locally without full TeX Live setup:

```bash
./tectonic.exe es/cv_es.tex
./tectonic.exe en/cv_en.tex
```

---

## 🎨 Editorial Principles

- **ATS-Friendly**: Single-column, reverse-chronological, T1 font encoding, no images, icons, or complex tables.
- **Strict 1-Page Limit**: Margins and line spacing configured to enforce an exact 1-page layout.
- **Evidence-Based**: Metrics and achievements backed by actual repository evidence and production systems.

---

## 🔗 Contact & Links

- **Live Resume Web**: [p5patricio.github.io/cv-patricio](https://p5patricio.github.io/cv-patricio/)
- **LinkedIn**: [linkedin.com/in/patricioagpv](https://linkedin.com/in/patricioagpv)
- **GitHub**: [github.com/p5Patricio](https://github.com/p5Patricio)
- **Portfolio**: [patodev.com](https://patodev.com/)

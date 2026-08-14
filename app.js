/* ============================================================
   PATRICIO GARCÍA PÉREZ VELA — INTERACTIVE PORTFOLIO & CV APP
   Features: Dual-Language Switcher, Theme Switcher, Tech Filter, PDF Manager
   ============================================================ */

// ---------- EMBEDDED MASTER DATA FALLBACK (100% Static & CORS-safe) ----------
const EMBEDDED_CAREER_DATA = {
  "personal_info": {
    "full_name": "Patricio Antonio García Pérez Vela",
    "headline_es": "Software Engineer | Full-Stack, IA & Sistemas de Datos",
    "headline_en": "Software Engineer | Full-Stack, AI & Data Systems",
    "location_es": "Guanajuato, México",
    "location_en": "Guanajuato, Mexico",
    "phone": "+52 473 737 4224",
    "email": "pa.garciaperezvela@ugto.mx",
    "social": {
      "linkedin": "https://linkedin.com/in/patricioagpv",
      "github": "https://github.com/p5Patricio",
      "portfolio": "https://patodev.com/"
    }
  },
  "summary": {
    "es": "Ingeniero en Sistemas Computacionales recién titulado enfocado en desarrollo full-stack de aplicaciones web robustas basadas en Python (FastAPI, Flask, Django) y TypeScript/Next.js. Dominio en diseño y mantenimiento de bases de datos relacionales SQL (PostgreSQL, SQL Server), desarrollo de REST APIs, contenedores Docker y colaboración en pipelines de CI/CD (GitHub Actions) y despliegues en la nube (GCP). Experiencia comprobada en recopilación de requerimientos de usuario, creación de user stories, estimaciones y documentación técnica bajo metodologías ágiles (Scrum). Inglés Avanzado (B2).",
    "en": "Graduate Computer Systems Engineer specializing in full-stack Python web development (FastAPI, Flask, Django) and TypeScript/Next.js. Proficient in SQL relational database design and maintenance (PostgreSQL, SQL Server), RESTful API engineering, Docker containerization, cloud deployment (GCP), and CI/CD pipelines (GitHub Actions). Proven experience gathering user requirements, drafting user stories, estimating tasks, and creating technical documentation under Agile (Scrum) methodologies. Advanced English (B2)."
  },
  "skills": {
    "python_and_web_frameworks": {
      "category_es": "Python & Web Frameworks",
      "category_en": "Python & Web Frameworks",
      "items": ["Python (POO, Data Structures)", "FastAPI", "Flask", "Django", "REST APIs", "TypeScript", "JavaScript", "React", "Next.js", "HTML5", "CSS3"]
    },
    "sql_databases": {
      "category_es": "Bases de Datos SQL",
      "category_en": "SQL Databases",
      "items": ["PostgreSQL", "SQL Server", "Supabase", "SQLite", "SQLModel", "Entity Framework", "Alembic", "Diseño & Optimización Relacional"]
    },
    "cloud_and_devops": {
      "category_es": "Cloud & DevOps",
      "category_en": "Cloud & DevOps",
      "items": ["Google Cloud Platform (GCP)", "Docker", "CI/CD (GitHub Actions)", "Git", "GitHub", "Vercel", "Render", "Fly.io", "Linux", "WSL2"]
    },
    "engineering_and_agile": {
      "category_es": "Ingeniería de Software & Ágil",
      "category_en": "Software Engineering & Agile",
      "items": ["Scrum / Agile SDLC", "Levantamiento de Requerimientos", "User Stories", "Estimaciones de Entrega", "Documentación Técnica / Manuales", "Control RBAC / Active Directory"]
    }
  },
  "experience": [
    {
      "company": "Mazda Motor Manufacturing de México",
      "location_es": "Salamanca, Gto., México",
      "location_en": "Salamanca, Gto., Mexico",
      "role_es": "Software Engineer Intern — Digitalización de Gestión Documental de TI FY25",
      "role_en": "Software Engineer Intern — IT Document Management Digitalization FY25",
      "period_es": "Ago 2025 — Feb 2026",
      "period_en": "Aug 2025 — Feb 2026",
      "achievements_es": [
        "Digitalicé un proceso crítico de TI basado en Excel y SharePoint mediante una solución centralizada con SQL Server y C#/.NET, garantizando la integridad de datos, trazabilidad auditable y prevención de folios duplicados.",
        "Lideré el levantamiento y documentación de requerimientos con stakeholders, elaboración de user stories, estimaciones de entrega y manuales técnicos bajo metodologías ágiles.",
        "Modelé la base de datos relacional y el acceso con Entity Framework, restringiendo operaciones críticas con autenticación Active Directory y control de acceso basado en roles (RBAC).",
        "Reduje el tiempo de actualización de metadatos de 20 a 3 minutos por solicitud e implementé la generación automática de trazabilidad tras revisión."
      ],
      "achievements_en": [
        "Digitalized critical IT processes previously relying on Excel/SharePoint into a centralized SQL Server & C#/.NET platform with full auditable traceability and duplicate prevention.",
        "Led user requirement gathering with stakeholders, authored user stories, calculated delivery estimations, and produced technical manuals under Agile practices.",
        "Modeled the relational database schema and Entity Framework data access layer, enforcing Role-Based Access Control (RBAC) integrated with Active Directory.",
        "Streamlined metadata update duration from 20 to 3 minutes per request and automated traceability log generation after review."
      ],
      "stack": ["Python", "C#/.NET", "SQL Server", "Entity Framework", "Active Directory", "User Stories", "Scrum", "Documentación Técnica"]
    }
  ],
  "selected_projects": [
    {
      "id": "electro-scorpio",
      "name": "Electro-Scorpio Control",
      "subtitle_es": "Control de Obras de Electrificación",
      "subtitle_en": "Electrification Contract & Material Matrix Management",
      "year": "2026",
      "visibility": "public",
      "repository": "https://github.com/p5Patricio/electro-scorpio-control-back",
      "categories": ["Python", "FastAPI", "Next.js", "PostgreSQL"],
      "highlights_es": [
        "Diseñé y desarrollé una aplicación web full-stack con backend en Python (FastAPI) y PostgreSQL (SQLModel) para la gestión de contratos, matrices de materiales e inventarios de obras.",
        "Implementé el frontend interactivo en TypeScript con Next.js, consumiendo endpoints REST validados estrictamente con Pydantic y autenticación JWT.",
        "Diseñé esquemas relacionales SQL complejos (8 tablas) para registro de avances diarios, estimaciones y control de materiales."
      ],
      "highlights_en": [
        "Architected and developed a full-stack web application with a Python (FastAPI) backend and PostgreSQL (SQLModel) database for contract management and material allocation matrices.",
        "Engineered the responsive frontend in TypeScript with Next.js, consuming REST endpoints with strict Pydantic v2 schemas and JWT security.",
        "Designed an 8-table relational SQL database to record daily field progress logs, financial estimations, and inventory tracking."
      ],
      "stack": ["Python", "FastAPI", "SQLModel", "PostgreSQL", "TypeScript", "Next.js", "REST APIs", "Git/GitHub"]
    },
    {
      "id": "demox",
      "name": "DEMOX",
      "subtitle_es": "Plataforma de Inteligencia Política",
      "subtitle_en": "Political Intelligence Platform",
      "year": "2026",
      "visibility": "private",
      "repository": null,
      "categories": ["Python", "FastAPI", "Next.js", "PostgreSQL", "Docker", "AI/ML"],
      "highlights_es": [
        "Desarrollé una plataforma web con backend en Python (FastAPI) y PostgreSQL/Supabase con pgvector, integrando procesamiento asíncrono con Celery/Redis.",
        "Construí contenedores Docker y configuré pipelines de CI/CD con GitHub Actions para automatización de pruebas y despliegues en infraestructura cloud (GCP/Render)."
      ],
      "highlights_en": [
        "Engineered backend web services in Python (FastAPI) backed by PostgreSQL/Supabase with pgvector and asynchronous background processing via Celery and Redis.",
        "Containerized applications using Docker and configured CI/CD pipelines via GitHub Actions for automated testing and cloud deployments (GCP/Render)."
      ],
      "stack": ["Python", "FastAPI", "Next.js", "PostgreSQL", "Supabase", "Celery", "Redis", "Docker", "GCP", "AI/ML"]
    },
    {
      "id": "whisperkey",
      "name": "WhisperKey",
      "subtitle_es": "Dictado de Voz Offline 100% Local en Python",
      "subtitle_en": "Offline Voice Dictation App in Python",
      "year": "2026",
      "visibility": "public",
      "repository": "https://github.com/p5Patricio/WhisperKey",
      "categories": ["Python", "AI/ML"],
      "highlights_es": [
        "Desarrollé una aplicación de dictado por voz 100% local bilingüe aplicando POO en Python, transcripción en tiempo real sobre GPU (Whisper/faster-whisper) y ejecutable cross-platform."
      ],
      "highlights_en": [
        "Developed a 100% local bilingual voice dictation application utilizing OOP principles in Python, real-time GPU inference (Whisper/faster-whisper), and cross-platform packaging."
      ],
      "stack": ["Python", "Whisper", "faster-whisper", "CustomTkinter", "CUDA", "PyInstaller", "AI/ML"]
    },
    {
      "id": "nba-profiling",
      "name": "NBA Player Profiling",
      "subtitle_es": "Machine Learning Deportivo & Clasificador NBA",
      "subtitle_en": "Sports Machine Learning & NBA Player Profiler",
      "year": "2025",
      "visibility": "public",
      "repository": "https://github.com/p5Patricio/Clasificador_Entrenador-NBA",
      "categories": ["Python", "FastAPI", "Next.js", "AI/ML"],
      "highlights_es": [
        "Reestructuré el proyecto como monorepo con backend FastAPI y frontend Next.js (Tailwind v4 y Chart.js). Agrupa jugadores con K-Means mediante estadísticas descargadas de la API oficial y genera reportes interactivos y PDFs."
      ],
      "highlights_en": [
        "Restructured project as a monorepo with FastAPI backend and Next.js frontend (Tailwind v4 & Chart.js). Clusters players using K-Means from official NBA API data and generates interactive reports/PDFs."
      ],
      "stack": ["Python", "FastAPI", "Next.js", "scikit-learn", "Pandas", "NBA API", "Chart.js", "AI/ML"]
    },
    {
      "id": "mazda-doc",
      "name": "Mazda IT DocSystem",
      "subtitle_es": "Sistema de Gestión Documental y Trazabilidad IT FY25",
      "subtitle_en": "IT Document Management & Traceability System FY25",
      "year": "2025 - 2026",
      "visibility": "enterprise",
      "repository": null,
      "categories": ["C#/.NET", "SQL Server"],
      "highlights_es": [
        "Aplicación enterprise C#/.NET con SQL Server y Entity Framework para reemplazar controles basados en Excel/correo por flujos auditarles con roles RBAC y Active Directory."
      ],
      "highlights_en": [
        "Enterprise C#/.NET desktop system with SQL Server and Entity Framework replacing legacy Excel/email controls with role-based workflows and Active Directory auth."
      ],
      "stack": ["C#/.NET", "Windows Forms", "SQL Server", "Entity Framework", "Active Directory", "SharePoint"]
    },
    {
      "id": "fitodex",
      "name": "Fitodex",
      "subtitle_es": "Control de Agroquímicos para DICIVA",
      "subtitle_en": "Agrochemical Management & Catalog API",
      "year": "2024 - 2025",
      "visibility": "private",
      "repository": null,
      "categories": ["Docker"],
      "highlights_es": [
        "Desarrollé una API REST para digitalizar el catálogo y control de agroquímicos: insecticidas, cultivos, plagas, dosis, fichas técnicas, hojas de seguridad, usuarios, roles y recuperación de contraseña."
      ],
      "highlights_en": [
        "Engineered a REST API to digitalize agrochemical cataloging and tracking: insecticides, crops, pests, dosage, technical data sheets, safety sheets, RBAC, and password recovery."
      ],
      "stack": ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "bcrypt", "Docker", "Fly.io"]
    }
  ],
  "education": {
    "institution": "Universidad de Guanajuato (DICIS)",
    "location_es": "Salamanca, Gto., México",
    "location_en": "Salamanca, Gto., Mexico",
    "degree_es": "Ingeniería en Sistemas Computacionales",
    "degree_en": "B.S. in Computer Systems Engineering",
    "status_es": "Titulado",
    "status_en": "Graduated",
    "graduation_date_es": "Diciembre 2025",
    "graduation_date_en": "December 2025",
    "gpa": "9.4 / 10.0",
    "focus_es": "Arquitectura de Software, Bases de Datos SQL, Desarrollo Web Full-Stack, IA y Algoritmos",
    "focus_en": "Software Architecture, SQL Database Systems, Full-Stack Web Development, AI & Algorithms"
  },
  "pdf_downloads": [
    {
      "id": "cv_es",
      "title_es": "CV Oficial (Español)",
      "title_en": "Official Resume (Spanish)",
      "desc_es": "Formato de una página optimizado para ATS y reclutadores en México y LatAm.",
      "desc_en": "One-page ATS-friendly resume optimized for recruiters in Mexico and LatAm.",
      "file_path": "es/cv_es.pdf",
      "size": "PDF • 30 KB"
    },
    {
      "id": "cv_en",
      "title_es": "CV Oficial (Inglés)",
      "title_en": "Official Resume (English)",
      "desc_es": "Formato de una página optimizado para ATS y roles globales / remotos.",
      "desc_en": "One-page ATS-friendly resume optimized for global & remote positions.",
      "file_path": "en/cv_en.pdf",
      "size": "PDF • 29 KB"
    },
    {
      "id": "cv_es_alten",
      "title_es": "CV ALTEN México Python Jr (ES)",
      "title_en": "CV ALTEN Mexico Python Jr (ES)",
      "desc_es": "CV personalizado enfocado en Desarrollo Python Jr, Web Frameworks, SQL y Cloud.",
      "desc_en": "Tailored resume focused on Python Jr Development, Web Frameworks, SQL & Cloud.",
      "file_path": "es/cv_es_alten_python.pdf",
      "size": "PDF • 30 KB"
    },
    {
      "id": "cv_en_alten",
      "title_es": "CV ALTEN México Python Jr (EN)",
      "title_en": "CV ALTEN Mexico Python Jr (EN)",
      "desc_es": "Versión en inglés orientada a perfiles de Python Jr & Ingeniería Web.",
      "desc_en": "English version targeted for Python Jr & Web Engineering positions.",
      "file_path": "en/cv_en_alten_python.pdf",
      "size": "PDF • 29 KB"
    }
  ]
};

// ---------- UI TRANSLATIONS DICTIONARY ----------
const UI_TEXT = {
  es: {
    navAbout: "Perfil",
    navSkills: "Habilidades",
    navExperience: "Experiencia",
    navProjects: "Proyectos",
    navPdfs: "Descargar CV",
    navEducation: "Educación",
    statusAvailable: "Disponible para nuevas oportunidades",
    heroRole: "Software Engineer | Full-Stack, IA & Sistemas de Datos",
    btnContact: "Contactar por Email",
    btnViewProjects: "Explorar Proyectos",
    sectionSkillsTitle: "Habilidades Técnicas",
    sectionSkillsSubtitle: "Stack de desarrollo, bases de datos, herramientas cloud y metodologías",
    sectionExpTitle: "Experiencia Profesional",
    sectionExpSubtitle: "Trayectoria destacada en ingeniería de software e impacto institucional",
    sectionProjectsTitle: "Proyectos Seleccionados",
    sectionProjectsSubtitle: "Filtra por tecnologías para explorar soluciones en producción y open source",
    filterAll: "Todos",
    showingProjects: "Mostrando {count} proyectos",
    visPublic: "GitHub Público",
    visPrivate: "Repositorio Privado",
    visEnterprise: "Sistema Empresarial (Mazda)",
    linkGithub: "Ver Repositorio en GitHub",
    linkPrivate: "Repositorio Privado / Enterprise",
    sectionPdfsTitle: "Descarga de CVs Oficiales en PDF",
    sectionPdfsSubtitle: "Documentos oficiales optimizados para ATS y reclutadores en formato de 1 página",
    btnDownload: "Descargar PDF",
    btnPreview: "Ver PDF",
    sectionEduTitle: "Educación Superior",
    sectionEduSubtitle: "Formación universitaria en Ingeniería en Sistemas Computacionales",
    eduStatusLabel: "Estado:",
    eduGpaLabel: "Promedio:",
    eduDateLabel: "Graduación:",
    eduFocusLabel: "Especialización:",
    footerText: "Diseñado para GitHub Pages con HTML5, Vanilla CSS & JavaScript. © 2026 Patricio García."
  },
  en: {
    navAbout: "About",
    navSkills: "Skills",
    navExperience: "Experience",
    navProjects: "Projects",
    navPdfs: "Download CV",
    navEducation: "Education",
    statusAvailable: "Available for new opportunities",
    heroRole: "Software Engineer | Full-Stack, AI & Data Systems",
    btnContact: "Contact via Email",
    btnViewProjects: "Explore Projects",
    sectionSkillsTitle: "Technical Skills",
    sectionSkillsSubtitle: "Development stack, database systems, cloud tools & methodologies",
    sectionExpTitle: "Professional Experience",
    sectionExpSubtitle: "Proven track record in software engineering & enterprise impact",
    sectionProjectsTitle: "Selected Projects",
    sectionProjectsSubtitle: "Filter by technology stack to explore production & open source work",
    filterAll: "All",
    showingProjects: "Showing {count} projects",
    visPublic: "Public GitHub",
    visPrivate: "Private Repository",
    visEnterprise: "Enterprise System (Mazda)",
    linkGithub: "View GitHub Repository",
    linkPrivate: "Private / Enterprise Repository",
    sectionPdfsTitle: "Official Resume PDF Downloads",
    sectionPdfsSubtitle: "Official single-page ATS-friendly resume documents for recruiters",
    btnDownload: "Download PDF",
    btnPreview: "View PDF",
    sectionEduTitle: "Higher Education",
    sectionEduSubtitle: "University Degree in Computer Systems Engineering",
    eduStatusLabel: "Status:",
    eduGpaLabel: "GPA:",
    eduDateLabel: "Graduation:",
    eduFocusLabel: "Specialization:",
    footerText: "Built for GitHub Pages with HTML5, Vanilla CSS & JavaScript. © 2026 Patricio García."
  }
};

// ---------- APPLICATION STATE ----------
let currentLang = localStorage.getItem('pref_lang') || 'es';
let currentTheme = localStorage.getItem('pref_theme') || 'dark';
let currentFilter = 'All';
let careerData = EMBEDDED_CAREER_DATA;

// ---------- INITIALIZATION ----------
document.addEventListener('DOMContentLoaded', async () => {
  // Apply initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  // Attempt to fetch fresh JSON if served via HTTP server, fallback smoothly to embedded data
  try {
    const res = await fetch('data/career_master.json');
    if (res.ok) {
      const fetchedData = await res.json();
      if (fetchedData && fetchedData.personal_info) {
        // Merge or replace
        console.log('Successfully loaded data/career_master.json via fetch');
      }
    }
  } catch (e) {
    console.log('Using embedded static master data (CORS/offline fallback active)');
  }

  // Setup Event Listeners
  document.getElementById('lang-toggle-btn').addEventListener('click', toggleLanguage);
  document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);
  
  const mobileBtn = document.getElementById('mobile-menu-toggle');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('mobile-open');
    });
  }

  // Render initial view
  renderPage();
});

// ---------- THEME MANAGEMENT ----------
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('pref_theme', currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  }
}

// ---------- LANGUAGE MANAGEMENT ----------
function toggleLanguage() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  localStorage.setItem('pref_lang', currentLang);
  renderPage();
}

// ---------- PAGE RENDERER ----------
function renderPage() {
  const t = UI_TEXT[currentLang];
  const langKey = currentLang;

  // 1. Language Toggle Button UI
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = currentLang === 'es' ? 'ES / EN' : 'EN / ES';
  }

  // 2. Navigation Links
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // 3. Hero Section
  document.getElementById('hero-status').textContent = t.statusAvailable;
  document.getElementById('hero-name').textContent = careerData.personal_info.full_name;
  document.getElementById('hero-headline').textContent = currentLang === 'es' ? careerData.personal_info.headline_es : careerData.personal_info.headline_en;
  document.getElementById('hero-summary').textContent = careerData.summary[currentLang];
  
  const locEl = document.getElementById('hero-location');
  if (locEl) locEl.textContent = currentLang === 'es' ? careerData.personal_info.location_es : careerData.personal_info.location_en;

  // 4. Render Skills
  renderSkills();

  // 5. Render Experience
  renderExperience();

  // 6. Render Projects & Setup Filters
  renderProjectFilters();
  renderProjects();

  // 7. Render PDF Downloads
  renderPdfs();

  // 8. Render Education
  renderEducation();
}

// ---------- RENDER SKILLS ----------
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const skillsObj = careerData.skills;
  let html = '';

  const icons = {
    python_and_web_frameworks: '⚡',
    sql_databases: '🗄️',
    cloud_and_devops: '☁️',
    engineering_and_agile: '🛠️'
  };

  Object.keys(skillsObj).forEach(key => {
    if (key === 'languages') return;
    const cat = skillsObj[key];
    const catName = currentLang === 'es' ? cat.category_es : cat.category_en;
    const icon = icons[key] || '💻';

    html += `
      <div class="skill-card">
        <h3 class="skill-category-title"><span class="skill-icon">${icon}</span> ${catName}</h3>
        <div class="tags-wrapper">
          ${cat.items.map(item => `<span class="tag">${item}</span>`).join('')}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ---------- RENDER EXPERIENCE ----------
function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  let html = '';
  careerData.experience.forEach(exp => {
    const role = currentLang === 'es' ? exp.role_es : exp.role_en;
    const location = currentLang === 'es' ? exp.location_es : exp.location_en;
    const period = currentLang === 'es' ? exp.period_es : exp.period_en;
    const achievements = currentLang === 'es' ? exp.achievements_es : exp.achievements_en;

    html += `
      <div class="exp-card">
        <div class="exp-header">
          <div>
            <h3 class="exp-company">${exp.company}</h3>
            <div class="exp-role">${role}</div>
            <div style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.2rem;">📍 ${location}</div>
          </div>
          <span class="exp-period-badge">📅 ${period}</span>
        </div>

        <ul class="exp-bullets">
          ${achievements.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <div class="metrics-row">
          <div class="metric-box">
            <div class="metric-value">20m ➔ 3m</div>
            <div class="metric-label">${currentLang === 'es' ? 'Actualización de Metadatos' : 'Metadata Update Speed'}</div>
          </div>
          <div class="metric-box">
            <div class="metric-value">100% SQL</div>
            <div class="metric-label">${currentLang === 'es' ? 'Trazabilidad & RBAC Auditable' : 'Auditable Traceability & RBAC'}</div>
          </div>
          <div class="metric-box">
            <div class="metric-value">0 Folios</div>
            <div class="metric-label">${currentLang === 'es' ? 'Duplicados o Corruptos' : 'Duplicate or Corrupted Folios'}</div>
          </div>
        </div>

        <div style="margin-top: 1rem;">
          <div class="tags-wrapper">
            ${exp.stack.map(tech => `<span class="tag" style="background: rgba(139, 92, 246, 0.1); color: #a78bfa; border-color: rgba(139, 92, 246, 0.25);">${tech}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ---------- RENDER PROJECT FILTERS ----------
function renderProjectFilters() {
  const container = document.getElementById('project-filters-container');
  if (!container) return;

  const categories = ['All', 'Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'Docker', 'C#/.NET', 'AI/ML'];
  const t = UI_TEXT[currentLang];

  container.innerHTML = categories.map(cat => {
    const label = cat === 'All' ? t.filterAll : cat;
    const isActive = currentFilter === cat ? 'active' : '';
    return `<button class="filter-btn ${isActive}" data-filter="${cat}">${label}</button>`;
  }).join('');

  // Add click handlers
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentFilter = e.target.getAttribute('data-filter');
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProjects();
    });
  });
}

// ---------- RENDER PROJECTS ----------
function renderProjects() {
  const container = document.getElementById('projects-container');
  const counterEl = document.getElementById('projects-counter');
  if (!container) return;

  const t = UI_TEXT[currentLang];
  let visibleCount = 0;

  const html = careerData.selected_projects.map(proj => {
    // Check filter match
    const matchesFilter = currentFilter === 'All' || proj.categories.includes(currentFilter);
    if (matchesFilter) visibleCount++;

    const subtitle = currentLang === 'es' ? proj.subtitle_es : proj.subtitle_en;
    const highlights = currentLang === 'es' ? proj.highlights_es : proj.highlights_en;
    
    let visClass = 'public';
    let visLabel = t.visPublic;
    if (proj.visibility === 'private') {
      visClass = 'private';
      visLabel = t.visPrivate;
    } else if (proj.visibility === 'enterprise') {
      visClass = 'private';
      visLabel = t.visEnterprise;
    }

    const hiddenClass = matchesFilter ? '' : 'hidden';

    return `
      <div class="project-card ${hiddenClass}" data-id="${proj.id}">
        <div class="project-top">
          <div class="project-header-meta">
            <span class="project-year">${proj.year}</span>
            <span class="project-vis-badge ${visClass}">${visLabel}</span>
          </div>
          <h3 class="project-title">${proj.name}</h3>
          <div class="project-subtitle">${subtitle}</div>

          <ul class="project-highlights">
            ${highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>

        <div class="project-bottom">
          <div class="project-stack">
            ${proj.stack.map(s => `<span class="tag">${s}</span>`).join('')}
          </div>

          ${proj.repository ? `
            <a href="${proj.repository}" target="_blank" rel="noopener noreferrer" class="project-link">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              ${t.linkGithub}
            </a>
          ` : `
            <div class="project-link disabled">
              🔒 ${t.linkPrivate}
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;

  if (counterEl) {
    counterEl.textContent = t.showingProjects.replace('{count}', visibleCount);
  }
}

// ---------- RENDER PDF DOWNLOADS ----------
function renderPdfs() {
  const container = document.getElementById('pdfs-container');
  if (!container) return;

  const t = UI_TEXT[currentLang];
  let html = '';

  careerData.pdf_downloads.forEach(pdf => {
    const title = currentLang === 'es' ? pdf.title_es : pdf.title_en;
    const desc = currentLang === 'es' ? pdf.desc_es : pdf.desc_en;

    html += `
      <div class="pdf-card">
        <div>
          <div class="pdf-icon-wrapper">📄</div>
          <h3 class="pdf-title">${title}</h3>
          <div class="pdf-meta-tag">${pdf.size}</div>
          <p class="pdf-desc">${desc}</p>
        </div>

        <div class="pdf-actions">
          <a href="${pdf.file_path}" download class="pdf-btn pdf-btn-download">
            📥 ${t.btnDownload}
          </a>
          <a href="${pdf.file_path}" target="_blank" rel="noopener noreferrer" class="pdf-btn pdf-btn-view">
            👁️ ${t.btnPreview}
          </a>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ---------- RENDER EDUCATION ----------
function renderEducation() {
  const container = document.getElementById('education-container');
  if (!container) return;

  const edu = careerData.education;
  const t = UI_TEXT[currentLang];

  const degree = currentLang === 'es' ? edu.degree_es : edu.degree_en;
  const location = currentLang === 'es' ? edu.location_es : edu.location_en;
  const status = currentLang === 'es' ? edu.status_es : edu.status_en;
  const gradDate = currentLang === 'es' ? edu.graduation_date_es : edu.graduation_date_en;
  const focus = currentLang === 'es' ? edu.focus_es : edu.focus_en;

  container.innerHTML = `
    <div class="edu-card">
      <div class="edu-header">
        <div>
          <h3 class="edu-degree">${degree}</h3>
          <div class="edu-inst">${edu.institution}</div>
          <div style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.2rem;">📍 ${location}</div>
        </div>
        <span class="edu-badge">🎓 ${status}</span>
      </div>

      <div class="edu-details">
        <div class="edu-detail-item">
          <span class="edu-detail-label">${t.eduGpaLabel}</span>
          <span class="edu-detail-val" style="color: var(--accent-teal);">${edu.gpa}</span>
        </div>
        <div class="edu-detail-item">
          <span class="edu-detail-label">${t.eduDateLabel}</span>
          <span class="edu-detail-val">${gradDate}</span>
        </div>
        <div class="edu-detail-item" style="grid-column: 1 / -1;">
          <span class="edu-detail-label">${t.eduFocusLabel}</span>
          <span class="edu-detail-val">${focus}</span>
        </div>
      </div>
    </div>
  `;
}

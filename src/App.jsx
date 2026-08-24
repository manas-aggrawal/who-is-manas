import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Download, Mail, Phone, Linkedin, Github, ArrowUpRight, ArrowRight,
  X, FileText, Menu, MapPin,
} from 'lucide-react';
import HydrowCaseStudy from './HydrowCaseStudy.jsx';
import CareNexusCaseStudy from './CareNexusCaseStudy.jsx';
import MaseCaseStudy from './MaseCaseStudy.jsx';

/* ------------------------------------------------------------------ data --- */

const stats = [
  { value: '3.5', unit: '+', label: 'Years of experience' },
  { value: '2', unit: '', label: 'Open-source projects' },
  { value: '2', unit: '', label: 'Research experiences' },
  { value: '3.83', unit: '', label: 'GPA · MS in CS' },
];

const experience = [
  {
    title: 'Software Engineer Intern',
    company: 'Hydrow',
    period: 'Jan 2026 – Aug 2026',
    location: 'Boston, MA',
    caseStudy: 'hydrow',
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'Kubernetes'],
    highlights: [
      'Built REST APIs using NestJS, PostgreSQL, and Redis, serving real-time athlete performance data across Hydrow’s platform',
      'Engineered an async task queue with bounded concurrency to safely batch-process movement records in parallel, preventing resource exhaustion across shared DB and Redis instances in a multi-container Kubernetes environment',
      'Optimized PostgreSQL query performance using materialized views, lateral cross joins, and indexed lookups, reducing table scans and query execution time across data APIs',
    ],
    details:
      'Backend and infrastructure engineering on Hydrow’s connected-fitness platform — designing performant data APIs and safe concurrency primitives that hold up under production load in a containerized, multi-service environment.',
  },
  {
    title: 'Forward Deployed Engineer & Scrum Master',
    company: 'canAssist × Northeastern University',
    period: 'May 2026 – Present',
    location: 'Boston, MA',
    caseStudy: 'carenexus',
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'OpenTelemetry'],
    highlights: [
      'Bootstrapped a NestJS REST backend using my own open-source boilerplate, designed the PostgreSQL schema, optimized performance via Redis caching, and instrumented end-to-end distributed tracing using my published telemetry npm package',
      'Led client engagement across requirements gathering, sprint demos, and feedback sessions while serving as Scrum Master for a 5-person team — driving sprint ceremonies, GitHub issue tracking, and daily standups',
    ],
    details:
      'Research capstone delivering a production backend for canAssist while owning both the engineering and the client relationship — turning my own open-source tooling into the foundation of a real, shipped product.',
  },
  {
    title: 'Forward Deployed Engineer',
    company: 'Studio Graphene',
    period: 'Nov 2020 – Jul 2024',
    location: 'Gurgaon, India',
    stack: ['Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Elasticsearch'],
    highlights: [
      'Built a serverless engineering-analytics platform on AWS Lambda to pinpoint bottlenecks like high PR wait times, frequent build failures, and blocked dependencies — boosting engineering velocity by 23%',
      'Built distributed, event-driven microservices using AWS SQS for decoupled data ingestion and processing, reducing response latency by ~40%',
      'Ingested 10k+ weekly events from third-party sources into Elasticsearch and ran aggregation queries to calculate high-level metrics',
      'Built a scalable Node.js/TypeScript REST backend processing 2M+ API requests daily; designed a PostgreSQL schema with partitioning and indexing to handle 500GB+ of catalog data and real-time cross-region inventory sync',
      'Deployed containerized microservices on AWS ECS, built CodePipeline CI/CD workflows, configured CloudWatch alarms, and integrated SES for deployment-failure and system alerts',
      'Developed a real-time tracking and competitive scoring algorithm using Node.js/PostgreSQL with read replicas and connection pooling to serve 100K+ active users on oddschecker’s betting platform',
    ],
    details:
      'Progressed from Junior Engineer to Backend Lead over 3.5+ years, owning architecture across multiple client products, mentoring junior engineers, driving standups and releases, and collaborating within cross-functional delivery teams.',
  },
];

// High-level Hydrow features shown as cards on the main page; each deep-links into
// the corresponding section (id) of the Hydrow case study. Blurbs are verified content.
const hydrowFeatures = [
  { id: 'hs-f1', name: 'Strength Progress System', blurb: 'Stats, PRs & HydroMetrics scoring — owned end-to-end, all under 25 ms', flag: true },
  { id: 'hs-f2', name: 'Badge System', blurb: 'Real-time achievement unlocks, cached in Redis', flag: true },
  { id: 'hs-f3', name: 'SQL Gap-Filling', blurb: 'Graph prep moved to pure SQL — 0.724 ms, zero main-thread blocking' },
  { id: 'hs-f4', name: 'Workout History & Backfill', blurb: 'Cursor pagination + a ~123K-record data migration' },
  { id: 'hs-f5', name: 'Login-Screen Banners', blurb: 'Full CRUD with S3 upload + transactional rollback' },
  { id: 'hs-f6', name: 'Post-Workout Summary', blurb: 'Sum-of-cables weight display, done right' },
  { id: 'hs-f7', name: 'Recommendation Engine', blurb: '3-pass pipeline with accessory & difficulty SQL filters' },
  { id: 'hs-f8', name: 'Tiles & Experiments', blurb: 'Template-Method tiles + master/leaf A/B promo targeting' },
  { id: 'hs-f9', name: 'AI-Assisted Workflow', blurb: 'A Claude Code SDLC flow with persistent PR-review memory', flag: true },
];

// Care deep-dive feature cards → deep-link into the case study by section id.
const careFeatures = [
  { id: 'cn-f1', name: 'System Architecture', blurb: 'Three repos — care-api on Fargate, IaC in-repo', flag: true },
  { id: 'cn-f2', name: 'Data Model & Schema', blurb: 'Two-table model + shared DTO, PostGIS & GIN indexes' },
  { id: 'cn-f3', name: 'Resources & Communities', blurb: 'Geolocated resources + recurring groups — save/flag, no join' },
  { id: 'cn-f4', name: 'Verification & Trust', blurb: 'Like-driven verification + flag-triggered soft-delete', flag: true },
  { id: 'cn-f6', name: 'Geolocation & Discovery', blurb: 'place_id + coords + address, nearest-first pagination' },
  { id: 'cn-f7', name: 'NFR Conventions', blurb: 'Repo-wide standards + OpenTelemetry observability' },
];

// Case-study registry — drives the main-page flagship blocks and the deep-dive overlays.
const caseStudies = {
  hydrow: {
    lead: 'Designed and shipped the backend behind strength progress, gamification, content delivery, home-screen tiles and A/B experiments — 59 PRs across 7 product areas, every query profiled at production scale.',
    summary: [
      'Owned several product features end-to-end — schema, APIs, tests, and rollout — including the strength-fitness app’s progress graphs, keeping every user-facing endpoint under 25 ms on the production database.',
      'Improved query performance from an event-loop-blocking JS loop to a 0.7 ms SQL query by moving data-heavy work into the database using window functions, grouped subqueries, and join-based filters.',
      'Cut hot-path latency from seconds (2,288 ms and 1,646 ms) to near-zero by moving real-time checks behind materialized views and Redis caching.',
      'Restored data correctness across ~123K historical records by running a bounded, dry-run-verified backfill migration, and kept large-table reads scale-safe with cursor-based pagination.',
      'Built an AI-assisted development workflow on Claude Code that automates the coding, testing, and self-review stages of the SDLC while keeping me in the loop for planning and final review, backed by a persistent knowledge base of accumulated review standards.',
    ],
    contrib: '/hydrow/contribution-graph.png',
    contribAlt: 'GitHub profile — 160 contributions, 59 PRs, 56 merged',
    features: hydrowFeatures,
  },
  carenexus: {
    lead: 'Owned the entire care-api backend — data model, APIs, engineering conventions, observability — and drove architecture, API, and product design across three repos for a dementia-care platform, while leading a five-person team through an August 2026 client handoff.',
    contrib: null,
    features: careFeatures,
  },
};

const openSourceProjects = [
  {
    name: 'NestJS Backend Boilerplate',
    tech: 'Node.js · TypeScript · NestJS · Prisma · Docker · Zod · Biome · Winston',
    description:
      'A production-ready backend boilerplate with JWT auth, RBAC, validation, structured logging, Prisma ORM, Docker, and Swagger/OpenAPI specs pre-configured — the starting point for real projects.',
    stat: '51', statLabel: 'stars', stat2: '11', stat2Label: 'forks',
    link: 'https://github.com/manas-aggrawal/nestjs-boilerplate',
  },
  {
    name: 'Telemetry npm Package',
    tech: 'Node.js · TypeScript · OpenTelemetry · AWS X-Ray · CloudWatch · Jaeger · Prometheus',
    description:
      'A published npm package enabling end-to-end distributed tracing across APIs, DB queries, and async tasks — reducing mean debugging time by ~60% in backend services.',
    stat: '1,000', statLabel: 'downloads', stat2: null,
    link: 'https://www.npmjs.com/package/nodejs-observability',
  },
];

const research = [
  {
    title: 'MASE — Multi-Agent Software Engineering',
    role: 'Graduate Researcher · Research Capstone',
    institution: 'Northeastern University · care-api',
    period: '2026 – Present',
    status: 'Ongoing',
    description:
      'A controlled, model-matched study (Claude Opus 4.8) comparing a single generalist LLM coding agent against a two-agent loop — a Coder paired with a dedicated NFR-Enforcement reviewer — across ten real issues on a production NestJS backend. The in-loop review halves genuine defects and removes the high-severity data-loss migrations the single agent ships. The headline result is methodological: the obvious metric (raw reviewer-comment count) fails in both directions, so trustworthy evaluation needs severity weighting, a validity filter, and a functional-correctness cross-check.',
    caseStudy: 'mase',
  },
  {
    title: 'Typed Conversational Interfaces',
    role: 'Research Apprentice · Prof. Chris Martens',
    institution: 'Northeastern University',
    period: 'Sep 2024 – Jan 2025',
    status: 'Accepted at Plateau’26',
    description:
      'Formalized a domain-specific language — closer to natural language — with a type system that prevents invalid states and guarantees reliable behavior, aiming to reduce chatbots’ dependency on LLMs for user queries. The work was accepted at Plateau’26.',
    paper: '/typed-conversational-interfaces.pdf',
  },
];

const education = [
  {
    school: 'Northeastern University',
    degree: 'Master of Science, Computer Science',
    period: 'Sep 2024 – Dec 2026',
    status: 'Expected Dec 2026',
    location: 'Boston, MA',
    gpa: '3.83 / 4.0',
    coursework:
      'Algorithms, System Design, Software Design Patterns, Principles of Programming Languages, Mobile App Development, Web Development',
    roles: [
      { title: 'Graduate Research', description: 'Researching multi-agent LLM architectures for end-to-end SDLC automation. Previously Research Apprentice on "Typed Conversational Interfaces" under Prof. Chris Martens (accepted at Plateau’26).' },
      { title: 'Graduate Teaching Assistant', description: 'TA for Fundamentals of Software Engineering (CS 4530) across 3 consecutive terms.' },
    ],
    transcriptFile: '/transcript-grad.pdf',
  },
  {
    school: 'Guru Gobind Singh Indraprastha University',
    degree: 'Bachelor of Technology, Computer Science Engineering',
    period: 'Aug 2016 – Sep 2020',
    location: 'Delhi, India',
    coursework: 'Data Structures, Networking, Operating Systems, Object-Oriented Design, Machine Learning',
    roles: [],
    transcriptFile: '/transcript-undergrad.pdf',
  },
];

const articles = [
  { title: 'Five Stages to Scalable: My System Design Journey', description: 'From monolith to microservices — architecture decisions, performance optimization, and lessons from production systems.', link: 'https://medium.com/@manasagg7199/five-stages-to-scalable-my-system-design-journey-a556b2b43446', category: 'System Design' },
  { title: 'Async/Await: Asynchronous Programming in Node.js', description: 'A practical breakdown of the async model that powers Node.js backends.', link: 'https://medium.com/@manasagg7199/async-await-asynchronous-programming-in-node-js-6367db22c6dd', category: 'Node.js' },
  { title: 'Types and Programming Languages: An Introduction', description: 'An accessible entry into type systems and why they matter.', link: 'https://medium.com/@manasagg7199/types-and-programming-languages-an-introduction-40d1b7650929', category: 'Languages' },
  { title: 'Node.js APM with AWS Distro for OpenTelemetry & X-Ray', description: 'Setting up application performance monitoring for Node.js services.', link: 'https://medium.com/@manasagg7199/intro-to-node-js-apm-using-aws-distro-for-opentelemetry-and-aws-x-ray-ee5b169a381d', category: 'Observability' },
];

const skills = {
  Languages: ['JavaScript', 'TypeScript', 'Java', 'C++', 'Python'],
  Frameworks: ['Node.js', 'Express.js', 'NestJS', 'Django', 'Laravel', 'React'],
  Databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Elasticsearch', 'DynamoDB', 'Redis', 'Firebase'],
  'Cloud & DevOps': ['AWS Lambda', 'S3', 'SQS / DLQ', 'X-Ray', 'ECS', 'Docker', 'CI/CD', 'Kubernetes'],
  Practices: ['REST APIs', 'Distributed Systems', 'Web Architecture', 'OpenTelemetry', 'Agile', 'SDLC'],
};

const marqueeItems = [
  'PostgreSQL', 'NestJS', 'Node.js', 'AWS', 'Redis', 'Kubernetes', 'TypeScript',
  'Distributed Systems', 'REST APIs', 'Docker', 'OpenTelemetry', 'Microservices',
];

const sections = [
  { id: 'about', label: 'About', primary: true },
  { id: 'experience', label: 'Experience', primary: true },
  { id: 'opensource', label: 'Open Source', primary: true },
  { id: 'research', label: 'Research', primary: true },
  { id: 'education', label: 'Education', primary: true },
  { id: 'writing', label: 'Writing', primary: true },
  { id: 'skills', label: 'Skills', primary: true },
  { id: 'contact', label: 'Contact', primary: false },
];

const socials = [
  { href: 'https://www.linkedin.com/in/manasaggrawal07/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/manas-aggrawal', icon: Github, label: 'GitHub' },
  { href: 'https://medium.com/@manasagg7199', icon: FileText, label: 'Medium' },
  { href: 'mailto:aggrawal.m@northeastern.edu', icon: Mail, label: 'Email' },
];

/* ------------------------------------------------------------- components --- */

const Magnetic = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  const onMove = (e) => {
    if (reduced.current || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`magnetic ${className || ''}`} {...props}>
      {children}
    </span>
  );
};

const Stamp = ({ text, size = 132 }) => (
  <div className="stamp" style={{ width: size, height: size }} aria-hidden="true">
    <svg viewBox="0 0 200 200" width={size} height={size}>
      <defs>
        <path id="stampPath" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
      </defs>
      <g className="stamp-rotate">
        <text>
          <textPath href="#stampPath" startOffset="0">{text}</textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="42" className="stamp-core" />
    </svg>
    <span className="stamp-icon"><ArrowUpRight className="w-6 h-6" strokeWidth={2.5} /></span>
  </div>
);

const Kicker = ({ children }) => <span className="kicker">{children}</span>;

const SectionHead = ({ n, kicker, title }) => (
  <div className="sec-head reveal">
    <Kicker>{n} — {kicker}</Kicker>
    <h2 className="sec-title">{title}<span className="ast"> ✳</span></h2>
  </div>
);

/* ------------------------------------------------------------------- app --- */

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showTranscript, setShowTranscript] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState('home'); // 'home' | 'hydrow' | 'carenexus'
  const [caseTarget, setCaseTarget] = useState(null); // feature-section id to scroll to

  const openCaseStudy = useCallback((studyId, featureId = null) => {
    setCaseTarget(featureId);
    setView(studyId);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal-on-scroll
    let revealObs;
    const revealEls = Array.from(document.querySelectorAll('.reveal'));
    if (reduced) {
      revealEls.forEach((el) => el.classList.add('reveal-in'));
    } else {
      revealObs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('reveal-in'); revealObs.unobserve(e.target); }
        }),
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      revealEls.forEach((el) => revealObs.observe(el));
    }

    // Scrollspy
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((s) => spy.observe(s));

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      document.documentElement.style.setProperty('--sy', String(y));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => { revealObs?.disconnect(); spy.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const goTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const primaryNav = sections.filter((s) => s.primary);
  const onLightSection = ['about', 'opensource', 'education', 'skills'].includes(activeSection);

  return (
    <div className="app">
      <Styles />

      {/* NAV */}
      <header className={`nav ${scrolled ? 'nav-solid' : ''}`}>
        <div className="wrap nav-inner">
          <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Manas Aggrawal<span className="brand-dot">.</span>
          </button>
          <nav className={`nav-links ${onLightSection ? 'cap-dark' : 'cap-light'}`}>
            {primaryNav.map((s) => (
              <button key={s.id} onClick={() => goTo(s.id)} className={`navlink ${activeSection === s.id ? 'active' : ''}`}>
                {s.label.toLowerCase()}
              </button>
            ))}
          </nav>
          <div className="nav-right">
            <Magnetic>
              <button onClick={() => goTo('contact')} className="btn btn-sm">
                Let’s talk <ArrowUpRight className="w-4 h-4" />
              </button>
            </Magnetic>
            <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {sections.map((s) => (
              <button key={s.id} onClick={() => goTo(s.id)} className={`mobile-link ${activeSection === s.id ? 'active' : ''}`}>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="hero">
        <div className="orbit orbit-1" />
        <div className="orbit orbit-2" />
        <div className="orbit orbit-3 spin-slow" />
        <div className="wrap hero-inner">
          <p className="kicker rise" style={{ animationDelay: '.05s' }}>Backend Software Engineer · Boston, MA</p>
          <div className="avail rise" style={{ animationDelay: '.08s' }}>
            <span className="avail-dot" /> Open to full-time SWE roles · January 2027
          </div>
          <h1 className="hero-title">
            <span className="rise" style={{ animationDelay: '.12s' }}>MANAS</span>
            <span className="rise line-2" style={{ animationDelay: '.2s' }}>AGGRAWAL<span className="ast">✳</span></span>
          </h1>
          <p className="hero-sub rise" style={{ animationDelay: '.3s' }}>
            In the age of agentic AI, I've moved past just writing code — I learn systems deeply
            and ship backends that scale securely, standing up production-grade APIs faster than ever.
          </p>
          <div className="hero-cta rise" style={{ animationDelay: '.4s' }}>
            <Magnetic>
              <a className="btn" href="/resume.pdf" download="Manas_Aggrawal_Resume.pdf">
                <Download className="w-4 h-4" /> Download Résumé
              </a>
            </Magnetic>
            <Magnetic>
              <button className="btn-outline" onClick={() => goTo('contact')}>
                Get in touch <ArrowRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>
        </div>
        <div className="hero-stamp rise" style={{ animationDelay: '.5s' }}>
          <div className="stamp-parallax">
            <Stamp text="MANAS AGGRAWAL ✳ BACKEND ENGINEER ✳ " size={158} />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="marquee-copy">
              {marqueeItems.map((t) => (<span key={t} className="marquee-item">{t} <span className="marquee-star">✳</span></span>))}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="section light">
        <div className="wrap">
          <SectionHead n="(01)" kicker="About" title="Hi, I'm Manas" />
          <div className="about-grid">
            <div className="about-photo reveal">
              <div className="photo-frame">
                <img src="/profile.png" alt="Manas Aggrawal" style={{ objectPosition: '50% 12%' }} />
                <span className="corner corner-tl" />
                <span className="corner corner-br" />
              </div>
            </div>
            <div className="about-body">
              <p className="lead reveal">
                Backend software engineer with <b>3.5+ years</b> shipping scalable APIs, distributed systems, and
                cloud infrastructure — most recently interned as a backend engineer at <b>Hydrow</b> while finishing
                my MS in Computer Science at <b>Northeastern</b>.
              </p>
              <ul className="about-list reveal">
                {[
                  'Software Engineer Intern at Hydrow — performant data APIs and safe concurrency on a containerized backend.',
                  'Forward Deployed Engineer & Scrum Master on a Northeastern research capstone — owning both the backend and the client.',
                  'Author of open-source tooling other teams ship on: a NestJS boilerplate and a distributed-tracing npm package.',
                  'Graduate TA for Software Engineering, and a researcher in programming languages and multi-agent LLM systems.',
                ].map((p, i) => (
                  <li key={i}><span className="li-mark">→</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="stats reveal">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <div className="stat-num">{s.value}<span className="u">{s.unit}</span></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section">
        <div className="wrap">
          <SectionHead n="(02)" kicker="Experience" title="Where I've built" />
          <div className="exp-list">
            {experience.map((job, idx) => {
              const cs = job.caseStudy && caseStudies[job.caseStudy];
              return cs ? (
                <div key={idx} className="exp-row exp-flagship reveal">
                  <div className="exp-index">0{idx + 1}</div>
                  <div className="exp-main">
                    <div className="exp-top">
                      <div>
                        <h3 className="exp-title">{job.title}</h3>
                        <p className="exp-company">{job.company}</p>
                      </div>
                      <div className="exp-meta">
                        <span>{job.period}</span>
                        <span className="dim">{job.location}</span>
                      </div>
                    </div>
                    <p className="exp-flagship-lead">{cs.lead}</p>
                    {cs.summary && (
                      <ul className="hl-list">
                        {cs.summary.map((h, i) => (<li key={i}><span className="li-mark">→</span>{h}</li>))}
                      </ul>
                    )}
                    <div className="tags">{job.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>

                    {cs.contrib && (
                      <a
                        className="exp-contrib"
                        onClick={() => openCaseStudy(job.caseStudy)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') openCaseStudy(job.caseStudy); }}
                      >
                        <img src={cs.contrib} alt={cs.contribAlt} />
                      </a>
                    )}

                    <div className="exp-feat-grid">
                      {cs.features.map((f) => (
                        <button key={f.id} className={`exp-feat-card ${f.flag ? 'flag' : ''}`} onClick={() => openCaseStudy(job.caseStudy, f.id)}>
                          <span className="exp-feat-top">
                            <span className="exp-feat-name">{f.name}</span>
                            <ArrowUpRight className="w-4 h-4 exp-feat-arr" />
                          </span>
                          <span className="exp-feat-blurb">{f.blurb}</span>
                        </button>
                      ))}
                    </div>

                    <button className="link-orange" onClick={() => openCaseStudy(job.caseStudy)}>
                      Open the full deep-dive <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div key={idx} className="exp-row reveal" onClick={() => setSelectedItem(job)}>
                  <div className="exp-index">0{idx + 1}</div>
                  <div className="exp-main">
                    <div className="exp-top">
                      <div>
                        <h3 className="exp-title">{job.title}</h3>
                        <p className="exp-company">{job.company}</p>
                      </div>
                      <div className="exp-meta">
                        <span>{job.period}</span>
                        <span className="dim">{job.location}</span>
                      </div>
                    </div>
                    <div className="tags">{job.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                    <ul className="hl-list">
                      {job.highlights.slice(0, 2).map((h, i) => (<li key={i}><span className="li-mark">→</span>{h}</li>))}
                    </ul>
                    <span className="link-orange">Read more <ArrowUpRight className="w-4 h-4" /></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPEN SOURCE */}
      <section id="opensource" className="section light">
        <div className="wrap">
          <SectionHead n="(03)" kicker="Open Source" title="Tools I ship & maintain" />
          <div className="grid-2">
            {openSourceProjects.map((p, idx) => (
              <a key={idx} href={p.link} target="_blank" rel="noopener noreferrer" className="card os-card reveal">
                <div className="card-top">
                  <span className="card-idx">0{idx + 1}</span>
                  <ArrowUpRight className="w-6 h-6 arr" />
                </div>
                <h3 className="card-title">{p.name}</h3>
                <p className="mono-sm dim">{p.tech}</p>
                <p className="card-desc">{p.description}</p>
                <div className="os-stats">
                  <div><span className="os-num">{p.stat}<span className="u">+</span></span><span className="os-lbl">{p.statLabel}</span></div>
                  {p.stat2 && <div><span className="os-num">{p.stat2}</span><span className="os-lbl">{p.stat2Label}</span></div>}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section id="research" className="section">
        <div className="wrap">
          <SectionHead n="(04)" kicker="Research" title="Ideas I'm chasing" />
          <div className="stack-list">
            {research.map((r, idx) => (
              <div key={idx} className="card res-card reveal">
                <div className="res-top">
                  <h3 className="card-title">{r.title}</h3>
                  <span className="pill">{r.status}</span>
                </div>
                <p className="mono-sm">{r.role}</p>
                <p className="mono-sm dim mb">{r.institution} · {r.period}</p>
                <p className="card-desc">{r.description}</p>
                {r.paper && (
                  <div className="res-actions">
                    <a href={r.paper} target="_blank" rel="noopener noreferrer" className="btn-outline sm"><FileText className="w-4 h-4" /> View Paper</a>
                    <a href={r.paper} download="Typed_Conversational_Interfaces.pdf" className="btn-outline sm"><Download className="w-4 h-4" /> Download PDF</a>
                  </div>
                )}
                {r.caseStudy && (
                  <div className="res-actions">
                    <button className="btn-outline sm" onClick={() => openCaseStudy(r.caseStudy)}>
                      See the research deep-dive <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="section light">
        <div className="wrap">
          <SectionHead n="(05)" kicker="Education" title="Foundations" />
          <div className="stack-list">
            {education.map((edu, idx) => (
              <div key={idx} className="card reveal">
                <div className="res-top">
                  <div>
                    <h3 className="card-title">{edu.school}</h3>
                    <p className="mono-sm">{edu.degree}</p>
                    <div className="edu-meta">
                      {edu.gpa && <span className="link-orange-static">GPA {edu.gpa}</span>}
                      {edu.status && <span className="pill">{edu.status}</span>}
                    </div>
                  </div>
                  <div className="exp-meta"><span>{edu.period}</span><span className="dim">{edu.location}</span></div>
                </div>
                <button onClick={() => setShowTranscript(edu.transcriptFile)} className="btn-outline sm mt"><FileText className="w-4 h-4" /> View Transcript</button>
                <div className="edu-detail">
                  <div><span className="mono-label">Relevant Coursework</span><p className="card-desc">{edu.coursework}</p></div>
                  {edu.roles.map((role, i) => (
                    <div key={i}><span className="mono-label">{role.title}</span><p className="card-desc">{role.description}</p></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section id="writing" className="section">
        <div className="wrap">
          <SectionHead n="(06)" kicker="Writing" title="Words on systems" />
          <div className="grid-2">
            {articles.map((a, idx) => (
              <a key={idx} href={a.link} target="_blank" rel="noopener noreferrer" className="card art-card reveal">
                <div className="card-top">
                  <span className="tag">{a.category}</span>
                  <ArrowUpRight className="w-5 h-5 arr" />
                </div>
                <h3 className="card-title sm">{a.title}</h3>
                <p className="card-desc">{a.description}</p>
                <span className="link-orange">Read on Medium <ArrowUpRight className="w-4 h-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section light">
        <div className="wrap">
          <SectionHead n="(07)" kicker="Skills" title="The toolbox" />
          <div className="skills-grid">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat} className="skill-block reveal">
                <span className="mono-label orange">{cat}</span>
                <div className="tags">{items.map((s) => <span key={s} className="tag tag-lg">{s}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <div className="wrap">
          <SectionHead n="(08)" kicker="Contact" title="Let's build something" />
          <div className="contact-grid">
            <div className="reveal">
              <p className="contact-lead">
                Open to <b>full-time software engineering roles starting January 2027</b>. Backend, systems,
                infrastructure — let’s talk.
              </p>
              <a href="mailto:aggrawal.m@northeastern.edu" className="contact-email">
                aggrawal.m@northeastern.edu <ArrowUpRight className="w-6 h-6" />
              </a>
              <div className="contact-row">
                <span className="mono-sm dim"><Phone className="inline w-4 h-4" /> (857) 265-1533</span>
                <span className="mono-sm dim"><MapPin className="inline w-4 h-4" /> Boston, MA</span>
              </div>
              <div className="contact-socials">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="soc">
                    <s.icon className="w-4 h-4" /> {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="contact-stamp reveal"><Stamp text="GET IN TOUCH · SAY HELLO · " size={168} /></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <span className="brand">Manas Aggrawal<span className="brand-dot">.</span></span>
          <span className="mono-sm dim">© 2026 Manas Aggrawal · Built with React</span>
          <button className="link-orange" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* FLOATING BADGE */}
      {scrolled && (
        <button
          className="float-badge"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <Stamp text="BACK TO TOP ✳ BACK TO TOP ✳ " size={104} />
        </button>
      )}

      {/* DETAIL MODAL */}
      {selectedItem && (
        <div className="modal-bg" onClick={() => setSelectedItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}><X className="w-5 h-5" /></button>
            <h2 className="modal-title">{selectedItem.name || selectedItem.title}</h2>
            <p className="mono-sm dim modal-sub">
              {selectedItem.company ? `${selectedItem.company} · ${selectedItem.period}` : selectedItem.tech}
            </p>
            <p className="card-desc modal-desc">{selectedItem.details}</p>
            {selectedItem.highlights && (
              <>
                <span className="mono-label orange">Key Contributions</span>
                <ul className="hl-list modal-hl">
                  {selectedItem.highlights.map((h, i) => (<li key={i}><span className="li-mark">→</span>{h}</li>))}
                </ul>
              </>
            )}
            {selectedItem.link && selectedItem.link !== '#' && (
              <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="btn mt"><span>View Project</span> <ArrowUpRight className="w-4 h-4" /></a>
            )}
          </div>
        </div>
      )}

      {/* TRANSCRIPT MODAL */}
      {showTranscript && (
        <div className="modal-bg" onClick={() => setShowTranscript(null)}>
          <div className="modal modal-wide" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowTranscript(null)}><X className="w-5 h-5" /></button>
            <h2 className="modal-title">Academic Transcript</h2>
            <div className="transcript-frame"><iframe src={showTranscript} title="Transcript" /></div>
            <a href={showTranscript} download className="btn mt"><Download className="w-4 h-4" /> Download Transcript</a>
          </div>
        </div>
      )}

      {/* CASE STUDY DEEP-DIVES (full-screen overlays) */}
      {view === 'hydrow' && <HydrowCaseStudy target={caseTarget} onBack={() => setView('home')} />}
      {view === 'carenexus' && <CareNexusCaseStudy target={caseTarget} onBack={() => setView('home')} />}
      {view === 'mase' && <MaseCaseStudy target={caseTarget} onBack={() => setView('home')} />}
    </div>
  );
};

/* ---------------------------------------------------------------- styles --- */

const Styles = () => (
  <style>{`
    .app { position: relative; overflow-x: hidden; }
    .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
    b { color: var(--ink); font-weight: 600; }
    .dim { color: var(--ink-3); }
    .mono-sm { font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6; color: var(--ink-2); }
    .mono-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: var(--ink-3); display: block; margin-bottom: 10px; }
    .mono-label.orange { color: var(--accent); }

    .kicker { font-family: var(--font-mono); font-size: 14px; letter-spacing: .2em; text-transform: uppercase; color: var(--accent); display: inline-flex; align-items: center; }

    /* NAV */
    .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 60; background: transparent; padding: 15px 0; }
    .nav-inner { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; }
    .brand { font-family: var(--font-display); font-weight: 700; font-size: 20px; letter-spacing: -.02em; color: var(--ink); background: none; border: none; cursor: pointer; padding: 0; justify-self: start; }
    .brand-dot { color: var(--orange); }
    .nav .brand { color: var(--orange); }
    .nav .brand-dot { color: var(--orange); }
    /* Floating rounded capsule holding the nav links */
    .nav-links { display: none; gap: 20px; padding: 11px 22px; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid transparent; border-radius: 999px; transition: background .35s, border-color .35s, box-shadow .35s; }
    /* Over dark sections → white capsule with dark links */
    .nav-links.cap-light { background: rgba(244,239,230,.92); border-color: rgba(20,15,10,.16); box-shadow: 0 6px 22px rgba(0,0,0,.2); }
    .nav-links.cap-light .navlink { color: #514a40; }
    .nav-links.cap-light .navlink:hover { color: var(--orange); }
    /* Over light sections → dark capsule with light links */
    .nav-links.cap-dark { background: rgba(20,20,23,.72); border-color: rgba(245,241,234,.14); box-shadow: 0 6px 22px rgba(0,0,0,.3); }
    .nav-links.cap-dark .navlink { color: var(--ink-2); }
    .nav-links.cap-dark .navlink:hover { color: var(--orange); }
    .nav-links.cap-light .navlink.active, .nav-links.cap-dark .navlink.active { color: var(--orange); }
    .navlink { font-family: var(--font-mono); font-size: 13px; color: var(--ink-2); background: none; border: none; cursor: pointer; padding: 4px 0; position: relative; transition: color .2s; }
    .navlink:hover { color: var(--ink); }
    .navlink.active { color: var(--accent); }
    .navlink.active::after { content: ''; position: absolute; left: 0; bottom: -3px; width: 100%; height: 2px; background: var(--accent); }
    .nav-right { display: flex; align-items: center; gap: 14px; justify-self: end; }
    .menu-btn { display: inline-flex; background: none; border: none; color: var(--orange); cursor: pointer; padding: 4px; }
    .mobile-menu { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 16px 24px 22px; background: rgba(10,9,8,.96); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
    .mobile-link { text-align: left; font-family: var(--font-mono); font-size: 14px; color: var(--ink-2); background: none; border: none; padding: 10px 6px; cursor: pointer; border-radius: 8px; }
    .mobile-link.active, .mobile-link:hover { color: var(--accent); background: var(--accent-soft); }

    /* BUTTONS */
    .magnetic { display: inline-flex; transition: transform .25s cubic-bezier(.2,.65,.3,1); }
    .btn { display: inline-flex; align-items: center; gap: 9px; background: var(--accent); color: #140a05; font-family: var(--font-sans); font-weight: 600; font-size: 15px; padding: 14px 22px; border-radius: 999px; border: none; cursor: pointer; transition: background .2s, box-shadow .2s; text-decoration: none; }
    .btn:hover { background: var(--accent-2); box-shadow: 0 8px 30px rgba(255,90,31,.28); }
    .btn-sm { padding: 9px 16px; font-size: 13.5px; }
    .btn-outline { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--ink); font-family: var(--font-sans); font-weight: 500; font-size: 15px; padding: 13px 22px; border-radius: 999px; border: 1px solid var(--line-strong); cursor: pointer; transition: border-color .2s, color .2s; text-decoration: none; }
    .btn-outline:hover { border-color: var(--accent); color: var(--accent); }
    .btn-outline.sm { padding: 9px 16px; font-size: 13px; }

    /* HERO */
    .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding: 96px 0 48px; }
    .hero .wrap { max-width: 1360px; width: 100%; }
    .hero-inner { position: relative; z-index: 2; }
    .hero-title { font-family: var(--font-display); font-weight: 700; text-transform: uppercase; line-height: .9; letter-spacing: -.03em; margin: 14px 0 0; display: flex; flex-direction: column; }
    .hero-title span { font-size: clamp(2.8rem, 9.5vw, 7.6rem); display: block; }
    .hero-title .line-2 { color: var(--ink); }
    .hero-title .ast { color: var(--accent); font-size: .5em; vertical-align: super; }
    .hero-sub { max-width: 600px; font-size: clamp(14.5px, 1.8vw, 18px); color: var(--ink-2); margin: 22px 0 0; line-height: 1.55; }
    .hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 26px; }
    .hero-stamp { position: absolute; right: 6%; top: 24%; z-index: 2; }
    .orbit { position: absolute; border-radius: 50%; border: 1px solid var(--line); pointer-events: none; z-index: 1; }
    .orbit-1 { width: 620px; height: 620px; right: -160px; top: -120px; transform: translateY(calc(var(--sy, 0) * 0.06px)); }
    .orbit-2 { width: 320px; height: 320px; right: 60px; top: 40px; border-color: var(--accent-line); transform: translateY(calc(var(--sy, 0) * -0.05px)); }
    .orbit-3 { width: 900px; height: 900px; left: -380px; bottom: -420px; border-style: dashed; border-color: var(--line); }
    .spin-slow { animation: spin 60s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* MARQUEE */
    .marquee { background: var(--orange); overflow: hidden; padding: 15px 0; }
    .marquee-track { display: inline-flex; white-space: nowrap; animation: marquee 32s linear infinite; }
    .marquee-copy { display: inline-flex; }
    .marquee-item { font-family: var(--font-display); font-weight: 600; font-size: 20px; text-transform: uppercase; color: #140a05; padding: 0 22px; display: inline-flex; align-items: center; gap: 22px; letter-spacing: .01em; }
    .marquee-star { opacity: .55; }
    @keyframes marquee { to { transform: translateX(-50%); } }

    /* SECTIONS */
    .section { padding: 104px 0; scroll-margin-top: 80px; position: relative; }
    .section + .section, .marquee + .section { border-top: 1px solid var(--line); }
    .sec-head { margin-bottom: 52px; }
    .sec-title { font-family: var(--font-display); font-weight: 700; font-size: clamp(2.1rem, 5.5vw, 4.2rem); line-height: 1; letter-spacing: -.025em; margin: 16px 0 0; color: var(--ink); }
    .sec-title .ast { color: var(--accent); }

    /* ABOUT */
    .about-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
    .about-photo { position: relative; max-width: 300px; }
    .photo-frame { position: relative; border-radius: 20px; overflow: hidden; border: 1px solid var(--line); aspect-ratio: 1; }
    .photo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(.15) contrast(1.03); }
    .corner { position: absolute; width: 28px; height: 28px; border: 2px solid var(--accent); }
    .corner-tl { top: 12px; left: 12px; border-right: none; border-bottom: none; }
    .corner-br { bottom: 12px; right: 12px; border-left: none; border-top: none; }
    .lead { font-size: clamp(17px, 2.2vw, 22px); line-height: 1.55; color: var(--ink-2); }
    .about-list { list-style: none; padding: 0; margin: 28px 0 0; display: flex; flex-direction: column; gap: 16px; }
    .about-list li, .hl-list li { display: flex; gap: 12px; color: var(--ink-2); font-size: 15px; line-height: 1.55; }
    .li-mark { color: var(--accent); font-family: var(--font-mono); flex-shrink: 0; }
    .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px; margin-top: 64px; padding-top: 44px; border-top: 1px solid var(--line); }
    .stat { text-align: center; }
    .stat-num { font-family: var(--font-display); font-weight: 700; font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1; color: var(--ink); }
    .stat-num .u { color: var(--accent); }
    .stat-label { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); margin-top: 12px; }

    /* EXPERIENCE */
    .exp-list { display: flex; flex-direction: column; }
    .exp-row { display: grid; grid-template-columns: 60px 1fr; gap: 20px; padding: 34px 0; border-top: 1px solid var(--line); cursor: pointer; transition: opacity .2s; }
    .exp-row:last-child { border-bottom: 1px solid var(--line); }
    .exp-row:hover .exp-title { color: var(--accent); }
    .exp-index { font-family: var(--font-mono); font-size: 13px; color: var(--ink-3); padding-top: 6px; }
    .exp-top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; }
    .exp-title { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.2rem, 2.4vw, 1.7rem); color: var(--ink); transition: color .2s; letter-spacing: -.01em; }
    .exp-company { color: var(--accent); font-size: 15px; margin-top: 2px; }
    .exp-meta { font-family: var(--font-mono); font-size: 12.5px; color: var(--ink-2); text-align: right; display: flex; flex-direction: column; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
    .tag { font-family: var(--font-mono); font-size: 11px; padding: 4px 11px; border: 1px solid var(--line); border-radius: 999px; color: var(--ink-2); white-space: nowrap; }
    .tag-lg { font-size: 12.5px; padding: 6px 13px; transition: border-color .2s, color .2s; }
    .tag-lg:hover { border-color: var(--accent); color: var(--ink); }
    .hl-list { list-style: none; padding: 0; margin: 0 0 16px; display: flex; flex-direction: column; gap: 10px; }
    .hl-list li { font-size: 14px; }
    .exp-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; }

    /* HYDROW FLAGSHIP EXPERIENCE BLOCK */
    .exp-flagship { cursor: default; }
    .exp-flagship:hover .exp-title { color: var(--ink); }
    .exp-flagship-lead { color: var(--ink-2); font-size: 15px; line-height: 1.6; margin: 14px 0 0; max-width: 720px; }
    .exp-flagship .tags { margin: 16px 0 22px; }
    .exp-contrib { display: block; border: 1px solid var(--line); border-radius: 14px; overflow: hidden; cursor: pointer; transition: border-color .2s; background: #0d1117; }
    .exp-contrib:hover { border-color: var(--accent-line); }
    .exp-contrib img { width: 100%; height: auto; display: block; }
    .exp-feat-grid { display: grid; grid-template-columns: 1fr; gap: 12px; margin: 22px 0; }
    .exp-feat-card { text-align: left; background: var(--bg-elev); border: 1px solid var(--line); border-radius: 14px; padding: 18px; cursor: pointer; transition: border-color .2s, transform .2s, background .2s; display: flex; flex-direction: column; gap: 8px; }
    .exp-feat-card:hover { border-color: var(--accent-line); transform: translateY(-2px); background: var(--bg-elev-2); }
    .exp-feat-card.flag { border-color: var(--accent-line); }
    .exp-feat-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
    .exp-feat-name { font-family: var(--font-display); font-weight: 600; font-size: 1.02rem; color: var(--ink); letter-spacing: -.01em; }
    .exp-feat-arr { color: var(--ink-3); flex-shrink: 0; transition: color .2s, transform .2s; }
    .exp-feat-card:hover .exp-feat-arr { color: var(--accent); transform: translate(2px, -2px); }
    .exp-feat-blurb { color: var(--ink-2); font-size: 13.5px; line-height: 1.5; }
    .link-orange { display: inline-flex; align-items: center; gap: 7px; color: var(--accent); font-weight: 500; font-size: 14px; background: none; border: none; cursor: pointer; padding: 0; transition: gap .2s; }
    .link-orange:hover { gap: 11px; }
    .link-orange-static { color: var(--accent); font-family: var(--font-mono); font-size: 13px; }

    /* CARDS / GRIDS */
    .grid-2 { display: grid; grid-template-columns: 1fr; gap: 20px; }
    .grid-3 { display: grid; grid-template-columns: 1fr; gap: 20px; }
    .stack-list { display: flex; flex-direction: column; gap: 20px; }
    .card { background: var(--bg-elev); border: 1px solid var(--line); border-radius: 20px; padding: 28px; transition: border-color .25s, transform .25s, background .25s; position: relative; overflow: hidden; text-decoration: none; display: block; cursor: pointer; }
    .card:hover { border-color: var(--accent-line); transform: translateY(-3px); background: var(--bg-elev-2); }
    .card::after { content: ''; position: absolute; inset: 0; border-radius: 20px; box-shadow: inset 0 0 0 1px transparent; transition: box-shadow .25s; pointer-events: none; }
    .card:hover::after { box-shadow: inset 0 60px 90px -60px rgba(255,90,31,.18); }
    .card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
    .card-idx { font-family: var(--font-mono); font-size: 12px; color: var(--ink-3); }
    .arr { color: var(--ink-3); transition: color .2s, transform .2s; }
    .card:hover .arr { color: var(--accent); transform: translate(2px,-2px) rotate(0); }
    .card-title { font-family: var(--font-display); font-weight: 600; font-size: 1.4rem; color: var(--ink); letter-spacing: -.01em; }
    .card-title.sm { font-size: 1.15rem; }
    .card-desc { color: var(--ink-2); font-size: 14.5px; line-height: 1.6; margin-top: 12px; }
    .os-card .card-desc, .art-card .card-desc { margin-bottom: 22px; }
    .os-stats { display: flex; gap: 40px; padding-top: 20px; border-top: 1px solid var(--line); margin-top: auto; }
    .os-num { font-family: var(--font-display); font-weight: 700; font-size: 1.9rem; color: var(--ink); display: block; }
    .os-num .u { color: var(--accent); }
    .os-lbl { font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }
    .os-card, .art-card, .proj-card { display: flex; flex-direction: column; }
    .pill { font-family: var(--font-mono); font-size: 11.5px; padding: 5px 12px; border-radius: 999px; background: var(--accent-soft); border: 1px solid var(--accent-line); color: var(--accent); white-space: nowrap; }
    .res-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 8px; }
    .mb { margin-bottom: 14px; }
    .res-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 22px; padding-top: 22px; border-top: 1px solid var(--line); }
    .edu-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 8px; }
    .edu-detail { display: flex; flex-direction: column; gap: 18px; margin-top: 24px; }
    .mt { margin-top: 22px; }

    /* SKILLS */
    .skills-grid { display: flex; flex-direction: column; gap: 32px; }
    .skill-block { display: grid; grid-template-columns: 1fr; gap: 12px; padding-bottom: 32px; border-bottom: 1px solid var(--line); }
    .skill-block:last-child { border-bottom: none; padding-bottom: 0; }

    /* CONTACT */
    .contact-grid { display: grid; grid-template-columns: 1fr; gap: 50px; align-items: center; }
    .contact-lead { font-size: clamp(16px, 2vw, 20px); color: var(--ink-2); line-height: 1.6; max-width: 560px; }
    .contact-email { display: inline-flex; align-items: center; gap: 12px; max-width: 100%; font-family: var(--font-display); font-weight: 600; font-size: clamp(1.05rem, 3vw, 1.85rem); line-height: 1.2; color: var(--ink); text-decoration: none; margin: 30px 0 26px; letter-spacing: -.01em; transition: color .2s; word-break: normal; overflow-wrap: anywhere; }
    .contact-email svg { flex-shrink: 0; }
    .contact-email:hover { color: var(--accent); }
    .contact-row { display: flex; flex-wrap: wrap; gap: 24px; }
    .contact-socials { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
    .soc { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 13px; color: var(--ink-2); border: 1px solid var(--line); border-radius: 999px; padding: 9px 16px; text-decoration: none; transition: border-color .2s, color .2s; }
    .soc:hover { border-color: var(--accent); color: var(--accent); }
    .contact-stamp { display: flex; justify-content: center; }

    /* FOOTER */
    .footer { border-top: 1px solid var(--line); padding: 40px 0; }
    .footer-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }

    /* STAMP */
    .stamp { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .stamp-rotate { animation: spin 20s linear infinite; transform-origin: 100px 100px; }
    .stamp text { font-family: var(--font-mono); font-weight: 500; font-size: 14px; letter-spacing: 2px; fill: var(--accent); text-transform: uppercase; }
    .stamp-core { fill: none; stroke: var(--accent-line); stroke-width: 1.5; }
    .stamp-icon { position: absolute; color: var(--accent); }
    .stamp-parallax { transform: translateY(calc(var(--sy, 0) * 0.11px)); will-change: transform; }

    /* MODALS */
    .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,.8); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal { background: var(--bg-elev); border: 1px solid var(--line-strong); border-radius: 22px; max-width: 640px; width: 100%; max-height: 88vh; overflow-y: auto; padding: 34px; position: relative; }
    .modal-wide { max-width: 820px; }
    .modal-close { position: absolute; top: 18px; right: 18px; background: none; border: none; color: var(--ink-3); cursor: pointer; }
    .modal-close:hover { color: var(--ink); }
    .modal-title { font-family: var(--font-display); font-weight: 700; font-size: 1.7rem; color: var(--ink); letter-spacing: -.01em; padding-right: 30px; }
    .modal-sub { margin: 6px 0 20px; }
    .modal-desc { font-size: 15px; margin-bottom: 24px; }
    .modal-hl { margin-top: 12px; }
    .transcript-frame { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; margin: 20px 0 0; }
    .transcript-frame iframe { width: 100%; aspect-ratio: 8.5/11; background: var(--bg-elev-2); border: none; display: block; }

    /* MOTION */
    .rise { opacity: 0; transform: translateY(26px); animation: rise .9s cubic-bezier(.2,.65,.3,1) forwards; }
    @keyframes rise { to { opacity: 1; transform: none; } }
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity .75s ease, transform .75s cubic-bezier(.2,.65,.3,1); }
    .reveal-in { opacity: 1; transform: none; }

    /* LIGHT SECTIONS — cream background, green accent */
    .light {
      --ink: #16120d;
      --ink-2: #4b453c;
      --ink-3: #8b8173;
      --bg: #f3eee4;
      --bg-elev: #ffffff;
      --bg-elev-2: #faf6ee;
      --line: rgba(20, 15, 10, 0.12);
      --line-strong: rgba(20, 15, 10, 0.24);
      --accent: var(--green-deep);
      --accent-2: #0fb374;
      --accent-soft: var(--green-soft);
      --accent-line: var(--green-line);
      background: var(--bg);
      color: var(--ink);
    }

    /* AVAILABILITY PILL */
    .avail { display: flex; width: fit-content; align-items: center; gap: 9px; margin-top: 18px; font-family: var(--font-mono); font-size: 12.5px; letter-spacing: .04em; text-transform: uppercase; color: var(--green-bright); background: var(--green-soft); border: 1px solid var(--green-line); border-radius: 999px; padding: 8px 15px; }
    .avail-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green-bright); box-shadow: 0 0 0 0 rgba(62, 224, 160, .55); animation: pulse 2.4s infinite; }
    @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(62,224,160,.5); } 70% { box-shadow: 0 0 0 7px rgba(62,224,160,0); } 100% { box-shadow: 0 0 0 0 rgba(62,224,160,0); } }

    /* FLOATING BADGE */
    .float-badge { position: fixed; bottom: 22px; right: 22px; z-index: 55; width: 104px; height: 104px; display: inline-flex; align-items: center; justify-content: center; background: transparent; border: none; border-radius: 50%; cursor: pointer; padding: 0; animation: fadepop .4s ease both; }
    .float-badge .stamp text { fill: var(--orange); font-size: 16.5px; letter-spacing: 1.5px; }
    .float-badge .stamp-core { stroke: var(--orange-line); }
    .float-badge .stamp-icon { color: var(--orange); }
    .float-badge:hover .stamp-icon { color: var(--orange-2); }
    @keyframes fadepop { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: scale(1); } }

    /* RESPONSIVE */
    @media (min-width: 720px) {
      .grid-2 { grid-template-columns: 1fr 1fr; }
      .stats { grid-template-columns: repeat(4, 1fr); }
      .about-grid { grid-template-columns: 300px 1fr; gap: 56px; }
      .skill-block { grid-template-columns: 200px 1fr; align-items: start; }
      .contact-grid { grid-template-columns: 1.3fr 1fr; }
      .exp-feat-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 960px) {
      .grid-3 { grid-template-columns: repeat(3, 1fr); }
      .exp-row { grid-template-columns: 80px 1fr; }
    }
    @media (min-width: 1080px) {
      .nav-links { display: flex; }
      .menu-btn { display: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      .rise, .reveal { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
      .marquee-track, .stamp-rotate, .spin-slow, .float-badge { animation: none !important; }
      .magnetic { transition: none !important; }
      .stamp-parallax, .orbit-1, .orbit-2 { transform: none !important; }
    }
  `}</style>
);

export default Portfolio;

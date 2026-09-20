import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Download, Mail, Phone, Linkedin, Github, ArrowUpRight,
  X, FileText, Menu, MapPin,
} from 'lucide-react';
import HydrowCaseStudy from './HydrowCaseStudy.jsx';
import CareNexusCaseStudy from './CareNexusCaseStudy.jsx';
import MaseCaseStudy from './MaseCaseStudy.jsx';
import StylesClassic from './styles/StylesClassic.jsx';
import StylesWarm from './styles/StylesWarm.jsx';

/* ------------------------------------------------------------------ data --- */

const stats = [
  { value: '3', unit: '', label: 'Years of experience' },
  { value: '2', unit: '', label: 'Open-source projects' },
  { value: '2', unit: '', label: 'Research experiences' },
  { value: '3.86', unit: '', label: 'GPA · MS in CS' },
];

const experience = [
  {
    title: 'Software Engineer Intern',
    company: 'Hydrow',
    period: 'Jan 2026 – Aug 2026',
    location: 'Boston, MA',
    caseStudy: 'hydrow',
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'Kubernetes'],
    lead: 'Designed and shipped the backend behind strength progress, gamification, content delivery, home-screen tiles and A/B experiments — 59 PRs across 7 product areas, every query profiled at production scale.',
    summary: [
      'Kept every user-facing endpoint under 25 ms at production scale for several product features end-to-end — schema, APIs, tests, and rollout — including the strength-fitness app’s progress graphs.',
      'Cut a real-time badge eligibility check from ~2,000 ms to near-zero and an event-loop-blocking graph computation to 0.7 ms by pushing data-heavy work into SQL with materialized views and Redis caching.',
      'Restored data correctness across ~123K historical records via a bounded, dry-run-verified backfill migration, and kept large-table reads scale-safe with cursor-based pagination.',
      'Built an AI-assisted development workflow on Claude Code that automates the coding, testing, and self-review stages of the SDLC while keeping me in the loop for planning and final review, backed by a persistent knowledge base of accumulated review standards.',
      'Eliminated dead-end workout recommendations across all equipment and difficulty combinations by building a multi-pass SQL pipeline that relaxes constraints stepwise until it returns a viable workout.',
      'Reduced new-badge rollout from a coordinated frontend + backend change to backend-only across 21 badge types by shipping a schema-driven API that generates admin forms from validation schemas, plus 5+ real-time badge checkers.',
      'Enabled per-segment content delivery without redeploys by designing a pluggable A/B framework with a master/leaf tile mechanism targeted on churn score and behavioral segment.',
    ],
    contrib: '/hydrow/contribution-graph.png',
    contribAlt: 'GitHub profile — 160 contributions, 59 PRs, 56 merged',
    recommendations: [
      {
        quote:
          'I had the opportunity to work with and supervise Manas during his co-op at Hydrow. He quickly integrated with the backend team and was always looking for ways to improve both himself and the team around him.\n\nManas is a very capable engineer who can take on complex assignments and work through them successfully. He has a strong attention to detail in his approach to implementation and responds well to feedback. He also made great use of AI tools, building useful Claude skills to speed up development and sharing them with the rest of the team.\n\nHe’s a great teammate who is curious, collaborative, and always looking for ways to contribute. I’m confident he’ll be a valuable asset to any engineering team, and I’d be happy to work with him again.',
        name: 'Yulia Wijata',
        role: 'Hydrownaut · Hydrow',
        relation: 'Managed Manas directly · Aug 2026',
        link: 'https://www.linkedin.com/in/manasaggrawal07/details/recommendations/',
      },
    ],
  },
  {
    title: 'Product Engineer & Scrum Master',
    company: 'canAssist × Northeastern University',
    period: 'May 2026 – Aug 2026',
    location: 'Boston, MA',
    caseStudy: 'carenexus',
    stack: ['NestJS', 'PostgreSQL', 'Redis', 'OpenTelemetry'],
    lead: 'Product engineer and Scrum Master on CareNexus — a mobile platform helping families navigating dementia discover and vouch for local care resources around Victoria, BC. I owned the care-api backend outright, drove architecture and API design across all three repos, ran sprint ceremonies for a five-person team, and was the primary client contact through the August 2026 handoff that transferred GitHub and AWS ownership to the client.',
    summary: [
      'Built the care-api backend on NestJS 11, Prisma 7 and PostgreSQL 17 with PostGIS 3.5 — hand-writing every migration, because the geography(Point, 4326) columns and their GIST/GIN indexes are invisible to Prisma’s schema and a generated diff would silently drop them.',
      'Shipped one unified nearest-first search behind every search box — opaque keyset cursors that carry their own sort mode, an id tiebreaker for genuinely equidistant places, and coordinate-less rows kept and sorted last instead of dropped.',
      'Built two authentication ladders on stateless JWTs — passwordless magic links plus Apple/Google for members, password and TOTP 2FA for admins — with single-use hashed tokens and a three-hop redirect that keeps the token out of access logs and browser history.',
      'Kept image bytes out of the API entirely using per-file presigned S3 POST policies, so a content-length-range condition rejects an oversize upload at S3 before any bytes land, with a nightly sweep reclaiming orphaned objects.',
    ],
    recommendations: [
      {
        quote:
          'I was fortunate to work with Manas on a software development project. He was extremely professional, demonstrated excellent communication skills and met each expected project milestone on time. He was also very open to feedback, especially as it related to accessibility needs of clients. At the end of the project, he took extra steps beyond what was expected to make sure that everything was organized and ready to take to the next step.',
        name: 'Jodie Gawryluk',
        role: 'Associate Professor · University of Victoria',
        relation: 'Manas’s client · Sep 2026',
        link: 'https://www.linkedin.com/in/manasaggrawal07/details/recommendations/',
      },
    ],
  },
  {
    title: 'Forward Deployed Engineer',
    company: 'Studio Graphene',
    period: 'Nov 2020 – Jul 2024',
    location: 'Gurgaon, India',
    stack: ['Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Elasticsearch'],
    lead: 'Owned backend across multiple client products, mentored junior engineers, drove standups and releases, and collaborated within cross-functional delivery teams.',
    summary: [
      'Boosted engineering velocity 23% by building a serverless analytics platform on AWS Lambda that pinpointed PR wait times, build failures, and blocked dependencies',
      'Served 2M+ daily requests against a 500GB+ catalog by designing a Node.js/TypeScript REST backend with PostgreSQL partitioning/indexing and real-time cross-region inventory sync',
      'Reduced response latency ~40% by moving ingestion and processing to event-driven microservices on AWS SQS',
    ],
    recommendations: [
      {
        quote:
          'I got to work with Manas at Studio Graphene on an internal project called PULSE, and honestly, he’s one of those people you’re just glad to have on your team. Super skilled, super reliable, and always ready to jump in and help out.\n\nWe often found ourselves discussing different tech stacks, and I was always impressed by how much he knew and how eager he was to learn more. He had this great mix of confidence and curiosity. He never hesitated to share what he knew, but he also listened, asked questions, and made space for others.\n\nPeople genuinely enjoyed working with him. He was respected not just for his technical skills but also for how grounded and supportive he was. It’s no surprise he was in high demand within the team.\n\nWherever Manas goes next, I know he’s going to do great. Any team would be lucky to have him.',
        name: 'Sumit Kumar',
        role: 'Frontend Engineer · Studio Graphene',
        relation: 'Manas was senior to Sumit · Aug 2025',
        link: 'https://www.linkedin.com/in/manasaggrawal07/details/recommendations/',
      },
      {
        quote:
          'I’ve had the pleasure of working with Manas on multiple projects at Studio Graphene, and I can confidently say that he is an exceptional software engineer. His expertise in NodeJS, PHP Laravel, and AWS is evident in the quality of his work.\n\nManas is a young talent with a remarkable ability to learn new technologies quickly. He is dedicated and hardworking, consistently going above and beyond to deliver high-quality results. What sets him apart is his passion for self-learning; he’s always eager to dive into new challenges and emerge with a strong understanding of the latest tech.\n\nManas is not only technically proficient but also a reliable and proactive team member. I highly recommend him and undoubtedly, he would be a valuable asset to any team.',
        name: 'Rajesh Mishra',
        role: 'Lead Engineer · Studio Graphene',
        relation: 'Was senior to Manas · Aug 2024',
        link: 'https://www.linkedin.com/in/manasaggrawal07/details/recommendations/',
      },
      {
        quote:
          'I’ve been working with Manas on a project for more that a year. I was leading a Frontend team, and he was that reliable backend guy, that always open for communication. Create endpoint, explain it if needed, fix a bug in no time, repeat.\n\nIt was one of the great periods, when every team member, was on the right place. Team of ten, was delivering in complete synergy.\n\nManas knows his job very well and he will be a valuable asset to any team.',
        name: 'Pavlo Omelianchuk',
        role: 'Frontend Lead · Studio Graphene',
        relation: 'Was senior to Manas · Aug 2024',
        link: 'https://www.linkedin.com/in/manasaggrawal07/details/recommendations/',
      },
      {
        quote:
          'I had the pleasure of working with Manas on the Pulse project at StudioGraphene. As a software engineer, Manas consistently demonstrated exceptional technical skills, a strong work ethic, and a collaborative spirit that made him an invaluable asset to our team.\n\nOne of Manas’s standout qualities is his ability to quickly pick up tasks and complete them efficiently. During the Pulse project, which was a serverless initiative, his agility in understanding requirements and delivering results in a timely manner was truly impressive. This capability ensured that our project stayed on track and often exceeded expectations.\n\nManas’s expertise in serverless architecture and related technologies was instrumental in the success of the Pulse project. His contributions included not only delivering high-quality code but also finding and resolving the existing edge cases in the system.\n\nBeyond his technical prowess, Manas is a fantastic team player. He consistently communicated effectively, shared knowledge generously. His positive attitude and willingness to go the extra mile fostered a collaborative and productive work environment.\n\nI highly recommend Manas for any software engineering role. His technical skills, dedication, and particularly his knack for quickly mastering and completing tasks make him an exceptional candidate who will undoubtedly excel in any future endeavors.',
        name: 'Narendra Vishwakarma',
        role: 'Lead Engineer · Studio Graphene',
        relation: 'Was senior to Manas · Aug 2024',
        link: 'https://www.linkedin.com/in/manasaggrawal07/details/recommendations/',
      },
      {
        quote:
          'I had the pleasure of working with Manas during our Python Django project. He consistently showed a passion for delivering the most efficient solutions. Manas approaches every task with great attention to detail, ensuring that the end product is secure and scalable for future development.\n\nManas excels in creating a collaborative environment, making sure his colleagues are on the same page in understanding and delivery. He is dedicated to both personal and professional growth, sharing his knowledge and offering guidance.\n\nHis technical expertise and strong interpersonal skills make him a valuable asset to any team. Manas’s enthusiasm for technology and innovation is inspiring. I highly recommend him for any tech project, confident that he will exceed expectations and contribute significantly to its success.',
        name: 'Harish',
        role: 'Software Engineer · Studio Graphene',
        relation: 'Worked with Manas on the same team · Aug 2024',
        link: 'https://www.linkedin.com/in/manasaggrawal07/details/recommendations/',
      },
    ],
  },
];

const openSourceProjects = [
  {
    name: 'Node.js Observability Toolkit',
    tech: 'Node.js · TypeScript · OpenTelemetry · AWS X-Ray · CloudWatch · Jaeger · Prometheus',
    description:
      'A published vendor-agnostic OpenTelemetry package for Node.js / NestJS / Express. Pluggable presets for AWS X-Ray + CloudWatch, Honeycomb, Jaeger / Tempo, or any OTLP-native backend. Ships traces, metrics, and logs through a single sidecar collector with cost-mindful defaults.',
    stat: '1500', statLabel: 'downloads', stat2: null,
    link: 'https://www.npmjs.com/package/nodejs-observability',
  },
  {
    name: 'NestJS Backend Boilerplate',
    tech: 'Node.js · TypeScript · NestJS · Prisma · Docker · Zod · Biome · Winston',
    description:
      'A production-ready backend boilerplate with JWT auth, RBAC, validation, structured logging, Prisma ORM, Docker, and Swagger/OpenAPI specs pre-configured — the starting point for real projects.',
    stat: '51', statLabel: 'stars', stat2: '11', stat2Label: 'forks',
    link: 'https://github.com/manas-aggrawal/nestjs-boilerplate',
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
    gpa: '3.86 / 4.0',
    coursework:
      'Algorithms, Software Design Patterns, Principles of Programming Languages, Mobile App Development, Web Development',
    roles: [
      { title: 'Graduate Research', description: 'Researching multi-agent LLM architectures for end-to-end SDLC automation. Previously Research Apprentice on "Typed Conversational Interfaces" under Prof. Chris Martens (accepted at Plateau’26).' },
      { title: 'Graduate Teaching Assistant', description: 'TA for Fundamentals of Software Engineering (CS 4530) across 4 consecutive terms.' },
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

const sections = [
  { id: 'home', label: 'Home', primary: true },
  { id: 'experience', label: 'Experience', primary: true },
  { id: 'opensource', label: 'Open Source', primary: true },
  { id: 'research', label: 'Research', primary: true },
  { id: 'education', label: 'Education', primary: true },
  { id: 'writing', label: 'Writing', primary: true },
  { id: 'skills', label: 'Skills', primary: true },
];

const socials = [
  { href: 'https://www.linkedin.com/in/manasaggrawal07/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://github.com/manas-aggrawal', icon: Github, label: 'GitHub' },
  { href: 'https://medium.com/@manasagg7199', icon: FileText, label: 'Medium' },
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

const Kicker = ({ children }) => <span className="kicker">{children}</span>;

// How many recommendations a role shows before the "+N more" expander kicks in.
const REC_PREVIEW_COUNT = 2;

// A single recommendation. Multi-paragraph quotes collapse to their first
// paragraph behind a "Read more" toggle so long roles stay scannable.
const Recommendation = ({ rec }) => {
  const [open, setOpen] = useState(false);
  const paras = rec.quote.split('\n\n');
  const isLong = paras.length > 1;
  const shown = open || !isLong ? rec.quote : paras[0];

  return (
    <figure className="rec">
      <blockquote className="rec-quote">{shown}</blockquote>
      {isLong && (
        <button className="rec-more" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
      <figcaption className="rec-by">
        <span className="rec-name">{rec.name}</span>
        <span className="rec-role">{rec.role}</span>
        {rec.relation && <span className="rec-rel">{rec.relation}</span>}
        {rec.link && (
          <a className="rec-link" href={rec.link} target="_blank" rel="noopener noreferrer">
            View on LinkedIn <ArrowUpRight className="w-3 h-3" />
          </a>
        )}
      </figcaption>
    </figure>
  );
};

// LinkedIn recommendations for a single role — rendered inline at the bottom of
// its experience block. Renders nothing when the role has no recommendations.
const Recommendations = ({ items }) => {
  const [showAll, setShowAll] = useState(false);
  if (!items || items.length === 0) return null;

  const hidden = items.length - REC_PREVIEW_COUNT;
  const visible = showAll || hidden <= 0 ? items : items.slice(0, REC_PREVIEW_COUNT);

  return (
    <div className="rec-list">
      <div className="rec-head">
        <Linkedin className="w-4 h-4" />
        <span>{items.length > 1 ? `LinkedIn recommendations (${items.length})` : 'LinkedIn recommendation'}</span>
      </div>
      {visible.map((r, i) => <Recommendation key={i} rec={r} />)}
      {hidden > 0 && (
        <button className="rec-expand" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
          {showAll ? 'Show fewer recommendations' : `+${hidden} more recommendation${hidden > 1 ? 's' : ''}`}
        </button>
      )}
    </div>
  );
};

const SectionHead = ({ n, kicker, title }) => (
  <div className="sec-head reveal">
    <Kicker>{n} — {kicker}</Kicker>
    <h2 className="sec-title">{title}<span className="ast"> ✳</span></h2>
  </div>
);

/* ------------------------------------------------------------------- app --- */

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showTranscript, setShowTranscript] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState('home'); // 'home' | 'hydrow' | 'carenexus'
  const [caseTarget, setCaseTarget] = useState(null); // feature-section id to scroll to
  // Theme experiment switch: ?theme=classic renders the original white/orange look.
  const theme = new URLSearchParams(window.location.search).get('theme') ?? 'warm';

  const openCaseStudy = useCallback((studyId, featureId = null) => {
    setCaseTarget(featureId);
    setView(studyId);
  }, []);

  // Switch the visible section (tabbed single-window layout — no page scroll).
  const goTo = useCallback((id) => {
    setMenuOpen(false);
    setActiveSection(id);
    // Reset the active pane's internal scroll to the top on switch.
    requestAnimationFrame(() => {
      document.querySelector('.pane.is-active')?.scrollTo({ top: 0 });
    });
  }, []);

  const primaryNav = sections.filter((s) => s.primary);
  const onLightSection = ['about', 'opensource', 'education', 'skills'].includes(activeSection);

  return (
    <div className="app">
      {theme === 'classic' ? <StylesClassic /> : <StylesWarm />}

      {/* NAV */}
      <header className="nav nav-solid">
        <div className="wrap nav-inner">
          <button className="brand" onClick={() => goTo('home')}>
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
              <a className="btn-outline sm nav-resume" href="/resume.pdf" download="Manas_Aggrawal_Resume.pdf">
                <Download className="w-4 h-4" /> <span className="nav-resume-label">Résumé</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="mailto:aggrawal.m@northeastern.edu" className="btn btn-sm">
                Get in touch <ArrowUpRight className="w-4 h-4" />
              </a>
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

      <main className="stage">

      {/* HOME (intro + about combined) */}
      <section id="home" className={`hero pane ${activeSection === 'home' ? 'is-active' : ''}`}>
        <div className="wrap hero-inner">
          <div className="home-top">
            <div className="home-intro">
              <h1 className="hero-title">
                <span className="rise" style={{ animationDelay: '.12s' }}>MANAS</span>
                <span className="rise line-2" style={{ animationDelay: '.2s' }}>AGGRAWAL<span className="ast">✳</span></span>
              </h1>
              <p className="kicker rise" style={{ animationDelay: '.22s' }}>Software Engineer · Boston, MA</p>
              <p className="kicker rise" style={{ animationDelay: '.22s' }}>MSCS · Northeastern University (Dec'26)· Boston, MA</p>
              <p className="hero-sub rise" style={{ animationDelay: '.3s' }}>
                In the age of agentic AI, I've moved past just writing code — 
                I focus on the engineering bits during planning and final reviewing stage while 
                AI does the menial tasks for me like writing code, and writing/running tests.
              </p>
            </div>
            <div className="about-photo reveal">
              <div className="photo-frame">
                <img src="/profile.png" alt="Manas Aggrawal" style={{ objectPosition: '50% 12%' }} />
                <span className="corner corner-tl" />
                <span className="corner corner-br" />
              </div>
              <div className="photo-meta">
                <div className="avail rise" style={{ animationDelay: '.26s' }}>
                  <span className="avail-dot" /> Open to full-time SWE roles · January 2027
                </div>
                <div className="hero-cta rise" style={{ animationDelay: '.4s' }}>
                  <Magnetic>
                    <a className="btn" href="/resume.pdf" download="Manas_Aggrawal_Resume.pdf">
                      <Download className="w-4 h-4" /> Download Résumé
                    </a>
                  </Magnetic>
                </div>
                <div className="photo-contact rise" style={{ animationDelay: '.45s' }}>
                  <a className="pc-email" href="mailto:aggrawal.m@northeastern.edu">
                    <Mail className="w-4 h-4" /> aggrawal.m@northeastern.edu
                  </a>
                  <div className="pc-meta">
                    <a className="pc-tel" href="tel:+18572651533"><Phone className="inline w-4 h-4" /> (857) 265-1533</a>
                    <span><MapPin className="inline w-4 h-4" /> Boston, MA</span>
                  </div>
                  <div className="pc-socials">
                    {socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="soc">
                        <s.icon className="w-4 h-4" /> {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="home-about">
            <div className="stats reveal">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <div className="stat-num">{s.value}<span className="u">{s.unit}</span></div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className={`section pane ${activeSection === 'experience' ? 'is-active' : ''}`}>
        <div className="wrap">
          <SectionHead n="(02)" kicker="Experience" title="Where I've built" />
          <div className="exp-list">
            {experience.map((job, idx) => {
              return job.caseStudy ? (
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
                    <p className="exp-flagship-lead">{job.lead}</p>
                    {job.summary && (
                      <ul className="hl-list">
                        {job.summary.map((h, i) => (<li key={i}><span className="li-mark">→</span>{h}</li>))}
                      </ul>
                    )}
                    <div className="tags">{job.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>

                    {job.contrib && (
                      <a
                        className="exp-contrib"
                        onClick={() => openCaseStudy(job.caseStudy)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter') openCaseStudy(job.caseStudy); }}
                      >
                        <img src={job.contrib} alt={job.contribAlt} />
                      </a>
                    )}

                    <button className="btn-outline sm" onClick={() => openCaseStudy(job.caseStudy)}>
                      Open the full deep-dive <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <Recommendations items={job.recommendations} />
                  </div>
                </div>
              ) : (
                <div key={idx} className="exp-row reveal">
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
                    {job.lead && <p className="exp-flagship-lead">{job.lead}</p>}
                    {job.summary && (
                      <ul className="hl-list">
                        {job.summary.map((h, i) => (<li key={i}><span className="li-mark">→</span>{h}</li>))}
                      </ul>
                    )}
                    <div className="tags">{job.stack.map((t) => <span key={t} className="tag">{t}</span>)}</div>

                    <Recommendations items={job.recommendations} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPEN SOURCE */}
      <section id="opensource" className={`section light pane ${activeSection === 'opensource' ? 'is-active' : ''}`}>
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
      <section id="research" className={`section pane ${activeSection === 'research' ? 'is-active' : ''}`}>
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
      <section id="education" className={`section light pane ${activeSection === 'education' ? 'is-active' : ''}`}>
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
      <section id="writing" className={`section pane ${activeSection === 'writing' ? 'is-active' : ''}`}>
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
      <section id="skills" className={`section light pane ${activeSection === 'skills' ? 'is-active' : ''}`}>
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

      </main>


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

export default Portfolio;

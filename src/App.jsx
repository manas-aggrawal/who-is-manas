import React, { useState } from 'react';
import {
  Download, Mail, Phone, Linkedin, Github, Code2, Database, Cloud, Terminal,
  X, Book, Package, Briefcase, FolderGit2, GraduationCap, Menu, BookOpen,
  GitBranch, MapPin, ArrowUpRight, User, Server, FileText, Layers,
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTranscript, setShowTranscript] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionChange = (section) => {
    if (section === activeSection) return;
    setIsTransitioning(true);
    setTimeout(() => setActiveSection(section), 160);
    setTimeout(() => setIsTransitioning(false), 320);
  };

  const navItems = [
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'opensource', label: 'Open Source', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'research', label: 'Research', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'articles', label: 'Writing', icon: <Book className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const sectionMeta = navItems.reduce((acc, item, i) => {
    acc[item.id] = String(i + 1).padStart(2, '0');
    return acc;
  }, {});

  const experience = [
    {
      title: 'Software Engineer Intern',
      company: 'Hydrow',
      period: 'Jan 2026 – Present',
      location: 'Boston, MA',
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
        {
          title: 'Graduate Research',
          description:
            'Researching multi-agent LLM architectures for end-to-end SDLC automation, evaluating trade-offs across accuracy and cost efficiency. Previously Research Apprentice on "Typed Conversational Interfaces" under Prof. Chris Martens (accepted at Plateau’25).',
        },
        {
          title: 'Graduate Teaching Assistant',
          description:
            'TA for Fundamentals of Software Engineering (CS 4530) across 3 consecutive terms.',
        },
      ],
      hasTranscript: true,
      transcriptFile: '/transcript-grad.pdf',
    },
    {
      school: 'Guru Gobind Singh Indraprastha University',
      degree: 'Bachelor of Technology, Computer Science Engineering',
      period: 'Aug 2016 – Sep 2020',
      location: 'Delhi, India',
      coursework:
        'Data Structures, Networking, Operating Systems, Object-Oriented Design, Machine Learning',
      roles: [],
      hasTranscript: true,
      transcriptFile: '/transcript-undergrad.pdf',
    },
  ];

  const openSourceProjects = [
    {
      name: 'NestJS Backend Boilerplate',
      tech: 'Node.js · TypeScript · NestJS · Prisma · Docker · Zod · Biome · Winston',
      description:
        'A production-ready backend boilerplate with JWT auth, RBAC, validation, structured logging, Prisma ORM, Docker, and Swagger/OpenAPI specs pre-configured — the starting point for real projects.',
      stat: '51',
      statLabel: 'stars',
      stat2: '11',
      stat2Label: 'forks',
      link: 'https://github.com/manas-aggrawal/nestjs-boilerplate',
      icon: <Terminal className="w-5 h-5" />,
    },
    {
      name: 'Telemetry npm Package',
      tech: 'Node.js · TypeScript · OpenTelemetry · AWS X-Ray · CloudWatch · Jaeger · Prometheus',
      description:
        'A published npm package enabling end-to-end distributed tracing across APIs, DB queries, and async tasks — reducing mean debugging time by ~60% in backend services.',
      stat: '1,000+',
      statLabel: 'downloads',
      link: 'https://www.npmjs.com/package/nodejs-observability',
      icon: <Package className="w-5 h-5" />,
    },
  ];

  const projects = [
    {
      name: 'Advanced Image Processor',
      tech: 'Java · Swing · Design Patterns',
      description:
        'Extensible image-processing app built on SOLID principles, supporting 10+ operations.',
      icon: <Layers className="w-5 h-5" />,
      details:
        'A sophisticated image-processing application showcasing MVC, Strategy, Factory, and Command patterns. Implements blurring, sharpening, flips, RGB splitting, grayscale transforms (value, luma, intensity), histogram generation, color correction, and level adjustment.',
      link: 'https://github.com/manas-aggrawal/Advanced-Image-Manipulation-and-Enhancement-Tool',
    },
    {
      name: 'Toy Compiler',
      tech: 'Racket · Parser · AST',
      description:
        'A compiler for a minimal functional programming language (CS5400).',
      icon: <Code2 className="w-5 h-5" />,
      details:
        'A minimalist functional language supporting first-class functions with lexical scoping, local bindings, conditionals, and closures — parser, AST, and evaluator built from scratch.',
      link: 'https://github.com/manas-aggrawal/Toy-Compiler',
    },
    {
      name: 'Personal Finance App',
      tech: 'Android · Kotlin · Firebase · Room',
      description:
        'Student budgeting app with expense tracking and real-time alerts.',
      icon: <FileText className="w-5 h-5" />,
      details:
        'A full-featured Android app with MVVM architecture, offline-first functionality, Firebase sync, photo receipts, budget alerts, and MPAndroidChart visualizations.',
      link: '#',
    },
  ];

  const articles = [
    {
      title: 'Five Stages to Scalable: My System Design Journey',
      description:
        'From monolith to microservices — architecture decisions, performance optimization, and lessons from production systems.',
      link: 'https://medium.com/@manasagg7199/five-stages-to-scalable-my-system-design-journey-a556b2b43446',
      category: 'System Design',
    },
    {
      title: 'Async/Await: Asynchronous Programming in Node.js',
      description: 'A practical breakdown of the async model that powers Node.js backends.',
      link: 'https://medium.com/@manasagg7199/async-await-asynchronous-programming-in-node-js-6367db22c6dd',
      category: 'Node.js',
    },
    {
      title: 'Types and Programming Languages: An Introduction',
      description: 'An accessible entry into type systems and why they matter.',
      link: 'https://medium.com/@manasagg7199/types-and-programming-languages-an-introduction-40d1b7650929',
      category: 'Programming Languages',
    },
    {
      title: 'Node.js APM with AWS Distro for OpenTelemetry & X-Ray',
      description: 'Setting up application performance monitoring for Node.js services.',
      link: 'https://medium.com/@manasagg7199/intro-to-node-js-apm-using-aws-distro-for-opentelemetry-and-aws-x-ray-ee5b169a381d',
      category: 'Observability',
    },
  ];

  const research = [
    {
      title: 'Multi-Agent LLM Architectures for SDLC Automation',
      role: 'Graduate Researcher',
      institution: 'Northeastern University',
      period: '2026 – Present',
      status: 'Ongoing',
      description:
        'Investigating multi-agent LLM architectures for automating the software development lifecycle end-to-end — evaluating and comparing designs across accuracy and cost efficiency to understand where agentic systems can reliably replace or augment human workflows.',
    },
    {
      title: 'Typed Conversational Interfaces',
      role: 'Research Apprentice · Prof. Chris Martens',
      institution: 'Northeastern University',
      period: 'Sep 2024 – Jan 2025',
      status: 'Accepted at Plateau’25',
      description:
        'Formalized a domain-specific language — closer to natural language — with a type system that prevents invalid states and guarantees reliable behavior, aiming to reduce chatbots’ dependency on LLMs for user queries. The work was accepted at Plateau’25.',
    },
  ];

  const skills = {
    Languages: ['JavaScript', 'TypeScript', 'Java', 'C++', 'Python'],
    Frameworks: ['Node.js', 'Express.js', 'NestJS', 'Django', 'Laravel', 'React'],
    Databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Elasticsearch', 'DynamoDB', 'Redis', 'Firebase'],
    'Cloud & DevOps': ['AWS Lambda', 'S3', 'SQS / DLQ', 'X-Ray', 'ECS', 'Docker', 'CI/CD', 'Kubernetes'],
    Practices: ['REST APIs', 'Distributed Systems', 'Web Architecture', 'OpenTelemetry', 'Agile', 'SDLC'],
  };

  const skillIcon = (category) => {
    if (category === 'Languages') return <Code2 className="w-4 h-4" />;
    if (category === 'Databases') return <Database className="w-4 h-4" />;
    if (category === 'Cloud & DevOps') return <Cloud className="w-4 h-4" />;
    if (category === 'Frameworks') return <Server className="w-4 h-4" />;
    return <Terminal className="w-4 h-4" />;
  };

  const SectionHeader = ({ id, title, subtitle }) => (
    <div className="mb-8">
      <div className="kicker mb-2">
        <span className="text-[var(--accent)]">{sectionMeta[id]}</span>
        <span className="text-[var(--text-3)]">/</span>
        <span>{navItems.find((n) => n.id === id)?.label}</span>
      </div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text)]">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-[var(--text-2)] max-w-2xl">{subtitle}</p>}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div>
            <SectionHeader id="about" title="About" />
            <div className="card p-6 lg:p-8">
              <p className="text-lg lg:text-xl text-[var(--text)] leading-relaxed mb-6">
                Backend software engineer with{' '}
                <span className="text-[var(--accent)] font-semibold">3.5+ years</span>{' '}
                building scalable APIs, distributed systems, and cloud infrastructure —
                currently interning at Hydrow while finishing my MS in Computer Science at
                Northeastern.
              </p>
              <ul className="space-y-4">
                {[
                  'Software Engineer Intern at Hydrow, building performant data APIs and safe concurrency primitives on a containerized backend.',
                  'Forward Deployed Engineer & Scrum Master on a Northeastern research capstone (canAssist) — owning both the backend and the client relationship.',
                  'Shipped production backends processing 2M+ requests/day, event-driven microservices, and observability tooling used across teams.',
                  'MS CS @ Northeastern (GPA 3.83) — Graduate TA for Software Engineering, and researcher in PL and multi-agent LLM systems.',
                ].map((point, i) => (
                  <li key={i} className="bullet">
                    <span className="bullet-mark">→</span>
                    <span className="text-[var(--text-2)]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div>
            <SectionHeader id="experience" title="Experience" />
            <div className="space-y-5">
              {experience.map((job, idx) => (
                <div key={idx} className="card p-6 lg:p-7">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <div>
                      <h3 className="text-lg lg:text-xl font-semibold text-[var(--text)]">
                        {job.title}
                      </h3>
                      <p className="text-[var(--accent)] font-medium">{job.company}</p>
                    </div>
                    <div className="meta text-left sm:text-right shrink-0">
                      <div>{job.period}</div>
                      <div className="text-[var(--text-3)]">{job.location}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.stack.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <ul className="space-y-2.5 mb-4">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="bullet">
                        <span className="bullet-mark">→</span>
                        <span className="text-[var(--text-2)] text-sm leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setSelectedItem(job)} className="link-accent">
                    Read more <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div>
            <SectionHeader id="education" title="Education" />
            <div className="space-y-5">
              {education.map((edu, idx) => (
                <div key={idx} className="card p-6 lg:p-7">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-lg lg:text-xl font-semibold text-[var(--text)]">
                        {edu.school}
                      </h3>
                      <p className="text-[var(--text-2)]">{edu.degree}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        {edu.gpa && (
                          <span className="meta text-[var(--accent)]">GPA {edu.gpa}</span>
                        )}
                        {edu.status && (
                          <span className="chip-live text-[var(--text-2)]">{edu.status}</span>
                        )}
                      </div>
                    </div>
                    <div className="meta text-left sm:text-right shrink-0">
                      <div>{edu.period}</div>
                      <div className="text-[var(--text-3)]">{edu.location}</div>
                    </div>
                  </div>

                  {edu.hasTranscript && (
                    <button
                      onClick={() => setShowTranscript(edu.transcriptFile)}
                      className="btn-ghost mb-5"
                    >
                      <FileText className="w-4 h-4" /> View Transcript
                    </button>
                  )}

                  <div className="space-y-4">
                    <div>
                      <div className="label mb-1.5">Relevant Coursework</div>
                      <p className="text-[var(--text-2)] text-sm">{edu.coursework}</p>
                    </div>
                    {edu.roles.map((role, i) => (
                      <div key={i}>
                        <div className="label mb-1.5">{role.title}</div>
                        <p className="text-[var(--text-2)] text-sm">{role.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'opensource':
        return (
          <div>
            <SectionHeader
              id="opensource"
              title="Open Source"
              subtitle="Tools I built, published, and maintain — now running in real projects, including my own."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {openSourceProjects.map((proj, idx) => (
                <a
                  key={idx}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-interactive p-6 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="icon-box">{proj.icon}</div>
                    <ArrowUpRight className="w-5 h-5 text-[var(--text-3)] group-hover:text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-1">{proj.name}</h3>
                  <p className="mono-xs text-[var(--text-3)] mb-3">{proj.tech}</p>
                  <p className="text-sm text-[var(--text-2)] mb-5 flex-1">{proj.description}</p>
                  <div className="flex gap-6 pt-4 border-t border-[var(--border)]">
                    <div>
                      <div className="stat">{proj.stat}</div>
                      <div className="stat-label">{proj.statLabel}</div>
                    </div>
                    {proj.stat2 && (
                      <div>
                        <div className="stat">{proj.stat2}</div>
                        <div className="stat-label">{proj.stat2Label}</div>
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div>
            <SectionHeader id="projects" title="Projects" subtitle="Selected academic and personal builds." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="card card-interactive p-6 cursor-pointer flex flex-col"
                  onClick={() => setSelectedItem(project)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="icon-box">{project.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-1">{project.name}</h3>
                  <p className="mono-xs text-[var(--text-3)] mb-3">{project.tech}</p>
                  <p className="text-sm text-[var(--text-2)] mb-4 flex-1">{project.description}</p>
                  <button className="link-accent">
                    Read more <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'research':
        return (
          <div>
            <SectionHeader id="research" title="Research" />
            <div className="space-y-5">
              {research.map((item, idx) => (
                <div key={idx} className="card p-6 lg:p-7">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <h3 className="text-lg lg:text-xl font-semibold text-[var(--text)]">
                      {item.title}
                    </h3>
                    <span className="chip-live shrink-0">{item.status}</span>
                  </div>
                  <p className="text-[var(--text-2)] text-sm mb-1">{item.role}</p>
                  <p className="meta mb-4">{item.institution} · {item.period}</p>
                  <p className="text-[var(--text-2)] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'articles':
        return (
          <div>
            <SectionHeader
              id="articles"
              title="Writing"
              subtitle="Technical writing on backend systems, architecture, and languages."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {articles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-interactive p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="tag">{article.category}</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-3)] group-hover:text-[var(--accent)]" />
                  </div>
                  <h3 className="text-base lg:text-lg font-semibold text-[var(--text)] mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[var(--text-2)] flex-1">{article.description}</p>
                  <span className="link-accent mt-4">Read on Medium <ArrowUpRight className="w-4 h-4" /></span>
                </a>
              ))}
            </div>
            <div className="card p-6 mt-5 text-center">
              <a
                href="https://medium.com/@manasagg7199"
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent justify-center"
              >
                View all writing on Medium <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div>
            <SectionHeader id="skills" title="Skills" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Object.entries(skills).map(([category, items], idx) => (
                <div key={idx} className="card p-6">
                  <h3 className="flex items-center gap-2 text-[var(--text)] font-semibold mb-4">
                    <span className="text-[var(--accent)]">{skillIcon(category)}</span>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span key={skill} className="tag tag-lg">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div>
            <SectionHeader
              id="contact"
              title="Get in touch"
              subtitle="Open to full-time software engineering roles starting January 2027. Happy to talk backend, systems, or infrastructure."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <a href="mailto:aggrawal.m@northeastern.edu" className="card card-interactive p-5 flex items-center gap-4">
                <div className="icon-box"><Mail className="w-5 h-5" /></div>
                <div className="min-w-0">
                  <div className="label">Email</div>
                  <div className="text-[var(--text)] truncate">aggrawal.m@northeastern.edu</div>
                </div>
              </a>
              <a href="tel:+18572651533" className="card card-interactive p-5 flex items-center gap-4">
                <div className="icon-box"><Phone className="w-5 h-5" /></div>
                <div>
                  <div className="label">Phone</div>
                  <div className="text-[var(--text)]">(857) 265-1533</div>
                </div>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { href: 'https://www.linkedin.com/in/manasaggrawal07/', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                { href: 'https://github.com/manas-aggrawal', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { href: 'https://medium.com/@manasagg7199', icon: <Book className="w-5 h-5" />, label: 'Medium' },
                { href: 'https://leetcode.com/u/aggrawal_manas/', icon: <Code2 className="w-5 h-5" />, label: 'LeetCode' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="card card-interactive p-5 flex flex-col items-center gap-2">
                  <span className="text-[var(--accent)]">{s.icon}</span>
                  <span className="text-sm text-[var(--text-2)]">{s.label}</span>
                </a>
              ))}
            </div>
            <p className="meta mt-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--accent)]" /> Based in Boston, MA
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[var(--bg)] text-[var(--text)] flex flex-col lg:flex-row">
      {/* Ambient background */}
      <div className="bg-layer" aria-hidden="true" />

      <style>{`
        .sidebar-bg {
          background: rgba(15, 17, 19, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .nav-bar {
          background: rgba(8, 9, 11, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .bg-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            radial-gradient(650px circle at 12% 8%, rgba(16,185,129,0.07), transparent 55%),
            radial-gradient(600px circle at 88% 100%, rgba(16,185,129,0.04), transparent 50%),
            radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 24px 24px;
        }

        .kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-2);
        }
        .label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-3);
        }
        .meta {
          font-family: var(--font-mono);
          font-size: 12.5px;
          color: var(--text-2);
          line-height: 1.7;
        }
        .mono-xs {
          font-family: var(--font-mono);
          font-size: 11.5px;
          line-height: 1.6;
        }

        .card {
          background: var(--bg-elev);
          border: 1px solid var(--border);
          border-radius: 14px;
          position: relative;
          z-index: 1;
          transition: border-color .2s ease, transform .2s ease, background .2s ease;
        }
        .card-interactive { cursor: pointer; }
        .card-interactive:hover {
          border-color: var(--border-strong);
          background: var(--bg-elev-2);
          transform: translateY(-2px);
        }
        a.card:hover, .card-interactive:hover { text-decoration: none; }

        .icon-box {
          display: inline-flex;
          padding: 10px;
          border-radius: 10px;
          background: var(--accent-soft);
          border: 1px solid var(--accent-line);
          color: var(--accent);
        }

        .bullet { display: flex; align-items: flex-start; gap: 10px; }
        .bullet-mark {
          font-family: var(--font-mono);
          color: var(--accent);
          flex-shrink: 0;
          line-height: 1.7;
        }

        .tag {
          font-family: var(--font-mono);
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 6px;
          background: var(--bg-elev-2);
          border: 1px solid var(--border);
          color: var(--text-2);
          white-space: nowrap;
        }
        .tag-lg { font-size: 12.5px; padding: 5px 11px; transition: border-color .2s, color .2s; }
        .tag-lg:hover { border-color: var(--accent-line); color: var(--text); }

        .stat {
          font-family: var(--font-mono);
          font-size: 22px;
          font-weight: 600;
          color: var(--accent);
          line-height: 1;
        }
        .stat-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-3);
          margin-top: 4px;
        }

        .link-accent {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          color: var(--accent);
          transition: gap .2s ease, color .2s ease;
        }
        .link-accent:hover { gap: 10px; color: var(--accent-strong); }

        .btn-accent {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 16px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          color: #06231a;
          background: var(--accent);
          border: 1px solid var(--accent-strong);
          transition: background .2s ease, transform .1s ease;
        }
        .btn-accent:hover { background: #4ade80; }
        .btn-accent:active { transform: translateY(1px); }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-2);
          background: var(--bg-elev-2);
          border: 1px solid var(--border);
          transition: border-color .2s, color .2s;
        }
        .btn-ghost:hover { border-color: var(--accent-line); color: var(--text); }

        .chip-live {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          padding: 3px 10px;
          border-radius: 999px;
          background: var(--accent-soft);
          border: 1px solid var(--accent-line);
          color: var(--accent);
          white-space: nowrap;
        }
        .chip-live::before {
          content: "";
          width: 6px; height: 6px;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 0 0 rgba(52,211,153,0.5);
          animation: pulse 2.4s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.45); }
          70% { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
          100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--text-2);
          border: 1px solid transparent;
          transition: color .18s, background .18s, border-color .18s;
        }
        .nav-link:hover { color: var(--text); background: var(--bg-elev); }
        .nav-link.active {
          color: var(--accent);
          background: var(--accent-soft);
          border-color: var(--accent-line);
        }

        .social-link {
          color: var(--text-3);
          transition: color .18s, transform .18s;
        }
        .social-link:hover { color: var(--accent); transform: translateY(-1px); }

        .fade-in { animation: fadeIn .35s ease both; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .001ms !important;
            transition-duration: .001ms !important;
          }
          .card-interactive:hover { transform: none; }
        }
      `}</style>

      {/* Sidebar */}
      <aside className="w-full lg:w-[320px] xl:w-[360px] shrink-0 sidebar-bg border-b lg:border-b-0 lg:border-r border-[var(--border)] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto relative z-10">
        <div className="p-6 lg:p-8 flex flex-col items-center text-center">
          <img
            src="/profile.png"
            alt="Manas Aggrawal"
            className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover mb-5 ring-1 ring-[var(--border-strong)]"
          />
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">Manas Aggrawal</h1>
          <p className="mono-xs text-[var(--accent)] mt-1.5 tracking-wide">
            Backend Software Engineer
          </p>
          <p className="text-sm text-[var(--text-3)] mt-1">
            Distributed Systems · APIs · Cloud
          </p>

          <div className="w-full mt-6 p-4 rounded-xl bg-[var(--bg-elev-2)] border border-[var(--border)] text-left">
            <div className="chip-live mb-3">Open to work</div>
            <p className="text-sm text-[var(--text-2)] leading-relaxed">
              Seeking <span className="text-[var(--text)] font-medium">full-time SWE roles</span> starting{' '}
              <span className="text-[var(--text)] font-medium">January 2027</span>.
            </p>
            <p className="mono-xs text-[var(--text-3)] mt-2">MS CS @ Northeastern · Expected Dec 2026</p>
          </div>

          <a
            href="/resume.pdf"
            download="Manas_Aggrawal_Resume.pdf"
            className="btn-accent w-full mt-5"
          >
            <Download className="w-4 h-4" /> Download Résumé
          </a>

          <div className="flex gap-5 mt-6">
            <a href="https://www.linkedin.com/in/manasaggrawal07/" target="_blank" rel="noopener noreferrer" className="social-link"><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com/manas-aggrawal" target="_blank" rel="noopener noreferrer" className="social-link"><Github className="w-5 h-5" /></a>
            <a href="mailto:aggrawal.m@northeastern.edu" className="social-link"><Mail className="w-5 h-5" /></a>
            <a href="https://leetcode.com/u/aggrawal_manas/" target="_blank" rel="noopener noreferrer" className="social-link"><Code2 className="w-5 h-5" /></a>
            <a href="https://medium.com/@manasagg7199" target="_blank" rel="noopener noreferrer" className="social-link"><Book className="w-5 h-5" /></a>
          </div>

          <div className="w-full mt-6 pt-6 border-t border-[var(--border)] space-y-2 meta">
            <p className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4 text-[var(--text-3)]" /> Boston, MA</p>
            <p className="flex items-center justify-center gap-2"><Phone className="w-4 h-4 text-[var(--text-3)]" /> (857) 265-1533</p>
          </div>

          <p className="mono-xs text-[var(--text-3)] mt-6">© 2026 Manas Aggrawal</p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden relative z-10">
        <nav className="nav-bar border-b border-[var(--border)] px-4 lg:px-8 py-3 sticky top-0 z-40">
          <div className="hidden md:flex gap-1.5 flex-wrap">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center justify-between">
            <span className="kicker">
              <span className="text-[var(--accent)]">{sectionMeta[activeSection]}</span>
              <span className="text-[var(--text-3)]">/</span>
              {navItems.find((i) => i.id === activeSection)?.label}
            </span>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-[var(--text-2)] p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-3 grid grid-cols-2 gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleSectionChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-link justify-start ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        <main className="flex-1 min-w-0 lg:overflow-y-auto p-5 md:p-8 lg:p-10">
          <div
            className={`max-w-4xl mx-auto transition-all duration-200 ${
              isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0 fade-in'
            }`}
            key={activeSection}
          >
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Detail modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="card max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 lg:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-[var(--text-3)] hover:text-[var(--text)] transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4 mb-5">
              <div className="icon-box">{selectedItem.icon || <Briefcase className="w-5 h-5" />}</div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-[var(--text)]">
                  {selectedItem.name || selectedItem.title}
                </h2>
                <p className="mono-xs text-[var(--text-3)] mt-1">
                  {selectedItem.company ? `${selectedItem.company} · ${selectedItem.period}` : selectedItem.tech}
                </p>
              </div>
            </div>
            <p className="text-[var(--text-2)] leading-relaxed mb-5">{selectedItem.details}</p>
            {selectedItem.highlights && (
              <div>
                <div className="label mb-3">Key Contributions</div>
                <ul className="space-y-2.5">
                  {selectedItem.highlights.map((h, i) => (
                    <li key={i} className="bullet">
                      <span className="bullet-mark">→</span>
                      <span className="text-[var(--text-2)] text-sm leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedItem.link && selectedItem.link !== '#' && (
              <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" className="btn-accent mt-6">
                View Project <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Transcript modal */}
      {showTranscript && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowTranscript(null)}>
          <div className="card max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowTranscript(null)} className="absolute top-4 right-4 text-[var(--text-3)] hover:text-[var(--text)] transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl lg:text-2xl font-bold text-[var(--text)] mb-5">Academic Transcript</h2>
            <div className="rounded-lg overflow-hidden border border-[var(--border)] mb-5">
              <iframe src={showTranscript} className="w-full aspect-[8.5/11] bg-[var(--bg-elev-2)]" title="Academic Transcript" />
            </div>
            <a
              href={showTranscript}
              download={`Manas_Aggrawal_Transcript_${showTranscript.split('/').pop()}`}
              className="btn-accent"
            >
              <Download className="w-4 h-4" /> Download Transcript
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

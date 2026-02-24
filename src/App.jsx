import React, { useState } from 'react';
import { Download, Mail, Phone, Linkedin, Github, FileCode, Code2, Database, Cloud, Terminal, ExternalLink, X, Book, Package, Briefcase, FolderGit2, Award, Home, Menu, BookOpen, GitBranch } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTranscript, setShowTranscript] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSectionChange = (section) => {
    if (section === activeSection) return;
    setIsTransitioning(true);
    setTimeout(() => setActiveSection(section), 200);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const navItems = [
    { id: 'about', label: 'About', icon: <Home className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <Award className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'opensource', label: 'Open Source', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'research', label: 'Research', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'articles', label: 'Articles', icon: <Book className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const experience = [

    {
      title: "Backend Software Engineer Intern",
      company: "Hydrow",
      period: "Jan 2025 – Apr 2025",
      location: "Boston, MA",
      highlights: ["Building backend services for Hydrow’s main platform team using NestJs, PostgreSQL, message queues and redis"],
      details: ""
    
    },
    {
      title: "Software Engineer",
      company: "Studio Graphene",
      period: "May 2021 – Jul 2024",
      location: "Gurgaon, India",
      highlights: [
        "Built serverless engineering analytics platform using AWS Lambda to pinpoint bottlenecks like high PR wait times, frequent build failures, and blocked dependencies, reducing cycle time and boosting engineering velocity by 23%",
        "Built distributed, event-driven microservices using AWS SQS messaging queues for decoupled data ingestion and processing, reducing response latency by ~40%",
        "Ingested raw data from 10k+ weekly events from third party sources into Elasticsearch and ran aggregation queries to calculate high level metrics",
        "Built automated retry scripts to fetch failed messages from DynamoDB and reprocess via SQS batch writes, eliminating manual intervention and reducing message failure resolution time from hours to minutes",
        "Built scalable Node.js/TypeScript REST API backend processing 2M+ API requests daily, designed PostgreSQL schema with partitioning and indexing strategies to handle 500GB+ product catalog data and real-time cross-region inventory sync",
        "Deployed docker containerized microservices on AWS ECS, built CodePipeline CI/CD workflows, configured CloudWatch alarms, and integrated SES for email notifications on deployment failures and system alerts"
      ],
      details: "Backend Lead Engineer on multiple projects, maintained tech docs, drove standups, maintained releases, Mentored junior engineers, collaborated within cross-functional teams"
    },
    {
      title: "Junior Software Engineer",
      company: "Studio Graphene",
      period: "Nov 2020 – May 2021",
      location: "Gurgaon, India",
      highlights: [
        "Developed real-time tracking and competitive scoring algorithm using Node.js/PostgreSQL with read replicas and connection pooling to serve 100K+ active users, for oddchecker's betting platform",
        "Engineered production-ready Python Django backend REST framework which was adopted by 10+ teams",
        "Implemented Redis caching, cutting repeated Algolia API calls and reducing response latency from ~300ms to ~100ms",
        "Implemented TDD and Trunk-based development practices using Jest and PyTest, achieving 20% faster release cycles"
      ],
      details: "Backend engineer, Individual contributor, collaborated within cross-functional teams"
    }
  ];

  const articles = [
    {
      title: "Five Stages to Scalable: My System Design Journey",
      description: "A deep dive into building scalable systems - from monolith to microservices, exploring architecture decisions, performance optimization, and lessons learned from production systems.",
      link: "https://medium.com/@manasagg7199/five-stages-to-scalable-my-system-design-journey-a556b2b43446",
      category: "System Design",
      platform: "Medium"
    },
    {
      title: "Async/Await: Asynchronous programming in Node.js",
      description: "",
      link: "https://medium.com/@manasagg7199/async-await-asynchronous-programming-in-node-js-6367db22c6dd",
      category: "Asynchronous Programming",
      platform: "Medium"
    },
    {
      title: "Types and Programming Languages: An Introduction",
      description: "",
      link: "https://medium.com/@manasagg7199/types-and-programming-languages-an-introduction-40d1b7650929",
      category: "Programming Languages",
      platform: "Medium"
    },
    {
      title: "Intro to Node Js APM using AWS Distro for OpenTelemetry and AWS X-Ray",
      description: "Application Performance Monitoring tool",
      link: "https://medium.com/@manasagg7199/intro-to-node-js-apm-using-aws-distro-for-opentelemetry-and-aws-x-ray-ee5b169a381d",
      category: "Developer tools",
      platform: "Medium"
    },
  ];

  const education = [
    {
      school: "Northeastern University",
      degree: "Masters of Science – Computer Science",
      period: "Sep 2024 – Dec 2026 ",
      location: "Boston, MA",
      gpa: "3.75",
      coursework: "Algorithms, Software Design Patterns, Principles of Programming Languages, Programming Languages Research, Mobile App Development, Web Development",
      roles: [
        {
          title: "Research",
          description: "Research Apprentice for \"Typed Conversational Interfaces\" in Programming Languages under Prof Chris Martens"
        },
        {
          title: "Teaching Assistant",
          description: "Graduate Teaching Assistant for Fundamentals of Software Engineering (CS 4530) for 3 consecutive terms"
        }
      ],
      hasTranscript: true,
      transcriptFile: "/transcript-grad.pdf"  
    },
    {
      school: "Guru Gobind Singh Indraprastha University",
      degree: "Bachelor of Technology – Computer Science Engineering",
      period: "Aug 2016 – Sep 2020",
      location: "Delhi, India",
      coursework: "Data Structure, Networking, Operating Systems, Object-Oriented Design, Machine Learning",
      roles: [],
      hasTranscript: true,
      transcriptFile: "/transcript-undergrad.pdf"
    }
  ];

  const projects = [
    {
      name: "Performance Monitoring Tool",
      tech: "Node.js, TypeScript, AWS X-Ray, OpenTelemetry, npm",
      description: "Published npm package with distributed tracing and central error tracking reducing debugging time by ~60%",
      icon: <Code2 className="w-6 h-6" />,
      details: "A comprehensive observability package enabling distributed tracing and central error tracking to Node.js applications. Built on OpenTelemetry standards, it automatically instruments HTTP requests, database queries, and async operations with zero code changes required. Integrates seamlessly with AWS X-Ray, Jaeger, and other tracing backends.",
      link: "https://www.npmjs.com/package/nodejs-observability"
    },
    {
      name: "NestJs Backend Framework",
      tech: "Node.js, NestJS, PostgreSQL, Prisma ORM, Docker",
      description: "Production-ready NestJS framework with authentication, database, and essentials pre-configured",
      icon: <Terminal className="w-6 h-6" />,
      details: "🔐 JWT Authentication • 🗄️ Prisma ORM • 🐳 Docker • 📝 Swagger • ✅ Validation • 🔑 Password Recovery • 🎨 Code Quality • 🏗️ Clean Architecture",
      link: "https://github.com/manas-aggrawal/nestjs-boilerplate"
    },
    {
      name: "Advanced Image Processor",
      tech: "Java, SwingUI, Design Patterns",
      description: "Extensible image processing application with SOLID principles supporting 10+ operations",
      icon: <Terminal className="w-6 h-6" />,
      details: "Sophisticated image processing application showcasing MVC, Strategy, Factory, and Command patterns. Implemented core image transformations including blurring, sharpening, flipping (horizontal and vertical), RGB splitting, grayscale transformations (value, luma, intensity), histogram generation, color correction, and level adjustment.",
      link: "https://github.com/manas-aggrawal/Advanced-Image-Manipulation-and-Enhancement-Tool"
    },
    {
      name: "Toy Compiler",
      tech: "Racket, Parser, AST",
      description: "Functional programming language compiler (Academic Project - CS5400)",
      icon: <Terminal className="w-6 h-6" />,
      details: "Minimalist functional language supporting first-class functions with lexical scoping, local bindings, conditionals, and closures.",
      link: "https://github.com/manas-aggrawal/Toy-Compiler"
    },
    {
      name: "Personal Finance App",
      tech: "Android, Kotlin, Firebase, Room",
      description: "Student budgeting app with expense tracking and real-time alerts",
      icon: <FileCode className="w-6 h-6" />,
      details: "Full-featured Android app with MVVM pattern, offline-first functionality, Firebase sync, photo receipts, budget alerts, and MPAndroidChart visualizations.",
      link: "#"
    }
  ];

  const skills = {
    "Languages": ["JavaScript", "TypeScript", "Java", "C++", "Python"],
    "Frameworks": ["Node.js", "Express.js", "NestJS", "Django", "Laravel", "React"],
    "Database": ["PostgreSQL", "MySQL", "MongoDB", "Elasticsearch", "DynamoDB", "Firebase"],
    "Cloud & DevOps": ["AWS Lambda", "S3", "SQS", "X-Ray", "Docker", "CI/CD", "ECS"],
    "Others": ["Git", "Sentry", "OpenTelemetry", "REST APIs", "Agile", "SDLC"]
  };

  const researchWork = {
    title: "Typed Conversational Interfaces",
    role: "Research Apprentice",
    advisor: "Prof Chris Martens",
    institution: "Northeastern University",
    period: "Sep 2024 – Jan 2025",
    description: "Researched \"Typed Conversational Interfaces\" in Programming Languages under Prof Chris Martens. We're trying to formalize a domain specific programming language, closer to natural language, with type system which will prevent invalid states and guarantee reliable behavior. The motivation behind this is to reduce chatbots' dependency on LLMs for user queries. The paper has been accepted at Plateau'25"
  };

  const openSourceProjects = [
    {
      name: "Performance Monitoring Tool",
      tech: "Node.js, TypeScript, AWS X-Ray, OpenTelemetry, npm",
      description: "Published npm package with distributed tracing and central error tracking, enabling observability in backend services and reducing debugging time by ~60%",
      stats: "450+ downloads",
      link: "https://www.npmjs.com/package/nodejs-observability",
      icon: <Package className="w-8 h-8" />
    },
    {
      name: "NestJs Backend Framework",
      tech: "Node.js, NestJS, PostgreSQL, Prisma ORM, Docker",
      description: "Production-ready NestJS framework with Docker support, request/response validation, winston logger, swagger, authentication, database connection, prismaORM and essentials pre-configured",
      stats: "10 Forks * 40 Stars",
      link: "https://github.com/manas-aggrawal/nestjs-boilerplate",
      icon: <Terminal className="w-8 h-8" />
    }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">About Me</h2>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/50 transition-all glow-card cosmic-border">
            <ul>
                    <li className="flex items-start">
                      <span className="text-violet-400 mr-2 flex-shrink-0">•</span>
                      <span className="text-sm">Currently serving as Backend Engineer Intern at Hydrow</span>
                    </li>
                    <br />
                    <li className="flex items-start">
                      <span className="text-violet-400 mr-2 flex-shrink-0">•</span>
                      <span className="text-sm">Experienced Software Engineer with over 3.5 years of expertise in backend engineering, building scalable architectures, distributed systems, and high-performance services.</span>
                    </li>
                    <br />
                     <li className="flex items-start">
                      <span className="text-violet-400 mr-2 flex-shrink-0">•</span>
                      <span className="text-sm">Currently pursuing MS in Computer Science at Northeastern University (GPA: 3.75).</span>
                    </li>
                    <br />
                     <li className="flex items-start">
                      <span className="text-violet-400 mr-2 flex-shrink-0">•</span>
                      <span className="text-sm">Served as Research Apprentice for "Typed Conversational Interfaces" in Programming Languages under Prof Chris Martens and Lead Graduate Teaching Assistant for Software Engineering at Northeastern University.</span>
                    </li>
            </ul>
           
              {/* <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-4">
                
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                
              </p>
              <p className="text-gray-300 leading-relaxed">
                
              </p> */}
            </div>
          </div>
        );

        case 'education':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Education</h2>
            
            {education.map((edu, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/50 transition-all glow-card cosmic-border">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">{edu.school}</h3>
                    <p className="text-lg text-gray-300">{edu.degree}</p>
                    {edu.gpa && <p className="text-violet-400 font-semibold">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-left lg:text-right text-gray-500 mt-2 lg:mt-0">
                    <p className="text-sm">{edu.period}</p>
                    <p className="text-sm">{edu.location}</p>
                  </div>
                </div>

                {edu.hasTranscript && (
                  <button
                    onClick={() => setShowTranscript(edu.transcriptFile)}
                    className="mb-4 px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all text-sm flex items-center gap-2 shadow-lg shadow-violet-500/30"
                  >
                    <FileCode className="w-4 h-4" />
                    View Transcript
                  </button>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Relevant Coursework</h4>
                    <p className="text-gray-300 text-sm">{edu.coursework}</p>
                  </div>

                  {edu.roles.map((role, roleIdx) => (
                    <div key={roleIdx}>
                      <h4 className="text-lg font-semibold text-white mb-2">{role.title}</h4>
                      <p className="text-gray-300 text-sm">{role.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );


      case 'experience':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Work Experience</h2>
            {experience.map((job, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/50 transition-all glow-card cosmic-border">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white">{job.title}</h3>
                    <p className="text-lg text-gray-400">{job.company}</p>
                  </div>
                  <div className="text-left lg:text-right text-gray-500 mt-2 lg:mt-0">
                    <p className="text-sm">{job.period}</p>
                    <p className="text-sm">{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 mb-4">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-violet-400 mr-2 flex-shrink-0">•</span>
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedItem(job)}
                  className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-2 transition-colors font-medium"
                >
                  Read more <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        );

        case 'opensource':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Open Source Contributions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openSourceProjects.map((proj, idx) => (
                <a
                  key={idx}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-violet-500/10 p-3 rounded-lg text-violet-400 border border-violet-500/20 shadow-lg shadow-violet-500/20">
                      {proj.icon}
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{proj.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{proj.tech}</p>
                  <p className="text-gray-300 text-sm mb-3">{proj.description}</p>
                  <p className="text-sm text-violet-400 font-semibold">{proj.stats}</p>
                </a>
              ))}
            </div>
          </div>
        );
      
      case 'research':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Research</h2>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/50 transition-all">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">{researchWork.title}</h3>
              <p className="text-gray-400 mb-4">{researchWork.role} • {researchWork.advisor} • {researchWork.institution}</p>
              <p className="text-sm text-gray-500 mb-4">{researchWork.period}</p>
              <p className="text-gray-300 leading-relaxed">
                {researchWork.description}
              </p>
            </div>
          </div>
        );

      
      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all cursor-pointer"
                  onClick={() => setSelectedItem(project)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-violet-500/10 p-3 rounded-lg text-violet-400 border border-violet-500/20 shadow-lg shadow-violet-500/20">
                      {project.icon}
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{project.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{project.tech}</p>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  <button className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 font-medium">
                    Read more <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'articles':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Articles & Blog</h2>
            <p className="text-gray-400">Technical writing and insights from my engineering journey</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, idx) => (
                <a
                  key={idx}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-violet-500/10 p-2 rounded-lg flex-shrink-0 border border-violet-500/20 shadow-lg shadow-violet-500/20">
                      <Book className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{article.platform}</span>
                      <span>•</span>
                      <span>{article.category}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 hover:text-violet-400 transition-colors">
                    {article.title}
                  </h3>
                  
                  {article.description && (
                    <p className="text-sm text-gray-400 mb-4">
                      {article.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-violet-400 font-medium">
                    Read on Medium 
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center glow-card cosmic-border">
              <p className="text-gray-400 mb-4">More articles coming soon!</p>
              <a
                href="https://medium.com/@manasagg7199"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                View all on Medium <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items], idx) => (
                <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-violet-500/50 transition-all glow-card cosmic-border">
                  <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                    {category === "Languages" && <Code2 className="w-5 h-5 text-violet-400" />}
                    {category === "Database" && <Database className="w-5 h-5 text-violet-400" />}
                    {category === "Cloud & DevOps" && <Cloud className="w-5 h-5 text-violet-400" />}
                    {category === "Frameworks" && <Terminal className="w-5 h-5 text-violet-400" />}
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-sm border border-slate-600 hover:border-violet-500/50 hover:bg-violet-500/10 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">Get In Touch</h2>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 lg:p-8 text-center glow-card cosmic-border">
              <p className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8">
                Let's build something amazing together! 🚀
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <a 
                  href="mailto:aggrawal.m@northeastern.edu"
                  className="flex items-center justify-center gap-3 bg-slate-700/50 border border-slate-600 rounded-xl p-6 hover:border-violet-500/50 hover:bg-slate-700 transition-all"
                >
                  <Mail className="w-6 h-6 lg:w-8 lg:h-8 text-violet-400 flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-xs lg:text-sm text-gray-500">Email</p>
                    <p className="text-sm lg:text-lg text-white break-all">aggrawal.m@northeastern.edu</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+18572651533"
                  className="flex items-center justify-center gap-3 bg-slate-700/50 border border-slate-600 rounded-xl p-6 hover:border-violet-500/50 hover:bg-slate-700 transition-all"
                >
                  <Phone className="w-6 h-6 lg:w-8 lg:h-8 text-violet-400 flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <p className="text-xs lg:text-sm text-gray-500">Phone</p>
                    <p className="text-sm lg:text-lg text-white">(857) 265-1533</p>
                  </div>
                </a>
              </div>

              <div className="flex gap-4 lg:gap-6 justify-center mb-6 flex-wrap">
                <a 
                  href="https://www.linkedin.com/in/manasaggrawal07/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 bg-slate-700/50 border border-slate-600 rounded-xl p-4 lg:p-6 hover:border-violet-500/50 hover:bg-slate-700 transition-all w-28"
                >
                  <Linkedin className="w-8 h-8 text-violet-400" />
                  <span className="text-xs text-gray-300">LinkedIn</span>
                </a>
              </div>

              <p className="text-gray-400">📍 Based in Boston, MA</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-950 text-gray-100 min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* Animated Starfield Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
      </div>

      {/* Cosmic Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>

      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #020617;
        }
        * {
          box-sizing: border-box;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .stars-small {
          position: absolute;
          width: 1px;
          height: 1px;
          background: white;
          box-shadow: 
            ${Array.from({length: 50}, () => 
              `${Math.random() * 2000}px ${Math.random() * 1000}px #FFF`
            ).join(', ')};
          animation: twinkle 3s infinite;
        }

        .stars-medium {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          box-shadow: 
            ${Array.from({length: 30}, () => 
              `${Math.random() * 2000}px ${Math.random() * 1000}px #FFF`
            ).join(', ')};
          animation: twinkle 4s infinite 1s;
        }

        .stars-large {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          box-shadow: 
            ${Array.from({length: 15}, () => 
              `${Math.random() * 2000}px ${Math.random() * 1000}px rgba(139, 92, 246, 0.8)`
            ).join(', ')};
          animation: twinkle 5s infinite 2s;
        }

        .glow-card {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
        }

        .glow-card:hover {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1);
        }

        .cosmic-border {
          position: relative;
          background: linear-gradient(145deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%);
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Left Sidebar */}
      <aside className="w-full md:w-64 lg:w-80 bg-slate-900/80 backdrop-blur-md border-b md:border-r md:border-b-0 border-violet-500/20 p-4 md:p-6 lg:p-8 flex flex-col items-center md:sticky md:top-0 md:h-screen overflow-y-auto relative z-10">
        <div className="text-center mb-6 w-full">
          <img src="/profile.png" alt="Manas Aggrawal" className="w-24 h-24 lg:w-40 lg:h-40 rounded-full object-cover mb-4 mx-auto ring-4 ring-violet-500 ring-offset-4 ring-offset-slate-900 shadow-lg shadow-violet-500/50" />
          
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            MANAS AGGRAWAL
          </h1>
          
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Backend Engineer | Research Apprentice | Teaching Assistant | MS CS Student
          </p>

          <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/10 border border-violet-500/30 rounded-lg p-4 mb-6 glow-card">
            <p className="text-violet-300 font-semibold mb-2 text-sm">🎯 Looking For</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              <span className="font-semibold text-white">Full-time SDE roles starting Sep 2026</span><br />
              <span>OR</span><br />
              <span className="font-semibold text-white">SDE Intern roles starting May/June 2026</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <a href="https://www.linkedin.com/in/manasaggrawal07/" className="text-gray-400 hover:text-violet-400 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://github.com/manas-aggrawal" className="text-gray-400 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="mailto:aggrawal.m@northeastern.edu" className="text-gray-400 hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://leetcode.com/u/aggrawal_manas/" className="text-gray-400 hover:text-white transition-colors">
            <Code2 className="w-5 h-5" />
          </a>
          <a href="https://medium.com/@manasagg7199" className="text-gray-400 hover:text-white transition-colors">
            <Book className="w-5 h-5" />
          </a>
        </div>

        <a
          href="/resume.pdf"
          download="Manas_Aggrawal_Resume.pdf"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all mb-6 font-medium shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
        >
          <Download className="w-4 h-4" />
          Download Resume
        </a>

        <div className="text-sm text-gray-400 space-y-2 text-center mb-6">
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> (857) 265-1533
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Boston, MA
          </p>
        </div>

        <div className="w-full border-t border-slate-700 pt-6">
          <p className="text-xs text-gray-500 text-center">
            © 2025 Manas Aggrawal
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:h-screen overflow-hidden">
        <nav className="bg-slate-900/90 backdrop-blur-md border-b border-violet-500/20 px-4 lg:px-8 py-4 sticky top-0 z-40 relative">
          <div className="hidden md:flex gap-2 flex-wrap">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all font-medium ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/50'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white border border-slate-700 hover:border-violet-500/50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden flex items-center justify-between">
            <span className="text-violet-400 font-semibold text-sm">
              {navItems.find(item => item.id === activeSection)?.label}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800 border-b border-slate-700 shadow-xl">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleSectionChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-violet-600/20 text-violet-400 border-l-4 border-violet-500 font-medium'
                      : 'text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className={`max-w-5xl mx-auto transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Modals */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-slate-800/95 backdrop-blur-md border border-violet-500/30 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8 relative shadow-2xl shadow-violet-500/20" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20 shadow-lg shadow-violet-500/20">
                {selectedItem.icon}
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{selectedItem.name || selectedItem.title}</h2>
                <p className="text-gray-400 text-sm">{selectedItem.tech || selectedItem.period}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-300 leading-relaxed mb-4">{selectedItem.details}</p>
              
              {selectedItem.highlights && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-3">Key Achievements</h3>
                  <ul className="space-y-2">
                    {selectedItem.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <span className="text-violet-400 mr-2">•</span>
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.link && selectedItem.link !== '#' && (
                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all font-medium shadow-lg shadow-violet-500/30"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {showTranscript && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowTranscript(null)}>
          <div className="bg-slate-800/95 backdrop-blur-md border border-violet-500/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 lg:p-8 relative shadow-2xl shadow-violet-500/20" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowTranscript(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Academic Transcript</h2>
            
            <div className="bg-slate-900 rounded-lg p-4 mb-6 border border-slate-700">
              <div className="aspect-[8.5/11] bg-slate-700 rounded">
                <iframe
                  src={showTranscript}
                  className="w-full h-full rounded"
                  title="Academic Transcript"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <a
                href={showTranscript}
                download={`Manas_Aggrawal_Transcript_${showTranscript.split('/').pop()}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-500 hover:to-purple-500 transition-all font-medium shadow-lg shadow-violet-500/30"
              >
                <Download className="w-5 h-5" />
                Download Transcript
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
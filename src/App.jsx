import React, { useState, useEffect } from 'react';
import { Download, Mail, Phone, Linkedin, Github, FileCode, Code2, Database, Cloud, Settings, Terminal, ExternalLink, X, Book, Package, TrendingUp, User, Briefcase, FolderGit2, Award, Home, SunMediumIcon, BookAIcon, BookImageIcon, Menu } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedItem, setSelectedItem] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showTranscript, setShowTranscript] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fullText = "Backend Engineer | MS CS Student | Research Apprentice | Teaching Assitant";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const handleSectionChange = (section) => {
    if (section === activeSection) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveSection(section);
    }, 250);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const navItems = [
    { id: 'about', label: 'About', icon: <Home className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <Award className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'featured', label: 'Featured', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'articles', label: 'Articles', icon: <Book className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const experience = [
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
  const combExp = [
    {
      title: "Software Engineer",
      company: "Studio Graphene",
      period: "Nov 2020 – Jul 2024",
      location: "Gurgaon, India",
      highlights: [
        "Built serverless engineering analytics platform using AWS Lambda to pinpoint bottlenecks like high PR wait times, frequent build failures, and blocked dependencies, reducing cycle time and boosting engineering velocity by 23%",
        "Built distributed, event-driven microservices using AWS SQS messaging queues for decoupled data ingestion and processing, reducing response latency by ~40%",
        "Ingested raw data from 10k+ weekly events from third party sources into Elasticsearch and ran aggregation queries to calculate high level metrics",
        "Built automated retry scripts to fetch failed messages from DynamoDB and reprocess via SQS batch writes, eliminating manual intervention and reducing message failure resolution time from hours to minutes",
        "Built scalable Node.js/TypeScript REST API backend processing 2M+ API requests daily, designed PostgreSQL schema with partitioning and indexing strategies to handle 500GB+ product catalog data and real-time cross-region inventory sync",
        "Deployed docker containerized microservices on AWS ECS, built CodePipeline CI/CD workflows, configured CloudWatch alarms, and integrated SES for email notifications on deployment failures and system alerts",
        "Developed real-time tracking and competitive scoring algorithm using Node.js/PostgreSQL with read replicas and connection pooling to serve 100K+ active users, for oddchecker's betting platform",
        "Engineered production-ready Python Django backend REST framework which was adopted by 10+ teams",
        "Implemented Redis caching, cutting repeated Algolia API calls and reducing response latency from ~300ms to ~100ms",
        "Implemented TDD and Trunk-based development practices using Jest and PyTest, achieving 20% faster release cycles"
      ],
      details: "Backend Lead Engineer on multiple projects, maintained tech docs, drove standups, maintained releases, Mentored junior engineers, collaborated within cross-functional teams"
    },
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
      period: "Sep 2024 – Apr 2026 ",
      location: "Boston, MA",
      gpa: "3.75",
      color: "emerald",
      coursework: "Algorithms, Programming Design Paradigms, Principles of Programming Languages",
      roles: [
        {
          title: "Teaching Assistant",
          description: "Graduate Teaching Assistant for Fundamentals of Software Engineering (CS 4530) for 3 consecutive terms"
        },
        {
          title: "Research",
          description: "Research Apprentice for \"Typed Conversational Interfaces\" in Programming Languages under Prof Chris Martens"
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
      color: "cyan",
      coursework: "Data Structure, Networking, Operating Systems, Object-Oriented Design, Machine Learning",
      roles: [],
      hasTranscript: true,  // Add this if you want transcript for undergrad too
      transcriptFile: "/transcript-undergrad.pdf"  // Add this
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
      details: "🔐 JWT Authentication • 🗄️ Prisma ORM • 🐳 Docker • 📝 Swagger • ✅ Validation • 🎯 CRUD Generator • 🔑 Password Recovery • 🎨 Code Quality • 🏗️ Clean Architecture",
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

  // const featuredItems = [
  //   {
  //     title: "Performance Monitoring Tool",
  //     description: "npm package for distributed tracing and error tracking",
  //     icon: <Package className="w-5 h-5" />,
  //     link: "https://www.npmjs.com/package/nodejs-observability",
  //     stats: "200+ downloads"
  //   },
  //   {
  //     title: "Scalable Systems",
  //     description: "System design case study based on a real project I worked on",
  //     icon: <Book className="w-5 h-5" />,
  //     link: "https://medium.com/@manasagg7199/five-stages-to-scalable-my-system-design-journey-a556b2b43446",
  //     stats: "Medium Article"
  //   }
  // ];

  const renderContent = () => {
    switch(activeSection) {
      case 'about':
        return (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <h2 className="text-2xl lg:text-4xl font-bold text-emerald-400 font-mono">About Me</h2>
            
            <div className="bg-gray-800 border border-emerald-500/30 rounded-lg p-6 max-w-full">
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed mb-4 break-words">
                <span className="text-emerald-400 font-mono">const profile = </span>
                Experienced Software Engineer with over 3.5 years of expertise in backend engineering, building scalable architectures, distributed systems, and high-performance services.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4 break-words">
                Currently pursuing MS in Computer Science at Northeastern University (GPA: 3.75).
              </p>
              <p className="text-gray-300 leading-relaxed break-words">
                Serving as Research Apprentice for "Typed Conversational Interfaces" under Prof Chris Martens and Lead Graduate Teaching Assistant for Software Engineering.
              </p>
            </div>

            {/* <div className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6 max-w-full">
              <h3 className="text-lg lg:text-xl font-bold text-cyan-400 mb-4">Featured Work</h3>
              <div className="space-y-3">
                {featuredItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/80 transition-all border border-cyan-500/20 hover:border-cyan-500/50 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm lg:text-base font-bold text-gray-200 mb-1">{item.title}</h4>
                        <p className="text-xs lg:text-sm text-gray-400 mb-1">{item.description}</p>
                        <span className="text-xs text-cyan-400 font-mono">{item.stats}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div> */}
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <h2 className="text-2xl lg:text-4xl font-bold text-emerald-400 font-mono">Work Experience</h2>
            {/* Change combExp to experience here if you need to show it as junior and senior */}
            {experience.map((job, idx) => (
              <div key={idx} className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all max-w-full">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-cyan-400">{job.title}</h3>
                    <p className="text-lg lg:text-xl text-gray-300">{job.company}</p>
                  </div>
                  <div className="text-left lg:text-right text-gray-400 mt-2 lg:mt-0">
                    <p className="font-mono text-sm">{job.period}</p>
                    <p className="text-sm">{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 mb-4">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-emerald-400 mr-2 flex-shrink-0">▹</span>
                      <span className="text-sm break-words">{highlight}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedItem(job)}
                  className="text-emerald-400 hover:text-emerald-300 font-mono text-sm flex items-center gap-2 transition-colors"
                >
                  Read more... <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <h2 className="text-2xl lg:text-4xl font-bold text-emerald-400 font-mono">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 border border-emerald-500/30 rounded-lg p-6 hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => setSelectedItem(project)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-emerald-500/20 p-3 rounded-lg">
                      {project.icon}
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 hover:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-emerald-400 break-words">{project.name}</h3>
                  <p className="text-sm text-gray-400 mb-3 font-mono break-words">{project.tech}</p>
                  <p className="text-gray-300 text-sm mb-3 break-words">{project.description}</p>
                  <button className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center gap-1">
                    Read more... <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <h2 className="text-2xl lg:text-4xl font-bold text-emerald-400 font-mono">Education</h2>
            
            {education.map((edu, idx) => (
              <div key={idx} className={`bg-gray-800 border border-${edu.color}-500/30 rounded-lg p-6 max-w-full`}>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div>
                    <h3 className={`text-xl lg:text-2xl font-bold text-${edu.color}-400 break-words`}>{edu.school}</h3>
                    <p className="text-lg text-gray-300 break-words">{edu.degree}</p>
                    {edu.gpa && <p className="text-cyan-400 font-semibold">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-left lg:text-right text-gray-400 mt-2 lg:mt-0">
                    <p className="font-mono text-sm">{edu.period}</p>
                    <p className="text-sm">{edu.location}</p>
                  </div>
                </div>

                {edu.hasTranscript && (
                  <button
                    onClick={() => setShowTranscript(edu.transcriptFile)}
                    className="mb-4 px-6 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg font-mono hover:bg-cyan-500/30 transition-all border border-cyan-500/50 text-sm flex items-center gap-2"
                  >
                    <FileCode className="w-4 h-4" />
                    View Transcript
                  </button>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-2">Relevant Coursework</h4>
                    <p className="text-gray-300 text-sm break-words">{edu.coursework}</p>
                  </div>

                  {edu.roles.map((role, roleIdx) => (
                    <div key={roleIdx}>
                      <h4 className="text-lg font-bold text-cyan-400 mb-2">{role.title}</h4>
                      <p className="text-gray-300 text-sm break-words">{role.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'featured':
        return (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <h2 className="text-2xl lg:text-4xl font-bold text-emerald-400 font-mono">Featured Work</h2>
            <p className="text-gray-400 mb-6">Handpicked projects and articles showcasing my best work</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured Project 1 */}
              <div
                className="bg-gray-800 border border-emerald-500/30 rounded-lg p-6 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setSelectedItem(projects[0])}
              >
                <div className="bg-emerald-500/20 p-3 rounded-lg w-fit mb-4">
                  <Code2 className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-xs text-cyan-400 font-mono mb-2 block">FEATURED PROJECT</span>
                <h3 className="text-xl font-bold mb-2 text-emerald-400">{projects[0].name}</h3>
                <p className="text-sm text-gray-400 mb-3">{projects[0].description}</p>
                <p className="text-gray-300 text-sm">
                  200+ downloads • 60% faster debugging • Used by 10+ teams
                </p>
              </div>

              {/* Featured Article */}
              <a
                href="https://medium.com/@manasagg7199/five-stages-to-scalable-my-system-design-journey-a556b2b43446"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6 hover:scale-105 transition-transform block"
              >
                <div className="bg-cyan-500/20 p-3 rounded-lg w-fit mb-4">
                  <Book className="w-8 h-8 text-cyan-400" />
                </div>
                <span className="text-xs text-emerald-400 font-mono mb-2 block">FEATURED ARTICLE</span>
                <h3 className="text-xl font-bold mb-2 text-cyan-400">Five Stages to Scalable</h3>
                <p className="text-sm text-gray-400 mb-3">A deep dive into building scalable systems - from monolith to microservices, exploring architecture decisions, performance optimization, and lessons learned from production systems.</p>
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  Read on Medium <ExternalLink className="w-4 h-4" />
                </p>
              </a>

              {/* Featured Project 2 */}
              <div
                className="bg-gray-800 border border-emerald-500/30 rounded-lg p-6 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setSelectedItem(projects[1])}
              >
                <div className="bg-emerald-500/20 p-3 rounded-lg w-fit mb-4">
                  <Terminal className="w-8 h-8 text-emerald-400" />
                </div>
                <span className="text-xs text-cyan-400 font-mono mb-2 block">FEATURED PROJECT</span>
                <h3 className="text-xl font-bold mb-2 text-emerald-400">{projects[1].name}</h3>
                <p className="text-sm text-gray-400 mb-3">{projects[1].description}</p>
                <p className="text-gray-300 text-sm">
                  JWT Auth • Docker • Swagger • Clean Architecture
                </p>
              </div>
            </div>
          </div>
        );

      case 'articles':
        return (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <h2 className="text-2xl lg:text-4xl font-bold text-emerald-400 font-mono">Articles & Blog</h2>
            <p className="text-gray-400 mb-6">Technical writing and insights from my engineering journey</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article, idx) => (
                
                  <a key={idx}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 hover:scale-105 transition-all group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-cyan-500/20 p-2 rounded-lg flex-shrink-0">
                      <Book className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{article.platform}</span>
                      <span>•</span>
                      <span>{article.category}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-cyan-400 mb-2 group-hover:text-emerald-400 transition-colors break-words">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-4 break-words">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-cyan-400 group-hover:text-emerald-400 transition-colors">
                    Read on Medium 
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>

            {/* View All Button */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center mt-6">
              <p className="text-gray-400 mb-4">More articles coming soon!</p>
              
                <a href="https://medium.com/@manasagg7199"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-emerald-400 transition-colors"
              >
                View all on Medium <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        );
        case 'skills':
        return (
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <h2 className="text-2xl lg:text-4xl font-bold text-emerald-400 font-mono">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items], idx) => (
                <div key={idx} className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                    {category === "Languages" && <Code2 className="w-5 h-5" />}
                    {category === "Database" && <Database className="w-5 h-5" />}
                    {category === "Cloud & DevOps" && <Cloud className="w-5 h-5" />}
                    {category === "Frameworks" && <Terminal className="w-5 h-5" />}
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-mono border border-emerald-500/30 whitespace-nowrap">
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
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <h2 className="text-2xl lg:text-4xl font-bold text-emerald-400 font-mono">Get In Touch</h2>
      
      <div className="bg-gray-800 border border-emerald-500/30 rounded-lg p-6 lg:p-8 text-center max-w-full">
        <p className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8">
          Let's build something amazing together! 🚀
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <a 
            href="mailto:aggrawal.m@northeastern.edu"
            className="flex items-center justify-center gap-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 hover:scale-105 transition-all group"
          >
            <Mail className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
            <div className="text-left min-w-0 flex-1">
              <p className="text-xs lg:text-sm text-gray-400">Email</p>
              <p className="text-sm lg:text-lg text-gray-200 font-mono break-all">aggrawal.m@northeastern.edu</p>
            </div>
          </a>
          
          <a 
            href="tel:+18572651533"
            className="flex items-center justify-center gap-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 hover:scale-105 transition-all group"
          >
            <Phone className="w-6 h-6 lg:w-8 lg:h-8 text-cyan-400 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
            <div className="text-left min-w-0 flex-1">
              <p className="text-xs lg:text-sm text-gray-400">Phone</p>
              <p className="text-sm lg:text-lg text-gray-200 font-mono">(857) 265-1533</p>
            </div>
          </a>
        </div>

        <div className="flex gap-4 lg:gap-6 justify-center mb-6 lg:mb-8 flex-wrap">
          <a 
            href="https://www.linkedin.com/in/manasaggrawal07/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 bg-gray-900/50 border border-emerald-500/30 rounded-lg p-4 lg:p-6 hover:border-emerald-500 hover:scale-105 transition-all w-28 lg:w-32"
          >
            <Linkedin className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-400" />
            <span className="text-xs lg:text-sm text-gray-300">LinkedIn</span>
          </a>
        </div>

        <p className="text-gray-400 mb-4">📍 Based in Boston, MA</p>
      </div>
    </div>
  );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col lg:flex-row overflow-x-hidden w-full max-w-full">
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100%;
          max-width: 100%;
        }
        
        * {
          box-sizing: border-box;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @media (max-width: 1024px) {
          body, html {
            overflow: auto;
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        
        @keyframes fadeSlideOut {
          from {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
            filter: blur(10px);
          }
        }
        
        .content-enter {
          animation: fadeSlideIn 0.5s ease-out forwards;
        }
        
        .content-exit {
          animation: fadeSlideOut 0.3s ease-in forwards;
        }

        @media (max-width: 640px) {
          h1, h2, h3, h4, h5, h6, p, span, div {
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }
        }
          
        p, h1, h2, h3, h4, h5, h6, span, li {
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }
        
        /* Responsive containers */
        @media (max-width: 1280px) {
          .max-w-5xl {
            max-width: 100%;
            padding: 0 1rem;
          }
        }
      `}</style>

      {/* Cute Mascot - Owl */}
      <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50 group cursor-pointer">
        <div className="relative">
          <div className="text-3xl lg:text-5xl animate-bounce hover:scale-110 transition-transform">🦉</div>
          <div className="absolute -top-12 lg:-top-16 right-0 bg-gray-800 border border-emerald-500/50 rounded-lg px-3 lg:px-4 py-1 lg:py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-xs lg:text-sm text-emerald-400 font-mono">Hoot! I'm Manas's coding buddy 🦉</p>
          </div>
        </div>
      </div>

      {/* Left Sidebar - Profile */}
      <aside className="w-full md:w-64 lg:w-80 bg-gray-800/50 border-b md:border-r md:border-b-0 border-gray-700 p-3 md:p-6 lg:p-8 flex flex-col items-center md:sticky md:top-0 md:h-screen overflow-y-auto max-w-full">
        <div className="text-center mb-4 lg:mb-6 w-full max-w-full">
          {/* Profile Picture */}
          <img src="/profile.png" alt="Manas Aggrawal" className="w-20 h-20 lg:w-40 lg:h-40 rounded-full object-cover mb-2 lg:mb-4 mx-auto border-2 lg:border-4 border-emerald-400" />
          
          <h1 className="text-xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1 lg:mb-2">
            MANAS AGGRAWAL
          </h1>
          
          <p className="text-[9px] md:text-[10px] lg:text-sm font-mono text-gray-400 min-h-[2rem] md:min-h-[2.5rem] lg:h-8 mb-3 md:mb-8 lg:mb-8 leading-tight md:leading-normal">
          {typedText}<span className="animate-pulse">|</span>
          </p>

          {/* Availability Banner - Prominent */}
          <div className="bg-emerald-500/20 border-2 border-emerald-500/50 rounded-lg p-2 lg:p-4 mb-4 lg:mb-6 w-full max-w-full animate-pulse-slow">
            <p className="text-emerald-400 font-semibold mb-1 lg:mb-2 flex items-center justify-center gap-1 lg:gap-2 text-xs lg:text-base">
              <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
              🎯 Availability
            </p>
            <p className="text-[9px] leading-tight lg:text-xs text-gray-300 mb-1 lg:mb-2 lg:leading-relaxed break-words">
              Open to <span className="text-cyan-400 font-semibold">Full-time SDE roles starting May 2026</span>
            </p>
          </div>
        </div>

        <div className="flex gap-2 lg:gap-4 mb-4 lg:mb-6">
          <a href="https://www.linkedin.com/in/manasaggrawal07/" className="hover:text-emerald-400 transition-colors">
            <Linkedin className="w-4 h-4 lg:w-6 lg:h-6" />
          </a>
          <a href="https://github.com/manas-aggrawal" className="hover:text-emerald-400 transition-colors">
            <Github className="w-4 h-4 lg:w-6 lg:h-6" />
          </a>
          <a href="mailto:aggrawal.m@northeastern.edu" className="hover:text-emerald-400 transition-colors">
            <Mail className="w-4 h-4 lg:w-6 lg:h-6" />
          </a>
          <a href="https://leetcode.com/u/aggrawal_manas/" className="hover:text-emerald-400 transition-colors">
            <Code2 className="w-4 h-4 lg:w-6 lg:h-6" />
          </a>
          <a href="https://medium.com/@manasagg7199" className="hover:text-emerald-400 transition-colors">
            <BookAIcon className="w-4 h-4 lg:w-6 lg:h-6" />
          </a>
        </div>

        {/* Change resume-comb-exp to resume if you want to show work ex as 2 separate - junior and senior */}
        <a
          href="/resume.pdf"
          download="Manas_Aggrawal_Resume.pdf"
          className="w-full max-w-full flex items-center justify-center gap-2 px-3 lg:px-4 py-2 lg:py-3 bg-emerald-500/20 text-emerald-400 rounded-lg font-mono hover:bg-emerald-500/30 transition-all border border-emerald-500/50 mb-4 lg:mb-6 text-xs lg:text-base"
        >
          <Download className="w-4 h-4" />
          Resume
        </a>

        <div className="text-[10px] lg:text-sm text-gray-400 space-y-1 lg:space-y-2 text-center mb-4 lg:mb-6">
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-3 h-3 lg:w-4 lg:h-4" /> (857) 265-1533
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-3 h-3 lg:w-4 lg:h-4" /> Boston, MA
          </p>
        </div>

        <div className="w-full border-t border-gray-700 pt-4 lg:pt-6">
          <p className="text-[10px] lg:text-xs text-gray-500 text-center font-mono">
            © 2025 Manas Aggrawal
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:h-screen overflow-hidden w-full max-w-full">
        {/* Top Navigation */}
        <nav className="bg-gray-800/50 border-b border-gray-700 px-4 lg:px-8 py-3 lg:py-4 sticky top-0 z-40 backdrop-blur w-full">
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3 lg:gap-3 flex-wrap">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`flex items-center gap-1 lg:gap-2 px-2 md:px-3 lg:px-4 py-2 rounded-lg font-mono text-xs md:text-sm transition-all whitespace-nowrap ${
                  activeSection === item.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-700/50'
                }`}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.label}</span>
                <span className="lg:hidden">{item.label.slice(0, 3)}</span>
              </button>
            ))}
          </div>

          {/* Mobile - Hamburger Button */}
          <div className="md:hidden flex items-center justify-between">
            <span className="text-emerald-400 font-mono text-sm">
              {navItems.find(item => item.id === activeSection)?.label}
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-emerald-400 transition-colors p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 border-b border-gray-700 py-2 shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleSectionChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-emerald-500/20 text-emerald-400 border-l-4 border-emerald-500'
                      : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-700/50'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-3 md:p-6 lg:p-8 relative w-full max-w-full">
          <div className={`max-w-5xl mx-auto w-full px-2 md:px-4 ${isTransitioning ? 'content-exit' : 'content-enter'}`}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Modal Popup */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 lg:p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-gray-800 border border-emerald-500/50 rounded-lg max-w-3xl w-full max-h-[90vh] lg:max-h-[80vh] overflow-y-auto p-4 lg:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-start gap-3 lg:gap-4 mb-4 lg:mb-6">
              <div className="bg-emerald-500/20 p-3 lg:p-4 rounded-lg">
                {selectedItem.icon}
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-emerald-400 mb-1 lg:mb-2">{selectedItem.name || selectedItem.title}</h2>
                <p className="text-gray-400 font-mono text-xs lg:text-sm">{selectedItem.tech || selectedItem.period}</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-sm lg:text-base text-gray-300 leading-relaxed mb-4">{selectedItem.details}</p>
              
              {selectedItem.highlights && (
                <div className="mt-6">
                  <h3 className="text-lg lg:text-xl font-bold text-cyan-400 mb-3">Key Achievements</h3>
                  <ul className="space-y-2">
                    {selectedItem.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start text-sm lg:text-base text-gray-300">
                        <span className="text-emerald-400 mr-2">▹</span>
                        <span>{highlight}</span>
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
                  className="inline-flex items-center gap-2 mt-6 px-4 lg:px-6 py-2 lg:py-3 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all border border-emerald-500/30 text-sm lg:text-base"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Transcript Modal */}
      {showTranscript && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 lg:p-4" onClick={() => setShowTranscript(null)}>
          <div className="bg-gray-800 border border-emerald-500/50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-4 lg:p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowTranscript(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-emerald-400 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl lg:text-3xl font-bold text-emerald-400 mb-6">Academic Transcript</h2>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="aspect-[8.5/11] bg-gray-700 rounded flex items-center justify-center">
                <iframe
                  src={showTranscript}
                  className="w-full h-full rounded"
                  title="Academic Transcript"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              
                <a href={showTranscript}
                download={`Manas_Aggrawal_Transcript_${showTranscript.split('/').pop()}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all border border-emerald-500/50"
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
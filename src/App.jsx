import React, { useState, useEffect } from 'react';
import { Download, Mail, Phone, Linkedin, Github, FileCode, Code2, Database, Cloud, Settings, Terminal, ExternalLink, X, Book, Package, TrendingUp, User, Briefcase, FolderGit2, Award, Home, SunMediumIcon, BookAIcon, BookImageIcon } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [selectedItem, setSelectedItem] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fullText = "Backend Engineer | System Architect";
  
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
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Award className="w-4 h-4" /> },
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

  const featuredItems = [
    {
      title: "Performance Monitoring Tool",
      description: "npm package for distributed tracing and error tracking",
      icon: <Package className="w-5 h-5" />,
      link: "https://www.npmjs.com/package/nodejs-observability",
      stats: "200+ downloads"
    },
    {
      title: "Scalable Systems",
      description: "System design case study based on a real project I worked on",
      icon: <Book className="w-5 h-5" />,
      link: "https://medium.com/@manasagg7199/five-stages-to-scalable-my-system-design-journey-a556b2b43446",
      stats: "Medium Article"
    }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-emerald-400 font-mono">About Me</h2>
            
            <div className="bg-gray-800 border border-emerald-500/30 rounded-lg p-6">
              <p className="text-lg text-gray-300 leading-relaxed mb-4">
                <span className="text-emerald-400 font-mono">const profile = </span>
                Experienced Software Engineer with over 3.5 years of expertise in backend engineering, building scalable architectures, distributed systems, and high-performance services.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Currently pursuing MS in Computer Science at Northeastern University (GPA: 3.75).
              </p>
              <p className="text-gray-300 leading-relaxed">
                Serving as Research Apprentice for "Typed Conversational Interfaces" under Prof Chris Martens and Lead Graduate Teaching Assistant for Software Engineering.
              </p>
            </div>

            <div className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Featured Work</h3>
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
                        <h4 className="font-bold text-gray-200 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-400 mb-1">{item.description}</p>
                        <span className="text-xs text-cyan-400 font-mono">{item.stats}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-emerald-400 font-mono">Work Experience</h2>
            {experience.map((job, idx) => (
              <div key={idx} className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{job.title}</h3>
                    <p className="text-xl text-gray-300">{job.company}</p>
                  </div>
                  <div className="text-right text-gray-400">
                    <p className="font-mono text-sm">{job.period}</p>
                    <p className="text-sm">{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 mb-4">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-emerald-400 mr-2">▹</span>
                      <span className="text-sm">{highlight}</span>
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
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-emerald-400 font-mono">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
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
                  <h3 className="text-xl font-bold mb-2 text-emerald-400">{project.name}</h3>
                  <p className="text-sm text-gray-400 mb-3 font-mono">{project.tech}</p>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  <button className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center gap-1">
                    Read more... <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-emerald-400 font-mono">Technical Skills</h2>
            <div className="grid md:grid-cols-2 gap-6">
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
                      <span key={i} className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-mono border border-emerald-500/30">
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
      <h2 className="text-4xl font-bold text-emerald-400 font-mono">Get In Touch</h2>
      
      <div className="bg-gray-800 border border-emerald-500/30 rounded-lg p-8 text-center">
        <p className="text-xl text-gray-300 mb-8">
          Let's build something amazing together! 🚀
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <a 
            href="mailto:aggrawal.m@northeastern.edu"
            className="flex items-center justify-center gap-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 hover:scale-105 transition-all group"
          >
            <Mail className="w-8 h-8 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
            <div className="text-left">
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg text-gray-200 font-mono">aggrawal.m@northeastern.edu</p>
            </div>
          </a>
          
          <a 
            href="tel:+18572651533"
            className="flex items-center justify-center gap-3 bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-500 hover:scale-105 transition-all group"
          >
            <Phone className="w-8 h-8 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
            <div className="text-left">
              <p className="text-sm text-gray-400">Phone</p>
              <p className="text-lg text-gray-200 font-mono">(857) 265-1533</p>
            </div>
          </a>
        </div>

        <div className="flex gap-6 justify-center mb-8">
          <a 
            href="https://www.linkedin.com/in/manasaggrawal07/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 bg-gray-900/50 border border-emerald-500/30 rounded-lg p-6 hover:border-emerald-500 hover:scale-105 transition-all w-32"
          >
            <Linkedin className="w-10 h-10 text-emerald-400" />
            <span className="text-sm text-gray-300">LinkedIn</span>
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
    <div className="bg-gray-900 text-gray-100 min-h-screen flex">
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
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
      `}</style>

      {/* Cute Mascot - Owl */}
      <div className="fixed bottom-6 right-6 z-50 group cursor-pointer">
        <div className="relative">
          <div className="text-5xl animate-bounce hover:scale-110 transition-transform">🦉</div>
          <div className="absolute -top-16 right-0 bg-gray-800 border border-emerald-500/50 rounded-lg px-4 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-sm text-emerald-400 font-mono">Hoot! I'm Manas's coding buddy 🦉</p>
          </div>
        </div>
      </div>

      {/* Left Sidebar - Profile */}
      <aside className="w-80 bg-gray-800/50 border-r border-gray-700 p-8 flex flex-col items-center sticky top-0 h-screen overflow-y-auto">
        <div className="text-center mb-6">
          {/* Profile Picture Placeholder */}
          <img src="/profile.png" alt="Manas Aggrawal" className="w-40 h-40 rounded-full object-cover mb-4 mx-auto border-4 border-emerald-400" />
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            MANAS AGGRAWAL
          </h1>
          
          <p className="text-sm font-mono text-gray-400 h-8 mb-4">
            {typedText}<span className="animate-pulse">|</span>
          </p>

          {/* Availability Banner - Prominent */}
          <div className="bg-emerald-500/20 border-2 border-emerald-500/50 rounded-lg p-4 mb-6 w-full animate-pulse-slow">
            <p className="text-emerald-400 font-semibold mb-2 flex items-center justify-center gap-2">
              <TrendingUp className="w-4 h-4" />
              🎯 Availability
            </p>
            <p className="text-xs text-gray-300 mb-2 leading-relaxed">
              Open to <span className="text-cyan-400 font-semibold">Winter 2026 internships, Summer 2026 internships and Summer 2026 full-time roles</span>
            </p>
            <p className="text-xs text-gray-400">
              Note: If pursuing internships, graduation will be December 2026
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <a href="https://www.linkedin.com/in/manasaggrawal07/" className="hover:text-emerald-400 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="https://github.com/manas-aggrawal" className="hover:text-emerald-400 transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href="mailto:aggrawal.m@northeastern.edu" className="hover:text-emerald-400 transition-colors">
            <Mail className="w-6 h-6" />
          </a>
          <a href="https://leetcode.com/u/aggrawal_manas/" className="hover:text-emerald-400 transition-colors">
            <Code2 className="w-6 h-6" />
          </a>
          <a href="https://medium.com/@manasagg7199" className="hover:text-emerald-400 transition-colors">
            <BookAIcon className="w-6 h-6" />
          </a>
        </div>

        <a
          href="/resume.pdf"
          download="Manas_Aggrawal_Resume.pdf"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg font-mono hover:bg-emerald-500/30 transition-all border border-emerald-500/50 mb-6"
        >
          <Download className="w-4 h-4" />
          Resume
        </a>

        <div className="text-sm text-gray-400 space-y-2 text-center mb-6">
          <p className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4" /> (857) 265-1533
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" /> Boston, MA
          </p>
        </div>

        <div className="w-full border-t border-gray-700 pt-6">
          <p className="text-xs text-gray-500 text-center font-mono">
            © 2025 Manas Aggrawal
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navigation */}
        <nav className="bg-gray-800/50 border-b border-gray-700 px-8 py-4 sticky top-0 z-40 backdrop-blur">
          <div className="flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                  activeSection === item.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                    : 'text-gray-400 hover:text-emerald-400 hover:bg-gray-700/50'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className={`max-w-5xl mx-auto ${isTransitioning ? 'content-exit' : 'content-enter'}`}>
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Modal Popup */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-gray-800 border border-emerald-500/50 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-emerald-500/20 p-4 rounded-lg">
                {selectedItem.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-emerald-400 mb-2">{selectedItem.name || selectedItem.title}</h2>
                <p className="text-gray-400 font-mono text-sm">{selectedItem.tech || selectedItem.period}</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">{selectedItem.details}</p>
              
              {selectedItem.highlights && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">Key Achievements</h3>
                  <ul className="space-y-2">
                    {selectedItem.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start text-gray-300">
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
                  className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all border border-emerald-500/30"
                >
                  View Project <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
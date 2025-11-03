import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Github, FileCode, Code2, Database, Cloud, Settings, Terminal, ExternalLink, X, Book, Package, TrendingUp } from 'lucide-react';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showFeatured, setShowFeatured] = useState(false);
  const fullText = "Backend Engineer | System Architect | Problem Solver";
  
  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      
      // Show featured section after scrolling past hero (100vh)
      if (newScrollY > window.innerHeight * 0.5) {
        setShowFeatured(true);
      } else {
        setShowFeatured(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const gearRotation = scrollY * 0.5;
  const parallaxOffset = scrollY * 0.3;

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
        "Developed real-time tracking and competitive scoring algorithm using Node.js/PostgreSQL with read replicas and connection pooling to serve 100K+ active users, for oddchecker’s betting platform",

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
      tech: "Node.js, TypeScript, AWS X-Ray, AWS Distro for OpenTelemetry, npm, amazon cloudwatch",
      description: "Published npm package with 200+ downloads enabling distributed tracing, reducing debugging time by ~60%",
      icon: <Code2 className="w-6 h-6" />,
      details: "A comprehensive observability package enabling distributed tracing to Node.js applications. Built on OpenTelemetry standards, it automatically instruments HTTP requests, database queries, and async operations with zero code changes required. Integrates seamlessly with AWS X-Ray, Jaeger, and other tracing backends. It has business metrics, automatic error tracking, and performance profiling capabilities. Published on npm with full TypeScript support and comprehensive documentation. Real-world usage across 10+ engineering teams demonstrated a 60% reduction in mean time to debug production issues, with particularly strong improvements in identifying performance bottlenecks in microservices architectures.",
      link: "https://www.npmjs.com/package/nodejs-observability"
    },
    {
      name: "Advanced Image Processor",
      tech: "Java, SwingUI, Design Patterns",
      description: "Extensible application with SOLID principles supporting 10+ operations",
      icon: <Terminal className="w-6 h-6" />,
      details: "A sophisticated image processing application showcasing advanced software engineering principles and design patterns. The architecture implements MVC pattern for clean separation of concerns, Strategy pattern for pluggable image operations, Factory pattern for operation creation, and Command pattern for undo/redo functionality. Supports 10+ image operations including filters (blur, sharpen, edge detection), transformations (rotate, flip, resize), color adjustments (brightness, contrast, saturation), and advanced operations like seam carving for content-aware resizing. The extensible design allows new operations to be added without modifying existing code, demonstrating the Open/Closed Principle. Includes a custom SwingUI with real-time preview, operation history, and batch processing capabilities. The codebase serves as an excellent demonstration of applying SOLID principles and design patterns in a real-world application.",
      link: "https://github.com/manas-aggrawal/Advanced-Image-Manipulation-and-Enhancement-Tool"
    },
    {
      name: "NestJs Backend Framework",
      tech: "Nodejs, Nestjs, PostgreSQL, Prisma ORM, Sentry, AWS OpenTelemetry, Docker, Git",
      description: "A production-ready NestJS framework with authentication, database, and all the essentials pre-configured. Free to use, fork, and customize!",
      icon: <Terminal className="w-6 h-6" />,
      details: "🔐 JWT Authentication - Access & refresh tokens ready to go" +
", 🗄️ Prisma ORM - Type-safe database with migrations"
+", 🐳 Docker - Containerized development environment"
+", 📝 Swagger - Auto-generated API documentation"
+", ✅ Validation - Request validation with Joi"
+", 🎯 CRUD Generator - Scaffold resources instantly"
+", 🔑 Password Recovery - Forgot password flow included"
+", 🎨 Code Quality - ESLint & Prettier configured"
+", 🏗️ Clean Architecture - Modular, scalable structure",
      link: "https://github.com/manas-aggrawal/nestjs-boilerplate"
    },
    {
      name: "Toy Compiler - Academic project",
      tech: "Racket Language, parser, abstract syntax trees",
      description: "A simple functional programming language compiler implemented in Racket as part of a Programming Languages course (PL CS5400)",
      icon: <Terminal className="w-6 h-6" />,
      details: "TOY is a minimalist functional language that supports:"+

" First-class functions with lexical scoping, "+
"Local variable bindings, "+
"Conditional expressions, "+
"Primitive arithmetic and comparison operations, "+
"Function application and closures, ",
      link: "https://github.com/manas-aggrawal/Toy-Compiler"
    },
    {
      name: "Personal Finance App",
      tech: "Android, Java, Kotlin, Firebase, Room, MPAndroidChart",
      description: "Student budgeting app with expense tracking, real-time alerts, and visual analytics",
      icon: <FileCode className="w-6 h-6" />,
      details: "A full-featured Android application designed specifically for college students to manage their finances effectively. Implements a clean architecture with MVVM pattern, Room database for offline-first functionality, and Firebase for cloud sync and real-time notifications. Users can create custom budget categories, track expenses with photo receipts, set spending limits, and receive push notifications when approaching budget thresholds. The analytics dashboard uses MPAndroidChart to visualize spending patterns with interactive pie charts, line graphs for trends over time, and category breakdowns. Features include recurring expense tracking, split payments with friends, and export capabilities for tax reporting. Built with Material Design principles for an intuitive, modern user experience.",
      link: "#"
    }
  ];

  const skills = {
    "Languages": ["JavaScript", "TypeScript", "Java", "C++", "Python"],
    "Frameworks": ["Node.js", "Express.js", "NestJS", "Django", "Laravel", "React"],
    "Database": ["PostgreSQL", "MySQL", "MongoDB", "Elasticsearch", "DynamoDB", "Firebase"],
    "Cloud & DevOps": ["AWS Lambda", "S3", "SQS", "X-Ray", "Docker", "CI/CD", "ECS"],
    "Others": ["Git", "Sentry", "OpenTelemetry", "Ubuntu", "REST APIs", "web architecture", "frontend", "agile", "SDLC"]
  };

  const featuredItems = [
    {
      type: "npm",
      title: "Observability tool",
      description: "Distributed tracing & error tracking tool",
      icon: <Package className="w-5 h-5" />,
      link: "https://www.npmjs.com/package/nodejs-observability",
      stats: "200+ downloads"
    },
    {
      type: "medium",
      title: "Scalable Systems Case Study",
      description: "System design case study based on serverless analytics project I did",
      icon: <Book className="w-5 h-5" />,
      link: "https://medium.com/@manasagg7199/five-stages-to-scalable-my-system-design-journey-a556b2b43446",
      stats: ""
    },
    // {
    //   type: "achievement",
    //   title: "Open Source Contributor",
    //   description: "Active in dev communities",
    //   icon: <TrendingUp className="w-5 h-5" />,
    //   stats: "10+ repos"
    // }
  ];

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen relative overflow-x-hidden w-full">
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          width: 100%;
        }
      `}</style>
      
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translateY(${parallaxOffset}px)`
        }} />
      </div>

      {/* Floating gear icon */}
      <Settings 
        className="fixed top-8 right-8 w-16 h-16 text-emerald-500 opacity-30 z-40"
        style={{ transform: `rotate(${gearRotation}deg)` }}
      />

      {/* Cute Mascot - Owl (symbolizing wisdom/knowledge) */}
      <div className="fixed bottom-4 right-8 z-50 group cursor-pointer">
        <div className="relative">
          <div className="text-6xl animate-bounce hover:scale-110 transition-transform">
            🦉
          </div>
          <div className="absolute -top-16 right-1 bg-gray-800 border border-emerald-500/50 rounded-lg px-4 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-sm text-emerald-400 font-mono">Hoot! I'm Manas's coding buddy 🦉</p>
          </div>
        </div>
      </div>

      {/* Subtle hint when featured section is hidden */}
      {!showFeatured && (
        <div className="hidden xl:block fixed right-0 top-1/2 -translate-y-1/2 z-40">
          <div className="w-2 h-16 bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent animate-pulse rounded-l-full" />
        </div>
      )}

      {/* Featured Section - Right Sidebar */}
      <div className={`hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-50 w-72 transition-all duration-700 ease-out ${
        showFeatured ? 'translate-x-0 opacity-100' : 'translate-x-96 opacity-0'
      }`}>
        <div className="bg-gray-800/90 backdrop-blur border border-emerald-500/30 rounded-lg p-6 shadow-2xl hover:border-emerald-500/60 transition-colors">
          <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 animate-pulse" />
            Featured Work
          </h3>
          <div className="space-y-4">
            {featuredItems.map((item, idx) => (
              <a 
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/80 transition-all border border-cyan-500/20 hover:border-cyan-500/50 group"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-200 mb-1 truncate">{item.title}</h4>
                    <p className="text-xs text-gray-400 mb-2">{item.description}</p>
                    <span className="text-xs text-cyan-400 font-mono">{item.stats}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </div>
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

              {selectedItem.link && (
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-8">
        <div className="text-center z-10">
          <div className="mb-6 inline-block">
            <div className="text-emerald-500 text-6xl font-mono mb-4 animate-pulse">&lt;/&gt;</div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            MANAS AGGRAWAL
          </h1>
          <div className="text-2xl md:text-3xl font-mono text-gray-400 h-12 mb-8">
            {typedText}<span className="animate-pulse">|</span>
          </div>
          <div className="flex gap-6 justify-center mb-8">
            <a href="https://www.linkedin.com/in/manasaggrawal07/" className="hover:text-emerald-400 transition-colors">
              <Linkedin className="w-8 h-8" />
            </a>
            <a href="https://github.com/manas-aggrawal" className="hover:text-emerald-400 transition-colors">
              <Github className="w-8 h-8" />
            </a>
            <a href="mailto:aggrawal.m@northeastern.edu" className="hover:text-emerald-400 transition-colors">
              <Mail className="w-8 h-8" />
            </a>
          </div>
          <div className="text-gray-400 space-y-2">
            <p className="flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> (857) 265-1533</p>
            <p>Boston, MA</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-8 xl:pr-80 relative" style={{ transform: `translateY(${parallaxOffset * -0.2}px)` }}>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-8 text-emerald-400 font-mono">
            <span className="text-gray-500">01.</span> About
          </h2>
          <div className="bg-gray-800 border border-emerald-500/30 rounded-lg p-8 shadow-2xl">
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">
                <span className="text-emerald-400 font-mono">const summary = </span> 
                Experienced Software Engineer with over 3.5 years of expertise in backend engineering building scalable architectures, distributed systems, and high-performance backend services.
              </p>
              <p>Currently pursuing MS in Computer Science student at Northeastern University (GPA: 3.75).</p>
              <p>
                Currently Research Apprentice for "Typed Conversational Interfaces" under Prof Chris Martens and also serving as Graduate Teaching Assistant for Software Engineering.
              </p>
              <p>
                Passionate about system design, clean code, and solving complex engineering challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-8 xl:pr-80 relative" style={{ transform: `translateY(${parallaxOffset * -0.3}px)` }}>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-8 text-emerald-400 font-mono">
            <span className="text-gray-500">02.</span> Experience
          </h2>
          <div className="space-y-8">
            {experience.map((job, idx) => (
              <div key={idx} className="bg-gray-800 border border-cyan-500/30 rounded-lg p-8 hover:border-cyan-500 transition-all shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-cyan-400">{job.title}</h3>
                    <p className="text-xl text-gray-300">{job.company}</p>
                  </div>
                  <div className="text-gray-400 mt-2 md:mt-0">
                    <p className="font-mono text-sm">{job.period}</p>
                    <p className="text-sm">{job.location}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 mb-4">
                  {job.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-emerald-400 mr-2">▹</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setSelectedItem(job)}
                  className="text-emerald-400 hover:text-emerald-300 font-mono text-sm flex items-center gap-2 mt-2 transition-colors"
                >
                  Read more... <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-8 xl:pr-80 relative" style={{ transform: `translateY(${parallaxOffset * -0.4}px)` }}>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-8 text-emerald-400 font-mono">
            <span className="text-gray-500">03.</span> Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="bg-gray-800 border border-emerald-500/30 rounded-lg p-6 hover:scale-105 transition-transform shadow-xl cursor-pointer"
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
                <button className="text-emerald-400 hover:text-emerald-300 font-mono text-xs flex items-center gap-1 transition-colors">
                  Read more... <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-8 xl:pr-80 relative" style={{ transform: `translateY(${parallaxOffset * -0.5}px)` }}>
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-8 text-emerald-400 font-mono">
            <span className="text-gray-500">04.</span> Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], idx) => (
              <div key={idx} className="bg-gray-800 border border-cyan-500/30 rounded-lg p-6 shadow-xl">
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
      </section>

      {/* Footer/Contact */}
      <footer className="py-12 px-8 xl:pr-80 border-t border-gray-800 relative">
        <div className="max-w-4xl mx-auto w-full text-center">
          <p className="text-gray-400 mb-4 font-mono">Ready to build something amazing together?</p>
          <a href="mailto:aggrawal.m@northeastern.edu" className="inline-block px-8 py-3 border-2 border-emerald-500 text-emerald-400 rounded-lg font-mono hover:bg-emerald-500/10 transition-all">
            Get In Touch
          </a>
          <p className="text-gray-600 mt-8 text-sm font-mono">© 2025 Manas Aggrawal. Built with React & Tailwind.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
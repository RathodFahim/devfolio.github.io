import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Code, 
  Database, 
  Cpu, 
  Terminal, 
  User, 
  GraduationCap, 
  Briefcase, 
  Download,
  ChevronDown
} from 'lucide-react';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  // Resume Data
  const personalInfo = {
    name: "Mohammadfahim Rathod",
    role: "Full Stack Developer & IT Student",
    email: "rathodrathod75850@gmail.com",
    phone: "(+91) 6351144224",
    github: "https://github.com/rathod-fahim", // Inferred from @rathod-fahim
    linkedin: "https://linkedin.com/in/rathod-fahim", // Inferred placeholder
    summary: "A motivated and proactive Information Technology student with a strong foundation in full-stack web development and a passion for continuous learning. Eager to apply a problem-solving mindset and hands-on experience in HTML, CSS, JavaScript, and Java to contribute to challenging projects. Keen interest in exploring Data Science and AI/ML."
  };

  const skills = [
    { name: "Java", icon: <Code size={20} />, level: "Advanced" },
    { name: "HTML & CSS", icon: <User size={20} />, level: "Advanced" },
    { name: "JavaScript", icon: <Terminal size={20} />, level: "Intermediate" },
    { name: "SQL", icon: <Database size={20} />, level: "Intermediate" },
    { name: "C++", icon: <Cpu size={20} />, level: "Intermediate" },
    { name: "Python", icon: <Code size={20} />, level: "Intermediate" },
  ];

  const education = [
    {
      degree: "B.Tech in Information Technology",
      school: "Parul University",
      year: "Currently in 8th Semester",
      description: "Focusing on advanced computing, AI/ML, and full-stack development."
    },
    {
      degree: "Diploma in Information Technology",
      school: "Parul University",
      year: "Completed 2023",
      description: "Built a strong foundation in computer science fundamentals."
    },
    {
      degree: "Secondary Education (10th)",
      school: "MES Boys",
      year: "GSHEB",
      description: "Academic foundation."
    }
  ];

  const projects = [
    {
      title: "Fake News Detection",
      description: "Developed an AI/ML app to detect fake news using Python and various ML libraries. Implemented TF-IDF Vectorization for text feature extraction.",
      tech: ["Python", "Pandas", "Numpy", "NLTK", "Scikit-Learn"],
      link: "#", // Placeholder for actual link
      github: "https://github.com/rathod-fahim" // Placeholder
    },
    {
      title: "Ping-Pong Game",
      description: "A classic Ping-Pong game using vanilla JavaScript. Features two-player score tracking, responsive controls, and progressive difficulty.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "#", // Placeholder
      github: "https://github.com/rathod-fahim" // Placeholder
    }
  ];

  const achievements = [
    "Selected participant in National AI Olympiad (NAIO) conducted by TalentSprint."
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-teal-500 selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollToSection('home')}>
            MR.
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            {['About', 'Skills', 'Education', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`${activeSection === item.toLowerCase() ? 'text-teal-400' : 'text-slate-400 hover:text-white'} transition-colors duration-300`}
              >
                {item}
              </button>
            ))}
          </div>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="hidden md:block px-5 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium transition-all shadow-lg shadow-teal-500/20 text-sm"
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-16">
        {/* Abstract Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

        <div className={`container mx-auto px-6 text-center z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium">
            Available for opportunities
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Hi, I'm <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">{personalInfo.name}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {personalInfo.role}
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3.5 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all transform hover:-translate-y-1 shadow-lg"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3.5 rounded-full border border-slate-600 hover:border-teal-500 hover:text-teal-400 transition-all transform hover:-translate-y-1"
            >
              Contact Me
            </button>
          </div>

          <div className="flex justify-center gap-6 text-slate-400">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:scale-110 transform"><Github size={24} /></a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors hover:scale-110 transform"><Linkedin size={24} /></a>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-teal-400 transition-colors hover:scale-110 transform"><Mail size={24} /></a>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
            <ChevronDown className="text-slate-500" size={32} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center flex items-center justify-center gap-3">
            <User className="text-teal-500" /> About Me
          </h2>
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-700 shadow-xl hover:border-teal-500/50 transition-all duration-300">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {personalInfo.summary}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                 <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                   <Code size={24} />
                 </div>
                 <div>
                   <h4 className="font-semibold text-white">Web Development</h4>
                   <p className="text-sm text-slate-400">Full Stack Experience</p>
                 </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                 <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                   <Database size={24} />
                 </div>
                 <div>
                   <h4 className="font-semibold text-white">Data Science</h4>
                   <p className="text-sm text-slate-400">AI/ML Enthusiast</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center flex items-center justify-center gap-3">
            <Terminal className="text-teal-500" /> Technical Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="group p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-teal-500 hover:bg-slate-800 transition-all duration-300 flex flex-col items-center justify-center gap-3 text-center cursor-default transform hover:-translate-y-2"
              >
                <div className="text-teal-500 group-hover:text-teal-400 transition-colors group-hover:scale-110 duration-300">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-slate-200">{skill.name}</h3>
                <span className="text-xs text-slate-500 uppercase tracking-wider">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section id="education" className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center flex items-center justify-center gap-3">
            <GraduationCap className="text-teal-500" /> Education
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-8 md:pl-0">
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-700 transform -translate-x-1/2"></div>
                
                <div className={`md:flex items-center justify-between gap-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-1"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-teal-500 rounded-full border-4 border-slate-900 transform md:-translate-x-1/2 mt-1.5"></div>
                  
                  <div className="flex-1 mb-8 md:mb-0">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors shadow-lg">
                      <span className="text-teal-400 text-sm font-bold tracking-wider mb-2 block">{edu.year}</span>
                      <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                      <h4 className="text-slate-400 mb-3">{edu.school}</h4>
                      <p className="text-slate-500 text-sm">{edu.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-center flex items-center justify-center gap-3">
            <Briefcase className="text-teal-500" /> Academic Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-teal-500/50 transition-all duration-300 flex flex-col h-full">
                {/* Image Placeholder (Gradient since no images provided) */}
                <div className={`h-48 w-full ${index === 0 ? 'bg-gradient-to-br from-purple-900 to-indigo-900' : 'bg-gradient-to-br from-blue-900 to-teal-900'} relative p-6 flex items-end overflow-hidden`}>
                  <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent transform scale-150 group-hover:scale-100 transition-transform duration-700"></div>
                  <h3 className="text-2xl font-bold text-white relative z-10">{project.title}</h3>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-slate-400 mb-6 leading-relaxed flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-300 text-xs font-medium border border-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-4 border-t border-slate-700">
                    <a href={project.github} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                      <Github size={18} /> <span className="text-sm font-medium">View Code</span>
                    </a>
                    <a href={project.link} className="flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors ml-auto">
                      <ExternalLink size={18} /> <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-slate-800/50 rounded-2xl p-8 max-w-3xl mx-auto border border-slate-700 text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Key Achievement</h3>
            <p className="text-slate-300 flex items-center justify-center gap-2">
              <span className="text-yellow-500 text-xl">★</span> {achievements[0]}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Let's Connect</h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-teal-500 transition-all group">
              <Mail className="text-teal-500 group-hover:scale-110 transition-transform" />
              <span className="text-slate-200">{personalInfo.email}</span>
            </a>
            <a href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-teal-500 transition-all group">
              <Phone className="text-teal-500 group-hover:scale-110 transition-transform" />
              <span className="text-slate-200">{personalInfo.phone}</span>
            </a>
          </div>

          <footer className="text-slate-600 text-sm">
            <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
            <p className="mt-2">Built with React & Tailwind CSS</p>
          </footer>
        </div>
      </section>
      
      {/* Floating Action Button for easy contact on mobile */}
      <a 
        href={`mailto:${personalInfo.email}`}
        className="fixed bottom-6 right-6 p-4 bg-teal-500 text-white rounded-full shadow-lg shadow-teal-500/40 md:hidden z-50 hover:scale-110 transition-transform"
      >
        <Mail size={24} />
      </a>
    </div>
  );
};

export default Portfolio;
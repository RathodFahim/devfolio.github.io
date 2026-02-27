import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Zap,
  Heart
} from 'lucide-react';

/* ───── Intersection Observer Hook ───── */
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ───── Floating Sticker Component ───── */
const Sticker = ({ emoji, className }) => (
  <span className={`sticker select-none pointer-events-none absolute text-3xl md:text-5xl opacity-60 ${className}`} aria-hidden>
    {emoji}
  </span>
);

/* ───── Typewriter ───── */
const Typewriter = ({ words, speed = 100, pause = 1800 }) => {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const timer = setTimeout(() => {
      if (!deleting) {
        setSub(word.slice(0, sub.length + 1));
        if (sub.length + 1 === word.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setSub(word.slice(0, sub.length - 1));
        if (sub.length - 1 === 0) { setDeleting(false); setIndex(i => i + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [sub, deleting, index, words, speed, pause]);

  return <span>{sub}<span className="typewriter-cursor">|</span></span>;
};

/* ───── Mouse Glow ───── */
const useMouseGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return pos;
};

/* ─────────── PORTFOLIO ─────────── */
const Portfolio = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [navScrolled, setNavScrolled] = useState(false);
  const mouse = useMouseGlow();

  useEffect(() => {
    setHeroVisible(true);
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
      const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
      const scrollPos = window.scrollY + 120;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(s);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  }, []);

  /* ── Reveal refs ── */
  const [aboutRef, aboutVis] = useReveal();
  const [skillsRef, skillsVis] = useReveal();
  const [eduRef, eduVis] = useReveal();
  const [projRef, projVis] = useReveal();
  const [contactRef, contactVis] = useReveal();

  // ──────────── DATA (untouched) ────────────
  const personalInfo = {
    name: "Mohammadfahim Rathod",
    role: "Full Stack Developer & IT Student",
    email: "rathodrathod75850@gmail.com",
    phone: "(+91) 6351144224",
    github: "https://github.com/rathod-fahim",
    linkedin: "https://linkedin.com/in/rathod-fahim",
    summary: "A motivated and proactive Information Technology student with a strong foundation in full-stack web development and a passion for continuous learning. Eager to apply a problem-solving mindset and hands-on experience in HTML, CSS, JavaScript, and Java to contribute to challenging projects. Keen interest in exploring Data Science and AI/ML."
  };

  const skills = [
    { name: "Java", icon: <Code size={24} /> },
    { name: "HTML & CSS", icon: <User size={24} /> },
    { name: "JavaScript", icon: <Terminal size={24} /> },
    { name: "SQL", icon: <Database size={24} /> },
    { name: "C++", icon: <Cpu size={24} /> },
    { name: "Python", icon: <Code size={24} /> },
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
      link: "#",
      github: "https://github.com/rathod-fahim"
    },
    {
      title: "Ping-Pong Game",
      description: "A classic Ping-Pong game using vanilla JavaScript. Features two-player score tracking, responsive controls, and progressive difficulty.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "#",
      github: "https://github.com/rathod-fahim"
    }
  ];

  const achievements = [
    "Selected participant in National AI Olympiad (NAIO) conducted by TalentSprint."
  ];

  const projectStickers = ['🤖', '🎮'];
  const eduStickers = ['🎓', '📚', '🏫'];

  // ──────────── RENDER ────────────
  return (
    <div className="portfolio-root min-h-screen bg-[#0a0a1a] text-gray-100 font-sans selection:bg-violet-500/40 selection:text-white overflow-x-hidden">

      {/* ── Mouse Glow ── */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(139,92,246,0.06), transparent 60%)`
        }}
      />

      {/* ═══ NAVIGATION ═══ */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navScrolled ? 'bg-[#0a0a1a]/90 backdrop-blur-xl shadow-lg shadow-black/20 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-center items-center">
          <div className="flex gap-1 p-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
            {['About', 'Skills', 'Education', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.toLowerCase()
                    ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        {/* Floating stickers */}
        <Sticker emoji="💻" className="top-[15%] left-[8%] sticker-float-1" />
        <Sticker emoji="🚀" className="top-[20%] right-[10%] sticker-float-2" />
        <Sticker emoji="⚡" className="bottom-[25%] left-[12%] sticker-float-3" />
        <Sticker emoji="🧠" className="bottom-[30%] right-[8%] sticker-float-1" />
        <Sticker emoji="🎯" className="top-[50%] left-[5%] sticker-float-2 text-2xl md:text-4xl" />
        <Sticker emoji="✨" className="top-[40%] right-[5%] sticker-float-3 text-2xl md:text-4xl" />

        <div className={`container mx-auto px-6 text-center z-10 transition-all duration-[1200ms] ease-out ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium animate-pulse-slow">
            <Sparkles size={14} /> Available for opportunities
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
            <span className="block text-gray-300 text-2xl md:text-3xl font-medium mb-4 tracking-normal">Hello, I'm</span>
            <span className="hero-gradient-text">{personalInfo.name}</span>
          </h1>

          <div className="text-xl md:text-3xl text-gray-400 mb-12 h-10 font-light">
            <Typewriter words={['Full Stack Developer', 'IT Student', 'AI/ML Enthusiast', 'Problem Solver']} />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button
              onClick={() => scrollTo('projects')}
              className="group px-8 py-4 rounded-2xl bg-violet-500 text-white font-bold hover:bg-violet-400 transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-violet-500/25 flex items-center justify-center gap-2"
            >
              View Projects <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 rounded-2xl border-2 border-gray-700 hover:border-violet-500 text-gray-300 hover:text-violet-300 font-bold transition-all duration-300 hover:-translate-y-1"
            >
              Contact Me
            </button>
          </div>

          <div className="flex justify-center gap-5">
            {[
              { href: personalInfo.github, icon: <Github size={22} />, hoverClass: 'hover:bg-gray-700 hover:text-white' },
              { href: personalInfo.linkedin, icon: <Linkedin size={22} />, hoverClass: 'hover:bg-blue-600 hover:text-white' },
              { href: `mailto:${personalInfo.email}`, icon: <Mail size={22} />, hoverClass: 'hover:bg-violet-500 hover:text-white' },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 hover:-translate-y-1 ${s.hoverClass}`}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollTo('about')}>
          <ChevronDown className="text-gray-600" size={32} />
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-28 relative">
        <Sticker emoji="👨‍💻" className="top-12 right-[10%] sticker-float-2" />
        <Sticker emoji="💡" className="bottom-12 left-[8%] sticker-float-3" />

        <div ref={aboutRef} className={`container mx-auto px-6 reveal-section ${aboutVis ? 'revealed' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">About Me</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">Who I Am <span className="inline-block">🙋‍♂️</span></h2>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-14">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 font-light">
                {personalInfo.summary}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    <Code size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Web Development</h4>
                    <p className="text-gray-400 text-sm">Full Stack Experience</p>
                  </div>
                  <Zap size={16} className="ml-auto text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    <Database size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Data Science</h4>
                    <p className="text-gray-400 text-sm">AI/ML Enthusiast</p>
                  </div>
                  <Zap size={16} className="ml-auto text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section id="skills" className="py-28 relative">
        <Sticker emoji="⚙️" className="top-16 left-[6%] sticker-float-1" />
        <Sticker emoji="🔥" className="bottom-16 right-[8%] sticker-float-3" />

        <div ref={skillsRef} className={`container mx-auto px-6 reveal-section ${skillsVis ? 'revealed' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">My Skills</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">Tech Stack <span className="inline-block">🛠️</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-violet-500/60 transition-all duration-500 flex flex-col items-center justify-center gap-4 cursor-default hover:-translate-y-3 hover:shadow-xl hover:shadow-violet-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-violet-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {skill.icon}
                </div>
                <h3 className="font-bold text-gray-200 group-hover:text-white transition-colors text-center">{skill.name}</h3>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ EDUCATION ═══ */}
      <section id="education" className="py-28 relative">
        <Sticker emoji="📖" className="top-20 right-[6%] sticker-float-2" />
        <Sticker emoji="🏆" className="bottom-20 left-[10%] sticker-float-1" />

        <div ref={eduRef} className={`container mx-auto px-6 reveal-section ${eduVis ? 'revealed' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">Education</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">My Journey <span className="inline-block">🎓</span></h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500 via-blue-500 to-teal-500 opacity-30 md:-translate-x-[1px]"></div>

            {education.map((edu, index) => (
              <div key={index} className={`relative flex items-start gap-8 mb-12 last:mb-0 edu-item ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                style={{ animationDelay: `${index * 150}ms` }}>
                {/* Content */}
                <div className="flex-1 ml-16 md:ml-0">
                  <div className="glass-card rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{eduStickers[index]}</span>
                      <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-wider">{edu.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">{edu.degree}</h3>
                    <h4 className="text-gray-400 mb-3 font-medium">{edu.school}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{edu.description}</p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>

                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-violet-500 border-4 border-[#0a0a1a] -translate-x-1/2 mt-8 z-10 shadow-lg shadow-violet-500/40"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className="py-28 relative">
        <Sticker emoji="🚀" className="top-20 left-[6%] sticker-float-3" />
        <Sticker emoji="💫" className="bottom-20 right-[10%] sticker-float-1" />

        <div ref={projRef} className={`container mx-auto px-6 reveal-section ${projVis ? 'revealed' : ''}`}>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">Academic Projects <span className="inline-block">🔬</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10">
                {/* Gradient Header */}
                <div className={`h-52 w-full relative p-8 flex flex-col justify-end overflow-hidden ${
                  index === 0
                    ? 'bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800'
                    : 'bg-gradient-to-br from-blue-600 via-cyan-700 to-teal-800'
                }`}>
                  {/* Animated mesh */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-40 h-40 rounded-full bg-white/20 -top-10 -right-10 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute w-32 h-32 rounded-full bg-white/10 bottom-0 left-10 group-hover:scale-125 transition-transform duration-700 delay-100"></div>
                  </div>
                  <span className="text-4xl mb-3">{projectStickers[index]}</span>
                  <h3 className="text-2xl md:text-3xl font-black text-white relative z-10">{project.title}</h3>
                </div>

                {/* Body */}
                <div className="bg-[#12122a] border border-white/10 border-t-0 rounded-b-3xl p-7">
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-300 text-xs font-semibold border border-violet-500/20 hover:border-violet-400/60 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-5 border-t border-white/10">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group/link">
                      <Github size={18} />
                      <span className="text-sm font-semibold group-hover/link:underline">Code</span>
                    </a>
                    <a href={project.link} className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors ml-auto group/link">
                      <ExternalLink size={18} />
                      <span className="text-sm font-semibold group-hover/link:underline">Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievement */}
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="glass-card rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute -top-6 -right-6 text-7xl opacity-20 rotate-12">🏅</div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">Achievement</span>
              <p className="text-lg text-gray-200 font-medium flex items-center justify-center gap-3 flex-wrap">
                <span className="text-2xl">⭐</span> {achievements[0]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="py-28 relative overflow-hidden">
        <Sticker emoji="📬" className="top-16 left-[8%] sticker-float-1" />
        <Sticker emoji="🤝" className="bottom-16 right-[6%] sticker-float-2" />
        <div className="orb orb-contact"></div>

        <div ref={contactRef} className={`container mx-auto px-6 text-center relative z-10 reveal-section ${contactVis ? 'revealed' : ''}`}>
          <div className="mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-400 text-xs font-bold uppercase tracking-widest mb-4">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">Let's Connect <span className="inline-block">💬</span></h2>
          </div>

          <p className="text-gray-400 mb-14 max-w-xl mx-auto text-lg font-light leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-5 mb-16">
            <a href={`mailto:${personalInfo.email}`}
              className="group flex items-center justify-center gap-4 px-8 py-5 glass-card rounded-2xl hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 rounded-xl bg-violet-500/20 text-violet-400 group-hover:scale-110 transition-transform">
                <Mail size={22} />
              </div>
              <span className="text-gray-200 font-medium">{personalInfo.email}</span>
            </a>
            <a href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="group flex items-center justify-center gap-4 px-8 py-5 glass-card rounded-2xl hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                <Phone size={22} />
              </div>
              <span className="text-gray-200 font-medium">{personalInfo.phone}</span>
            </a>
          </div>

          <footer className="text-gray-600 text-sm space-y-2">
            <p className="flex items-center justify-center gap-1">
              Made with <Heart size={14} className="text-red-400 animate-pulse" /> by {personalInfo.name}
            </p>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </footer>
        </div>
      </section>

      {/* ── Mobile FAB ── */}
      <a
        href={`mailto:${personalInfo.email}`}
        className="fixed bottom-6 right-6 p-4 bg-violet-500 text-white rounded-2xl shadow-xl shadow-violet-500/40 md:hidden z-50 hover:scale-110 transition-transform active:scale-95"
      >
        <Mail size={24} />
      </a>
    </div>
  );
};

export default Portfolio;
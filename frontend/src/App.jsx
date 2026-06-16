import React, { useState, useEffect, useRef } from 'react';

// Achievements Data Setup
const GALLERY_ITEMS = [
  {
    category: 'certificates',
    src: 'WhatsApp Image 2026-06-01 at 12.29.06 PM.jpeg',
    title: 'Technovation Finalist',
    desc: 'Official Certificate of Merit as a national finalist in the Technovation technical fest hosted by Anna University.'
  },
  {
    category: 'certificates',
    src: 'WhatsApp Image 2026-06-01 at 12.29.05 PM.jpeg',
    title: 'Hackverse Competitor',
    desc: 'Official participation and recognition credential at the Hackverse National Hackathon.'
  },
  {
    category: 'awards',
    src: 'WhatsApp Image 2026-06-01 at 12.29.05 PM (2).jpeg',
    title: 'National Innovation Award',
    desc: 'Recognized with an Innovation Award at Hackverse for developing elite full-stack applications.'
  },
  {
    category: 'events',
    src: 'WhatsApp Image 2026-06-01 at 12.29.05 PM (1).jpeg',
    title: 'National Hackverse Showcase',
    desc: "Saaiprasath S presenting his team's full-stack AI project to the distinguished judges."
  },
  {
    category: 'awards',
    src: 'WhatsApp Image 2026-06-01 at 12.28.53 PM.jpeg',
    title: 'Technovation Merit Award',
    desc: 'Meritorious award presented during the closing ceremony of Technovation at Anna University.'
  },
  {
    category: 'awards',
    src: 'WhatsApp Image 2026-06-01 at 12.28.49 PM.jpeg',
    title: 'Technical Presentation Winner',
    desc: 'Secured a top position for outstanding presentation slides and architecture diagrams.'
  },
  {
    category: 'awards',
    src: 'WhatsApp Image 2026-06-01 at 12.25.06 PM.jpeg',
    title: 'Mini Project Expo 2026 Winner',
    desc: 'Secured 1st Prize at the Department level exhibition for outstanding engineering execution.'
  },
  {
    category: 'events',
    src: 'WhatsApp Image 2026-06-01 at 12.25.05 PM.jpeg',
    title: 'Exhibition Project Demo',
    desc: 'Live application showcase showing active interface widgets to tech enthusiasts and guests.'
  }
];

const PROJECTS = [
  {
    category: 'ai web',
    src: 'Screenshot 2026-05-13 185403.png',
    title: 'ACCESS360',
    subtitle: 'AI Inclusive Crisis Response Platform',
    desc: 'A comprehensive platform featuring geo-spatial SOS reporting, adaptive AI assistance, real-time crisis mapping, and advanced safety analytics for community resilience.',
    tech: ['Next.js', 'Tailwind', 'AI SDK', 'Maps API'],
    github: 'https://github.com/SAAIPRASATHS/Access360',
    demo: 'https://access360.onrender.com',
    featured: true
  },
  {
    category: 'ai',
    src: 'Screenshot 2026-05-13 185619.png',
    title: 'DisasterPrep AI',
    subtitle: 'Health Intelligence Platform',
    desc: 'Disaster preparedness system with intelligent risk prediction, outbreak detection algorithms, and multilingual AI assistant for community health management.',
    tech: ['Python', 'ML Models', 'NLP', 'React'],
    github: 'https://github.com/SAAIPRASATHS/Disaster-Preparedness-Community-Health-Dashboard',
    demo: 'https://disaster-preparedness-community-health.onrender.com/',
    featured: false
  },
  {
    category: 'system',
    src: 'Screenshot 2026-05-13 185636.png',
    title: 'KPI Laptop Monitor',
    subtitle: 'Performance Monitoring System',
    desc: 'Comprehensive laptop monitoring system with real-time CPU tracking, disk health analysis, compliance reporting, and performance analytics dashboard.',
    tech: ['Python', 'Pandas', 'Matplotlib', 'Streamlit'],
    github: 'https://github.com/SAAIPRASATHS/KPI-LAPTOP-MONTORING-SYSTEM',
    demo: 'https://kpi-laptop-montoring-system-upnzrmdut8wsdcruv8gpae.streamlit.app',
    featured: false
  },
  {
    category: 'ai web',
    src: 'Screenshot 2026-06-16 091152.png',
    title: 'Multilingual Loan Advisor',
    subtitle: 'AI-Powered Financial Guidance Platform',
    desc: 'An intelligent loan advisory platform with multilingual voice & text support, real-time eligibility checking, AI-driven financial education, and dual-role access for borrowers and agents.',
    tech: ['React.js', 'Node.js', 'Groq AI', 'PostgreSQL', 'Multilingual NLP'],
    github: 'https://github.com/VRaghav1806/loan_agent',
    demo: 'https://loan-agent-omega.vercel.app/',
    featured: true
  }
];

const CERTIFICATIONS = [
  {
    title: 'NPTEL Design Thinking Certification',
    issuer: 'NPTEL (80% Elite + Silver)',
    badge: 'Elite + Silver',
    isNptel: true,
    icon: 'fas fa-lightbulb'
  },
  {
    title: 'Java Programming',
    issuer: 'Oracle',
    badge: 'Certified',
    icon: 'fab fa-java'
  },
  {
    title: 'MATLAB OnRamp',
    issuer: 'MathWorks',
    badge: 'Certified',
    icon: 'fas fa-wave-square'
  },
  {
    title: 'DSA using C & C++',
    issuer: 'Programming Course',
    badge: 'Completed',
    icon: 'fas fa-project-diagram'
  },
  {
    title: 'C Programming Training',
    issuer: 'Professional Course',
    badge: 'Completed',
    icon: 'fas fa-c'
  },
  {
    title: 'C++ Training',
    issuer: 'Professional Course',
    badge: 'Completed',
    icon: 'fas fa-code-branch'
  }
];

export default function App() {
  // --- SCROLL & NAVBAR STATES ---
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // --- TYPING ANIMATION STATES ---
  const [typedText, setTypedText] = useState('');
  const typingWords = [
    'AI Engineer in Progress',
    'Hackathon Finalist',
    'Full Stack MERN Developer',
    'Data Analytics Enthusiast',
  ];
  const wordIdx = useRef(0);
  const charIdx = useRef(0);
  const isDeleting = useRef(false);

  // --- FILTER STATES ---
  const [projFilter, setProjFilter] = useState('all');
  const [galleryCategory, setGalleryCategory] = useState('all');
  const [lightbox, setLightbox] = useState({ open: false, src: '', title: '', desc: '' });

  // --- CERTIFICATIONS CAROUSEL ---
  const [certPos, setCertPos] = useState(0);
  const certCardWidth = 264; // width + gap
  const totalCerts = CERTIFICATIONS.length;

  // --- STATS COUNTERS STATE ---
  const [stats, setStats] = useState({
    skillrack: 0,
    leetcode: 0,
    rating: 0,
    hackerrank: 0
  });

  // --- FORM SUBMISSION STATE ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [sending, setSending] = useState(false);

  // --- CANVAS & DOM REFS ---
  const canvasRef = useRef(null);

  // ==========================================
  // EFFECT: MOUSE GLOW TRAIL
  // ==========================================
  useEffect(() => {
    const glow = document.getElementById('mouse-glow');
    const handleMouseMove = (e) => {
      if (glow) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ==========================================
  // EFFECT: INTRO VIDEO MODAL HANDLERS
  // ==========================================
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVideoOpen]);

  // ==========================================
  // EFFECT: SCROLL PROGRESS, SCROLLED NAV & PARALLAX
  // ==========================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      setNavbarScrolled(scrollTop > 60);
      setShowBackToTop(scrollTop > 400);

      // Subtle parallax for hero orbs
      const orbs = document.querySelectorAll('.hero-orb');
      orbs.forEach((orb, i) => {
        orb.style.transform = `translateY(${scrollTop * (0.15 + i * 0.05)}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==========================================
  // EFFECT: INTERSECTION OBSERVER FOR REVEALS & STATS
  // ==========================================
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .skill-bar-fill');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed', 'animated');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));

    // Stats counter trigger observer
    const statsSection = document.getElementById('stats');
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          triggerStatsCounter();
          statsObserver.unobserve(statsSection);
        }
      },
      { threshold: 0.3 }
    );
    if (statsSection) statsObserver.observe(statsSection);

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  // Animate stats values
  const triggerStatsCounter = () => {
    const duration = 1800;
    const start = performance.now();
    const targets = { skillrack: 720, leetcode: 90, rating: 1458, hackerrank: 1 };

    const frame = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setStats({
        skillrack: Math.round(targets.skillrack * eased),
        leetcode: Math.round(targets.leetcode * eased),
        rating: Math.round(targets.rating * eased),
        hackerrank: Math.round(targets.hackerrank * eased)
      });

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };
    requestAnimationFrame(frame);
  };

  // ==========================================
  // EFFECT: TYPING EFFECT
  // ==========================================
  useEffect(() => {
    let timer;
    const speed = 90;
    const deleteSpeed = 50;
    const pause = 2000;

    const tick = () => {
      const currentWord = typingWords[wordIdx.current];
      if (!isDeleting.current) {
        setTypedText(currentWord.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === currentWord.length) {
          isDeleting.current = true;
          timer = setTimeout(tick, pause);
          return;
        }
      } else {
        setTypedText(currentWord.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          isDeleting.current = false;
          wordIdx.current = (wordIdx.current + 1) % typingWords.length;
        }
      }
      timer = setTimeout(tick, isDeleting.current ? deleteSpeed : speed);
    };

    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, []);

  // ==========================================
  // EFFECT: PARTICLE BACKGROUND CANVAS
  // ==========================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId;
    let particles = [];
    const COLORS = ['#3b82f6', '#1d4ed8', '#0284c7', '#0ea5e9', '#60a5fa'];
    const NUM = window.innerWidth < 768 ? 40 : 80;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1,
    });

    const init = () => {
      particles = [];
      for (let i = 0; i < NUM; i++) particles.push(createParticle());
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37,99,235,${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      drawConnections();
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      resize();
      init();
    });

    resize();
    init();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ==========================================
  // EFFECT: AUTOMATIC CERTIFICATIONS SLIDER
  // ==========================================
  useEffect(() => {
    const interval = setInterval(() => {
      setCertPos((prev) => {
        const sliderWidth = document.getElementById('cert-slider')?.clientWidth || 600;
        const maxPos = Math.max(0, totalCerts - Math.floor(sliderWidth / certCardWidth));
        return prev >= maxPos ? 0 : prev + 1;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const slideCerts = (dir) => {
    const sliderWidth = document.getElementById('cert-slider')?.clientWidth || 600;
    const maxPos = Math.max(0, totalCerts - Math.floor(sliderWidth / certCardWidth));
    setCertPos((prev) => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next > maxPos) return maxPos;
      return next;
    });
  };

  // ==========================================
  // FORM HANDLER: SENDING EMAIL (Node Server + Mailto Fallback)
  // ==========================================
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFeedback({ text: '', type: '' });

    try {
      // Connect directly to backend microservice (supports VITE_API_BASE_URL environment variable)
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setFeedback({ text: '✓ Message sent successfully via secure Node API!', type: 'success' });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Display backend error directly on the UI
        setFeedback({ text: `❌ Server Error: ${resData.error || 'Failed to dispatch email.'}`, type: 'error' });
      }
    } catch (err) {
      console.warn('Backend server connection failed, launching local pre-filled mailto backup...', err);
      // Perfect secondary mailto fallback
      setFeedback({ text: '✓ Opening default mail client pre-filled with details...', type: 'success' });
      const mailtoUrl = `mailto:saaiprasath.s2024aids@sece.ac.in?subject=New Message from ${encodeURIComponent(name)} (Portfolio)&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
      window.location.href = mailtoUrl;
      setName('');
      setEmail('');
      setMessage('');
    } finally {
      setSending(false);
      setTimeout(() => {
        setFeedback((prev) => prev.type === 'success' ? { text: '', type: '' } : prev);
      }, 8000);
    }
  };

  return (
    <>
      {/* Mouse Glow Trail */}
      <div id="mouse-glow"></div>

      {/* Scroll Progress Bar */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      {/* Particle Canvas */}
      <canvas ref={canvasRef} id="particles-canvas"></canvas>

      {/* ====== NAVBAR ====== */}
      <nav id="navbar" className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#hero" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <span className="logo-text">S<span className="accent"> </span>Saaiprasath</span>
          </a>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="nav-links">
            <li><a href="#about" className="nav-link" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#skills" className="nav-link" onClick={() => setMenuOpen(false)}>Skills</a></li>
            <li><a href="#projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</a></li>
            <li><a href="#achievements" className="nav-link" onClick={() => setMenuOpen(false)}>Achievements</a></li>
            <li><a href="#stats" className="nav-link" onClick={() => setMenuOpen(false)}>Stats</a></li>
            <li><a href="#internship" className="nav-link" onClick={() => setMenuOpen(false)}>Experience</a></li>
            <li><a href="#certifications" className="nav-link" onClick={() => setMenuOpen(false)}>Certs</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} id="hamburger" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* ====== HERO SECTION ====== */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-badge reveal-up">
            <span className="badge-dot"></span>
            <span>Open to Opportunities</span>
          </div>
          <h1 className="hero-name reveal-up">
            <span className="name-first">Saaiprasath S</span>
          </h1>
          <div className="hero-typing reveal-up">
            <span className="typing-prefix">I am a </span>
            <span id="typed-text" className="typed-text">{typedText}</span>
            <span className="cursor">|</span>
          </div>
          <p className="hero-tagline reveal-up">
            Building intelligent AI platforms that solve real-world problems<br/>and improve community resilience.
          </p>
          <div className="hero-buttons reveal-up">
            <a href="#projects" className="btn btn-primary">
              <i className="fas fa-rocket"></i> View Projects
            </a>
            <a href="SAAIPRASATH S (5).pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" id="download-resume">
              <i className="fas fa-file-pdf"></i> Resume
            </a>
            <button className="btn btn-video-intro" onClick={() => setIsVideoOpen(true)} aria-label="Watch My Self Introduction Video">
              <span className="video-play-ring"><i className="fas fa-play"></i></span>
              Watch My Intro
            </button>
            <a href="#contact" className="btn btn-outline">
              <i className="fas fa-paper-plane"></i> Contact Me
            </a>
          </div>
          <div className="hero-socials reveal-up">
            <a href="https://github.com/saaiprasaths" target="_blank" rel="noopener" className="social-icon" aria-label="GitHub">
              <i className="fab fa-github"></i>
              <span className="social-tooltip">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/saaiprasath-s-9082902ba/" target="_blank" rel="noopener" className="social-icon" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
              <span className="social-tooltip">LinkedIn</span>
            </a>
            <a href="https://leetcode.com/u/SaaiprasathS/" target="_blank" rel="noopener" className="social-icon" aria-label="LeetCode">
              <svg className="lc-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 .125.513c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.274 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
              </svg>
              <span className="social-tooltip">LeetCode</span>
            </a>
            <a href="https://www.skillrack.com/faces/resume.xhtml?id=475985&key=1e9d4765be5a0d82d3ff2d34e4e1afb23ecf26bf" target="_blank" rel="noopener" className="social-icon" aria-label="Skillrack">
              <i className="fas fa-code"></i>
              <span className="social-tooltip">Skillrack</span>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orb orb-1"></div>
          <div className="hero-orb orb-2"></div>
          <div className="hero-orb orb-3"></div>
          <div className="floating-card card-1 reveal-right">
            <i className="fas fa-brain"></i>
            <span>AI Engineer</span>
          </div>
          <div className="floating-card card-2 reveal-right">
            <i className="fas fa-trophy"></i>
            <span>Hackathon Finalist</span>
          </div>
          <div className="floating-card card-3 reveal-right">
            <i className="fas fa-chart-line"></i>
            <span>Data Analytics</span>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll Down</span>
        </div>
      </section>

      {/* ====== ABOUT SECTION ====== */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Who I Am</span>
            <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
            <p className="section-subtitle">Passionate about building technology that matters</p>
          </div>
          <div className="about-grid">
            <div className="about-bio glass-card reveal-left">
              <div className="bio-avatar">
                <div className="avatar-ring">
                  <img src="profile.jpg" alt="Saaiprasath S" className="avatar-photo" />
                </div>
                <div className="avatar-glow"></div>
              </div>
              <p className="bio-text">
                Saaiprasath is an <strong>AI & Data Science undergraduate</strong> passionate about building scalable intelligent platforms, crisis response systems, and data-driven applications. He actively participates in national hackathons and focuses on solving impactful real-world problems using <strong>Artificial Intelligence</strong>, <strong>Full Stack Development</strong> and <strong>Data Analytics</strong>.
              </p>
              <div className="bio-stats">
                <div className="bio-stat">
                  <span className="stat-num">4+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="bio-stat">
                  <span className="stat-num">6+</span>
                  <span className="stat-label">Hackathons</span>
                </div>
                <div className="bio-stat">
                  <span className="stat-num">720+</span>
                  <span className="stat-label">Problems</span>
                </div>
              </div>
            </div>
            <div className="about-timeline reveal-right">
              <h3 className="timeline-title"><i className="fas fa-graduation-cap"></i> Education</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content glass-card">
                    <span className="tl-year">2023 – Present</span>
                    <h4>B.Tech — Artificial Intelligence & Data Science</h4>
                    <p>Sri Eshwar College of Engineering</p>
                    <div className="tl-badge">CGPA: 7.74</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content glass-card">
                    <span className="tl-year">2022 – 2023</span>
                    <h4>Higher Secondary Certificate (HSC)</h4>
                    <p>State Board</p>
                    <div className="tl-badge">82.6%</div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content glass-card">
                    <span className="tl-year">2019 – 2020</span>
                    <h4>Secondary School Leaving Certificate (SSLC)</h4>
                    <p>State Board</p>
                    <div className="tl-badge tl-badge--gold">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== SKILLS SECTION ====== */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What I Know</span>
            <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>
            <p className="section-subtitle">A curated set of tools and technologies I work with</p>
          </div>
          <div className="skills-grid">
            <div className="skill-category glass-card reveal-up">
              <div className="skill-cat-header">
                <div className="skill-icon"><i className="fas fa-terminal"></i></div>
                <h3>Programming</h3>
              </div>
              <div className="skill-bars">
                <div className="skill-bar-item" data-skill="C" data-pct="85">
                  <div className="skill-bar-label"><span>C</span><span className="skill-pct">85%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '85%' }}></div></div>
                </div>
                <div className="skill-bar-item" data-skill="C++" data-pct="80">
                  <div className="skill-bar-label"><span>C++</span><span className="skill-pct">80%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '80%' }}></div></div>
                </div>
                <div className="skill-bar-item" data-skill="Python" data-pct="90">
                  <div className="skill-bar-label"><span>Python</span><span className="skill-pct">90%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '90%' }}></div></div>
                </div>
                <div className="skill-bar-item" data-skill="Java" data-pct="75">
                  <div className="skill-bar-label"><span>Java</span><span className="skill-pct">75%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '75%' }}></div></div>
                </div>
              </div>
            </div>

            <div className="skill-category glass-card reveal-up" style={{ '--delay': '0.1s' }}>
              <div className="skill-cat-header">
                <div className="skill-icon"><i className="fas fa-globe"></i></div>
                <h3>Web Development</h3>
              </div>
              <div className="skill-bars">
                <div className="skill-bar-item" data-pct="88">
                  <div className="skill-bar-label"><span>HTML/CSS</span><span className="skill-pct">88%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '88%' }}></div></div>
                </div>
                <div className="skill-bar-item" data-pct="80">
                  <div className="skill-bar-label"><span>JavaScript</span><span className="skill-pct">80%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '80%' }}></div></div>
                </div>
                <div className="skill-bar-item" data-pct="75">
                  <div className="skill-bar-label"><span>MERN Stack</span><span className="skill-pct">75%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '75%' }}></div></div>
                </div>
                <div className="skill-bar-item" data-pct="72">
                  <div className="skill-bar-label"><span>Next.js</span><span className="skill-pct">72%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '72%' }}></div></div>
                </div>
              </div>
            </div>

            <div className="skill-category glass-card reveal-up" style={{ '--delay': '0.2s' }}>
              <div className="skill-cat-header">
                <div className="skill-icon"><i className="fas fa-brain"></i></div>
                <h3>AI / Data Science</h3>
              </div>
              <div className="skill-bars">
                <div className="skill-bar-item" data-pct="88">
                  <div className="skill-bar-label"><span>Pandas</span><span className="skill-pct">88%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '88%' }}></div></div>
                </div>
                <div className="skill-bar-item" data-pct="85">
                  <div className="skill-bar-label"><span>NumPy</span><span className="skill-pct">85%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '85%' }}></div></div>
                </div>
                <div className="skill-bar-item" data-pct="82">
                  <div className="skill-bar-label"><span>Data Cleaning</span><span className="skill-pct">82%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '82%' }}></div></div>
                </div>
                <div className="skill-bar-item" data-pct="80">
                  <div className="skill-bar-label"><span>Data Analysis</span><span className="skill-pct">80%</span></div>
                  <div className="skill-bar-track"><div className="skill-bar-fill" style={{ '--pct': '80%' }}></div></div>
                </div>
              </div>
            </div>

            <div className="skill-category glass-card reveal-up" style={{ '--delay': '0.3s' }}>
              <div className="skill-cat-header">
                <div className="skill-icon"><i className="fas fa-tools"></i></div>
                <h3>Tools & Concepts</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag"><i className="fab fa-github"></i> GitHub</span>
                <span className="skill-tag"><i className="fas fa-code"></i> VS Code</span>
                <span className="skill-tag"><i className="fas fa-pen-ruler"></i> Figma</span>
                <span className="skill-tag"><i className="fas fa-palette"></i> Canva</span>
                <span className="skill-tag"><i className="fas fa-book-open"></i> Jupyter</span>
                <span className="skill-tag"><i className="fas fa-file-excel"></i> Excel</span>
                <span className="skill-tag"><i className="fas fa-cube"></i> OOP</span>
                <span className="skill-tag"><i className="fas fa-sitemap"></i> DSA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROJECTS SECTION ====== */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What I've Built</span>
            <h2 className="section-title">Project <span className="gradient-text">Showcase</span></h2>
            <p className="section-subtitle">Hand-crafted solutions for real-world challenges</p>
          </div>
          <div className="project-filters">
            <button className={`filter-btn ${projFilter === 'all' ? 'active' : ''}`} onClick={() => setProjFilter('all')}>All Projects</button>
            <button className={`filter-btn ${projFilter === 'ai' ? 'active' : ''}`} onClick={() => setProjFilter('ai')}>AI Projects</button>
            <button className={`filter-btn ${projFilter === 'web' ? 'active' : ''}`} onClick={() => setProjFilter('web')}>Web Projects</button>
            <button className={`filter-btn ${projFilter === 'system' ? 'active' : ''}`} onClick={() => setProjFilter('system')}>System Projects</button>
          </div>
          <div className="projects-grid">
            {PROJECTS.filter(p => projFilter === 'all' || p.category.includes(projFilter)).map((p, i) => (
              <div key={p.title} className="project-card glass-card tilt-card reveal-up" style={{ '--delay': `${i * 0.1}s` }}>
                <div className="project-img-wrap">
                  <img src={p.src} alt={p.title} className="project-screenshot" />
                  <div className="project-overlay">
                    <span className={`project-status ${p.featured ? 'live' : ''}`}>{p.featured ? 'Featured' : 'System'}</span>
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-tags">
                    {p.category.split(' ').map(tag => (
                      <span key={tag} className={`tag tag-${tag}`}>{tag.toUpperCase()}</span>
                    ))}
                  </div>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-subtitle">{p.subtitle}</p>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tech">
                    {p.tech.map(t => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={p.github} target="_blank" rel="noopener" className="proj-btn proj-btn--github">
                      <i className="fab fa-github"></i> GitHub
                    </a>
                    <a href={p.demo} target="_blank" rel="noopener" className="proj-btn proj-btn--demo">
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== ACHIEVEMENTS SECTION ====== */}
      <section id="achievements" className="section achievements-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Recognition</span>
            <h2 className="section-title">Achievements &amp; <span className="gradient-text">Awards</span></h2>
            <p className="section-subtitle">Recognized across national platforms and competitions</p>
          </div>
          <div className="achievements-grid">
            <div className="achievement-card glass-card reveal-up">
              <div className="ach-icon"><i className="fas fa-medal"></i></div>
              <div className="ach-content">
                <span className="ach-badge finalist">Finalist</span>
                <h4>Technovation</h4>
                <p>Anna University Technical Fest</p>
              </div>
              <div className="ach-glow"></div>
            </div>
            <div className="achievement-card glass-card reveal-up" style={{ '--delay': '0.1s' }}>
              <div className="ach-icon"><i className="fas fa-trophy"></i></div>
              <div className="ach-content">
                <span className="ach-badge top10">Top 10</span>
                <h4>Hackverse</h4>
                <p>National Hackathon</p>
              </div>
              <div className="ach-glow"></div>
            </div>
            <div className="achievement-card glass-card reveal-up" style={{ '--delay': '0.2s' }}>
              <div className="ach-icon"><i className="fas fa-star"></i></div>
              <div className="ach-content">
                <span className="ach-badge top10">Top 10</span>
                <h4>Incepto</h4>
                <p>National Hackathon</p>
              </div>
              <div className="ach-glow"></div>
            </div>
            <div className="achievement-card glass-card reveal-up" style={{ '--delay': '0.3s' }}>
              <div className="ach-icon"><i className="fas fa-chart-bar"></i></div>
              <div className="ach-content">
                <span className="ach-badge top10">Top 10</span>
                <h4>Statistella</h4>
                <p>Data Analytics Competition</p>
              </div>
              <div className="ach-glow"></div>
            </div>
            <div className="achievement-card glass-card reveal-up" style={{ '--delay': '0.4s' }}>
              <div className="ach-icon"><i className="fas fa-award"></i></div>
              <div className="ach-content">
                <span className="ach-badge third">3rd Prize</span>
                <h4>Freshathon</h4>
                <p>Hackathon Competition</p>
              </div>
              <div className="ach-glow"></div>
            </div>
            <div className="achievement-card glass-card reveal-up" style={{ '--delay': '0.5s' }}>
              <div className="ach-icon"><i className="fas fa-rocket"></i></div>
              <div className="ach-content">
                <span className="ach-badge finalist">Finalist</span>
                <h4>SelfE Hackathon</h4>
                <p>Innovation Challenge</p>
              </div>
              <div className="ach-glow"></div>
            </div>
            <div className="achievement-card glass-card reveal-up" style={{ '--delay': '0.6s' }}>
              <div className="ach-icon" style={{ background: 'rgba(251,191,36,0.15)', borderColor: 'rgba(251,191,36,0.35)', color: '#fde68a' }}>
                <i className="fas fa-trophy"></i>
              </div>
              <div className="ach-content">
                <span className="ach-badge first">1st Prize</span>
                <h4>Mini Project Expo 2026</h4>
                <p>Department Level Exhibition</p>
              </div>
              <div className="ach-glow" style={{ background: 'linear-gradient(135deg,rgba(251,191,36,0.08),rgba(234,179,8,0.05))' }}></div>
            </div>
          </div>

          {/* Gallery Subheading */}
          <div className="gallery-header reveal-up" style={{ marginTop: '60px', marginBottom: '24px', textAlign: 'center' }}>
            <h3 className="gallery-title" style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px' }}>
              Achievement <span className="gradient-text">Gallery</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Interact with my journey, certifications, and awards first-hand</p>
          </div>

          {/* Gallery Filter Tabs */}
          <div className="gallery-tabs reveal-up" style={{ marginBottom: '32px' }}>
            <button className={`tab-btn ${galleryCategory === 'all' ? 'active' : ''}`} onClick={() => setGalleryCategory('all')}>All Items</button>
            <button className={`tab-btn ${galleryCategory === 'certificates' ? 'active' : ''}`} onClick={() => setGalleryCategory('certificates')}>Certificates</button>
            <button className={`tab-btn ${galleryCategory === 'awards' ? 'active' : ''}`} onClick={() => setGalleryCategory('awards')}>Awards &amp; Expos</button>
            <button className={`tab-btn ${galleryCategory === 'events' ? 'active' : ''}`} onClick={() => setGalleryCategory('events')}>Event Moments</button>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid reveal-up">
            {GALLERY_ITEMS.filter(item => galleryCategory === 'all' || item.category === galleryCategory).map((item, idx) => (
              <div key={item.title} className="gallery-item glass-card" onClick={() => setLightbox({ open: true, src: item.src, title: item.title, desc: item.desc })}>
                <img src={item.src} alt={item.title} loading="lazy" />
                <div className="gallery-overlay">
                  <i className="fas fa-search-plus"></i>
                  <div className="overlay-text">
                    <h5>{item.title.split(' ')[0]}</h5>
                    <p>{item.title.split(' ').slice(1).join(' ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ====== CODING STATS SECTION ====== */}
      <section id="stats" className="section stats-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">By The Numbers</span>
            <h2 className="section-title">Coding <span className="gradient-text">Stats</span></h2>
            <p className="section-subtitle">Consistent practice across competitive programming platforms</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card glass-card reveal-up">
              <div className="ring-wrap">
                <svg className="ring-svg" viewBox="0 0 120 120">
                  <circle className="ring-bg" cx="60" cy="60" r="50"/>
                  <circle className="ring-fill ring--skillrack animate-stroke" cx="60" cy="60" r="50" style={{ strokeDashoffset: `${2 * Math.PI * 50 * (1 - 92/100)}` }}/>
                </svg>
                <div className="ring-inner">
                  <i className="fas fa-code stat-icon"></i>
                </div>
              </div>
              <div className="stat-counter">{stats.skillrack}+</div>
              <div className="stat-label">Skillrack Problems</div>
              <div className="stat-platform"><i className="fas fa-circle-dot"></i> Skillrack</div>
            </div>

            <div className="stat-card glass-card reveal-up" style={{ '--delay': '0.1s' }}>
              <div className="ring-wrap">
                <svg className="ring-svg" viewBox="0 0 120 120">
                  <circle className="ring-bg" cx="60" cy="60" r="50"/>
                  <circle className="ring-fill ring--leetcode animate-stroke" cx="60" cy="60" r="50" style={{ strokeDashoffset: `${2 * Math.PI * 50 * (1 - 70/100)}` }}/>
                </svg>
                <div className="ring-inner">
                  <i className="fas fa-bolt stat-icon"></i>
                </div>
              </div>
              <div className="stat-counter">{stats.leetcode}+</div>
              <div className="stat-label">LeetCode Problems</div>
              <div className="stat-platform"><i className="fas fa-circle-dot"></i> LeetCode</div>
            </div>

            <div className="stat-card glass-card reveal-up" style={{ '--delay': '0.2s' }}>
              <div className="ring-wrap">
                <svg className="ring-svg" viewBox="0 0 120 120">
                  <circle className="ring-bg" cx="60" cy="60" r="50"/>
                  <circle className="ring-fill ring--contest animate-stroke" cx="60" cy="60" r="50" style={{ strokeDashoffset: `${2 * Math.PI * 50 * (1 - 73/100)}` }}/>
                </svg>
                <div className="ring-inner">
                  <i className="fas fa-trophy stat-icon"></i>
                </div>
              </div>
              <div className="stat-counter">{stats.rating}</div>
              <div className="stat-label">Contest Rating</div>
              <div className="stat-platform"><i className="fas fa-circle-dot"></i> LeetCode</div>
            </div>

            <div className="stat-card glass-card reveal-up" style={{ '--delay': '0.3s' }}>
              <div className="ring-wrap">
                <svg className="ring-svg" viewBox="0 0 120 120">
                  <circle className="ring-bg" cx="60" cy="60" r="50"/>
                  <circle className="ring-fill ring--hackerrank animate-stroke" cx="60" cy="60" r="50" style={{ strokeDashoffset: `${2 * Math.PI * 50 * (1 - 40/100)}` }}/>
                </svg>
                <div className="ring-inner">
                  <i className="fab fa-hackerrank stat-icon"></i>
                </div>
              </div>
              <div className="stat-counter">{stats.hackerrank} Star</div>
              <div className="stat-label">HackerRank Badge</div>
              <div className="stat-platform"><i className="fas fa-circle-dot"></i> HackerRank</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== INTERNSHIP SECTION ====== */}
      <section id="internship" className="section internship-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Professional Experience</span>
            <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
            <p className="section-subtitle">Real-world application of skills in a professional environment</p>
          </div>
          <div className="experience-card glass-card reveal-up">
            <div className="exp-header">
              <div className="exp-logo">
                <i className="fas fa-building"></i>
              </div>
              <div className="exp-title-block">
                <h3>MERN Stack Developer Intern</h3>
                <p className="exp-company">Better Tomorrow Institute</p>
                <div className="exp-meta">
                  <span><i className="fas fa-calendar"></i> 2024</span>
                  <span><i className="fas fa-map-marker-alt"></i> Remote / Hybrid</span>
                  <span className="exp-badge">Internship</span>
                </div>
              </div>
            </div>
            <div className="exp-body">
              <p>Contributed to the development of full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js). Built responsive UI components, integrated RESTful APIs, and collaborated in an agile development environment to deliver production-grade features on schedule.</p>
              <div className="exp-skills">
                <span className="tech-pill">MongoDB</span>
                <span className="tech-pill">Express.js</span>
                <span className="tech-pill">React.js</span>
                <span className="tech-pill">Node.js</span>
                <span className="tech-pill">REST APIs</span>
                <span className="tech-pill">Git</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CERTIFICATIONS SECTION ====== */}
      <section id="certifications" className="section certifications-section" style={{ padding: '40px 0 20px 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Credentials</span>
            <h2 className="section-title">Certifi<span className="gradient-text">cations</span></h2>
            <p className="section-subtitle">Validated expertise from global tech leaders</p>
          </div>
          <div className="cert-slider-wrap">
            <div className="cert-slider" id="cert-slider" style={{ transform: `translateX(-${certPos * certCardWidth}px)`, transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title} className="cert-card glass-card">
                  <div className="cert-icon"><i className={cert.icon}></i></div>
                  <h4>{cert.title}</h4>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <div className={`cert-badge ${cert.isNptel ? 'cert-badge--nptel' : ''}`}>{cert.badge}</div>
                </div>
              ))}
            </div>
            <div className="slider-controls">
              <button className="slider-btn" aria-label="Previous" onClick={() => slideCerts(-1)}><i className="fas fa-chevron-left"></i></button>
              <button className="slider-btn" aria-label="Next" onClick={() => slideCerts(1)}><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CONTACT SECTION ====== */}
      <section id="contact" className="section contact-section" style={{ padding: '40px 0 100px 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Let's Connect</span>
            <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
            <p className="section-subtitle">Have an idea? Let's build something amazing together.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal-left">
              <div className="contact-card glass-card">
                <a href="tel:+918610098664">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h4>Phone</h4>
                    <p>+91 8610098664</p>
                  </div>
                </a>
              </div>
              <div className="contact-card glass-card">
                <a href="mailto:saaiprasath.s2024aids@sece.ac.in">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email</h4>
                    <p>saaiprasath.s2024aids@sece.ac.in</p>
                  </div>
                </a>
              </div>
              <div className="contact-card glass-card">
                <a href="https://github.com/saaiprasaths" target="_blank" rel="noopener">
                  <i className="fab fa-github"></i>
                  <div>
                    <h4>GitHub</h4>
                    <p>github.com/saaiprasaths</p>
                  </div>
                </a>
              </div>
              <div className="contact-card glass-card">
                <a href="https://www.linkedin.com/in/saaiprasath-s-9082902ba/" target="_blank" rel="noopener">
                  <i className="fab fa-linkedin"></i>
                  <div>
                    <h4>LinkedIn</h4>
                    <p>linkedin.com/in/saaiprasath-s-9082902ba</p>
                  </div>
                </a>
              </div>
              <div className="map-placeholder glass-card">
                <i className="fas fa-map-pin"></i>
                <p>Tamil Nadu, India</p>
                <span>Sri Eshwar College of Engineering, Coimbatore</span>
              </div>
            </div>
            <div className="contact-form-wrap reveal-right">
              <form className="contact-form glass-card" onSubmit={handleFormSubmit}>
                <h3>Send a Message</h3>
                <div className="form-group">
                  <label htmlFor="c-name">Your Name</label>
                  <input type="text" id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required autoComplete="off" />
                </div>
                <div className="form-group">
                  <label htmlFor="c-email">Email Address</label>
                  <input type="email" id="c-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@email.com" required autoComplete="off" />
                </div>
                <div className="form-group">
                  <label htmlFor="c-message">Message</label>
                  <textarea id="c-message" value={message} onChange={(e) => setMessage(e.target.value)} rows="5" placeholder="Tell me about your project or idea..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
                  {sending ? (
                    <span><i className="fas fa-spinner fa-spin"></i> Sending...</span>
                  ) : (
                    <span><i className="fas fa-paper-plane"></i> Send Message</span>
                  )}
                </button>
                {feedback.text && (
                  <div className={`form-feedback ${feedback.type === 'success' ? 'success' : 'error'}`}>
                    {feedback.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="footer">
        <div className="footer-glow"></div>
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">S<span className="accent"> </span>Saaiprasath</div>
            <p className="footer-quote">"Engineering AI solutions for impactful futures."</p>
            <div className="footer-socials">
              <a href="https://github.com/saaiprasaths" target="_blank" rel="noopener" aria-label="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/saaiprasath-s-9082902ba/" target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="https://leetcode.com/u/SaaiprasathS/" target="_blank" rel="noopener" aria-label="LeetCode"><i className="fas fa-code"></i></a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Saaiprasath S · Built with passion &amp; code</p>
            <a href="#hero" className="footer-top-link">Back to Top ↑</a>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal */}
      {lightbox.open && (
        <div id="gallery-lightbox" className="lightbox-modal" style={{ display: 'block' }} onClick={(e) => {
          if (e.target.id === 'gallery-lightbox' || e.target.className === 'lightbox-close') {
            setLightbox({ open: false, src: '', title: '', desc: '' });
          }
        }}>
          <span className="lightbox-close" onClick={() => setLightbox({ open: false, src: '', title: '', desc: '' })}>&times;</span>
          <img className="lightbox-content" id="lightbox-img" src={lightbox.src} alt="Enlarged Achievement" />
          <div id="lightbox-caption">
            <h4 style={{ color: '#ffffff', fontSize: '1.2rem', marginBottom: '6px', fontWeight: '700' }}>{lightbox.title}</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>{lightbox.desc}</p>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button id="back-to-top" className={`back-to-top ${showBackToTop ? 'visible' : ''}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="fas fa-chevron-up"></i>
      </button>
      {/* ====== INTRO VIDEO MODAL ====== */}
      {isVideoOpen && (
        <div className="intro-modal active">
          <div className="intro-modal-backdrop" onClick={() => setIsVideoOpen(false)}></div>
          <div className="intro-modal-content">
            <button className="intro-modal-close" onClick={() => setIsVideoOpen(false)} aria-label="Close video">
              <i className="fas fa-times"></i>
            </button>
            <div className="intro-video-wrapper">
              <div className="intro-video-label">
                <span className="intro-badge-dot"></span>
                <span>Self Introduction</span>
              </div>
              <video
                id="intro-video"
                className="intro-video"
                src="saai-tech.mp4"
                controls
                playsInline
                preload="metadata"
                poster="profile.jpg"
                autoPlay
                aria-label="Saaiprasath S Self Introduction Video"
              >
                Your browser does not support the video tag.
              </video>
              <div className="intro-video-footer">
                <div className="intro-author">
                  <img src="profile.jpg" alt="Saaiprasath S" className="intro-author-img" />
                  <div>
                    <strong>Saaiprasath S</strong>
                    <span>AI & Data Science Engineer</span>
                  </div>
                </div>
                <a href="SAAIPRASATH S (5).pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  <i className="fas fa-download"></i> Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

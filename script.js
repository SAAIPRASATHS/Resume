'use strict';

/* ==========================================
   PARTICLE BACKGROUND
   ========================================== */
(function () {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const COLORS = ['#3b82f6', '#1d4ed8', '#0284c7', '#0ea5e9', '#60a5fa'];
  const NUM = window.innerWidth < 768 ? 50 : 100;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1,
    };
  }

  function init() {
    particles = [];
    for (let i = 0; i < NUM; i++) particles.push(createParticle());
  }

  function drawConnections() {
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
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => {
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
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  animate();
})();

/* ==========================================
   MOUSE GLOW TRAIL
   ========================================== */
(function () {
  const glow = document.getElementById('mouse-glow');
  let mx = -999, my = -999;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    glow.style.left = mx + 'px';
    glow.style.top = my + 'px';
  });
})();

/* ==========================================
   SCROLL PROGRESS BAR
   ========================================== */
(function () {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(scrolled, 100) + '%';
  }, { passive: true });
})();

/* ==========================================
   NAVBAR SCROLL EFFECT & ACTIVE LINK
   ========================================== */
(function () {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === '#' + current) l.classList.add('active');
    });
  }, { passive: true });
})();

/* ==========================================
   HAMBURGER MENU
   ========================================== */
(function () {
  const btn = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();

/* ==========================================
   TYPING ANIMATION
   ========================================== */
(function () {
  const el = document.getElementById('typed-text');
  const words = [
    'AI Engineer in Progress',
    'Hackathon Finalist',
    'Full Stack MERN Developer',
    'Data Analytics Enthusiast',
  ];
  let wi = 0, ci = 0, deleting = false;
  const speed = 90, deleteSpeed = 50, pause = 2000;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(tick, pause); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, deleting ? deleteSpeed : speed);
  }
  setTimeout(tick, 800);
})();

/* ==========================================
   SCROLL REVEAL ANIMATIONS
   ========================================== */
(function () {
  const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => observer.observe(el));
})();

/* ==========================================
   SKILL BAR ANIMATION
   ========================================== */
(function () {
  const fills = document.querySelectorAll('.skill-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => observer.observe(f));
})();

/* ==========================================
   ANIMATED COUNTERS
   ========================================== */
(function () {
  const counters = document.querySelectorAll('.stat-counter');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const start = 0;
    const duration = 1800;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(start + (target - start) * eased);
      el.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
})();

/* ==========================================
   PROGRESS RINGS ANIMATION
   ========================================== */
(function () {
  const rings = document.querySelectorAll('.ring-fill');
  const circumference = 2 * Math.PI * 50; // r=50

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const ring = entry.target;
        const pct = parseFloat(ring.dataset.pct) / 100;
        const offset = circumference * (1 - pct);
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = offset;
        observer.unobserve(ring);
      }
    });
  }, { threshold: 0.5 });
  rings.forEach(r => observer.observe(r));
})();

/* ==========================================
   PROJECT FILTER
   ========================================== */
(function () {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cats = card.dataset.category || '';
        if (filter === 'all' || cats.includes(filter)) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 400);
        }
      });
    });
  });
})();

/* ==========================================
   TILT EFFECT (3D Card)
   ========================================== */
(function () {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ==========================================
   CERTIFICATIONS SLIDER
   ========================================== */
(function () {
  const slider = document.getElementById('cert-slider');
  const prevBtn = document.getElementById('cert-prev');
  const nextBtn = document.getElementById('cert-next');
  if (!slider) return;

  const cardWidth = 264; // card min-width + gap
  let pos = 0;
  let autoTimer;
  const cards = slider.querySelectorAll('.cert-card');
  const total = cards.length;

  function slide(dir) {
    pos += dir;
    if (pos < 0) pos = 0;
    const maxPos = Math.max(0, total - Math.floor(slider.clientWidth / cardWidth));
    if (pos > maxPos) pos = maxPos;
    slider.style.transform = `translateX(-${pos * cardWidth}px)`;
    slider.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
  }

  function autoSlide() {
    autoTimer = setInterval(() => {
      const maxPos = Math.max(0, total - Math.floor(slider.clientWidth / cardWidth));
      if (pos >= maxPos) pos = 0; else pos++;
      slider.style.transform = `translateX(-${pos * cardWidth}px)`;
      slider.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
    }, 2800);
  }

  prevBtn.addEventListener('click', () => { slide(-1); clearInterval(autoTimer); autoSlide(); });
  nextBtn.addEventListener('click', () => { slide(1); clearInterval(autoTimer); autoSlide(); });
  autoSlide();
})();

/* ==========================================
   BACK TO TOP BUTTON
   ========================================== */
(function () {
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ==========================================
   CONTACT FORM
   ========================================== */
(function () {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const name = document.getElementById('c-name').value;
    const email = document.getElementById('c-email').value;
    const message = document.getElementById('c-message').value;

    fetch('https://formsubmit.co/ajax/saaiprasath.s2024aids@sece.ac.in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: `New Message from ${name} (Portfolio)`
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Server error');
      }
    })
    .then(data => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      feedback.className = 'form-feedback success';
      feedback.textContent = '✓ Message sent! Please check your email to activate submissions if this is the first time.';
      form.reset();
      setTimeout(() => { feedback.textContent = ''; feedback.className = 'form-feedback'; }, 6000);
    })
    .catch(error => {
      console.error('FormSubmit Error:', error);
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      
      // Fallback: Mailto client pre-fill
      feedback.className = 'form-feedback success';
      feedback.textContent = '✓ Opening email client pre-filled with your message...';
      const mailtoUrl = `mailto:saaiprasath.s2024aids@sece.ac.in?subject=New Message from ${encodeURIComponent(name)} (Portfolio)&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
      window.location.href = mailtoUrl;
      form.reset();
      setTimeout(() => { feedback.textContent = ''; feedback.className = 'form-feedback'; }, 6000);
    });
  });
})();

/* ==========================================
   SMOOTH SCROLL FOR ALL ANCHOR LINKS
   ========================================== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ==========================================
   SECTION PARALLAX SUBTLE GLOW
   ========================================== */
(function () {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const hero = document.querySelector('.hero-section');
    if (hero) {
      const orbs = hero.querySelectorAll('.hero-orb');
      orbs.forEach((o, i) => {
        o.style.transform = `translateY(${y * (0.15 + i * 0.05)}px)`;
      });
    }
  }, { passive: true });
})();

/* ==========================================
   ACHIEVEMENT GALLERY FILTER
   ========================================== */
(function () {
  const btns = document.querySelectorAll('.gallery-tabs .tab-btn');
  const items = document.querySelectorAll('.gallery-item');
  if (btns.length === 0) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const cat = item.dataset.category || '';
        if (filter === 'all' || cat === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.transition = 'all 0.4s cubic-bezier(0.4,0,0.2,1)';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => { item.style.display = 'none'; }, 400);
        }
      });
    });
  });
})();

/* ==========================================
   ACHIEVEMENT GALLERY LIGHTBOX
   ========================================== */
(function () {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!lightbox) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const title = item.getAttribute('data-title') || '';
      const desc = item.getAttribute('data-desc') || '';
      lightbox.style.display = 'block';
      lightboxImg.src = src;
      const caption = document.getElementById('lightbox-caption');
      if (caption) {
        caption.innerHTML = `<h4 style="color:#ffffff;font-size:1.2rem;margin-bottom:6px;font-weight:700;">${title}</h4><p style="color:#94a3b8;font-size:0.9rem;margin:0;">${desc}</p>`;
      }
      document.body.style.overflow = 'hidden'; // Disable background scrolling
    });
  });

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'block') {
      closeLightbox();
    }
  });
})();

/* ==========================================
   INTRO VIDEO MODAL
   ========================================== */
(function () {
  const modal      = document.getElementById('intro-video-modal');
  const video      = document.getElementById('intro-video');
  const openBtn    = document.getElementById('open-intro-video');
  const closeBtn   = document.getElementById('close-intro-video');
  const backdrop   = document.getElementById('intro-modal-backdrop');
  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (video) {
      video.play().catch(e => console.log('Autoplay blocked:', e));
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (video) { video.pause(); }
  }

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
})();

console.log('%c✨ Saaiprasath S Portfolio — Built with passion & code', 'color:#2563eb;font-size:14px;font-weight:700;');


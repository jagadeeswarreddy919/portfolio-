/* 
  =========================================
  PORTFOLIO INTERACTIVE ACTIONS (script.js)
  Controls advanced page states, custom cursor trails,
  constellation systems, and forms
  =========================================
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================
  // 1. STICKY HEADER & ACTIVE SCROLL LINK SPY
  // =========================================
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Scroll header styling
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy tracker
    let currentSectionId = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // =========================================
  // 2. MOBILE RESPONSIVE hamburger DRAWER
  // =========================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // =========================================
  // 3. LIGHT / DARK THEME CACHE STATE MANAGER
  // =========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
  } else {
    document.body.classList.remove('dark-theme');
    if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDarkTheme = document.body.classList.contains('dark-theme');
      
      if (isDarkTheme) {
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
      } else {
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // =========================================
  // 4. HERO SECTION TYPING ANIMATOR
  // =========================================
  const typedTextSpan = document.getElementById('typed-text');
  const words = ['AI Engineer', 'Full Stack Developer'];
  const typingSpeed = 90;
  const erasingSpeed = 50;
  const delayBetweenWords = 1800;
  
  let wordIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  function typeLoop() {
    if (!typedTextSpan) return;
    const currentWord = words[wordIndex];
    
    if (isErasing) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isErasing && charIndex === currentWord.length) {
      isErasing = true;
      setTimeout(typeLoop, delayBetweenWords);
    } else if (isErasing && charIndex === 0) {
      isErasing = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeLoop, 400);
    } else {
      setTimeout(typeLoop, isErasing ? erasingSpeed : typingSpeed);
    }
  }

  if (typedTextSpan) {
    setTimeout(typeLoop, 800);
  }

  // =========================================
  // 5. SCROLL TRIGGER REVEAL OBSERVERS
  // =========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================================
  // 6. TECHNICAL SKILLS GRID CATEGORY FILTER
  // =========================================
  window.filterSkills = (category) => {
    const skillCards = document.querySelectorAll('.tech-skill-icon-card');
    const tabButtons = document.querySelectorAll('.skills-pill-btn');

    tabButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('onclick').includes(category)) {
        btn.classList.add('active');
      }
    });

    skillCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.88)';
      
      setTimeout(() => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      }, 200);
    });
  };

  // =========================================
  // 7. BACK TO TOP FLOATING BUTTON TRIGGER
  // =========================================
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
  }

  window.scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================
  // 8. CASE STUDY DETAILED MODAL DATA
  // =========================================
  const projectDatabase = {
    resolvex: {
      title: "ResolveX — AI Risk & Payment Failure Resolution Platform",
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "AI Risk Engine", "Razorpay APIs"],
      image: "assets/resolvex.png",
      description: "ResolveX is an intelligent payment failure tracking and resolution platform engineered for Razorpay Buildathon 2026 (Track 2: AI Risk Manager). It resolves customer uncertainty and anxiety surrounding failed/pending payments by automatically verifying bank debits, triaging double-debit risks, auto-generating dispute complaints, and tracing real-time stage-by-stage interbank settlements.",
      highlights: [
        "Architected real-time failure investigation pipelines with stage-by-stage interbank audit trails (Customer Bank -> NPCI -> Payment Gateway -> Merchant).",
        "Engineered automated complaint ticket generation and instant acknowledgment (ACK) tracking.",
        "Implemented proactive Double Deduction Risk warnings and AI-assisted support triage.",
        "Crafted a high-performance modern UI with live status visualizers and simulated payment settlement scenarios."
      ],
      github: "https://github.com/jagadeeswarreddy919",
      live: "https://razorpay-mini-project.vercel.app/"
    },
    raktsetu: {
      title: "RaktSetu — AI Blood Donor Matching Platform",
      tags: ["Python", "FastAPI", "React", "PostgreSQL", "NLP", "Machine Learning"],
      image: "assets/raktsetu.png",
      description: "RaktSetu is a premium, AI-powered system designed to connect blood donors and recipients using advanced compatibility matching metrics. Features robust NLP urgency classification models to parse text inputs, real-time geolocation matching searches, and highly secure role controls built with FastAPI and React.",
      highlights: [
        "Programmed intelligent AI compatibility donor-recipient matching models.",
        "Implemented NLP classification layers to categorize text-based requests by urgency parameters.",
        "Engineered real-time database queries on normalized PostgreSQL structures.",
        "Constructed dynamic dashboard triggers and real-time live alert notification alerts."
      ],
      github: "https://github.com/jagadeeswarreddy919",
      live: "https://onedrop-india.vercel.app"
    },
    onedrop: {
      title: "RaktSetu — AI Blood Donor Matching Platform",
      tags: ["Python", "FastAPI", "React", "PostgreSQL", "NLP", "Machine Learning"],
      image: "assets/raktsetu.png",
      description: "RaktSetu is a premium, AI-powered system designed to connect blood donors and recipients using advanced compatibility matching metrics. Features robust NLP urgency classification models to parse text inputs, real-time geolocation matching searches, and highly secure role controls built with FastAPI and React.",
      highlights: [
        "Programmed intelligent AI compatibility donor-recipient matching models.",
        "Implemented NLP classification layers to categorize text-based requests by urgency parameters.",
        "Engineered real-time database queries on normalized PostgreSQL structures.",
        "Constructed dynamic dashboard triggers and real-time live alert notification alerts."
      ],
      github: "https://github.com/jagadeeswarreddy919",
      live: "https://onedrop-india.vercel.app"
    },
    skillanalyzer: {
      title: "SkillGap AI — Career Intelligence & Skill Gap Analyzer",
      tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Machine Learning", "NLP", "Career Intelligence"],
      image: "assets/skillanalyzer.png",
      description: "SkillGap AI is an intelligent skill gap analysis and career roadmap platform designed to help students, developers, and engineers close their knowledge gaps. It benchmarks skill profiles against 20+ real-world tech roles, calculates instantaneous career readiness scores, maps missing competencies, and curates customized learning pathways.",
      highlights: [
        "Architected multi-role career intelligence engine benchmarking 20+ tech roles across 110+ technical competencies.",
        "Engineered real-time Career Readiness scoring with radial progress visualization and role switching.",
        "Built automated gap detection breaking down 'Skills You Have' vs 'Skills Missing' with personalized course links.",
        "Implemented a fast, responsive UI built with Next.js, React, Tailwind CSS, and Lucide Icons."
      ],
      github: "https://github.com/jagadeeswarreddy919",
      live: "https://ai-driven-skill-gap-anlyzer-and-cou.vercel.app/"
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-description');
  const modalTags = document.getElementById('modal-tags');
  const modalHighlightsList = document.getElementById('modal-highlights-list');
  const modalGithub = document.getElementById('modal-github-link');
  const modalLive = document.getElementById('modal-live-link');

  window.openProjectModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data) return;

    if (modalImg) modalImg.src = data.image;
    if (modalImg) modalImg.alt = data.title;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.description;
    
    if (modalTags) modalTags.innerHTML = '';
    if (modalHighlightsList) modalHighlightsList.innerHTML = '';

    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = tag;
      if (modalTags) modalTags.appendChild(span);
    });

    data.highlights.forEach(highlight => {
      const li = document.createElement('li');
      li.textContent = highlight;
      if (modalHighlightsList) modalHighlightsList.appendChild(li);
    });

    if (modalGithub) modalGithub.href = data.github;
    if (modalLive) modalLive.href = data.live;

    if (modalOverlay) modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  };

  window.closeProjectModal = () => {
    if (modalOverlay) modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; 
  };

  window.closeProjectModalOnBackdrop = (event) => {
    if (event.target === modalOverlay) {
      closeProjectModal();
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // =========================================
  // 9. CONTACT FORM CLIENT-SIDE VALIDATION
  // =========================================
  const form = document.getElementById('portfolio-contact-form');
  const toast = document.getElementById('toast-success');
  
  if (form) {
    const formInputs = form.querySelectorAll('.connect-input-box');

    formInputs.forEach(input => {
      input.addEventListener('input', () => validateField(input));
      input.addEventListener('blur', () => validateField(input));
    });

    function validateField(input) {
      if (input.required && !input.value.trim()) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        return false;
      }

      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          input.classList.add('invalid');
          input.classList.remove('valid');
          return false;
        }
      }

      input.classList.add('valid');
      input.classList.remove('invalid');
      return true;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isFormValid = true;
      formInputs.forEach(input => {
        const isValid = validateField(input);
        if (!isValid) isFormValid = false;
      });

      if (isFormValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        
        setTimeout(() => {
          if (toast) toast.classList.add('active');
          
          form.reset();
          formInputs.forEach(input => {
            input.classList.remove('valid');
            input.classList.remove('invalid');
          });

          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;

          setTimeout(() => {
            if (toast) toast.classList.remove('active');
          }, 4000);

        }, 1400);
      }
    });
  }

  // =========================================
  // 10. PREMIUM VISUAL SYSTEMS (PRESERVED)
  // =========================================

  // A. Scroll depth progress indicator
  const progressBar = document.getElementById('scroll-progress-bar');
  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });

  // B. Custom lagging dual-ring cursor
  const cursorDot = document.getElementById('custom-cursor-dot');
  const cursorRing = document.getElementById('custom-cursor-ring');
  
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  const cursorDelay = 0.15; 
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }
  });
  
  function updateCursorRing() {
    ringX += (mouseX - ringX) * cursorDelay;
    ringY += (mouseY - ringY) * cursorDelay;
    if (cursorRing) {
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
    }
    requestAnimationFrame(updateCursorRing);
  }
  requestAnimationFrame(updateCursorRing);
  
  // Hover transitions trigger classes
  const interactiveSelectors = 'a, button, input, textarea, select, .card-project-card, .btn, .skills-pill-btn, .view-all-projects-link, .modal-close-btn, .slider-btn, .slider-indicator-dot, .timeline-node-dot, .back-to-top-btn';
  const bindCursorHoverEvents = () => {
    const interactiveElements = document.querySelectorAll(interactiveSelectors);
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorDot && cursorRing) {
          cursorDot.classList.add('hover-active');
          cursorRing.classList.add('hover-active');
        }
      });
      el.addEventListener('mouseleave', () => {
        if (cursorDot && cursorRing) {
          cursorDot.classList.remove('hover-active');
          cursorRing.classList.remove('hover-active');
        }
      });
    });
  };
  bindCursorHoverEvents();
  
  window.addEventListener('click', () => {
    setTimeout(bindCursorHoverEvents, 200); 
  });

  // C. Hero background HTML5 particles constellation mesh
  const canvas = document.getElementById('hero-particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouseRadius = 120;
    let mouseActive = false;
    let mouseCanvasX = 0, mouseCanvasY = 0;
    
    function resizeCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseCanvasX = e.clientX - rect.left;
        mouseCanvasY = e.clientY - rect.top;
        mouseActive = true;
      });
      
      heroSection.addEventListener('mouseleave', () => {
        mouseActive = false;
      });
    }
    
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        
        if (mouseActive) {
          let dx = mouseCanvasX - this.x;
          let dy = mouseCanvasY - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseRadius) {
            if (mouseCanvasX < this.x && this.x < canvas.width - this.size * 10) {
              this.x += 1.5;
            }
            if (mouseCanvasX > this.x && this.x > this.size * 10) {
              this.x -= 1.5;
            }
            if (mouseCanvasY < this.y && this.y < canvas.height - this.size * 10) {
              this.y += 1.5;
            }
            if (mouseCanvasY > this.y && this.y > this.size * 10) {
              this.y -= 1.5;
            }
          }
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }
    
    function initParticles() {
      particlesArray = [];
      let numberOfParticles = (canvas.width * canvas.height) / 11000;
      numberOfParticles = Math.min(numberOfParticles, 70); 
      
      const isDark = document.body.classList.contains('dark-theme');
      const color = isDark ? 'rgba(99, 102, 241, 0.22)' : 'rgba(79, 70, 229, 0.12)';
      
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1; 
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let directionX = (Math.random() * 0.4) - 0.2; 
        let directionY = (Math.random() * 0.4) - 0.2;
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }
    
    function connectNodes() {
      const isDark = document.body.classList.contains('dark-theme');
      const baseColor = isDark ? '99, 102, 241' : '79, 70, 229';
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 110) {
            let opacity = 1 - (distance / 110); 
            ctx.strokeStyle = `rgba(${baseColor}, ${opacity * 0.12})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
        
        if (mouseActive) {
          let dx = mouseCanvasX - particlesArray[a].x;
          let dy = mouseCanvasY - particlesArray[a].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouseRadius) {
            let opacity = 1 - (distance / mouseRadius);
            ctx.strokeStyle = `rgba(${baseColor}, ${opacity * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouseCanvasX, mouseCanvasY);
            ctx.lineTo(particlesArray[a].x, particlesArray[a].y);
            ctx.stroke();
          }
        }
      }
    }
    
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectNodes();
      requestAnimationFrame(animateParticles);
    }
    
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        setTimeout(initParticles, 120);
      });
    }
    
    initParticles();
    animateParticles();
  }

  // =========================================
  // EMAILJS CONTACT FORM INTEGRATION
  // =========================================
  function showToast(message, isError = false) {
    const toast = document.getElementById('toast-success');
    if (!toast) return;
    const toastText = toast.querySelector('span');
    const toastIcon = toast.querySelector('i');

    if (toastText) toastText.textContent = message;
    if (toastIcon) {
      toastIcon.className = isError ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-check';
      toastIcon.style.color = isError ? '#ef4444' : 'var(--accent-success)';
    }

    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }

  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', true);
        return;
      }

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin" style="font-size: 0.8rem;"></i>';

      const templateParams = {
        from_name: name,
        from_email: email,
        reply_to: email,
        subject: subject || 'New Contact Form Submission',
        message: message
      };

      emailjs.send('service_xjr4g2v', 'template_fqckfif', templateParams)
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          contactForm.reset();
          showToast('Message sent successfully!');
        }, function (error) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          showToast('Failed to send message. Please try again.', true);
          console.error('EmailJS error:', error);
        });
    });
  }

});

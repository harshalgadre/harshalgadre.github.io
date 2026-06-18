(() => {
  // --- Portfolio Projects Database ---
  const projectsData = {
    'kgst-trust': {
      title: 'KGST Trust Website',
      category: 'MERN STACK',
      tagline: 'Full stack MERN application with user authentication and MongoDB database.',
      description: 'A comprehensive full-stack MERN application developed for a public charitable trust. Features custom secure registration, automated workflow approvals, schema validations, and MongoDB database storage, helping manage resources, donations, and trust member directories with robust API checks.',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
      accent: '#00F5C4',
      images: [
        'assets/images/works/project1-1.png'
      ]
    },
    'crisislink': {
      title: 'CrisisLink',
      category: 'NEXT.JS & N8N',
      tagline: 'Crisis management platform with automated workflows.',
      description: 'Developed during a hackathon, CrisisLink is a Next.js full-stack crisis management application designed to handle notifications and orchestration during critical incidents. Integrates n8n workflow triggers and alert verification services to quickly map active emergency nodes and update field teams.',
      tech: ['Next.js', 'n8n automation', 'Node.js', 'Crisis Alerts'],
      accent: '#7B5CF0',
      images: [
        'assets/images/works/project3-1.png'
      ]
    },
    'open-source': {
      title: 'Open Source Utilities',
      category: 'DEVELOPER UTILS',
      tagline: 'Custom shell scripts and code optimizations.',
      description: 'A collection of developer utilities, automation shell scripts, and system optimizers. Features customized system backup scripts, automatic developer setup hooks, and codebase cleaners to optimize productivity and command line workflows.',
      tech: ['Shell Scripting', 'Git Version Control', 'Code Optimization', 'Linux'],
      accent: '#FFB300',
      images: [
        'assets/images/works/project4-1.png'
      ]
    },
    'devops-containers': {
      title: 'DevOps Infrastructure',
      category: 'DOCKER & SHELL',
      tagline: 'Containerized architectures and setup configurations.',
      description: 'A repository of Dockerfiles, compose setups, and system networking configurations. Simplifies application deployment by containerizing local backend API nodes, mounting persistent database volumes, and mapping secure gateways for scalable production setups.',
      tech: ['Docker', 'Containers', 'Infrastructure', 'Docker Compose'],
      accent: '#00F5C4',
      images: [
        'assets/images/works/project2-1.png'
      ]
    },
    'academic-lab': {
      title: 'Academic Lab Projects',
      category: 'JAVA & PYTHON',
      tagline: 'Object-oriented structures and algorithmic operations.',
      description: 'A portfolio of college projects written during my Information Technology diploma program at Vidyalankar Polytechnic. Focuses on data structures, object-oriented concepts in Java and Python, basic socket networking systems, and algorithm exercises.',
      tech: ['Java', 'Python', 'C++', 'Data Structures'],
      accent: '#FF3B30',
      images: [
        'assets/images/works/project5-1.png'
      ]
    },
    'company-website': {
      title: 'Corporate Web Platform',
      category: 'WEB PLATFORM',
      tagline: "The official company website for 20sDeveloper's.",
      description: "Official corporate website designed and built for 20sDeveloper's. Focuses on showcasing company services, team profiles, and case studies. Built using responsive frontend code coupled with lightweight backend API services to handle client communications securely.",
      tech: ['Node.js', 'Express', 'Bootstrap', 'HTML5/CSS3'],
      accent: '#34C759',
      images: [
        'assets/images/works/project6-1.png'
      ]
    }
  };

  const supportsHover = window.matchMedia('(hover: hover)').matches;

  // --- Intro Preloader & Asset Preloading ---
  const introScreen = document.getElementById('intro-screen');
  const introLogoWrap = document.getElementById('intro-logo-wrap');
  const introProgressBar = document.getElementById('intro-progress-bar');
  const introPercentage = document.getElementById('intro-percentage');
  const introSkip = document.getElementById('intro-skip');

  const assetsToPreload = [
    'assets/images/logo.png',
    'assets/images/fragment1.png',
    'assets/images/fragment2.png',
    'assets/images/fragment3.png',
    'assets/images/fragment4.png',
    'assets/images/fragment5.png',
    'assets/images/fragment6.png',
    'assets/images/works/project1-1.png',
    'assets/images/works/project2-1.png',
    'assets/images/works/project3-1.png',
    'assets/images/works/project4-1.png',
    'assets/images/works/project5-1.png',
    'assets/images/works/project6-1.png'
  ];

  let loadedAssets = 0;
  const totalAssets = assetsToPreload.length;
  let timeProgress = 0;
  let introFinished = false;

  // Preload assets in background
  assetsToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = () => {
      loadedAssets++;
    };
  });

  // Logo wipe and text fades
  setTimeout(() => {
    if (introLogoWrap) introLogoWrap.classList.add('revealed');
    if (introPercentage) introPercentage.style.opacity = '1';
    if (introSkip) introSkip.style.opacity = '0.6';
  }, 100);

  // Skip functionality
  const finishIntro = () => {
    if (introFinished) return;
    introFinished = true;
    if (introScreen) {
      introScreen.classList.add('dissolved');
      setTimeout(() => {
        introScreen.style.display = 'none';
        // Trigger page entrance animations
        document.body.classList.add('intro-done');
        // Start Hero canvas animations
        initHeroCanvas();
        // Start Tower canvas animations
        initTowerCanvas();
        // Start Statement canvas animations
        initStatementCanvas();
      }, 800);
    }
  };

  if (introScreen) {
    introScreen.addEventListener('click', finishIntro);
  }

  // Preloader Loop
  const startTime = performance.now();
  const minimumDuration = 1600; // ms

  function updatePreloader(now) {
    if (introFinished) return;
    const elapsed = now - startTime;
    timeProgress = Math.min(1, elapsed / minimumDuration);
    const realProgress = totalAssets > 0 ? loadedAssets / totalAssets : 1;
    const progress = Math.min(timeProgress, realProgress);

    const percent = Math.floor(progress * 100);
    if (introProgressBar) introProgressBar.style.width = `${percent}%`;
    if (introPercentage) introPercentage.textContent = String(percent).padStart(3, '0');

    if (progress >= 1) {
      finishIntro();
    } else {
      requestAnimationFrame(updatePreloader);
    }
  }
  requestAnimationFrame(updatePreloader);

  // --- Custom Cursor Overlay ---
  const cursorContainer = document.getElementById('custom-cursor-container');
  const cursorRing = document.getElementById('cursor-ring');
  const cursorDot = document.getElementById('cursor-dot');
  const cursorViewText = document.getElementById('cursor-view-text');

  let mx = -100, my = -100; // Target mouse position
  let rx = -100, ry = -100; // Lerped ring position
  let cursorVisible = false;
  let cursorIntent = 'idle'; // 'idle', 'link', 'view', 'text'

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!cursorVisible) {
      rx = mx;
      ry = my;
      cursorVisible = true;
      if (cursorContainer) {
        cursorContainer.classList.remove('opacity-0');
        cursorContainer.style.opacity = '1';
      }
      if (supportsHover) {
        document.body.classList.add('has-custom-cursor');
      }
    }
  });

  // Track cursor intent using event delegation
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (!target) return;

    const projectCard = target.closest('.project-card');
    const isLink = target.closest('a, button, input, textarea, select, label, .magnetic, .cursor-target-link, #intro-screen, .timeline-card');
    const isText = target.closest('p, h1, h2, h3, h4, h5, h6, li, .cursor-target-text');

    if (projectCard) {
      cursorIntent = 'view';
    } else if (isLink) {
      cursorIntent = 'link';
    } else if (isText) {
      cursorIntent = 'text';
    } else {
      cursorIntent = 'idle';
    }
    updateCursorStyle();
  });

  function updateCursorStyle() {
    if (!cursorRing || !cursorDot || !cursorViewText) return;

    let ringWidth = 32;
    let ringBg = 'transparent';
    let ringBorderColor = 'rgba(240, 240, 255, 0.6)';
    let viewTextOpacity = 0;

    let dotWidth = 6;
    let dotHeight = 6;
    let dotRadius = '9999px';

    if (cursorIntent === 'link') {
      ringWidth = 48;
      ringBg = 'rgba(0, 245, 196, 0.125)';
    } else if (cursorIntent === 'view') {
      ringWidth = 64;
      ringBg = 'rgba(0, 245, 196, 0.125)';
      ringBorderColor = 'rgba(0, 245, 196, 0.5)';
      viewTextOpacity = 1;
    } else if (cursorIntent === 'text') {
      dotWidth = 2;
      dotHeight = 18;
      dotRadius = '2px';
    }

    cursorRing.style.width = `${ringWidth}px`;
    cursorRing.style.height = `${ringWidth}px`;
    cursorRing.style.backgroundColor = ringBg;
    cursorRing.style.borderColor = ringBorderColor;
    cursorViewText.style.opacity = viewTextOpacity;

    cursorDot.style.width = `${dotWidth}px`;
    cursorDot.style.height = `${dotHeight}px`;
    cursorDot.style.borderRadius = dotRadius;
  }

  function cursorLoop() {
    // Lerp outer ring (18% organic lag)
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;

    if (cursorRing) {
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top = ry + 'px';
    }
    if (cursorDot) {
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top = my + 'px';
    }
    requestAnimationFrame(cursorLoop);
  }
  requestAnimationFrame(cursorLoop);

  // --- Floating Navigation Bar & Mobile Menu Controller ---
  const floatingNav = document.getElementById('floating-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const hamburgerIconPath = document.getElementById('hamburger-icon-path');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Section nodes for scroll tracking
  const menuSections = [
    document.getElementById('hero'),
    document.getElementById('about'),
    document.getElementById('tech-tower'),
    document.getElementById('works'),
    document.getElementById('experience'),
    document.getElementById('statement'),
    document.getElementById('contact')
  ];

  let mobileMenuOpen = false;
  const hamburgerPath = "M4 6h16M4 12h16M4 18h16";
  const closePath = "M6 18L18 6M6 6l12 12";

  let towerProgress = 0;
  let angleY = 0;
  const focalLength = 320;

  // Toggle mobile menu
  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenuOpen = !mobileMenuOpen;
      if (mobileMenuOpen) {
        mobileMenuOverlay.classList.remove('pointer-events-none', 'opacity-0');
        mobileMenuOverlay.classList.add('opacity-100');
        if (hamburgerIconPath) hamburgerIconPath.setAttribute('d', closePath);
        document.body.style.overflow = 'hidden';

        // Stagger in menu items
        const menuItems = mobileMenuOverlay.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 80}ms`;
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        });
      } else {
        closeMobileMenu();
      }
    });
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
      mobileMenuOverlay.classList.remove('opacity-100');
    }
    if (hamburgerIconPath) hamburgerIconPath.setAttribute('d', hamburgerPath);
    document.body.style.overflow = '';

    const menuItems = mobileMenuOverlay.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.style.transitionDelay = '0ms';
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px)';
    });
  }

  // Close overlay on link click
  if (mobileMenuOverlay) {
    const overlayLinks = mobileMenuOverlay.querySelectorAll('a');
    overlayLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // --- Scroll Active State & Progress Rail Controller ---
  const progressRail = document.getElementById('progress-rail');
  const progressRailFill = document.getElementById('progress-rail-fill');
  const railDotWraps = document.querySelectorAll('.rail-dot-wrap');

  function updateScrollState() {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = scrollHeight > 0 ? scrollY / scrollHeight : 0;
    
    // Fill rail track
    if (progressRailFill) {
      progressRailFill.style.transform = `scaleY(${progressPercent})`;
    }

    // Detect active section
    let activeIndex = 0;
    menuSections.forEach((sec, index) => {
      if (!sec) return;
      const top = sec.offsetTop;
      if (scrollY >= top - window.innerHeight * 0.45) {
        activeIndex = index;
      }
    });

    const activeSectionId = menuSections[activeIndex] ? menuSections[activeIndex].getAttribute('id') : '';

    // Update floating nav active link states
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${activeSectionId}`) {
        link.classList.add('active');
      }
    });

    // Update rail dots states
    railDotWraps.forEach((wrap) => {
      const dotIndex = parseInt(wrap.getAttribute('data-index'), 10);
      const dot = wrap.querySelector('.rail-dot');
      if (!dot) return;

      dot.classList.remove('active', 'current');

      if (dotIndex < activeIndex) {
        dot.classList.add('active');
      } else if (dotIndex === activeIndex) {
        dot.classList.add('active', 'current');
      }
    });
    
    // --- Experience Timeline Fill Line ---
    const experienceSec = document.getElementById('experience');
    const timelineFill = document.getElementById('timeline-line-fill');
    if (experienceSec && timelineFill) {
      const rect = experienceSec.getBoundingClientRect();
      const tiles = experienceSec.querySelectorAll('.timeline-tile');
      if (tiles.length > 0) {
        const firstTile = tiles[0].getBoundingClientRect();
        const lastTile = tiles[tiles.length - 1].getBoundingClientRect();
        
        // Calculate bounds in page coordinates
        const startY = firstTile.top + scrollY + 14;
        const endY = lastTile.top + scrollY + 14;
        
        const currentTriggerY = scrollY + window.innerHeight * 0.55;
        const linePercent = (currentTriggerY - startY) / (endY - startY);
        
        timelineFill.style.transform = `scaleY(${Math.max(0, Math.min(1, linePercent))})`;
      }
    }
  }

  // Smooth scroll click actions for rail dots
  railDotWraps.forEach((wrap) => {
    wrap.addEventListener('click', () => {
      const index = parseInt(wrap.getAttribute('data-index'), 10);
      const targetSec = menuSections[index];
      if (targetSec) {
        targetSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const techTowerSec = document.getElementById('tech-tower');
  const towerProgressText = document.getElementById('tower-progress-text');
  const towerCards = document.querySelectorAll('.tower-card');

  function updateTowerScroll() {
    if (!techTowerSec) return;
    const rect = techTowerSec.getBoundingClientRect();
    const sectionHeight = rect.height;
    const scrollMax = sectionHeight - window.innerHeight;
    
    let progress = 0;
    if (rect.top <= 0) {
      const scrolled = -rect.top;
      progress = Math.max(0, Math.min(1, scrolled / scrollMax));
    } else {
      progress = 0;
    }
    
    towerProgress = progress;
    
    if (towerProgressText) {
      towerProgressText.textContent = `${Math.floor(progress * 100)}%`;
    }
    
    const thresholds = [
      { start: 0.05, end: 0.23 },
      { start: 0.23, end: 0.43 },
      { start: 0.43, end: 0.63 },
      { start: 0.63, end: 0.83 },
      { start: 0.83, end: 1.0 }
    ];
    
    towerCards.forEach((card, index) => {
      const t = thresholds[index];
      if (t && progress >= t.start && progress <= t.end) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    // Show/hide floating nav based on 80% viewport scroll
    if (floatingNav) {
      if (window.scrollY > window.innerHeight * 0.8) {
        floatingNav.classList.add('nav-visible');
        floatingNav.classList.remove('pointer-events-none');
      } else if (!mobileMenuOpen) {
        floatingNav.classList.remove('nav-visible');
        floatingNav.classList.add('pointer-events-none');
      }
    }
    updateScrollState();
    updateTowerScroll();
  });
  window.addEventListener('resize', () => {
    updateScrollState();
    updateTowerScroll();
  });
  updateScrollState();
  updateTowerScroll();

  // Magnetic buttons
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px) scale(1.02)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = '' });
    btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.98)'; });
    btn.addEventListener('mouseup', () => { btn.style.transform = '' });
  });

  // --- Hero Reveal Orbital Mask ---
  const heroSec = document.getElementById('hero');
  const heroVisual = document.querySelector('.hero-visual');
  const aliveDot = document.getElementById('hero-alive-dot');
  
  if (heroVisual && heroSec) {
    let hover = false;
    const target = { x: 50, y: 50, radius: 120 };
    const actual = { x: 50, y: 50, radius: 110 };
    let orbitT = 0;

    const handleMove = (clientX, clientY) => {
      const rect = heroVisual.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      hover = true;
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      target.x = Math.max(-10, Math.min(110, x));
      target.y = Math.max(-10, Math.min(110, y));
      target.radius = 135;
    };

    heroSec.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return; // let touch events handle it
      handleMove(e.clientX, e.clientY);
    });

    heroSec.addEventListener('pointerenter', () => { hover = true; });
    heroSec.addEventListener('pointerleave', () => { hover = false; });

    // Touch events for mobile to support smooth dragging
    heroSec.addEventListener('touchstart', (e) => {
      hover = true;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    heroSec.addEventListener('touchmove', (e) => {
      hover = true;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    heroSec.addEventListener('touchend', () => { hover = false; }, { passive: true });
    heroSec.addEventListener('touchcancel', () => { hover = false; }, { passive: true });

    if (supportsHover) {
      heroSec.style.cursor = 'none';
      heroVisual.style.cursor = 'none';
    }

    function heroOrbit() {
      orbitT += 0.0025;
      const angle = orbitT * Math.PI * 2;
      
      // Lissajous autonomous orbit for reveal mask on idle or touch
      if (!hover) {
        target.x = 50 + Math.cos(angle) * 18;
        target.y = 42 + Math.sin(angle * 1.3) * 14;
        target.radius = 110 + Math.sin(angle * 1.7) * 10;
      }
      
      const wobble = Math.sin(angle * 0.7) * 1.1;
      target.x += wobble;
      target.y += Math.sin(angle * 1.1) * 1.0;
      target.radius += Math.cos(angle * 1.4) * 2;

      const easing = 0.12;
      actual.x += (target.x - actual.x) * easing;
      actual.y += (target.y - actual.y) * easing;
      actual.radius += (target.radius - actual.radius) * easing;

      heroVisual.style.setProperty('--reveal-x', `${actual.x}%`);
      heroVisual.style.setProperty('--reveal-y', `${actual.y}%`);
      heroVisual.style.setProperty('--reveal-radius', `${Math.max(90, actual.radius)}px`);
      
      // Pulse the ALIVE period dot in color sync
      if (aliveDot) {
        const pulse = 0.5 + Math.sin(angle * 3) * 0.5; // 0..1
        aliveDot.style.color = `rgb(${Math.floor(0 + pulse * 240)}, ${Math.floor(245 - pulse * 5)}, ${Math.floor(196 + pulse * 59)})`;
      }
      
      requestAnimationFrame(heroOrbit);
    }
    heroOrbit();
  }

  // --- Hero Section Particle Field Canvas ---
  let heroCanvasLoop;
  function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const maxParticles = window.innerWidth < 768 ? 30 : 70;
    
    function rand(min, max) { return Math.random() * (max - min) + min; }
    
    class Particle {
      constructor(anywhere = false) {
        this.reset(anywhere);
      }
      
      reset(anywhere = false) {
        this.x = anywhere ? rand(0, w) : (Math.random() > 0.5 ? -4 : w + 4);
        this.y = rand(0, h);
        const speed = rand(0.2, 0.8);
        const angle = rand(0, Math.PI * 2);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = rand(0.5, 1.5);
        this.opacity = rand(0.15, 0.4);
        this.isTeal = Math.random() < 0.3;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < -6 || this.x > w + 6 || this.y < -6 || this.y > h + 6) {
          this.reset(false);
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.isTeal ? '#00F5C4' : '#F0F0FF';
        ctx.globalAlpha = this.opacity;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Spawn initial particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle(true));
    }
    
    // Shooting Star logic
    let star = null;
    let starCooldown = 6; // seconds
    
    class ShootingStar {
      constructor() {
        const fromLeft = Math.random() > 0.5;
        const startY = h * rand(0.1, 0.6);
        this.start = { x: fromLeft ? -40 : w + 40, y: startY };
        this.end = { x: fromLeft ? w + 40 : -40, y: startY + h * rand(-0.15, 0.15) };
        this.t = 0;
      }
      
      update() {
        this.t += 0.02;
        if (this.t >= 1) {
          star = null;
          starCooldown = rand(5, 13);
        }
      }
      
      draw() {
        // easeIn-like head coordinate
        const headT = Math.pow(this.t, 2);
        const tailT = Math.max(0, headT - 0.06);
        
        const headX = this.start.x + (this.end.x - this.start.x) * headT;
        const headY = this.start.y + (this.end.y - this.start.y) * headT;
        const tailX = this.start.x + (this.end.x - this.start.x) * tailT;
        const tailY = this.start.y + (this.end.y - this.start.y) * tailT;
        
        const fade = Math.max(0, Math.min(1, 1 - Math.abs(this.t - 0.5) * 2));
        
        // Draw tail gradient line
        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, 'rgba(0, 245, 196, 0)');
        grad.addColorStop(1, `rgba(0, 245, 196, ${0.6 * fade})`);
        
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();
        
        // Draw head spark
        ctx.beginPath();
        ctx.fillStyle = `rgba(240, 240, 255, ${0.8 * fade})`;
        ctx.arc(headX, headY, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Resize handler
    window.addEventListener('resize', () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    });
    
    // Render loop visibility gated
    let heroCanvasVisible = true;
    const heroObserver = new IntersectionObserver((entries) => {
      heroCanvasVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    heroObserver.observe(canvas);
    
    function loop() {
      if (heroCanvasVisible) {
        ctx.clearRect(0, 0, w, h);
        
        // Particles
        particles.forEach(p => {
          p.update();
          p.draw();
        });
        
        // Shooting star
        if (star) {
          star.update();
          if (star) star.draw();
        } else {
          starCooldown -= 1 / 60;
          if (starCooldown <= 0) {
            star = new ShootingStar();
          }
        }
      }
      
      heroCanvasLoop = requestAnimationFrame(loop);
    }
    loop();
  }

  // --- Tech Stack Tower Section 3D Canvas Projection ---
  let towerCanvasLoop;
  function initTowerCanvas() {
    const canvas = document.getElementById('tower-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    
    // Geometry values
    const R_const = 82; // Constant radius for all floors (straight square column)
    const MaxFloorHeight = 46; // Boxier, wider floors matching reference image
    const NUM_FLOORS = 5;
    
    // Tech list for floating labels (plain names to map to custom icons)
    const floorSkills = [
      ["Git", "GitHub", "Docker", "Shell"],
      ["C", "C++", "Java", "Python"],
      ["HTML/CSS", "JS/TS", "React.js", "Tailwind"],
      ["Node.js", "Express", "MongoDB", "REST API"],
      ["JWT", "TOTP (2FA)", "Sessions", "Security"]
    ];

    // Load actual developer icons dynamically
    const loadedIcons = {};
    const skillIcons = {
      "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      "GitHub": "https://img.icons8.com/ios-glyphs/30/ffffff/github.png",
      "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      "Shell": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
      "C": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      "HTML/CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      "JS/TS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      "Tailwind": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      "Express": "https://img.icons8.com/color/48/express-js.png",
      "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      "REST API": "https://img.icons8.com/fluency/48/api.png",
      "JWT": "https://img.icons8.com/color/48/json-web-token.png",
      "TOTP (2FA)": "https://img.icons8.com/fluency/48/google-authenticator.png",
      "Sessions": "https://img.icons8.com/fluency/48/cookie.png",
      "Security": "https://img.icons8.com/fluency/48/shield.png"
    };

    // Preload icons in background
    Object.entries(skillIcons).forEach(([name, url]) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedIcons[name] = img;
      };
    });

    // Helper to draw rounded rectangle badges for labels
    function drawRoundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    // Particle class for blueprint accents
    class BlueprintParticle {
      constructor() {
        this.reset();
        this.y = Math.random() * 250;
      }
      reset() {
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.random() * 80 + 10;
        this.x = Math.cos(angle) * rad;
        this.z = Math.sin(angle) * rad;
        this.y = 0;
        this.vy = Math.random() * 0.5 + 0.25;
        this.opacity = Math.random() * 0.45 + 0.15;
        this.radius = Math.random() * 1.3 + 0.4;
      }
      update(currentHeight) {
        this.y += this.vy;
        if (this.y > currentHeight + 20 || this.y > 300) {
          this.reset();
        }
      }
    }

    const particles = [];
    const maxParticles = 40;
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new BlueprintParticle());
    }

    // Physics state variables for rotation and bounce
    let baseSpeed = 0.003;
    let rotVelocity = baseSpeed;
    let lastScrollY = window.scrollY;

    const renderedHeights = [0, 0, 0, 0, 0];
    const heightVelocities = [0, 0, 0, 0, 0];

    window.addEventListener('scroll', () => {
      const currScroll = window.scrollY;
      const diff = Math.abs(currScroll - lastScrollY);
      lastScrollY = currScroll;
      rotVelocity += diff * 0.00035;
      rotVelocity = Math.min(rotVelocity, 0.035);
    });
    
    // Dynamic responsive scales based on viewport width
    let isMobile = w < 768;
    let towerScale = w < 480 ? 2.8 : (w < 768 ? 3.1 : 3.6);
    let verticalOffset = w < 480 ? 80 : (w < 768 ? 100 : 130);

    window.addEventListener('resize', () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      isMobile = w < 768;
      towerScale = w < 480 ? 2.8 : (w < 768 ? 3.1 : 3.6);
      verticalOffset = w < 480 ? 80 : (w < 768 ? 100 : 130);
    });
    
    const angleX = 0.38;
    
    function project(x, y, z) {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const rx = x * cosY - z * sinY;
      const rz = x * sinY + z * cosY;
      
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const ry = y * cosX - rz * sinX;
      const rz2 = y * sinX + rz * cosX;
      
      const cameraZ = 380;
      const scale = focalLength / (focalLength + rz2 + cameraZ);
      
      const sx = w / 2 + rx * scale * towerScale;
      const sy = h / 2 - ry * scale * towerScale + verticalOffset; 
      
      return { x: sx, y: sy, scale: scale, depth: rz2 };
    }
    
    function drawLine3D(x1, y1, z1, x2, y2, z2, color, width, dash = []) {
      const p1 = project(x1, y1, z1);
      const p2 = project(x2, y2, z2);
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash(dash);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    let towerCanvasVisible = true;
    const towerObserver = new IntersectionObserver((entries) => {
      towerCanvasVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    towerObserver.observe(canvas);
    
    function loop() {
      if (towerCanvasVisible) {
        ctx.clearRect(0, 0, w, h);
        
        angleY += rotVelocity;
        rotVelocity = baseSpeed + (rotVelocity - baseSpeed) * 0.94;
        
        const targetHeights = [];
        for (let i = 0; i < NUM_FLOORS; i++) {
          const rangeStart = i * 0.2;
          const rangeEnd = (i + 1) * 0.2;
          let targetH = 0;
          if (towerProgress > rangeStart) {
            if (towerProgress >= rangeEnd) {
              targetH = MaxFloorHeight;
            } else {
              const t = (towerProgress - rangeStart) / (rangeEnd - rangeStart);
              targetH = t * MaxFloorHeight;
            }
          }
          targetHeights.push(targetH);
        }

        const k = 0.13;
        const d = 0.83;
        for (let i = 0; i < NUM_FLOORS; i++) {
          const force = (targetHeights[i] - renderedHeights[i]) * k;
          heightVelocities[i] += force;
          heightVelocities[i] *= d;
          renderedHeights[i] += heightVelocities[i];
        }

        let cumulativeHeight = 0;
        for (let i = 0; i < NUM_FLOORS; i++) {
          cumulativeHeight += renderedHeights[i];
        }
        
        // 1. Draw Base Grid (Amber/Bronze matching reference image)
        for (let g = -140; g <= 140; g += 28) {
          drawLine3D(-140, 0, g, 140, 0, g, 'rgba(255, 136, 34, 0.07)', 0.8);
          drawLine3D(g, 0, -140, g, 0, 140, 'rgba(255, 136, 34, 0.07)', 0.8);
        }
        
        // Draw base circle
        const baseCirclePoints = 32;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 136, 34, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        for (let i = 0; i <= baseCirclePoints; i++) {
          const ang = (i / baseCirclePoints) * Math.PI * 2;
          const pt = project(Math.cos(ang) * 110, 0, Math.sin(ang) * 110);
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
        
        // 2. Draw Particles (Amber)
        particles.forEach(p => {
          p.update(cumulativeHeight);
          const pt = project(p.x, p.y, p.z);
          ctx.beginPath();
          ctx.fillStyle = '#ff8c00';
          ctx.globalAlpha = p.opacity;
          ctx.arc(pt.x, pt.y, p.radius * pt.scale, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;
        
        // 3. Draw Floors (Faces, Frame, Windows in Amber theme)
        let currentY = 0;
        for (let i = 0; i < NUM_FLOORS; i++) {
          const floorH = renderedHeights[i];
          if (floorH <= 0.2) continue;
          
          const yBot = currentY;
          const yTop = currentY + floorH;
          currentY = yTop;
          
          const botR = R_const;
          const topR = botR;
          
          const cBot = [
            { x: -botR, z: -botR },
            { x: botR, z: -botR },
            { x: botR, z: botR },
            { x: -botR, z: botR }
          ];
          const cTop = [
            { x: -topR, z: -topR },
            { x: topR, z: -topR },
            { x: topR, z: topR },
            { x: -topR, z: topR }
          ];
          
          // Face depths calculation for Painter's Algorithm
          const faceDepths = [];
          for (let f = 0; f < 4; f++) {
            const next = (f + 1) % 4;
            const midX = (cBot[f].x + cBot[next].x) / 2;
            const midZ = (cBot[f].z + cBot[next].z) / 2;
            const midY = (yBot + yTop) / 2;
            const proj = project(midX, midY, midZ);
            faceDepths.push({ index: f, depth: proj.depth });
          }
          faceDepths.sort((a, b) => b.depth - a.depth);
          
          // Draw faces back to front
          faceDepths.forEach(fd => {
            const f = fd.index;
            const next = (f + 1) % 4;
            
            const pBot1 = project(cBot[f].x, yBot, cBot[f].z);
            const pBot2 = project(cBot[next].x, yBot, cBot[next].z);
            const pTop2 = project(cTop[next].x, yTop, cTop[next].z);
            const pTop1 = project(cTop[f].x, yTop, cTop[f].z);
            
            // Solid backing fill (opaque dark warm bronze/brown)
            ctx.beginPath();
            ctx.fillStyle = '#0a0604';
            ctx.moveTo(pBot1.x, pBot1.y);
            ctx.lineTo(pBot2.x, pBot2.y);
            ctx.lineTo(pTop2.x, pTop2.y);
            ctx.lineTo(pTop1.x, pTop1.y);
            ctx.closePath();
            ctx.fill();
            
            // Face shading
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 136, 34, 0.015)';
            ctx.moveTo(pBot1.x, pBot1.y);
            ctx.lineTo(pBot2.x, pBot2.y);
            ctx.lineTo(pTop2.x, pTop2.y);
            ctx.lineTo(pTop1.x, pTop1.y);
            ctx.closePath();
            ctx.fill();
            
            // Face borders
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 136, 34, 0.55)';
            ctx.lineWidth = 1.0;
            ctx.moveTo(pBot1.x, pBot1.y);
            ctx.lineTo(pBot2.x, pBot2.y);
            ctx.lineTo(pTop2.x, pTop2.y);
            ctx.lineTo(pTop1.x, pTop1.y);
            ctx.closePath();
            ctx.stroke();
            
            // Rectangular Windows grid (3 columns, 2 rows per floor)
            const cols = 3;
            const rows = 2;
            for (let r = 0; r < rows; r++) {
              for (let cCol = 0; cCol < cols; cCol++) {
                const uStart = 0.12 + cCol * 0.28;
                const uEnd = uStart + 0.20;
                const vStart = 0.16 + r * 0.42;
                const vEnd = vStart + 0.26;
                
                const wx1 = cBot[f].x + uStart * (cBot[next].x - cBot[f].x);
                const wz1 = cBot[f].z + uStart * (cBot[next].z - cBot[f].z);
                const wy1 = yBot + vStart * (yTop - yBot);
                
                const wx2 = cBot[f].x + uEnd * (cBot[next].x - cBot[f].x);
                const wz2 = cBot[f].z + uEnd * (cBot[next].z - cBot[f].z);
                const wy2 = yBot + vStart * (yTop - yBot);
                
                const wx3 = cBot[f].x + uEnd * (cBot[next].x - cBot[f].x);
                const wz3 = cBot[f].z + uEnd * (cBot[next].z - cBot[f].z);
                const wy3 = yBot + vEnd * (yTop - yBot);
                
                const wx4 = cBot[f].x + uStart * (cBot[next].x - cBot[f].x);
                const wz4 = cBot[f].z + uStart * (cBot[next].z - cBot[f].z);
                const wy4 = yBot + vEnd * (yTop - yBot);
                
                const pw1 = project(wx1, wy1, wz1);
                const pw2 = project(wx2, wy2, wz2);
                const pw3 = project(wx3, wy3, wz3);
                const pw4 = project(wx4, wy4, wz4);
                
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255, 136, 34, 0.08)'; // Amber window glow
                ctx.moveTo(pw1.x, pw1.y);
                ctx.lineTo(pw2.x, pw2.y);
                ctx.lineTo(pw3.x, pw3.y);
                ctx.lineTo(pw4.x, pw4.y);
                ctx.closePath();
                ctx.fill();
                
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 136, 34, 0.45)'; // Amber window frames
                ctx.lineWidth = 0.8;
                ctx.moveTo(pw1.x, pw1.y);
                ctx.lineTo(pw2.x, pw2.y);
                ctx.lineTo(pw3.x, pw3.y);
                ctx.lineTo(pw4.x, pw4.y);
                ctx.closePath();
                ctx.stroke();
              }
            }
          });
        }
        
        // 4. Draw Antenna on Roof
        const topFloorH = renderedHeights[4];
        if (topFloorH > 0) {
          const yRoof = cumulativeHeight;
          const antennaMaxH = 26;
          const antennaH = (topFloorH / MaxFloorHeight) * antennaMaxH;
          
          const pBase = project(0, yRoof, 0);
          const pTip = project(0, yRoof + antennaH, 0);
          
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 136, 34, 0.7)';
          ctx.lineWidth = 1.4;
          ctx.moveTo(pBase.x, pBase.y);
          ctx.lineTo(pTip.x, pTip.y);
          ctx.stroke();
          
          const barHeights = [8, 15, 21];
          const barWidths = [14, 9, 5];
          
          barHeights.forEach((bh, idx) => {
            if (antennaH >= bh) {
              const bw = barWidths[idx];
              drawLine3D(-bw / 2, yRoof + bh, 0, bw / 2, yRoof + bh, 0, 'rgba(255, 136, 34, 0.65)', 1.0);
            }
          });
          
          if (antennaH >= antennaMaxH - 1) {
            ctx.beginPath();
            ctx.fillStyle = '#ff8c00';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ff8c00';
            ctx.arc(pTip.x, pTip.y, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // 5. Draw Floating Labels with Glass Badges and Developer Icons
        currentY = 0;
        for (let i = 0; i < NUM_FLOORS; i++) {
          const floorH = renderedHeights[i];
          if (floorH <= 0.2) continue;
          
          const yBot = currentY;
          const yTop = currentY + floorH;
          currentY = yTop;
          
          const labelOpacity = Math.max(0, Math.min(1, (floorH / MaxFloorHeight) * 2 - 1));
          if (labelOpacity > 0) {
            const skills = floorSkills[i];
            const botR = R_const;
            const topR = botR;
            
            const cTop = [
              { x: -topR, z: -topR },
              { x: topR, z: -topR },
              { x: topR, z: topR },
              { x: -topR, z: topR }
            ];
            
            for (let c = 0; c < 4; c++) {
              const skill = skills[c];
              if (!skill) continue;
              
              const tx = cTop[c].x;
              const tz = cTop[c].z;
              
              const dx = tx === 0 ? 0 : tx / Math.abs(tx);
              const dz = tz === 0 ? 0 : tz / Math.abs(tz);
              
              const lx = tx + dx * 28;
              const lz = tz + dz * 28;
              const ly = yTop;
              
              const pCorner = project(tx, yTop, tz);
              const pLabel = project(lx, ly, lz);
              
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 136, 34, ${0.4 * labelOpacity})`;
              ctx.lineWidth = 0.8;
              ctx.setLineDash([2, 2]);
              ctx.moveTo(pCorner.x, pCorner.y);
              ctx.lineTo(pLabel.x, pLabel.y);
              ctx.stroke();
              ctx.setLineDash([]);
              
              ctx.beginPath();
              ctx.fillStyle = '#ff8c00';
              ctx.globalAlpha = labelOpacity * 0.8;
              ctx.arc(pCorner.x, pCorner.y, (isMobile ? 2 : 2.5) * pCorner.scale, 0, Math.PI * 2);
              ctx.fill();
              ctx.globalAlpha = 1.0;
              
              // Draw badge
              const labelFontSize = isMobile ? 12 : 14;
              const labelIconSize = isMobile ? 15 : 18;
              const labelBadgeHeight = isMobile ? 24 : 28;

              ctx.font = `500 ${labelFontSize}px "Outfit", "Inter", "Helvetica Neue", sans-serif`;
              const textMetrics = ctx.measureText(skill);
              const textWidth = textMetrics.width;
              
              const hasIcon = loadedIcons[skill] !== undefined;
              const iconImg = loadedIcons[skill];
              
              let badgeWidth = textWidth + 16;
              if (hasIcon) {
                badgeWidth = textWidth + 8 + labelIconSize + 6 + 8;
              }
              
              const bx = dx > 0 ? pLabel.x + 4 : pLabel.x - 4 - badgeWidth;
              const by = pLabel.y - labelBadgeHeight / 2;
              
              // Draw badge background with glassmorphism glow
              ctx.beginPath();
              drawRoundedRect(ctx, bx, by, badgeWidth, labelBadgeHeight, 6);
              ctx.fillStyle = 'rgba(12, 6, 4, 0.85)';
              ctx.globalAlpha = labelOpacity;
              ctx.fill();
              
              // Badge border
              ctx.strokeStyle = `rgba(255, 136, 34, ${0.45 * labelOpacity})`;
              ctx.lineWidth = 1;
              ctx.stroke();
              
              // Draw icon if loaded
              if (hasIcon) {
                const iconY = by + (labelBadgeHeight - labelIconSize) / 2;
                ctx.drawImage(iconImg, bx + 8, iconY, labelIconSize, labelIconSize);
              }
              
              // Draw text
              ctx.fillStyle = '#ffffff';
              ctx.font = `500 ${labelFontSize}px "Outfit", "Inter", "Helvetica Neue", sans-serif`;
              ctx.textAlign = 'left';
              ctx.textBaseline = 'middle';
              
              const txOffset = hasIcon ? (8 + labelIconSize + 6) : 8;
              ctx.fillText(skill, bx + txOffset, by + labelBadgeHeight / 2);
              ctx.globalAlpha = 1.0;
            }
          }
        }
      }
      towerCanvasLoop = requestAnimationFrame(loop);
    }
    loop();
  }
  // --- About Section Fragment Collage Observer ---
  const fragPortrait = document.getElementById('fragment-portrait');
  if (fragPortrait) {
    if (!supportsHover) {
      // Touch assembly observer
      const portraitObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && entries[0].intersectionRatio > 0.2) {
          fragPortrait.classList.add('assembled');
        } else {
          fragPortrait.classList.remove('assembled');
        }
      }, { threshold: [0.0, 0.2, 0.5] });
      portraitObserver.observe(fragPortrait);
    }
  }

  // --- Touch Viewport Center Glow for Toolkit Pillars ---
  const pillars = document.querySelectorAll('.toolkit-pillar');
  if (pillars.length > 0 && !supportsHover) {
    window.addEventListener('scroll', () => {
      const centerY = window.innerHeight / 2;
      let closestPillar = null;
      let minDistance = Infinity;
      
      pillars.forEach(pillar => {
        const rect = pillar.getBoundingClientRect();
        const pillarCenterY = rect.top + rect.height / 2;
        const dist = Math.abs(centerY - pillarCenterY);
        
        if (dist < minDistance) {
          minDistance = dist;
          closestPillar = pillar;
        }
      });
      
      pillars.forEach(p => {
        if (p === closestPillar && minDistance < 180) {
          p.classList.add('active');
          const accent = p.getAttribute('data-accent');
          p.style.borderColor = accent;
          p.style.transform = 'translateX(6px)';
        } else {
          p.classList.remove('active');
          p.style.borderColor = '';
          p.style.transform = '';
        }
      });
    });
  }

  // --- 3D Specular Tilt on Project Cards ---
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    if (!supportsHover) {
      // Simple touch down/up scaling fallback (handled by CSS active or direct touch listener)
      card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(0.97)';
      });
      card.addEventListener('touchend', () => {
        card.style.transform = '';
      });
      return;
    }
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1..1
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1..1
      
      // Specular shine moves opposite the tilt
      const specX = (0.5 - x * 0.5) * 100;
      const specY = (0.5 - y * 0.5) * 100;
      
      card.style.setProperty('--specular-x', `${specX}%`);
      card.style.setProperty('--specular-y', `${specY}%`);
      card.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      card.style.setProperty('--specular-x', '50%');
      card.style.setProperty('--specular-y', '50%');
    });
  });

  // --- Experience Timeline Item Observer & Cards ---
  const timelineTiles = document.querySelectorAll('.timeline-tile');
  const tileObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.25 });
  
  timelineTiles.forEach(tile => tileObserver.observe(tile));

  // Expand timeline card click handlers
  const timelineCards = document.querySelectorAll('.timeline-card');
  timelineCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const desc = card.querySelector('.timeline-desc');
      if (!desc) return;
      
      const isExpanded = card.classList.contains('expanded');
      
      // Collapse all other cards first
      timelineCards.forEach(c => {
        c.classList.remove('expanded');
        const d = c.querySelector('.timeline-desc');
        if (d) d.style.maxHeight = '0px';
      });
      
      if (!isExpanded) {
        card.classList.add('expanded');
        desc.style.maxHeight = '400px';
      }
    });
  });

  // --- Statement Section Reveal words dynamically ---
  const statementVerse = document.getElementById('statement-verse');
  const statementLines = document.querySelectorAll('.statement-line');
  
  // Split each line text into spans dynamically on mount
  statementLines.forEach(line => {
    const text = line.textContent;
    const words = text.split(' ');
    line.innerHTML = ''; // clear
    words.forEach(word => {
      const span = document.createElement('span');
      span.className = 'statement-word mr-3';
      span.textContent = word;
      line.appendChild(span);
    });
  });

  const statementWords = document.querySelectorAll('.statement-word');
  const totalStatementWords = statementWords.length;

  function handleStatementScrollReveal() {
    if (!statementVerse) return;
    const rect = statementVerse.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Bounds: from entering bottom of viewport to center-high
    const startY = viewportHeight * 0.9;
    const endY = viewportHeight * 0.15;
    
    const progress = (startY - rect.top) / (startY - endY);
    const clampedProgress = Math.max(0, Math.min(1, progress));
    
    // Stagger calculate for each word
    statementWords.forEach((word, index) => {
      const wordStart = index / totalStatementWords;
      const wordEnd = (index + 1) / totalStatementWords;
      
      // Interpolate word reveal progress
      let wordProg = (clampedProgress - wordStart) / (wordEnd - wordStart);
      wordProg = Math.max(0, Math.min(1, wordProg));
      
      // Apply spring-like transform properties using bezier curve or basic math
      const easeVal = Math.sin(wordProg * Math.PI / 2); // basic easeOut
      
      word.style.opacity = 0.15 + easeVal * 0.85;
      word.style.transform = `translateY(${(1 - easeVal) * 16}px)`;
    });
  }

  window.addEventListener('scroll', handleStatementScrollReveal);

  // --- Statement Section Constellation Canvas background ---
  let statementCanvasLoop;
  function initStatementCanvas() {
    const canvas = document.getElementById('statement-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    
    const nodes = [];
    const clustersCount = 3;
    const perClusterNodes = 16;
    const linkDist = 116;
    const pointerPull = 0.6;
    let t = 0;
    
    function rand(min, max) { return Math.random() * (max - min) + min; }
    
    // Seed clusters
    for (let c = 0; c < clustersCount; c++) {
      const cx = w * rand(0.2, 0.8);
      const cy = h * rand(0.2, 0.8);
      
      for (let i = 0; i < perClusterNodes; i++) {
        nodes.push({
          x: Math.max(0, Math.min(w, cx + (Math.random() - 0.5) * w * 0.4)),
          y: Math.max(0, Math.min(h, cy + (Math.random() - 0.5) * h * 0.4)),
          vx: rand(-0.3, 0.3),
          vy: rand(-0.3, 0.3),
          cluster: c
        });
      }
    }
    
    // Local section mouse position tracking
    let sectMouse = null;
    const statementSec = document.getElementById('statement');
    
    if (statementSec) {
      statementSec.addEventListener('pointermove', (e) => {
        const rect = statementSec.getBoundingClientRect();
        sectMouse = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      });
      statementSec.addEventListener('pointerleave', () => {
        sectMouse = null;
      });
    }
    
    function clusterAttractor(c) {
      const phase = c * 2.1;
      return {
        x: w * (0.5 + 0.3 * Math.cos(t * (0.5 + c * 0.12) + phase)),
        y: h * (0.5 + 0.26 * Math.sin(t * (0.7 + c * 0.1) + phase))
      };
    }
    
    window.addEventListener('resize', () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    });
    
    let statementCanvasVisible = true;
    const statementObserver = new IntersectionObserver((entries) => {
      statementCanvasVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    statementObserver.observe(canvas);
    
    function loop() {
      if (statementCanvasVisible) {
        ctx.clearRect(0, 0, w, h);
        t += 1 / 60;
        
        // Physics update
        nodes.forEach(n => {
          const attractor = sectMouse || clusterAttractor(n.cluster);
          const dx = attractor.x - n.x;
          const dy = attractor.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy) + 0.001;
          
          if (dist < 220) {
            const pullFactor = pointerPull * (1 - dist / 220) / dist;
            n.vx += dx * pullFactor;
            n.vy += dy * pullFactor;
          }
          
          n.vx *= 0.95;
          n.vy *= 0.95;
          n.x += n.vx;
          n.y += n.vy;
          
          // Boundaries bounce
          if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx) * 0.6; }
          else if (n.x > w) { n.x = w; n.vx = -Math.abs(n.vx) * 0.6; }
          if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy) * 0.6; }
          else if (n.y > h) { n.y = h; n.vy = -Math.abs(n.vy) * 0.6; }
        });
        
        // Draw links between nearby same-cluster nodes
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            if (a.cluster !== b.cluster) continue;
            
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < linkDist) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 245, 196, ${0.16 * (1 - dist / linkDist)})`;
              ctx.lineWidth = 1;
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        
        // Draw mouse pointer attractor links
        if (sectMouse) {
          nodes.forEach(n => {
            const dx = n.x - sectMouse.x;
            const dy = n.y - sectMouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < linkDist * 1.4) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 245, 196, ${0.42 * (1 - dist / (linkDist * 1.4))})`;
              ctx.lineWidth = 1;
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(sectMouse.x, sectMouse.y);
              ctx.stroke();
            }
          });
          
          // Mouse node dot glow
          ctx.beginPath();
          ctx.fillStyle = 'rgba(0, 245, 196, 0.9)';
          ctx.arc(sectMouse.x, sectMouse.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw node dots
        ctx.fillStyle = 'rgba(240, 240, 255, 0.55)';
        nodes.forEach(n => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      
      statementCanvasLoop = requestAnimationFrame(loop);
    }
    loop();
  }

  // --- Project Details Modal overlay & Carousels ---
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-content');

  // Open modal
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-id');
      const data = projectsData[projectId];
      if (!data) return;
      
      document.body.style.overflow = 'hidden';
      
      // Populate HTML dynamically
      modalContent.innerHTML = `
        <div class="space-y-6">
          <span class="text-xs font-mono text-tealAccent uppercase tracking-widest">${data.category}</span>
          <h2 class="text-3xl sm:text-5xl font-bold font-display text-textPrimary tracking-tight">${data.title}</h2>
          
          <!-- Carousel screenshot display -->
          <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[2rem] overflow-hidden border border-borderSubtle bg-radial-modal-bg p-4 sm:p-8 flex items-center justify-center group" id="modal-carousel">
            <!-- Images stack -->
            <div class="relative w-full h-full flex items-center justify-center overflow-hidden" id="carousel-images-wrap">
              ${data.images.map((imgSrc, i) => `
                <img src="${imgSrc}" alt="" class="absolute max-w-[90%] max-h-[90%] object-contain transition-all duration-[600ms] ease-out ${i === 0 ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 pointer-events-none z-0'}" data-slide-index="${i}" />
              `).join('')}
            </div>
            
            <!-- Navigation Chevrons -->
            <button class="carousel-btn absolute left-4 sm:left-6 w-10 h-10 rounded-full border border-borderSubtle bg-space/70 flex items-center justify-center text-textPrimary transition-all duration-300 opacity-0 group-hover:opacity-100" id="carousel-prev">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button class="carousel-btn absolute right-4 sm:right-6 w-10 h-10 rounded-full border border-borderSubtle bg-space/70 flex items-center justify-center text-textPrimary transition-all duration-300 opacity-0 group-hover:opacity-100" id="carousel-next">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
          
          <!-- Carousel pagination dots -->
          <div class="flex items-center justify-center gap-2" id="carousel-dots-wrap">
            ${data.images.map((_, i) => `
              <span class="carousel-dot cursor-pointer h-2 rounded-full ${i === 0 ? 'w-7 bg-tealAccent' : 'w-2 bg-borderSubtle'}" data-dot-index="${i}"></span>
            `).join('')}
          </div>
          
          <!-- Detailed content description -->
          <div class="grid grid-cols-1 md:grid-cols-5 gap-8 pt-8">
            <div class="md:col-span-3 text-textSecondary text-base leading-relaxed font-light">
              ${data.description}
            </div>
            <div class="md:col-span-2 space-y-4">
              <h5 class="font-mono text-xs text-textPrimary uppercase tracking-widest">STACK</h5>
              <div class="flex flex-wrap gap-2">
                ${data.tech.map(techName => `
                  <span class="px-3 py-1.5 text-xs font-mono rounded bg-card border border-borderSubtle text-textSecondary">${techName}</span>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      
      // Inject Radial Background color styling relative to project accent
      const carouselWrap = document.getElementById('modal-carousel');
      if (carouselWrap) {
        carouselWrap.style.background = `radial-gradient(circle at 50% 50%, ${data.accent}1c 0%, #080810 100%)`;
      }
      
      // Hook carousel logic
      initCarousel(data.images.length);
      
      // Reveal Modal
      projectModal.style.display = 'block';
      setTimeout(() => {
        projectModal.classList.remove('pointer-events-none', 'opacity-0');
        projectModal.classList.add('opacity-100');
      }, 50);
    });
  });

  // Carousel Controller
  function initCarousel(slidesCount) {
    let activeSlideIndex = 0;
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const imgs = document.querySelectorAll('#carousel-images-wrap img');
    const dots = document.querySelectorAll('#carousel-dots-wrap .carousel-dot');
    
    function showSlide(index) {
      activeSlideIndex = (index + slidesCount) % slidesCount;
      
      imgs.forEach((img, i) => {
        img.classList.remove('opacity-100', 'scale-100', 'z-10');
        img.classList.add('opacity-0', 'scale-95', 'pointer-events-none', 'z-0');
        
        if (i === activeSlideIndex) {
          img.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', 'z-0');
          img.classList.add('opacity-100', 'scale-100', 'z-10');
        }
      });
      
      dots.forEach((dot, i) => {
        dot.className = 'carousel-dot cursor-pointer h-2 rounded-full transition-all duration-300';
        if (i === activeSlideIndex) {
          dot.classList.add('w-7', 'bg-tealAccent');
        } else {
          dot.classList.add('w-2', 'bg-borderSubtle');
        }
      });
    }
    
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showSlide(activeSlideIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showSlide(activeSlideIndex + 1); });
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(index);
      });
    });
  }

  // Close modal logic
  const closeModal = () => {
    if (projectModal.classList.contains('opacity-100')) {
      projectModal.classList.remove('opacity-100');
      projectModal.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        projectModal.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal || e.target.closest('#modal-close-btn')) {
        closeModal();
      }
    });
  }

  // Escape Key closeModal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileMenu();
    }
  });

  // --- CTA scrolls hook ---
  const viewBtn = document.getElementById('viewWork');
  const heroContactBtn = document.getElementById('hero-contact-btn');
  const footerContactBtn = document.querySelector('nav #nav-logo-link');

  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      const worksSec = document.getElementById('works');
      if (worksSec) worksSec.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (heroContactBtn) {
    heroContactBtn.addEventListener('click', () => {
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
    });
  }
  if (footerContactBtn) {
    footerContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Contact Form validation & confetti trigger ---
  const contactForm = document.getElementById('contact-form');
  const formName = document.getElementById('form-name');
  const formEmail = document.getElementById('form-email');
  const formMessage = document.getElementById('form-message');
  const formSubmit = document.getElementById('form-submit');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Reset validation states
      let isValid = true;
      document.querySelectorAll('.form-error').forEach(err => err.classList.add('hidden'));
      formName.style.borderColor = '';
      formEmail.style.borderColor = '';
      formMessage.style.borderColor = '';
      
      // Name validate
      if (!formName.value.trim()) {
        isValid = false;
        document.getElementById('err-name').classList.remove('hidden');
        formName.style.borderColor = '#FF3B30';
      }
      
      // Email validate
      const emailVal = formEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        isValid = false;
        document.getElementById('err-email').textContent = 'Email is required';
        document.getElementById('err-email').classList.remove('hidden');
        formEmail.style.borderColor = '#FF3B30';
      } else if (!emailRegex.test(emailVal)) {
        isValid = false;
        document.getElementById('err-email').textContent = 'Enter a valid email address';
        document.getElementById('err-email').classList.remove('hidden');
        formEmail.style.borderColor = '#FF3B30';
      }
      
      // Message validate
      if (!formMessage.value.trim()) {
        isValid = false;
        document.getElementById('err-message').classList.remove('hidden');
        formMessage.style.borderColor = '#FF3B30';
      }
      
      if (!isValid) return;
      
      // Sending...
      formSubmit.disabled = true;
      formStatus.textContent = 'Sending…';
      formStatus.classList.remove('hidden');
      formStatus.style.color = '#F0F0FF';
      
      // Email client fallback simulation in 1 sec
      setTimeout(() => {
        formSubmit.disabled = false;
        formStatus.textContent = 'Message sent — I\'ll get back to you soon.';
        formStatus.style.color = '#00F5C4';
        
        // Confetti burst explosion celebration
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#00F5C4', '#7B5CF0', '#F0F0FF', '#111122']
          });
        }
        
        // Direct email link fallback
        const subject = encodeURIComponent(`Portfolio Message from ${formName.value}`);
        const body = encodeURIComponent(formMessage.value);
        window.location.href = `mailto:harshalgadre001@gmail.com?subject=${subject}&body=${body}`;
        
        // Clear inputs
        formName.value = '';
        formEmail.value = '';
        formMessage.value = '';
      }, 1000);
    });
  }

  // --- Footer UTC+5:30 Mumbai clock ticks ---
  const jakartaClock = document.getElementById('jakarta-clock');
  function updateJakartaClock() {
    if (!jakartaClock) return;
    const now = new Date();
    
    // Get UTC milliseconds
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    
    // Convert to Mumbai time (UTC+5:30)
    const mumbaiTime = new Date(utcTime + (3600000 * 5.5));
    
    const h = String(mumbaiTime.getHours()).padStart(2, '0');
    const m = String(mumbaiTime.getMinutes()).padStart(2, '0');
    const s = String(mumbaiTime.getSeconds()).padStart(2, '0');
    
    jakartaClock.textContent = `MUMBAI UTC+5:30 — ${h}:${m}:${s}`;
  }
  setInterval(updateJakartaClock, 1000);
  updateJakartaClock();

  // --- Smooth scroll-reveals Intersection Observer ---
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  
  revealElements.forEach(el => scrollRevealObserver.observe(el));

  // Remove custom cursor on touch devices after first touch
  window.addEventListener('touchstart', () => {
    document.body.classList.remove('has-custom-cursor');
    if (cursorContainer) cursorContainer.style.display = 'none';
  }, { once: true });

})();

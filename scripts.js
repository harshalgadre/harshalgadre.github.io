(() => {
  // --- Portfolio Projects Database ---
  const projectsData = {
    'fe-touch': {
      title: 'FE Touch',
      category: 'TABLET APP',
      tagline: 'A modern teller workspace for everyday banking.',
      description: 'A sleek, tablet-based app made for bank tellers — built with PT Collega Inti Pratama. FE Touch brings a fresh, modern interface to everyday banking tasks: something that feels fast, clean, and easy to use, even at the counter during rush hour.',
      tech: ['Flutter', 'REST APIs', 'Tablet UI'],
      accent: '#00F5C4',
      images: [
        'assets/images/works/project1-1.png',
        'assets/images/works/project1-2.png',
        'assets/images/works/project1-3.png'
      ]
    },
    'panic-button': {
      title: 'Panic Button',
      category: 'MOBILE APP',
      tagline: 'Real-time SOS reporting for Damkar Banten.',
      description: 'A simple yet essential SOS app built for Damkar Banten. Designed for quick, real-time emergency reporting and tracking, it helps firefighters receive, manage, and respond to incidents faster. Clean UI meets critical functionality — because in emergencies, every second (and every tap) counts.',
      tech: ['Flutter', 'Real-time', 'Geo Tracking'],
      accent: '#FF3B30',
      images: [
        'assets/images/works/project3-1.png',
        'assets/images/works/project3-2.png',
        'assets/images/works/project3-3.png'
      ]
    },
    'digital-lending': {
      title: 'Digital Lending',
      category: 'MOBILE APP',
      tagline: 'The lending process, fully online.',
      description: 'A seamless loan application platform that brings the lending process fully online — from registration to approval. Built to simplify and speed up credit access for users, while giving banks a smarter way to manage risk and workflow. Digital Lending makes borrowing feel less like paperwork and more like progress.',
      tech: ['Flutter', 'Fintech', 'REST APIs'],
      accent: '#7B5CF0',
      images: [
        'assets/images/works/project4-1.png',
        'assets/images/works/project4-2.png',
        'assets/images/works/project4-3.png'
      ]
    },
    'core-x': {
      title: 'Core X',
      category: 'CORE BANKING',
      tagline: 'The heart of banking operations, rebuilt.',
      description: 'A modern core banking solution built to replace the aging Olibs 724 system. Designed to handle the heart of banking operations with a more scalable, efficient, and user-friendly approach, Core X brings a fresh layer of clarity and performance to complex processes — all while keeping the reliability banks depend on.',
      tech: ['Flutter', 'Java', 'Banking Core'],
      accent: '#00F5C4',
      images: [
        'assets/images/works/project2-1.png',
        'assets/images/works/project2-2.png',
        'assets/images/works/project2-3.png'
      ]
    },
    'lelang-online': {
      title: 'Lelang Online',
      category: 'MOBILE APP',
      tagline: 'Live auctions, on your screen.',
      description: 'A digital platform that brings the excitement of live auctions to your screen. Built to simplify the bidding process, manage listings, and ensure a fair, transparent experience for all users. Whether you\'re buying or selling, Lelang Online makes auctions feel accessible, fast, and just a little more fun.',
      tech: ['Flutter', 'Live Bidding', 'Marketplace'],
      accent: '#FFB300',
      images: [
        'assets/images/works/project5-1.png',
        'assets/images/works/project5-2.png',
        'assets/images/works/project5-3.png'
      ]
    },
    'roast-pos': {
      title: 'Roast POS',
      category: 'POS PLATFORM',
      tagline: 'Restaurant operations, end to end.',
      description: 'An all-in-one restaurant operations app built to handle everything from POS transactions to inventory, stock tracking, staff presence, and real-time dashboards. Designed for smooth day-to-day operations — whether you\'re managing the floor, the kitchen, or the cash flow. Roast POS brings structure, clarity, and speed to the hustle of running a restaurant.',
      tech: ['Flutter', 'POS', 'Dashboards'],
      accent: '#34C759',
      images: [
        'assets/images/works/project6-1.png',
        'assets/images/works/project6-2.png',
        'assets/images/works/project6-3.png'
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
    document.getElementById('works'),
    document.getElementById('experience'),
    document.getElementById('statement'),
    document.getElementById('contact')
  ];

  let mobileMenuOpen = false;
  const hamburgerPath = "M4 6h16M4 12h16M4 18h16";
  const closePath = "M6 18L18 6M6 6l12 12";

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
  });
  window.addEventListener('resize', updateScrollState);
  updateScrollState();

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
  const heroVisual = document.querySelector('.hero-visual');
  const aliveDot = document.getElementById('hero-alive-dot');
  
  if (heroVisual) {
    let heroRect = heroVisual.getBoundingClientRect();
    let hover = false;
    const target = { x: 50, y: 50, radius: 120 };
    const actual = { x: 50, y: 50, radius: 110 };
    let orbitT = 0;
    
    function updateHeroRect() { heroRect = heroVisual.getBoundingClientRect(); }
    updateHeroRect();
    window.addEventListener('resize', updateHeroRect);

    window.addEventListener('pointermove', (e) => {
      if (!heroRect.width || !heroRect.height) return;
      const inside = e.clientX >= heroRect.left && e.clientX <= heroRect.right && e.clientY >= heroRect.top && e.clientY <= heroRect.bottom;
      hover = inside;
      if (!inside) return;
      const x = ((e.clientX - heroRect.left) / heroRect.width) * 100;
      const y = ((e.clientY - heroRect.top) / heroRect.height) * 100;
      target.x = Math.max(12, Math.min(88, x));
      target.y = Math.max(18, Math.min(82, y));
      target.radius = 130;
    });

    heroVisual.addEventListener('pointerleave', () => { hover = false; });

    if (supportsHover) {
      heroVisual.style.cursor = 'none';
    }

    function heroOrbit() {
      if (!heroRect.width || !heroRect.height) return;
      orbitT += 0.0025;
      const angle = orbitT * Math.PI * 2;
      
      // Lissajous autonomous orbit for reveal mask on idle or touch
      if (!hover || !supportsHover) {
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
        window.location.href = `mailto:lraihan@hackermail.com?subject=${subject}&body=${body}`;
        
        // Clear inputs
        formName.value = '';
        formEmail.value = '';
        formMessage.value = '';
      }, 1000);
    });
  }

  // --- Footer UTC+7 Jakarta clock ticks ---
  const jakartaClock = document.getElementById('jakarta-clock');
  function updateJakartaClock() {
    if (!jakartaClock) return;
    const now = new Date();
    
    // Get UTC milliseconds
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    
    // Convert to Jakarta time (UTC+7)
    const jakartaTime = new Date(utcTime + (3600000 * 7));
    
    const h = String(jakartaTime.getHours()).padStart(2, '0');
    const m = String(jakartaTime.getMinutes()).padStart(2, '0');
    const s = String(jakartaTime.getSeconds()).padStart(2, '0');
    
    jakartaClock.textContent = `JAKARTA UTC+7 — ${h}:${m}:${s}`;
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

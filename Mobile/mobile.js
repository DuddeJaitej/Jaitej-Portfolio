document.addEventListener('DOMContentLoaded', () => {
  const scrollBar = document.getElementById('scrollProgressBar');
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navCloseBtn = document.getElementById('navCloseBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const links = document.querySelectorAll('a[href^="#"]');
  const revealTargets = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target) => revealObserver.observe(target));

  function updateScrollBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollBar) scrollBar.style.width = `${percent}%`;

    if (navbar) {
      navbar.classList.toggle('scrolled', scrollTop > 20);
    }

    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollTop > 420);
    }
  }

  window.addEventListener('scroll', updateScrollBar, { passive: true });
  updateScrollBar();

  function closeMenu() {
    if (navMenu) navMenu.classList.remove('open');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  function openMenu() {
    if (navMenu) navMenu.classList.add('open');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileMenuBtn.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) closeMenu(); else openMenu();
    });

    navCloseBtn?.addEventListener('click', closeMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        closeMenu();
      }
    });
  }

  links.forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      event.preventDefault();
      const offset = 80;
      const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: elementTop, behavior: 'smooth' });
      closeMenu();
      targetElement.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
    });
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const roles = ['Java Full Stack Developer', 'Spring Boot & REST API Specialist', 'Prompt Engineer', 'Vibe Coder', 'MCA 2025 Graduate'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 90;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 45;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 85;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 1800;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 350;
      }

      setTimeout(typeRole, typingDelay);
    }

    setTimeout(typeRole, 600);
  }
});

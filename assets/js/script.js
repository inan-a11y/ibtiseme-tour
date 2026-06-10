/* ============================================
   İBTİSEME TOUR – Main JavaScript
   ibtisemetour.com
   ============================================ */

'use strict';

// ──────────────────────────────────────────────
//  UTILITY: DOM selectors & helpers
// ──────────────────────────────────────────────
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// ──────────────────────────────────────────────
//  1. NAVIGATION — Scroll effect + mobile menu
// ──────────────────────────────────────────────
(function initNav() {
  const nav        = $('#main-nav');
  const hamburger  = $('#nav-hamburger');
  const mobileMenu = $('#mobile-menu');
  const mobileLinks = $$('.nav__mobile-link, .nav__mobile-cta', mobileMenu);

  if (!nav) return;

  let previouslyFocused = null;

  // Scroll class
  const handleScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on load

  // Mobile menu toggle
  function toggleMobileMenu(forceClose = false) {
    const isOpen = mobileMenu.classList.contains('open') || forceClose;

    if (isOpen) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (previouslyFocused) previouslyFocused.focus();
    } else {
      previouslyFocused = document.activeElement;
      mobileMenu.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const firstFocusable = mobileMenu.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
      if (firstFocusable) firstFocusable.focus();
    }
  }

  hamburger?.addEventListener('click', () => toggleMobileMenu());

  // Close when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      toggleMobileMenu(true);
    }
  });

  // Close on Escape, trap Tab within open menu
  document.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('open')) return;
    if (e.key === 'Escape') {
      toggleMobileMenu(true);
      return;
    }
    if (e.key === 'Tab') {
      const focusable = [...mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  });
})();

// ──────────────────────────────────────────────
//  2. ACTIVE NAV LINK — Highlight based on current page URL
// ──────────────────────────────────────────────
(function initActiveNav() {
  const navLinks = $$('.nav__link');
  const page = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('#')[0];
    if (href === page) {
      link.classList.add('nav__link--active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

// ──────────────────────────────────────────────
//  3. SCROLL REVEAL — Fade-in on scroll
// ──────────────────────────────────────────────
(function initScrollReveal() {
  // Add reveal class to target elements
  const targets = [
    '.trust__item',
    '.service-card',
    '.home-service-card',
    '.dest-card',
    '.about__value-item',
    '.team-card',
    '.office-info__item',
    '.markets__flag-item',
    '.testimonial-card',
    '.contact__left',
    '.vip-form',
    '.section-header',
    '.footer__brand',
    '.footer__nav-col',
  ];

  const isMobile = window.innerWidth < 768;

  targets.forEach(selector => {
    $$(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * (isMobile ? 40 : 80)}ms`;
    });
  });

  if (!('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.reveal').forEach(el => observer.observe(el));
})();


// ──────────────────────────────────────────────
//  5. LANGUAGE SWITCHER — Dropdown toggle
// ──────────────────────────────────────────────
(function initLangSwitcher() {
  const switcher = $('#lang-switcher');
  if (!switcher) return;

  const btn = $('#lang-btn');

  function openSwitcher() {
    switcher.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }

  function closeSwitcher() {
    switcher.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    switcher.classList.contains('open') ? closeSwitcher() : openSwitcher();
  });

  // Close after language selection
  $$('[data-lang]', switcher).forEach(el => {
    el.addEventListener('click', closeSwitcher);
  });

  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) closeSwitcher();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSwitcher();
  });
})();

// ──────────────────────────────────────────────
//  6. FOOTER YEAR — Auto-update
// ──────────────────────────────────────────────
(function initFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ──────────────────────────────────────────────
//  7. WHATSAPP FAB — Entrance animation
// ──────────────────────────────────────────────
(function initWhatsAppFAB() {
  const fab = $('#whatsapp-fab');
  if (!fab) return;

  fab.style.opacity = '0';
  fab.style.transform = 'translateY(20px) scale(0.9)';
  fab.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  setTimeout(() => {
    fab.style.opacity = '1';
    fab.style.transform = 'translateY(0) scale(1)';
  }, 1800);
})();

// ──────────────────────────────────────────────
//  8. SMOOTH ANCHOR SCROLL — With nav offset
// ──────────────────────────────────────────────
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('main-nav')?.offsetHeight || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ──────────────────────────────────────────────
//  9. PARALLAX HERO — Subtle depth on scroll
// ──────────────────────────────────────────────
(function initParallax() {
  const heroImg = document.querySelector('.hero__bg-img');
  if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight * 1.5) {
          heroImg.style.transform = `scale(1.06) translateY(${scrolled * 0.25}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ──────────────────────────────────────────────
//  11. ANIMATED COUNTERS — Numbers section
// ──────────────────────────────────────────────
(function initCounters() {
  const counters = $$('.numbers__count[data-target]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = target > 100 ? 2000 : 1200;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.textContent = value >= 1000 ? value.toLocaleString(document.documentElement.lang || 'en') : value;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

// ──────────────────────────────────────────────
//  HELPERS
// ──────────────────────────────────────────────
//  12. SCROLL TO TOP — Appears after 400px scroll
// ──────────────────────────────────────────────
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


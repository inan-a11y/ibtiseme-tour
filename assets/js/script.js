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
//  TEAM CONTACTS — Single source of truth
// ──────────────────────────────────────────────
const TEAM_CONTACTS = [
  { name: 'Abdullah', phone: '905076249154' },
  { name: 'Roushin',  phone: '905076249155' },
  { name: 'Ali',      phone: '905076249153' },
  { name: 'Ravda',    phone: '905076249157' },
];

// ──────────────────────────────────────────────
//  WHATSAPP PICKER — Modal with team member choice
// ──────────────────────────────────────────────
(function initWaPicker() {
  const WA_ICON = `<svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.45.644 4.75 1.77 6.736L2 30l7.45-1.74A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z" fill="currentColor"/><path d="M22.5 19.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17 0-.37-.02-.57-.02s-.52.07-.8.37c-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" fill="#fff"/></svg>`;

  function makeEl(tag, props = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else el.setAttribute(k, v);
    });
    children.forEach(c => c && el.appendChild(c));
    return el;
  }

  function makeWaIcon() {
    const parser = new DOMParser();
    const doc = parser.parseFromString(WA_ICON, 'image/svg+xml');
    return doc.documentElement;
  }

  function buildModal() {
    const closeBtn = makeEl('button', { class: 'wa-picker__close', 'aria-label': 'Close', id: 'wa-picker-close' });
    closeBtn.textContent = '×';

    const iconWrap = makeEl('span', { class: 'wa-picker__icon' }, [makeWaIcon()]);
    const title    = makeEl('h2',  { class: 'wa-picker__title', id: 'wa-picker-title', 'data-i18n': 'wa_picker.title', text: 'Chat with our team' });
    const sub      = makeEl('p',   { class: 'wa-picker__sub',   'data-i18n': 'wa_picker.sub',   text: 'Choose a team member to start a conversation' });
    const header   = makeEl('div', { class: 'wa-picker__header' }, [iconWrap, title, sub]);

    const list = makeEl('ul', { class: 'wa-picker__list', role: 'list' });
    TEAM_CONTACTS.forEach(c => {
      const avatar = makeEl('span', { class: 'wa-picker__avatar', text: c.name[0] });
      const name   = makeEl('span', { class: 'wa-picker__name',   text: c.name });
      const arrow  = makeEl('span', { class: 'wa-picker__arrow'  }, [makeWaIcon()]);
      const link   = makeEl('a', {
        class: 'wa-picker__item',
        href: 'https://wa.me/' + c.phone,
        target: '_blank',
        rel: 'noopener noreferrer',
        'data-phone': c.phone,
      }, [avatar, name, arrow]);
      list.appendChild(makeEl('li', {}, [link]));
    });

    const card = makeEl('div', { class: 'wa-picker__card' }, [closeBtn, header, list]);
    const el   = makeEl('div', {
      class: 'wa-picker',
      id: 'wa-picker',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': 'Chat with a team member',
      'aria-labelledby': 'wa-picker-title',
    }, [card]);

    document.body.appendChild(el);
    return el;
  }

  let modal = null;
  let msgText = '';

  function openPicker(text) {
    if (!modal) modal = buildModal();
    msgText = text || '';
    modal.querySelectorAll('.wa-picker__item').forEach(a => {
      const phone = a.dataset.phone;
      const encoded = msgText ? '?text=' + encodeURIComponent(msgText) : '';
      a.href = `https://wa.me/${phone}${encoded}`;
    });
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('#wa-picker-close').focus();
  }

  function closePicker() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const trigger = e.target.closest(
      '.btn--whatsapp, .contact__quick-btn--wa, .whatsapp-fab, #footer-whatsapp,' +
      'a[href="whatsapp.html"],' +
      'a[href="contact.html"]:not(.nav__link):not(.nav__cta)'
    );
    if (!trigger) return;
    e.preventDefault();
    const href = trigger.getAttribute('href') || '';
    const match = href.match(/\?text=(.+)$/);
    openPicker(match ? decodeURIComponent(match[1]) : '');
  });

  document.addEventListener('click', e => {
    if (modal && modal.classList.contains('is-open')) {
      if (e.target === modal || e.target.id === 'wa-picker-close') closePicker();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePicker();
  });
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


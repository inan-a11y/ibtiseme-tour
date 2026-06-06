/* ============================================
   İBTİSEME TOUR – i18n / Translation Engine
   Single-file multilingual support via JSON
   ============================================ */

(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var VALID_LANGS  = ['en', 'tr', 'ar'];

  // ── Language detection ──────────────────────
  // Priority: URL ?lang= param → localStorage → default
  function getLang() {
    var params  = new URLSearchParams(window.location.search);
    var urlLang = params.get('lang');
    if (urlLang && VALID_LANGS.indexOf(urlLang) !== -1) {
      localStorage.setItem('ibt_lang', urlLang);
      return urlLang;
    }
    var stored = localStorage.getItem('ibt_lang');
    return (stored && VALID_LANGS.indexOf(stored) !== -1) ? stored : DEFAULT_LANG;
  }

  // ── Nested key resolver ─────────────────────
  function getVal(obj, dotKey) {
    return dotKey.split('.').reduce(function (o, k) {
      return o != null ? o[k] : undefined;
    }, obj);
  }

  // ── Meta tag helper ─────────────────────────
  function setMeta(selector, attr, value) {
    if (!value) return;
    var el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      // Derive the right attribute from the selector, e.g. 'name' or 'property'
      var match = selector.match(/\[(\w+)="([^"]+)"\]/);
      if (match) el.setAttribute(match[1], match[2]);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  }

  // ── Apply full translation set ───────────────
  function applyTranslations(t) {
    var m    = t._meta;
    var lang = m.lang;

    // <html> attributes
    document.documentElement.lang = lang;
    document.documentElement.dir  = m.dir;

    // ── Core meta ──
    document.title = m.title;
    setMeta('meta[name="description"]',      'content', m.description);
    setMeta('meta[name="keywords"]',         'content', m.keywords);

    // ── Canonical ──
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && m.canonical) canonical.setAttribute('href', m.canonical);

    // ── Open Graph ──
    setMeta('meta[property="og:title"]',       'content', m.og_title);
    setMeta('meta[property="og:description"]', 'content', m.og_description);
    setMeta('meta[property="og:locale"]',      'content', m.og_locale);
    setMeta('meta[property="og:image:alt"]',   'content', m.og_image_alt);

    // ── Twitter Card ──
    setMeta('meta[name="twitter:title"]',       'content', m.twitter_title);
    setMeta('meta[name="twitter:description"]', 'content', m.twitter_description);

    // ── Schema.org description ──
    var schemaEl = document.querySelector('script[type="application/ld+json"]');
    if (schemaEl && m.schema_description) {
      try {
        var schema = JSON.parse(schemaEl.textContent);
        schema.description = m.schema_description;
        schemaEl.textContent = JSON.stringify(schema, null, 2);
      } catch (e) { /* ignore parse errors */ }
    }

    // ── Body text translations ──
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = getVal(t, el.dataset.i18n);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = getVal(t, el.dataset.i18nHtml);
      if (val != null) el.innerHTML = val;
    });

    // ── Language switcher active states ──
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      var isActive = el.dataset.lang === lang;
      el.classList.toggle('lang-switcher__option--active', isActive);
      el.classList.toggle('nav__mobile-lang-btn--active', isActive);
      if (isActive) {
        el.setAttribute('aria-current', 'page');
      } else {
        el.removeAttribute('aria-current');
      }
    });

    var current = document.querySelector('.lang-switcher__current');
    if (current) current.textContent = lang.toUpperCase();

    var langBtn = document.getElementById('lang-btn');
    if (langBtn) {
      var names = { en: 'English', tr: 'Türkçe', ar: 'العربية' };
      langBtn.setAttribute('aria-label', 'Select language: ' + (names[lang] || lang));
    }
  }

  // ── Load JSON and apply ──────────────────────
  function loadAndApply(lang) {
    fetch('locales/' + lang + '.json')
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(applyTranslations)
      .catch(function (err) {
        console.warn('[i18n] Failed to load "' + lang + '":', err);
        if (lang !== DEFAULT_LANG) loadAndApply(DEFAULT_LANG);
      });
  }

  // ── Set language and update URL ──────────────
  function setLang(lang) {
    localStorage.setItem('ibt_lang', lang);

    // Update URL param without page reload
    var params = new URLSearchParams(window.location.search);
    if (lang === DEFAULT_LANG) {
      params.delete('lang');
    } else {
      params.set('lang', lang);
    }
    var qs     = params.toString();
    var newUrl = window.location.pathname + (qs ? '?' + qs : '');
    history.replaceState({}, '', newUrl);

    loadAndApply(lang);
  }

  // ── Init ────────────────────────────────────
  function init() {
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(this.dataset.lang);
      });
    });

    loadAndApply(getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ibtSetLang = setLang;
})();

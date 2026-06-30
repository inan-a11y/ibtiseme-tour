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
    var legacyPage = window.location.pathname.match(/\/index-(tr|ar)\.html$/i);
    if (legacyPage) {
      var legacyLang = legacyPage[1].toLowerCase();
      localStorage.setItem('ibt_lang', legacyLang);
      return legacyLang;
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

  // ── Page metadata ───────────────────────────
  function isHomepage() {
    var path = window.location.pathname;
    return path === '' ||
           path === '/' ||
           /\/index\.html$/i.test(path) ||
           /\/index-(?:tr|ar)\.html$/i.test(path) ||
           /\/$/.test(path);
  }

  function getPageName() {
    return window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  }

  function textOnly(value) {
    var el = document.createElement('div');
    el.innerHTML = value || '';
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function localizedPageMeta(t) {
    var page = getPageName();
    var pageKeys = {
      'about.html':       { title: 'about.title',              description: 'about.intro1' },
      'services.html':    { title: 'services.title',           description: 'services.subtitle' },
      'destinations.html':{ title: 'dest.title',               description: 'dest.subtitle' },
      'contact.html':     { title: 'contact.title',            description: 'contact.desc' },
      'istanbul.html':    { title: 'dest_istanbul.hero_title', description: 'dest_istanbul.hero_sub' },
      'cappadocia.html':  { title: 'dest_cappadocia.hero_title', description: 'dest_cappadocia.hero_sub' },
      'antalya.html':     { title: 'dest_antalya.hero_title',  description: 'dest_antalya.hero_sub' },
      'bodrum.html':      { title: 'dest_bodrum.hero_title',   description: 'dest_bodrum.hero_sub' },
      'pamukkale.html':   { title: 'dest_pamukkale.hero_title', description: 'dest_pamukkale.hero_sub' },
      'trabzon.html':     { title: 'dest_trabzon.hero_title',  description: 'dest_trabzon.hero_sub' }
    };
    var keys = pageKeys[page];
    if (!keys) return null;

    return {
      title: textOnly(getVal(t, keys.title)) + ' | Ibtiseme Tour',
      description: textOnly(getVal(t, keys.description))
    };
  }

  function localizedUrl(lang) {
    var canonical = document.querySelector('link[rel="canonical"]');
    var base = canonical ? canonical.getAttribute('href') : window.location.href;
    var url = new URL(base, window.location.origin);
    if (lang === DEFAULT_LANG) {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    return url.toString();
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

    // ── SEO meta ──
    if (isHomepage()) {
      document.title = m.title;
      setMeta('meta[name="description"]',      'content', m.description);
      setMeta('meta[name="keywords"]',         'content', m.keywords);

      var canonical = document.querySelector('link[rel="canonical"]');
      if (canonical && m.canonical) canonical.setAttribute('href', m.canonical);
      setMeta('meta[property="og:url"]', 'content', m.canonical);

      setMeta('meta[property="og:title"]',       'content', m.og_title);
      setMeta('meta[property="og:description"]', 'content', m.og_description);
      setMeta('meta[property="og:locale"]',      'content', m.og_locale);
      setMeta('meta[property="og:image:alt"]',   'content', m.og_image_alt);

      setMeta('meta[name="twitter:title"]',       'content', m.twitter_title);
      setMeta('meta[name="twitter:description"]', 'content', m.twitter_description);

      var schemaEl = document.querySelector('script[type="application/ld+json"]');
      if (schemaEl && m.schema_description) {
        try {
          var schema = JSON.parse(schemaEl.textContent);
          schema.description = m.schema_description;
          schemaEl.textContent = JSON.stringify(schema, null, 2);
        } catch (e) { /* ignore parse errors */ }
      }
    } else {
      var pageMeta = localizedPageMeta(t);
      if (pageMeta) {
        var pageUrl = localizedUrl(lang);
        document.title = pageMeta.title;
        setMeta('meta[name="description"]', 'content', pageMeta.description);
        setMeta('meta[property="og:title"]', 'content', pageMeta.title);
        setMeta('meta[property="og:description"]', 'content', pageMeta.description);
        setMeta('meta[property="og:locale"]', 'content', m.og_locale);
        setMeta('meta[name="twitter:title"]', 'content', pageMeta.title);
        setMeta('meta[name="twitter:description"]', 'content', pageMeta.description);

        var pageCanonical = document.querySelector('link[rel="canonical"]');
        if (pageCanonical) pageCanonical.setAttribute('href', pageUrl);
        setMeta('meta[property="og:url"]', 'content', pageUrl);
      }
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
    var newUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    history.replaceState({}, '', newUrl);

    loadAndApply(lang);
    document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: lang } }));
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

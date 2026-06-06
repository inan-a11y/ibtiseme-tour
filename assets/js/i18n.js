/* ============================================
   İBTİSEME TOUR – i18n / Translation Engine
   Single-file multilingual support via JSON
   ============================================ */

(function () {
  'use strict';

  var DEFAULT_LANG = 'en';

  function getLang() {
    return localStorage.getItem('ibt_lang') || DEFAULT_LANG;
  }

  function getVal(obj, dotKey) {
    return dotKey.split('.').reduce(function (o, k) {
      return o != null ? o[k] : undefined;
    }, obj);
  }

  function applyTranslations(t) {
    var html = document.documentElement;
    html.lang = t._meta.lang;
    html.dir  = t._meta.dir;

    document.title = t._meta.title;

    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t._meta.description);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = getVal(t, el.dataset.i18n);
      if (val != null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = getVal(t, el.dataset.i18nHtml);
      if (val != null) el.innerHTML = val;
    });

    var lang = t._meta.lang;

    // Update active state on language switcher options
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

    // Update visible lang code in the button
    var current = document.querySelector('.lang-switcher__current');
    if (current) current.textContent = lang.toUpperCase();

    // Update aria-label on lang toggle button
    var langBtn = document.getElementById('lang-btn');
    if (langBtn) {
      var names = { en: 'English', tr: 'Türkçe', ar: 'العربية' };
      langBtn.setAttribute('aria-label', 'Select language: ' + (names[lang] || lang));
    }
  }

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

  function setLang(lang) {
    localStorage.setItem('ibt_lang', lang);
    loadAndApply(lang);
  }

  // Wire up switcher buttons and load current language
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

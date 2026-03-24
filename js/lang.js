// js/lang.js — Tamil / English Language Toggle
let currentLang = localStorage.getItem('ciq_lang') || 'en';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('ciq_lang', lang);
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'en' ? '🌐 தமிழ்' : '🌐 English';

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (!text) return;
    if (el.innerHTML.includes('<')) {
      // has child HTML — only update text nodes
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });

  document.querySelectorAll('input[placeholder]').forEach(el => {
    const ph = el.getAttribute('data-ph-' + lang);
    if (ph) el.placeholder = ph;
  });

  document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';
}

function toggleLang() {
  applyLang(currentLang === 'en' ? 'ta' : 'en');
}

// Apply on load
document.addEventListener('DOMContentLoaded', () => {
  if (currentLang === 'ta') applyLang('ta');
});

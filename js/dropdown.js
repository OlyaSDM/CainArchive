document.addEventListener('DOMContentLoaded', function () {
  const switcher = document.getElementById('langSwitcher');
  const toggleBtn = document.getElementById('lang-toggle');
  const options = switcher.querySelector('.lang-options');
  const currentLang = document.getElementById('lang-current');

  // Toggle dropdown
  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    switcher.classList.toggle('open');
    const expanded = switcher.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', expanded);
  });

  // Handle option click
  options.addEventListener('click', function (e) {
    if (e.target && e.target.matches('li[data-lang]')) {
      const lang = e.target.getAttribute('data-lang');
      currentLang.textContent = lang.toUpperCase();
      switcher.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', false);

      // Optional: save to localStorage
      // localStorage.setItem('preferredLang', lang);
    }
  });

  // Click outside to close
  document.addEventListener('click', function (e) {
    if (!switcher.contains(e.target)) {
      switcher.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', false);
    }
  });
});
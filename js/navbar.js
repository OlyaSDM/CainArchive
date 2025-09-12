// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Elements
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('closeBtn');
const langSwitcher = document.getElementById('langSwitcher');
const langToggle = document.getElementById('lang-toggle');
const langOptions = document.querySelector('.lang-options');

// Burger Menu Toggle
function toggleMenu(open) {
  menu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
}
burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));
closeBtn.addEventListener('click', () => toggleMenu(false));
document.querySelectorAll('.fullscreen-menu nav a')
  .forEach(link => link.addEventListener('click', () => toggleMenu(false)));

// Language Dropdown
langToggle.addEventListener('click', e => {
  e.stopPropagation();
  const isOpen = langSwitcher.classList.toggle('open');
  langToggle.setAttribute('aria-expanded', isOpen);
});

// Language Option Selection
langOptions.querySelectorAll('li').forEach(option => {
  option.addEventListener('click', e => {
    const selected = e.target.dataset.lang;
    langToggle.textContent = `${selected} ▼`;
    langSwitcher.classList.remove('open');
    langToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close Dropdown When Clicking Outside
document.addEventListener('click', e => {
  if (!langSwitcher.contains(e.target)) {
    langSwitcher.classList.remove('open');
    langToggle.setAttribute('aria-expanded', 'false');
  }
});

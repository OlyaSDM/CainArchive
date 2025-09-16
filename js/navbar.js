// Sticky Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Elements
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');


// Burger Menu Toggle
function toggleMenu(open) {
  menu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
}
burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));

document.querySelectorAll('.fullscreen-menu nav a')
  .forEach(link => link.addEventListener('click', () => toggleMenu(false)));





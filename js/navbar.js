
// ===== Burger wiring (kept minimal; modal menu will come later) =====
const burger = document.getElementById('burger');
const menu   = document.getElementById('menu'); // you’ll add this later as fullscreen modal

function toggleMenu(open) {
  if (!burger || !menu) return;      // safe if #menu not present yet
  menu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
}
burger?.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));



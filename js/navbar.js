// ===== Burger wiring =====
const burger = document.getElementById("burger");
const menu = document.getElementById("menu"); // fullscreen overlay

function toggleMenu(open) {
  if (!burger || !menu) return;
  menu.classList.toggle("open", open);
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
}

// Open/close burger by clicking
burger?.addEventListener("click", () =>
  toggleMenu(!menu.classList.contains("open"))
);

// Smooth scrolling and closing the menu by clicking on an item 
document.querySelectorAll('#menu a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 0 },
        ease: "power2.out",
        onComplete: () => {
          toggleMenu(false);
        },
      });
    } else {
      toggleMenu(false);
    }
  });
});

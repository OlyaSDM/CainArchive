document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".grid-item");

  gsap.set(items, { opacity: 0, y: 40 });

  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  });
});

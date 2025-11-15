gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Animate background image scale on scroll for each .coll-background .bg
document.querySelectorAll("#collections .coll-background .bg").forEach((bgEl) => {
  gsap.to(bgEl, {
    scale: 1.2,
    ease: "none",
    scrollTrigger: {
      trigger: bgEl.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
});

window.addEventListener("load", () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 0 },
        ease: "power2.out",
        onUpdate: () => ScrollTrigger.update() 
      });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: target, offsetY: 0 },
          ease: "power2.out",
          onUpdate: () => ScrollTrigger.update()
        });
      }
    });
  });
});


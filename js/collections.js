gsap.registerPlugin(ScrollTrigger);


const collIntroSettings = {
  trigger: ".coll-intro",
  start: "top 80%",
  end: "bottom 40%",
  scrub: 1,
};

// Helper function for reusable animations
function animateCollIntro(selector, direction = "left") {
  const offset = 80;
  gsap.fromTo(
    selector,
    {
      x: direction === "left" ? -offset : offset,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      ease: "power2.out",
      scrollTrigger: collIntroSettings,
    }
  );
}


animateCollIntro(".unseen", "left");   
animateCollIntro(".unforg", "right"); 

// "Untold" only fades in, stays in place
gsap.fromTo(".untold",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    ease: "power2.out",
    scrollTrigger: collIntroSettings,
  }
);


// When collections section is in view here is "transparent" class on NAVBAR
// ScrollTrigger.create({
//   trigger: "#collections", 
//   start: "top top",    
//   end: "bottom top",
//   toggleClass: { targets: ".navbar", className: "transparent" },
//   markers: false
// });


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
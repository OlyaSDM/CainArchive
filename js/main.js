// SCROLLTRIGGER FOR HERO SECTION

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("loaderFinished", () => {
  // Ensure hero elements start hidden
  gsap.set([".hero-content h1", ".hero-content h1 span", ".hero-content p", ".hero-buttons > *"], {
    opacity: 0,
    x: -30
  });

  const tl = gsap.timeline({
    delay: 0.5, // slight delay after loader
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
      toggleActions: "restart none none none"
    }
  });

  // Animate H1 + span separately
  tl.to([".hero-content h1", ".hero-content h1 span"], {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.4
  })

  // Animate paragraph
  .to(".hero-content p", {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.out"
  }, "-=0.4")

  // Animate buttons separately
  .to([".hero-cta", ".hero-btn-text "], {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3
  }, "-=0.3");
});






// SCROLL TRIGGER FOR QUOTE SECTION


const scrollSettings = {
  trigger: ".quote",
  start: "top 70%",
  end: "bottom 30%",
  scrub: 1,
};

// Helper function to animate subtle motion into final CSS position
function animateQuote(selector, direction = "left") {
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
      scrollTrigger: scrollSettings,
    }
  );
}

// Animate each line
animateQuote(".his", "left");  // History’s (left → right)
animateQuote(".dis", "left");  // discerning. (left → right)

animateQuote(".fin", "right"); // finest frames, (right → left)
animateQuote(".for", "right"); // for the (right → left)

// Reserved stays subtle (slight fade-in only)
gsap.fromTo(".res",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    ease: "power2.out",
    scrollTrigger: scrollSettings,
  }
);




//ANIMATION FOR COLLECTIONS 

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

// Apply animations
animateCollIntro(".unseen", "left");   // move left → right
animateCollIntro(".unforg", "right"); // move right → left

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
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


// When collections section is in view here is "transparent" class on NAVBAR
ScrollTrigger.create({
  trigger: "#collections",
  start: "top top",    
  end: "bottom top",
  toggleClass: { targets: ".navbar", className: "transparent" },
  markers: false
});


//CURSOR-TOOLTIP

const tooltip = document.querySelector(".cursor-tooltip");

let mouseX = 0, mouseY = 0;
let tooltipX = 0, tooltipY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX + 35;
  mouseY = e.clientY + 20;
});

function animateTooltip() {
  tooltipX += (mouseX - tooltipX) * 0.15;
  tooltipY += (mouseY - tooltipY) * 0.15;

  gsap.set(tooltip, {
    x: tooltipX,
    y: tooltipY
  });

  requestAnimationFrame(animateTooltip);
}
animateTooltip();

document.querySelectorAll(".coll-background").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to(tooltip, {
      opacity: 1,
      scale: 1.1,
      duration: 0.3,
      ease: "power3.out"
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(tooltip, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power3.inOut"
    });
  });
});

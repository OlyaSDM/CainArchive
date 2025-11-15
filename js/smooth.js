
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function initScrollSmoother() {
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    smoothTouch: 0.1,
    effects: true
  });

}

// If loader is present (main page), wait for the custom event
if (document.querySelector(".loader")) {
  window.addEventListener("loaderFinished", initScrollSmoother);
} else {
  // Otherwise, initialize immediately on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollSmoother);
  } else {
    initScrollSmoother();
  }
}


window.addEventListener("load", () => {
  const hash = window.location.hash;

  if (hash) {
    const target = document.querySelector(hash);
    if (!target) return;

    if (window.ScrollSmoother && ScrollSmoother.get()) {
      setTimeout(() => {
        ScrollSmoother.get().scrollTo(target, true);
      }, 800); 
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
});


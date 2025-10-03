//LOADER

gsap.registerPlugin(ScrollTrigger);

const tlLoader = gsap.timeline();

// Simplified Loader Animation
tlLoader
.set('.loader__title', {opacity: 0, scale: 0.8})
.to('.loader__title', {
  opacity: 1,
  scale: 1,
  duration: 0.5,
  ease: "power2.out"
})
.to('.loader__title', {
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  delay: 0.5,
  ease: "power2.inOut"
})
.to('.loader', {
  yPercent: -100,
  duration: 0.8,
  ease: "power2.in",
  onComplete: () => {
    window.dispatchEvent(new Event("loaderFinished"));
  }
});



//Animation - 3s delay for menu to appear AFTER loader

  window.addEventListener('load', () => {
    gsap.to(".delayed", {
      duration: 1.2,
      opacity: 1,
      y: 0,
      ease: "power2.out",
      delay: 2.6
    });
  });

window.addEventListener("loaderFinished", () => {
  gsap.to(".scroll-btn", {
    opacity: 1,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
    onStart: () => {
      document.querySelector(".scroll-btn").style.pointerEvents = "auto";
    }
  });
});

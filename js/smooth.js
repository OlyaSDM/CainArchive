//SCROLL SMOOTHER ON WHOLE PAGE


gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

window.addEventListener("loaderFinished", () => {
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    smoothTouch: 0.1,
    effects: true
  });
});

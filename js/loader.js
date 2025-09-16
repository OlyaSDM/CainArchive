gsap.registerPlugin(ScrollTrigger);

const tlLoader = gsap.timeline();

//Loader
tlLoader
.set('.loader__item', {yPercent: -100})
.set('.loader__title', {opacity: 0})
.to('.loader__item', {
    yPercent: 0,
    duration: 0.5,
    stagger: 0.25,
})
.to('.loader__item',{
    yPercent: 100,
    duration: 0.5,
    stagger: 0.25,
})
.to('.loader__title', {
    opacity: 1,
    duration: 1,
    scale: 1.2,
})
.set('.loader__item', {
    yPercent: -100,
})
.to('.loader__title', {
    opacity: 0,
    duration: 1,
    scale: 0.8,
})
.to('.loader', {
    yPercent: -100,
    duration: 0.5,
    onComplete: () => {
    window.dispatchEvent(new Event("loaderFinished"));
  }
})

//Animation - 4s delay for menu to appear AFTER loader

  window.addEventListener('load', () => {
    gsap.to(".delayed", {
      duration: 1.2,
      opacity: 1,
      y: 0,
      ease: "power2.out",
      delay: 4
    });
  });

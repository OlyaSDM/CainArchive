gsap.registerPlugin(ScrollTrigger);

const leftLetters = document.querySelectorAll(".mission-left-panel .mission-letter");
const rightLetters = document.querySelectorAll(".mission-right-panel .mission-letter");
const leftPanel = document.querySelector(".mission-left-panel");
const rightPanel = document.querySelector(".mission-right-panel");
const ampersand = document.querySelector(".mission-ampersand .mission-letter");
const video = document.querySelector(".mission-video");
const scrollIndicator = document.querySelector(".scroll-indicator");

gsap.set([...leftLetters, ...rightLetters], { y: "100%", opacity: 0 });
gsap.set(video, { y:50, opacity:0 });
gsap.set([leftPanel, rightPanel], { xPercent: 0, yPercent: 0 });

const tlMissionIntro = gsap.timeline();
tlMissionIntro.to(leftLetters, { y:"0%", opacity:1, stagger:0.1, duration:4.2, ease:"power3.out" })
             .to(rightLetters, { y:"0%", opacity:1, stagger:0.1, duration:4.2, ease:"power3.out" }, "-=1");

gsap.timeline({
  scrollTrigger: {
    trigger: ".mission-hero",
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
})
.to(leftPanel, { x: "-100%", duration: 2.8, ease:"power4.inOut" }, 0)
.to(rightPanel, { x: "100%", duration: 2.8, ease:"power4.inOut" }, 0)
.to([...leftLetters, ...rightLetters], {
  y:"-100%",
  opacity:0,
  stagger:0.05,
  duration:2.8,
  ease:"power2.inOut"
}, 0);


gsap.to(video, { y:0, opacity:1, duration:2, ease:"power3.out", scrollTrigger:{
  trigger:".mission-hero",
  start:"top 80%",
  end:"center 50%",
  scrub:1
}});

gsap.to(scrollIndicator, { y:30, opacity:0, scrollTrigger:{
  trigger:".mission-hero",
  start:"top top",
  end:"center top",
  scrub:1,
  onLeaveBack:()=> gsap.to(scrollIndicator, { y:0, opacity:1, duration:2.6 })
}});

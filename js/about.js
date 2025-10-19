gsap.registerPlugin(ScrollTrigger);

const leftLetters = document.querySelectorAll(".hero-left .hero-letter");
const rightLetters = document.querySelectorAll(".hero-right .hero-letter");
const leftPanel = document.querySelector(".hero-left");
const rightPanel = document.querySelector(".hero-right");
const video = document.querySelector(".hero-video");
const scrollDown = document.querySelector(".scroll-down");

gsap.set([...leftLetters, ...rightLetters], { y: "100%", opacity: 0 });
gsap.set(video, { y:50, opacity:0 });
gsap.set([leftPanel, rightPanel], { xPercent: 0, yPercent: 0 });

const tlIntro = gsap.timeline();
tlIntro.to(leftLetters, { y:"0%", opacity:1, stagger:0.1, duration:1.2, ease:"power3.out" })
       .to(rightLetters, { y:"0%", opacity:1, stagger:0.1, duration:1.2, ease:"power3.out" }, "-=1");

gsap.timeline({
  scrollTrigger: {
    trigger: ".section-hero",
    start: "top top",
    end: "bottom top",
    scrub: 1
  }
})
.to(leftPanel, { x: "-100%", ease:"power2.inOut" }, 0)
.to(rightPanel, { x: "100%", ease:"power2.inOut" }, 0)
.to([...leftLetters, ...rightLetters], { y:"-100%", opacity:0, stagger:0.05, ease:"power2.in" }, 0);

gsap.to(video, { y:0, opacity:1, duration:2, ease:"power3.out", scrollTrigger:{
  trigger:".section-hero",
  start:"top 80%",
  end:"center 50%",
  scrub:1
}});

gsap.to(scrollDown, { y:30, opacity:0, scrollTrigger:{
  trigger:".section-hero",
  start:"top top",
  end:"center top",
  scrub:1,
  onLeaveBack:()=> gsap.to(scrollDown, { y:0, opacity:1, duration:0.6 })
}});

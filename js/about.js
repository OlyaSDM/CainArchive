gsap.registerPlugin(ScrollTrigger);

const leftPanel = document.querySelector(".hero-left");
const rightPanel = document.querySelector(".hero-right");
const ampersand = document.querySelector(".hero-ampersand");
const leftLetters = leftPanel?.querySelectorAll(".hero-letter") || [];
const rightLetters = rightPanel?.querySelectorAll(".hero-letter") || [];
const ampLetter = ampersand?.querySelectorAll(".hero-letter") || [];
const video = document.querySelector(".hero-video");
const scrollDown = document.querySelector(".scroll-down");

if (leftPanel && rightPanel && ampersand && video) {
  // INITIAL SET
  gsap.set([leftPanel, rightPanel], { xPercent: 0, yPercent: 0 });
  gsap.set([...leftLetters, ...rightLetters, ...ampLetter], { y: "100%", opacity: 0 });
  gsap.set(video, { y: 50, opacity: 0 });
  gsap.set(ampersand, { opacity: 0, scale: 1, zIndex: 10 }); // scale 1 для нормального размера

  // LOADING ANIMATION
  const tl = gsap.timeline();

  // LEFT WORD + AMPERSAND одновременно
  tl.to([...leftLetters, ...ampLetter], {
    y: "0%",
    opacity: 1,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1.2,
  })
  // RIGHT WORD чуть позже
  .to(rightLetters, {
    y: "0%",
    opacity: 1,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1.2,
  }, "-=1");

  // SCROLL TRIGGER for ampersand disappearance
  ScrollTrigger.create({
    trigger: ".section-hero",
    start: "top top",
    end: "bottom 80%",
    scrub: true,
    onUpdate: (self) => {
      const scale = self.progress < 0.2 ? 1 : 0.4;
      const opacity = self.progress < 0.2 ? 1 : 0;
      gsap.to(ampersand, { opacity, scale, ease: "power2.out", overwrite: "auto" });
    },
  });

  const mm = gsap.matchMedia();

  // DESKTOP
  mm.add("(min-width: 769px)", () => {
    gsap.set(ampersand, { yPercent: -20 });
    gsap.to(leftPanel, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(rightPanel, {
      xPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // MOBILE
  mm.add("(max-width: 768px)", () => {
    gsap.set(ampersand, { yPercent: 0 });
    gsap.to(leftPanel, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(rightPanel, {
      yPercent: 100,
      ease: "none",
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // VIDEO ANIMATION
  gsap.to(video, {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section-hero",
      start: "top 70%",
      end: "top 40%",
      scrub: true,
    },
  });

  // SCROLL-DOWN ANIMATION
  if (scrollDown) {
    gsap.to(scrollDown, {
      opacity: 0,
      y: 30,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top+=10 top",
        end: "center top",
        scrub: true,
        onLeaveBack: () => {
          gsap.to(scrollDown, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      },
    });
  }
}

gsap.registerPlugin(ScrollTrigger);

const leftPanel = document.querySelector(".hero-left");
const rightPanel = document.querySelector(".hero-right");
const centerSymbol = document.querySelector(".hero-center");
const leftLetters = leftPanel?.querySelectorAll(".hero-letter") || [];
const rightLetters = rightPanel?.querySelectorAll(".hero-letter") || [];
const video = document.querySelector(".hero-video");
const scrollDown = document.querySelector(".scroll-down");

if (leftPanel && rightPanel && centerSymbol && video) {
  gsap.set([leftPanel, rightPanel], { xPercent: 0, yPercent: 0 });
  gsap.set([...leftLetters, ...rightLetters], { y: "100%", opacity: 0 });
  gsap.set(video, { y: 50, opacity: 0 });
  gsap.set(centerSymbol, { opacity: 0, scale: 0.7, zIndex: 10 });

  // LOADING ANIMATION
  const tl = gsap.timeline();
  tl.to(leftLetters, {
    y: "0%",
    opacity: 1,
    stagger: 0.05,
    ease: "power3.out",
    duration: 1.2,
  })
    .to(
      rightLetters,
      {
        y: "0%",
        opacity: 1,
        stagger: 0.05,
        ease: "power3.out",
        duration: 1.2,
      },
      "-=1"
    )
    .to(
      centerSymbol,
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
      "-=0.3"
    );

  // DISAPPEARING ANIMATION WHEN SCROLLING
  ScrollTrigger.create({
    trigger: ".section-hero",
    start: "top top",
    end: "bottom 80%",
    scrub: true,
    onUpdate: (self) => {
      if (self.progress < 0.2) {
        gsap.to(centerSymbol, {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(centerSymbol, {
          opacity: 0,
          scale: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    },
  });

  const mm = gsap.matchMedia();

  // Desktop
  mm.add("(min-width: 769px)", () => {
    gsap.set(centerSymbol, { yPercent: -20 });
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

  // mobile
  mm.add("(max-width: 768px)", () => {
    gsap.set(centerSymbol, { yPercent: 0 });
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

// ANIMATION of scroll-down disappearance when moving panels 
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

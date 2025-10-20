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
  gsap.set([leftPanel, rightPanel], { xPercent: 0, yPercent: 0 });
  gsap.set([...leftLetters, ...rightLetters, ...ampLetter], { y: "100%", opacity: 0 });
  gsap.set(video, { y: 50, opacity: 0 });
  gsap.set(ampersand, { opacity: 0, scale: 1, zIndex: 10 });

  const tlLoad = gsap.timeline();
  tlLoad
    .to([...leftLetters, ...ampLetter], {
      y: "0%",
      opacity: 1,
      stagger: 0.08,
      ease: "power3.out",
      duration: 1.4,
    })
    .to(
      rightLetters,
      {
        y: "0%",
        opacity: 1,
        stagger: 0.08,
        ease: "power3.out",
        duration: 1.4,
      },
      "-=1"
    )
    .to(ampersand, { opacity: 1, scale: 1, duration: 0.8 }, "<");

  const mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    gsap.set(ampersand, { yPercent: -20 });

    const tlPanels = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top top",
        endTrigger: ".hero-inner",
        end: "center center", 
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tlPanels
      .to(leftPanel, { xPercent: -100, ease: "power2.inOut" }, 0)
      .to(rightPanel, { xPercent: 100, ease: "power2.inOut" }, 0)
      .to(ampersand, { opacity: 0, scale: 0.4, ease: "power2.out" }, 0);
  });

  mm.add("(max-width: 768px)", () => {
    gsap.set(ampersand, { yPercent: 0 });

    const tlPanelsMobile = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top top",
        endTrigger: ".hero-inner",
        end: "center center",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tlPanelsMobile
      .to(leftPanel, { yPercent: -100, ease: "power2.inOut" }, 0)
      .to(rightPanel, { yPercent: 100, ease: "power2.inOut" }, 0)
      .to(ampersand, { opacity: 0, scale: 0.4, ease: "power2.out" }, 0);
  });

  gsap.to(video, {
    y: 0,
    opacity: 1,
    duration: 2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".hero-inner",
      start: "top 80%",
      end: "center 50%",
      scrub: 1,
    },
  });

  if (scrollDown) {
    gsap.to(scrollDown, {
      opacity: 0,
      y: 30,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top+=10 top",
        end: "center top",
        scrub: 1,
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

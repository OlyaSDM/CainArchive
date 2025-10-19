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
  // ✅ INITIAL SET
  gsap.set([leftPanel, rightPanel], { xPercent: 0, yPercent: 0, willChange: "transform" });
  gsap.set([...leftLetters, ...rightLetters, ...ampLetter], { y: "100%", opacity: 0 });
  gsap.set(video, { y: 50, opacity: 0 });
  gsap.set(ampersand, { opacity: 0, scale: 1, zIndex: 10 });

  // ✅ LOADING ANIMATION (только один раз при загрузке)
  const tlIntro = gsap.timeline();
  tlIntro
    .to([...leftLetters, ...ampLetter], {
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
    .to(ampersand, { opacity: 1, duration: 0.3 }, "<");

  // ✅ AMPERSAND исчезает при скролле
  ScrollTrigger.create({
    trigger: ".section-hero",
    start: "top top",
    end: "bottom 80%",
    scrub: true,
    onUpdate: (self) => {
      const scale = gsap.utils.mapRange(0, 0.4, 1, 0.4, self.progress);
      const opacity = gsap.utils.mapRange(0, 0.3, 1, 0, self.progress);
      gsap.to(ampersand, { opacity, scale, ease: "power2.out", overwrite: "auto" });
    },
  });

  const mm = gsap.matchMedia();

  // Общие настройки ScrollTrigger
  ScrollTrigger.defaults({
    ease: "none",
    invalidateOnRefresh: true,
    anticipatePin: 1,
  });

  // ✅ DESKTOP VERSION
mm.add("(min-width: 769px)", () => {
  gsap.set(ampersand, { yPercent: -20 });

  const tlPanels = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-hero",
      start: "top top",
      end: "bottom center", // 👉 теперь шторки откроются к середине секции
      scrub: 0.5,
      invalidateOnRefresh: true,
      markers: false, // включи true для проверки
    },
  });

  tlPanels
    .to(leftPanel, { xPercent: -100, ease: "power2.out" }, 0)
    .to(rightPanel, { xPercent: 100, ease: "power2.out" }, 0);
});

// ✅ MOBILE VERSION
mm.add("(max-width: 768px)", () => {
  gsap.set(ampersand, { yPercent: 0 });

  const tlPanelsMobile = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-hero",
      start: "top top",
      end: "bottom center", // 👉 аналогично
      scrub: 0.5,
      invalidateOnRefresh: true,
      markers: false,
    },
  });

  tlPanelsMobile
    .to(leftPanel, { yPercent: -100, ease: "power2.out" }, 0)
    .to(rightPanel, { yPercent: 100, ease: "power2.out" }, 0);
});


  // ✅ VIDEO ANIMATION
  gsap.to(video, {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section-hero",
      start: "top 70%",
      end: "top 40%",
      scrub: 0.5,
    },
  });

  // ✅ SCROLL DOWN (стрелка)
  if (scrollDown) {
    gsap.to(scrollDown, {
      opacity: 0,
      y: 30,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".section-hero",
        start: "top+=10 top",
        end: "center top",
        scrub: 0.5,
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

  // ✅ Обновление позиций после загрузки / изменения размера экрана
  window.addEventListener("load", () => ScrollTrigger.refresh());
  window.addEventListener("resize", () => ScrollTrigger.refresh());
}

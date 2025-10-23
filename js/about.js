// gsap.registerPlugin(ScrollTrigger);

// // --- HERO анимации ---
// const leftLetters = document.querySelectorAll(".mission-left-panel .mission-letter");
// const rightLetters = document.querySelectorAll(".mission-right-panel .mission-letter");
// const leftPanel = document.querySelector(".mission-left-panel");
// const rightPanel = document.querySelector(".mission-right-panel");
// const video = document.querySelector(".mission-video");
// const scrollIndicator = document.querySelector(".scroll-indicator");

// // начальные состояния
// gsap.set([...leftLetters, ...rightLetters], { y: "100%", opacity: 0 });
// gsap.set(video, { y: 50, opacity: 0 });
// gsap.set([leftPanel, rightPanel], { xPercent: 0, yPercent: 0 });

// // intro-анимация
// const tlMissionIntro = gsap.timeline();
// tlMissionIntro
//   .to(leftLetters, {
//     y: "0%",
//     opacity: 1,
//     stagger: 0.1,
//     duration: 4.2,
//     ease: "power3.out",
//   })
//   .to(
//     rightLetters,
//     {
//       y: "0%",
//       opacity: 1,
//       stagger: 0.1,
//       duration: 4.2,
//       ease: "power3.out",
//     },
//     "-=1"
//   );

// // анимация панелей при скролле
// gsap.timeline({
//   scrollTrigger: {
//     trigger: ".mission-hero",
//     start: "top top",
//     end: "bottom top",
//     scrub: 1,
//   },
// })
//   .to(leftPanel, { x: "-100%", duration: 2.8, ease: "power4.inOut" }, 0)
//   .to(rightPanel, { x: "100%", duration: 2.8, ease: "power4.inOut" }, 0)
//   .to(
//     [...leftLetters, ...rightLetters],
//     {
//       y: "-100%",
//       opacity: 0,
//       stagger: 0.05,
//       duration: 2.8,
//       ease: "power2.inOut",
//     },
//     0
//   );

// // --- Плавное появление exhibit ---
// gsap.set([".exhibit-image", ".exhibit-text"], { clearProps: "all" });

// gsap.fromTo(
//   ".exhibit-image",
//   { opacity: 0 },
//   {
//     opacity: 1,
//     duration: 0.5,
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".mission-hero",
//       start: "center bottom",
//       toggleActions: "play none none reverse",
//     },
//   }
// );

// gsap.fromTo(
//   ".exhibit-text",
//   { opacity: 0 },
//   {
//     opacity: 1,
//     duration: 1.5,
//     delay: 0.3,
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".mission-hero",
//       start: "center bottom",
//       toggleActions: "play none none reverse",
//     },
//   }
// );

// // --- Индикатор прокрутки ---
// gsap.to(scrollIndicator, {
//   y: 30,
//   opacity: 0,
//   scrollTrigger: {
//     trigger: ".mission-hero",
//     start: "top top",
//     end: "center top",
//     scrub: 1,
//     onLeaveBack: () =>
//       gsap.to(scrollIndicator, { y: 0, opacity: 1, duration: 2.6 }),
//   },
// });

// // --- АККОРДЕОН GSAP ---
// const accordionItems = document.querySelectorAll(".accordion-item");

// accordionItems.forEach((item) => {
//   const title = item.querySelector(".accordion-title");
//   const content = item.querySelector(".accordion-content");
//   const arrow = item.querySelector(".accordion-arrow");

//   // начальные состояния
//   gsap.set(content, { height: 0, opacity: 0, display: "none" });

//   let isOpen = false;

//   title.addEventListener("click", () => {
//     if (isOpen) {
//       closeItem();
//     } else {
//       // закрытие других аккордеонов
//       accordionItems.forEach((other) => {
//         if (other !== item && other.isOpen) {
//           closeItem(other);
//         }
//       });

//       openItem();
//     }
//   });

// function openItem() {
//   gsap.set(content, { display: "block", visibility: "visible" });

//   const fullHeight = content.scrollHeight;

//   gsap.fromTo(
//     content,
//     { height: 0, opacity: 0 },
//     {
//       height: fullHeight,
//       opacity: 1,
//       duration: 0.8,
//       ease: "power3.out",
//       onComplete: () => gsap.set(content, { height: "auto" }),
//     }
//   );

//   gsap.to(arrow, { rotate: 45, duration: 0.4, ease: "power2.inOut" }); // Поворот стрелки

//   gsap.to(content, {
//     opacity: 1,
//     duration: 0.5,
//     ease: "power2.out",
//     onComplete: () => content.classList.add('open'),
//   });

//   isOpen = true;
//   item.isOpen = true;
// }

// function closeItem() {
//   gsap.to(content, {
//     height: 0,
//     opacity: 0,
//     duration: 0.6,
//     ease: "power2.inOut",
//     onComplete: () => gsap.set(content, { display: "none", visibility: "hidden" }),
//   });

//   gsap.to(arrow, { rotate: 0, duration: 0.4, ease: "power2.inOut" }); // Возврат стрелки

//   isOpen = false;
//   item.isOpen = false;
// }
// });


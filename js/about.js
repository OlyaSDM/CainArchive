// gsap.registerPlugin(ScrollTrigger);

// const panels = gsap.utils.toArray(".panel");

// gsap.set(panels[0], { y: "0%", width: "100%" });

// panels.forEach((panel, i) => {
//   if (i === 0) return;

//   gsap.fromTo(panel,
//     { y: "100%", width: "80%" },
//     {
//       y: "0%",
//       width: "100%",
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: panel,
//         start: "top bottom", 
//         end: "top top",      
//         scrub: 0.3,          
//       }
//     }
//   );
// });

// gsap.utils.toArray(".panel").forEach(panel => {
//   const letters = panel.querySelectorAll(".title .letter");
//   const text = panel.querySelector(".text");
//   const image = panel.querySelector(".image");

//   // --- Заголовок ---
//   gsap.set(letters, { y: "100%", opacity: 0 });

//   // --- Текст и фото ---
//   gsap.set([text, image], { y: 50, opacity: 0 }); // стартовое состояние снизу

//   // --- Анимация ---
//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: panel,
//       start: "top 80%",
//       end: "top 40%",
//       toggleActions: "play none none none"
//     }
//   });

//   // Сначала буквы заголовка
//   tl.to(letters, {
//     y: "0%",
//     opacity: 1,
//     duration: 1.2,
//     ease: "power3.out",
//     stagger: 0.1
//   });

//   // Потом текст
//   tl.to(text, {
//     y: 0,
//     opacity: 1,
//     duration: 1,
//     ease: "power3.out"
//   }, "-=0.5"); // запускаем текст с перекрытием заголовка

//   // Потом фото
//   tl.to(image, {
//     y: 0,
//     opacity: 1,
//     duration: 1,
//     ease: "power3.out"
//   }, "-=0.7"); // фото начинается чуть раньше, чтобы все плавно
// });


gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".panel");

panels.forEach((panel, i) => {
  const letters = panel.querySelectorAll(".title .letter");
  const text = panel.querySelector(".text");
  const image = panel.querySelector(".image");

  gsap.set(panel, { y: i === 0 ? "0%" : "100%", width: i === 0 ? "100%" : "80%" });
  gsap.set(letters, { y: "100%", opacity: 0 });
  gsap.set([text, image], { y: 50, opacity: 0 });

  if (i !== 0) {
    gsap.fromTo(panel,
      { y: "100%", width: "80%" },
      {
        y: "0%",
        width: "100%",
        ease: "power2.out",
        scrollTrigger: {
          trigger: panel,
          start: "top bottom",
          end: "top top",
          scrub: 0.3
        }
      }
    );
  }

  let letterDuration = 1.2;
  let textDuration = 1;
  let imageDuration = 1;
  let endTriggerOffset = "top 40%"; 
    let scrubValue = i === 0 ? false : 1.5; 


  if (i === 1) { 
    letterDuration = 2.5;
    textDuration = 2;
    imageDuration = 2;
    endTriggerOffset = "top -20%"; 
    
  }
  if (i === 2) { 
    letterDuration = 2.5;
    textDuration = 2;
    imageDuration = 2;
    endTriggerOffset = "top 40%";
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: panel,
      start: "top 80%",
      end: endTriggerOffset,
      toggleActions: i === 0 ? "play none none none" : undefined, 
      scrub: scrubValue
    }
  });

  tl.to(letters, { y: "0%", opacity: 1, duration: letterDuration, ease: "power3.out", stagger: 0.1 })
    .to(text, { y: 0, opacity: 1, duration: textDuration, ease: "power3.out" }, "-=0.5")
    .to(image, { y: 0, opacity: 1, duration: imageDuration, ease: "power3.out" }, "-=0.7");
});  
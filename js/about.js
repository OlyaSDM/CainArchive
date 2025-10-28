// gsap.registerPlugin(ScrollTrigger);

// function animateTitles() {
//   const panels = gsap.utils.toArray(".panel");

//   panels.forEach((panel, i) => {
//     const letters = panel.querySelectorAll(".title .letter");
//     const text = panel.querySelector(".text");
//     const image = panel.querySelector(".image");

//     gsap.set(panel, { y: i === 0 ? "0%" : "100%", width: i === 0 ? "100%" : "80%" });
//     gsap.set(letters, { y: "100%", opacity: 0 });
//     gsap.set([text, image], { y: 50, opacity: 0 });

//     if (i !== 0) {
//       gsap.fromTo(panel,
//         { y: "100%", width: "80%" },
//         {
//           y: "0%",
//           width: "100%",
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: panel,
//             start: "top bottom",
//             end: "top top",
//             scrub: 0.3
//           }
//         }
//       );
//     }

//     let letterDuration = i === 1 || i === 2 ? 2.5 : 1.2;
//     let textDuration = i === 1 ? 2.5 : i === 2 ? 2 : 1;
//     let imageDuration = i === 1 ? 2.5 : i === 2 ? 2 : 1;
//     let endTriggerOffset = i === 1 ? "top top" : i === 2 ? "top 20%" : "top 40%";
//     let scrubValue = i === 0 ? false : 1.5;

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: panel,
//         start: "top 80%",
//         end: endTriggerOffset,
//         toggleActions: i === 0 ? "play none none none" : undefined,
//         scrub: scrubValue
//       }
//     });

//     tl.to(letters, { y: "0%", opacity: 1, duration: letterDuration, ease: "power3.out", stagger: 0.1 })
//       .to(text, { y: 0, opacity: 1, duration: textDuration, ease: "power3.out" }, "-=0.5")
//       .to(image, { y: 0, opacity: 1, duration: imageDuration, ease: "power3.out" }, "-=0.7");
//   });

//   gsap.from(".rec_about2", {
//     opacity: 0,
//     y: 50,
//     duration: 1,
//     ease: "power3.out",
//     scrollTrigger: {
//       trigger: ".history",
//       start: "top 10%",
//       end: "top 50%",
//       scrub: true,
//       markers: false
//     }
//   });

//   gsap.from(".rec_about3", {
//     opacity: 0,
//     y: 50,
//     duration: 1,
//     ease: "power3.out",
//     scrollTrigger: {
//       trigger: ".mission",
//       start: "top 15%",
//       end: "bottom top",
//       scrub: true,
//       markers: false
//     }
//   });
// }





gsap.registerPlugin(ScrollTrigger);

// // --- Helper: Split text into letters ---
// function splitTextToLetters(selector) {
//   document.querySelectorAll(selector).forEach(el => {
//     const text = el.textContent;
//     el.textContent = "";
//     text.split("").forEach(char => {
//       const span = document.createElement("span");
//       span.textContent = char;
//       if (char !== " ") span.classList.add("letter-inner"); // only animate letters
//       el.appendChild(span);
//     });
//   });
// }

// // --- Apply splitting to coll-intro headings ---
// splitTextToLetters(".coll-intro h3");

// // --- Animate letters and paragraph ---
// gsap.timeline({
//   scrollTrigger: {
//     trigger: ".coll-intro",
//     start: "top 80%",
//     toggleActions: "play none none reverse"
//   }
// })
// .to(".coll-intro .letter-inner", {
//   y: "0%",
//   opacity: 1,
//   duration: 1.2,
//   ease: "power3.out",
//   stagger: 0.05
// })
// .fromTo(".coll-p", { y: 20, opacity: 0 }, {
//   y: 0,
//   opacity: 1,
//   duration: 1,
//   ease: "power2.out"
// }, "-=0.4"); // paragraph fades in slightly before letters finish




// Animate background image scale on scroll for each .coll-background .bg
document.querySelectorAll("#collections .coll-background .bg").forEach((bgEl) => {
  gsap.to(bgEl, {
    scale: 1.2,
    ease: "none",
    scrollTrigger: {
      trigger: bgEl.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
});

window.addEventListener("load", () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
});

// gsap.registerPlugin(ScrollTrigger);

// gsap.fromTo(".contact-left",
//   { y: "100%" },
//   {
//     y: "0%",
//     ease: "power4.out",
//     scrollTrigger: {
//       trigger: "#contactBlock",
//       start: "top 50%",
//       end: "top 20%",
//       scrub: 1.5,
//       markers: false
//     }
//   }
// );

// gsap.fromTo(".contact-right",
//   { y: "-100%" },
//   {
//     y: "0%",
//     ease: "power4.out",
//     scrollTrigger: {
//       trigger: "#contactBlock",
//       start: "top 50%",
//       end: "top 20%",
//       scrub: 1.5,
//       markers: false
//     }
//   }
// );

// document.addEventListener("DOMContentLoaded", () => {
//   const modal = document.getElementById("privacyModal");
//   const openLink = document.querySelector(".privacy-link");
//   const closeBtn = document.querySelector(".close-modal");

//   openLink.addEventListener("click", (e) => {
//     e.preventDefault();
//     modal.style.display = "flex";
//     document.body.style.overflow = "hidden";

//     gsap.fromTo(
//       modal.querySelector(".modal-content"),
//       { opacity: 0, scale: 0.9, y: -50 },
//       { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
//     );

//     gsap.fromTo(
//       closeBtn,
//       { opacity: 0, scale: 0.5, rotation: 180 },
//       { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "power2.out", onStart: () => closeBtn.style.display = "block" }
//     );
//   });

//   const closeModal = () => {
//     gsap.to(modal.querySelector(".modal-content"), {
//       opacity: 0,
//       scale: 0.9,
//       y: -50,
//       duration: 0.3,
//       ease: "power2.in",
//       onComplete: () => {
//         modal.style.display = "none";
//         document.body.style.overflow = "";
//       }
//     });

//     gsap.to(closeBtn, {
//       opacity: 0,
//       scale: 0.8,
//       rotation: 180,
//       duration: 0.3,
//       ease: "power2.in",
//       onComplete: () => {
//         closeBtn.style.display = "none";
//       }
//     });
//   };

//   closeBtn.addEventListener("click", closeModal);

//   modal.addEventListener("click", (e) => {
//     if (e.target === modal) closeModal();
//   });

//   closeBtn.addEventListener("mouseenter", () => {
//     gsap.to(closeBtn, { rotation: 90, duration: 0.3, ease: "power2.out" });
//   });

//   closeBtn.addEventListener("mouseleave", () => {
//     gsap.to(closeBtn, { rotation: 0, duration: 0.3, ease: "power2.out" });
//   });
// });

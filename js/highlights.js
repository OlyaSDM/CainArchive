// gsap.registerPlugin(ScrollTrigger);

// // Title animation
// const title = document.querySelector(".highlights-title");
// const titleText = title.textContent.trim();
// title.textContent = "";

// //  HIGH и LIGHTS
// const [firstWord, secondWord] = titleText.split(/(?=LIGHTS)/);


// function createSpans(word, color) {
//   return word.split("").map((char) => {
//     const span = document.createElement("span");
//     span.textContent = char;
//     span.style.color = color;
//     return span;
//   });
// }

// createSpans(firstWord, "#219EBC").forEach((span) => title.appendChild(span));
// createSpans(secondWord, "#ffffff").forEach((span) => title.appendChild(span));

// // GSAP for letters
// gsap.set(".highlights-title span", {
//   x: -80,
//   opacity: 0,
//   rotateY: -120,
//   rotateX: 8,
//   scale: 0.6,
// });

// gsap.to(".highlights-title span", {
//   x: 0,
//   opacity: 1,
//   rotateY: 0,
//   rotateX: 0,
//   scale: 1,
//   duration: 6,
//   ease: "power2.out",
//   stagger: 1.05,
//   scrollTrigger: {
//     trigger: ".highlights",
//     start: "top 90%",
//     end: "top 10%",
//     scrub: true,
//   },
// });

// // Cards animation on scroll
// gsap.utils.toArray(".card").forEach((card) => {
//   gsap.fromTo(
//     card,
//     { y: 50, opacity: 0 },
//     {
//       y: 0,
//       opacity: 1,
//       duration: 3,
//       ease: "power2.out",
//       scrollTrigger: {
//         trigger: card,
//         start: "top 90%",
//         end: "top 50%",
//         scrub: true,
//       },
//     }
//   );
// });

// // Hover + click animation for cards
// const cards = document.querySelectorAll(".card");
// cards.forEach((card) => {
//   const toggleButton = card.querySelector(".card-arrow-wrapper");
  
//   toggleButton.addEventListener("click", (e) => {
//     e.stopPropagation();
//     card.classList.toggle("active");
//   });
// });


//   // Hover GSAP
//   const cardTween = gsap.to(card, {
//     minHeight: 300,
//     boxShadow: "0 5px 20px rgba(33, 158, 188, 0.5)",
//     duration: 4.8,
//     ease: "power1.out",
//     paused: true,
//   });
//   const textTween = gsap.to(extra, {
//     minHeight: 300,
//     opacity: 1,
//     duration: 4.0,
//     ease: "power1.out",
//     paused: true,
//   });

//   let interval;

//   // Hover
//   card.addEventListener("mouseenter", () => {
//     cardTween.play();
//     textTween.play();
//     extra.textContent = "";
//     let i = 0;
//     clearInterval(interval);
//     interval = setInterval(() => {
//       extra.textContent += fullText[i];
//       i++;
//       if (i >= fullText.length) clearInterval(interval);
//     }, 40);
//   });

//   card.addEventListener("mouseleave", () => {
//     if (!card.classList.contains("active")) {
//       cardTween.reverse();
//       textTween.reverse();
//     }
//     clearInterval(interval);
//   });

//   // Click toggle
//   toggleButton.addEventListener("click", (e) => {
//     e.stopPropagation();
//     card.classList.toggle("active");

//     if (card.classList.contains("active")) {
//       cardTween.play();
//       textTween.play();
//     } else {
//       cardTween.reverse();
//       textTween.reverse();
//     }
//   });

gsap.registerPlugin(ScrollTrigger);

const accordionItems = document.querySelectorAll(".accordion-item");
const photos = document.querySelectorAll(".highlight-photo .photo");
const highlightPhoto = document.querySelector(".highlight-photo");
const highlightTitle = document.querySelector(".highlights-title");
let currentIndex = 0;

// Header animation when scrolling
gsap.from(highlightTitle, {
   x: -50,
   opacity: 0,
   duration: 1.5,
   ease: "power2.out",
   scrollTrigger: {
      trigger: highlightTitle,
      start: "top 90%",
      toggleActions: "play none none reverse",
   },
});

// Animation of the highlight-photo block and the first photo when scrolling
gsap.fromTo(
   highlightPhoto, {
      x: -200,
      opacity: 0
   }, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
         trigger: highlightPhoto,
         start: "top 90%",
         end: "top 50%",
         scrub: true,
      },
   }
);

photos.forEach((photo, i) => {
   if (i !== 0) gsap.set(photo, {
      x: 600,
      opacity: 0
   });
});

// Animation of accordion elements when scrolling
accordionItems.forEach((item, i) => {
   const toggle = item.querySelector(".accordion-toggle");
   const content = item.querySelector(".accordion-content");
   const preview = item.querySelector(".preview");
   const arrow = item.querySelector(".arrow_accardion");

   // Appearance/exit on scroll
   gsap.fromTo(
      item, {
         x: -100,
         opacity: 0
      }, {
         x: 0,
         opacity: 1,
         duration: 1.2,
         ease: "power2.out",
         scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
         },
         delay: i * 0.2,
      }
   );

   // Click on the accordion
   toggle.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      accordionItems.forEach((i) => {
         i.classList.remove("active");
         gsap.to(i.querySelector(".accordion-content"), {
            height: 0,
            duration: 0.5,
            ease: "power1.inOut",
         });
         gsap.to(i.querySelector(".preview"), {
            opacity: 1,
            duration: 0.3
         });
         gsap.to(i.querySelector(".arrow_accardion"), {
            rotation: 0,
            duration: 0.5,
            ease: "power1.inOut",
         });
      });

      if (!isActive) {
         item.classList.add("active");
         gsap.to(content, {
            height: "auto",
            duration: 0.5,
            ease: "power1.inOut"
         });
         gsap.to(preview, {
            opacity: 0,
            duration: 0.3
         });
         gsap.to(arrow, {
            rotation: 90,
            duration: 0.8,
            ease: "power1.inOut"
         });
         const photoIndex = parseInt(item.dataset.photo);
         slidePhoto(photoIndex);
      }
   });
});

// Photo change function
function slidePhoto(newIndex) {
   if (newIndex === currentIndex) return;
   const currentPhoto = photos[currentIndex];
   const nextPhoto = photos[newIndex];

   gsap.set(nextPhoto, {
      x: 600,
      opacity: 1
   });
   gsap.to(currentPhoto, {
      x: -600,
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
   });
   gsap.to(nextPhoto, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
   });

   currentIndex = newIndex;
}

// Initial position of the first photo
gsap.set(photos[0], {
   x: 0,
   opacity: 1
});
currentIndex = 0;
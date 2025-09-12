gsap.registerPlugin(ScrollTrigger);

const accordionItems = document.querySelectorAll(".accordion-item");
const photos = document.querySelectorAll(".highlight-photo .photo");
const highlightPhoto = document.querySelector(".highlight-photo");
const highlightTitle = document.querySelector(".highlights-title");
let currentIndex = 0;

gsap.from(highlightTitle, {
   x: -50,
   opacity: 0,
   duration: 1.2,
   ease: "power2.out",
   scrollTrigger: {
      trigger: highlightTitle,
      start: "top 90%",
      toggleActions: "play none none reverse",
   },
});
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

//starting positions photos
photos.forEach((photo, i) => {
   if (i !== 0) gsap.set(photo, {
      x: 600,
      opacity: 0
   });
});
gsap.set(photos[0], {
   x: 0,
   opacity: 1
});
currentIndex = 0;

//accordion + arrows
accordionItems.forEach((item, i) => {
   const toggle = item.querySelector(".accordion-toggle");
   const content = item.querySelector(".accordion-content");
   const preview = item.querySelector(".preview");
   const arrowSvg = item.querySelector(".arrow_accardion svg");

   // scroll appear
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
            end: "top 10%",
            scrub: true,
         },
         delay: i * 0.1,
      }
   );

   // ensure arrow starts at 0 rotation
   gsap.set(arrowSvg, {
      rotation: 0,
      x: 0,
      y: 0,
      transformOrigin: "50% 50%"
   });

   toggle.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      //close everything
      accordionItems.forEach((other) => {
         other.classList.remove("active");
         other
            .querySelector(".accordion-toggle")
            .setAttribute("aria-expanded", "false");
         gsap.to(other.querySelector(".accordion-content"), {
            height: 0,
            duration: 0.45,
            ease: "power1.inOut",
         });
         gsap.to(other.querySelector(".preview"), {
            opacity: 1,
            duration: 0.25
         });
         const otherSvg = other.querySelector(".arrow_accardion svg");
         if (otherSvg)
            gsap.to(otherSvg, {
               rotation: 0,
               x: 0,
               y: 0,
               duration: 0.45,
               ease: "power2.inOut",
            });

         // remove active color from span.italic
         const otherItalic = other.querySelector(".accordion-header .italic");
         if (otherItalic) otherItalic.classList.remove("active");
      });

      if (!isActive) {
         // open the current one
         item.classList.add("active");
         toggle.setAttribute("aria-expanded", "true");
         gsap.to(content, {
            height: "auto",
            duration: 0.45,
            ease: "power1.inOut",
         });
         gsap.to(preview, {
            opacity: 0,
            duration: 0.25
         });
         gsap.to(arrowSvg, {
            rotation: -45,
            x: 6,
            y: -4,
            transformOrigin: "50% 50%",
            duration: 0.55,
            ease: "power2.out",
         });

         // make span.italic blue
         const italic = item.querySelector(".accordion-header .italic");
         if (italic) italic.classList.add("active");

         const photoIndex = parseInt(item.dataset.photo, 10);
         slidePhoto(photoIndex);
      }
   });
});

//change photo
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
      duration: 0.9,
      ease: "power1.inOut",
   });
   gsap.to(nextPhoto, {
      x: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power1.inOut"
   });

   currentIndex = newIndex;
}
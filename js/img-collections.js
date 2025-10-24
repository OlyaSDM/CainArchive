// gsap.registerPlugin(ScrollTrigger);

// document.addEventListener("DOMContentLoaded", () => {
//   // ===== NAVBAR VISIBILITY CONTROL =====
//   const navbar = document.getElementById("navbar");
//   gsap.set("#navbar", { opacity: 0, y: -50, pointerEvents: "none" });

//   ScrollTrigger.create({
//     trigger: ".container",
//     start: "top bottom",
//     onEnter: () => {
//       gsap.to("#navbar", {
//         opacity: 1,
//         y: 0,
//         pointerEvents: "auto",
//         duration: 0.6,
//         ease: "power2.out"
//       });
//     },
//     onLeaveBack: () => {
//       gsap.to("#navbar", {
//         opacity: 0,
//         y: -50,
//         pointerEvents: "none",
//         duration: 0.6,
//         ease: "power2.in"
//       });
//     }
//   });




//   const startAnimation = () => {
//     // ===== Split title for staggered intro =====
//     const title = document.getElementById("ww2-title");
//     const chars = title.textContent.split("");
//     title.textContent = "";
//     chars.forEach(ch => {
//       const span = document.createElement("span");
//       span.textContent = ch === " " ? "\u00A0" : ch;
//       span.style.display = "inline-block";
//       title.appendChild(span);
//     });

//     // ===== Initial letter animation =====
//     gsap.from(title.children, {
//       y: 100,
//       opacity: 0,
//       stagger: 0.05,
//       ease: "power3.out",
//       duration: 1
//     });

//     // ===== Smooth Scroll Scaling =====

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".container",
//         start: "top top",
//         end: "+=500",
//         scrub: 1,
//         pin: true
//       }
//     });

//     tl.to(".mask h2", {
//       scale: 30,
//       ease: "none",
//       duration: .5
//     });

//     tl.to(".mask", {
//       opacity: 0,
//       ease: "power1.inOut",
//       duration: .5
//     }, ">");

//     tl.to({}, { duration: 0.3 });

//     tl.fromTo("#collection-text", {
//       opacity: 0,
//       y: 30
//     }, {
//       opacity: 1,
//       y: 0,
//       duration: .8,
//       ease: "power2.out"
//     }, "-=1.2");

//     // Animate "photos in our collection"
//     tl.fromTo(".collection-text-p", {
//       opacity: 0,
//       y: 40
//     }, {
//       opacity: 1,
//       y: 0,
//       duration: 1.4,
//       ease: "power2.out"
//     }, "-=1");

//     tl.to(".video-wrapper", {
//       scale: 0.9, 
//       ease: "power2.out",
//       duration: 1
//     })

// // === ADD WATERMARKS TO GALLERY IMAGES ===
// document.querySelectorAll(".img-wrapper").forEach(wrapper => {
//   // Ensure position: relative for watermark placement
//   wrapper.style.position = "relative";

//   const watermark = document.createElement("div");
//   watermark.className = "watermark-collections";
//   watermark.textContent = "© CainArchive";

//   wrapper.appendChild(watermark);
// });


// // Run once DOM is ready
// addModalWatermark(document.getElementById("modalImgFront"));
// addModalWatermark(document.getElementById("modalImgBack"));




// document.querySelectorAll(".gallery-nav a").forEach(anchor => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();
//     const target = document.querySelector(this.getAttribute("href"));
//     if (target) {
//       ScrollSmoother.get().scrollTo(target, true);
//     }
//   });
// });


// // COLOR CHANGE ON SCROLL 
// gsap.to("body", {
//   "--background": "#e7c9af", 
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".navigational-links",
//     start: "top center",
//     end: "bottom top",
//     scrub: true,
//   }
// });




//   };




// // ===== SCROLL DOWN BUTTON CONTROL =====
// const scrollDown = document.getElementById("scrollDown");

// if (scrollDown) {
//   gsap.to(scrollDown, {
//     opacity: 0,
//     y: 30,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: ".container",
//       start: "top top+=50", // starts hiding early as user scrolls
//       end: "center top",
//       scrub: true,
//       onLeaveBack: () => {
//         gsap.to(scrollDown, {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: "power2.out",
//         });
//       },
//     },
//   });
// }

//   // Wait for ScrollSmoother before triggering animation
//   if (ScrollSmoother.get()) {
//     startAnimation();
//   } else {
//     const interval = setInterval(() => {
//       if (ScrollSmoother.get()) {
//         clearInterval(interval);
//         startAnimation();
//       }
//     }, 50);
//   }



//   // document.querySelectorAll('.img-wrapper img').forEach(img => {
//   //   const frontSrc = img.getAttribute('src');
//   //   const backSrc = img.getAttribute('data-back');

//   //   img.addEventListener('mouseenter', () => {
//   //     if (backSrc) img.src = backSrc;
//   //   });

//   //   img.addEventListener('mouseleave', () => {
//   //     img.src = frontSrc;
//   //   });
//   // });
// document.querySelectorAll('.img-wrapper img').forEach(img => {
//   const frontSrc = img.getAttribute('data-front');
//   const backSrc = img.getAttribute('data-back');

//   img.addEventListener('mouseenter', () => {
//     if (backSrc) img.src = backSrc;
//   });

//   img.addEventListener('mouseleave', () => {
//     img.src = frontSrc;
//   });
// });



//   // ===== GALLERY MODAL =====
//   const modal = document.getElementById("imageModal");
//   const modalImg = document.getElementById("modalImg");
//   const modalClose = document.getElementById("modalClose");
//   const modalPrev = document.getElementById("prevBtn");
//   const modalNext = document.getElementById("nextBtn");
//   const modalFlipCard = document.getElementById("modalFlipCard");
//   const modalImgFront = document.getElementById("modalImgFront");
//   const modalImgBack = document.getElementById("modalImgBack");

//   const allImages = Array.from(document.querySelectorAll(".gallery-grid img"));
//   let currentIndex = 0;


//   // const openModal = (index) => {
//   //   currentIndex = index;
//   //   const currentImg = allImages[currentIndex];
    
//   //   modalImgFront.src = currentImg.src;

//   //   // Use the data-back attribute for the flip image
//   //   const backSrc = currentImg.dataset.back;
//   //   modalImgBack.src = backSrc || "/img/Kennedy/The Legacy/Photo 133_result copy-min.jpg"; // fallback

//   //   modalFlipCard.classList.remove("flipped");
//   //   modal.style.display = "flex";

//   //     // ✅ Show carousel buttons
//   // document.querySelectorAll(".modal-btn").forEach(btn => {
//   //   btn.style.opacity = "1";
//   //   btn.style.pointerEvents = "auto";
//   // });
//   // };
//   const openModal = (index) => {
//     currentIndex = index;
//     const currentImg = allImages[currentIndex];

//     modalImgFront.src = currentImg.getAttribute("data-front");
//     modalImgBack.src = currentImg.getAttribute("data-back") || "/img/fallback.jpg";

//     modalFlipCard.classList.remove("flipped");
//     modal.style.display = "flex";

//     document.querySelectorAll(".modal-btn").forEach(btn => {
//       btn.style.opacity = "1";
//       btn.style.pointerEvents = "auto";
//     });
//   };





// document.querySelectorAll('.flip-container').forEach(container => {
//   container.addEventListener('click', () => {
//     container.classList.toggle('flipped');
//   });
// });


//   const closeModal = () => {
//   modal.style.display = "none";

//   // ✅ Hide carousel buttons
//   document.querySelectorAll(".modal-btn").forEach(btn => {
//     btn.style.opacity = "0";
//     btn.style.pointerEvents = "none";
//   });
// };


// const showNext = () => {
//   modalFlipCard.classList.remove("flipped"); // reset flip
//   currentIndex = (currentIndex + 1) % allImages.length;
//   updateModalImages();
// };

// const showPrev = () => {
//   modalFlipCard.classList.remove("flipped");
//   currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
//   updateModalImages();
// };


//   function updateModalImages() {
//     const currentImg = allImages[currentIndex];
//     modalImgFront.src = currentImg.getAttribute("data-front");
//     // modalImgFront.src = currentImg.src;
//     const backSrc = currentImg.dataset.back;
//     modalImgBack.src = currentImg.getAttribute("data-back") || "/img/fallback.jpg";

//     // modalImgBack.src = backSrc || "/img/Kennedy/The Legacy/Photo 133_result copy-min.jpg";
//     // modalFlipCard.classList.remove("flipped");
//   }

//   allImages.forEach((img, i) => {
//     img.addEventListener("click", () => openModal(i));
//   });

//   modalClose.addEventListener("click", closeModal);
//   modalPrev.addEventListener("click", showPrev);
//   modalNext.addEventListener("click", showNext);

// modal.addEventListener("click", (e) => {
//   if (e.target === e.currentTarget) {
//     closeModal();
//   }
// });
// let lastScrollTime = 0;

// //FOR MOBILE SCROLL
// modal.addEventListener("wheel", (e) => {
//   const now = Date.now();
//   const delta = now - lastScrollTime;

//   if (delta > 600) {
//     if (e.deltaY > 0) {
//       showNext();
//     } else {
//       showPrev();
//     }
//     lastScrollTime = now;
//   }

//   e.preventDefault();
// }, { passive: false });


// let touchStartX = 0;
// let touchEndX = 0;

// modal.addEventListener("touchstart", (e) => {
//   touchStartX = e.changedTouches[0].screenX;
// });

// modal.addEventListener("touchend", (e) => {
//   touchEndX = e.changedTouches[0].screenX;
//   handleSwipeGesture();
// });



// function handleSwipeGesture() {
//   const threshold = 50;
//   if (touchEndX < touchStartX - threshold) {
//     showNext();
//   } else if (touchEndX > touchStartX + threshold) {
//     showPrev();
//   }

// }





//   document.addEventListener("keydown", (e) => {
//     if (modal.style.display === "flex") {
//       if (e.key === "ArrowRight") showNext();
//       if (e.key === "ArrowLeft") showPrev();
//       if (e.key === "Escape") closeModal();
//     }
//   });

//   // ===== LETTER-SECTION ANIMATION =====
//   function splitTextToLetters(el) {
//     const text = el.textContent;
//     el.textContent = "";
//     text.split("").forEach(char => {
//       const span = document.createElement("span");
//       span.textContent = char;
//       if (char !== " ") span.classList.add("letter-inner");
//       el.appendChild(span);
//     });
//   }

//   document.querySelectorAll(".letter-section").forEach(section => {
//     section.querySelectorAll("h3").forEach(h3 => {
//       splitTextToLetters(h3);
//       h3.style.visibility = "visible";
//     });

//     gsap.set(section.querySelectorAll(".letter-inner"), {
//       y: "100%",
//       opacity: 0
//     });

//     gsap.to(section.querySelectorAll(".letter-inner"), {
//       y: "0%",
//       opacity: 1,
//       duration: 1.2,
//       ease: "power3.out",
//       stagger: 0.05,
//       scrollTrigger: {
//         trigger: section,
//         start: "top 70%",
//         end: "bottom 60%",
//         scrub: 1
//       }
//     });
//   });
// });

// // ===== GALLERY NAV LINKS SLIDE-IN + HIDE ON SCROLL UP =====
// const navButtons = document.querySelectorAll(".nav-link-gallery");

// gsap.set(navButtons, {
//   x: -60,
//   opacity: 0
// });

// gsap.to(navButtons, {
//   x: 0,
//   opacity: 1,
//   stagger: 0.2,
//   ease: "power3.out",
//   duration: 1.2,
//   scrollTrigger: {
//     trigger: "#gallery-words",
//     start: "top 80%",
//     end: "bottom top",
//     toggleActions: "play none none reverse",
//     onLeaveBack: () => {
//       gsap.to(navButtons, {
//         x: -60,
//         opacity: 0,
//         stagger: 0.1,
//         duration: 0.5,
//         ease: "power2.in"
//       });
//     }
//   }
// });



//   // Hover behavior for gallery nav links
//   navLinks.forEach(link => {
//     let showTimeout, hideTimeout;

//     link.addEventListener("mouseenter", () => {
//       tooltip.textContent = link.textContent.trim();
//       clearTimeout(hideTimeout);
//       showTimeout = setTimeout(() => {
//         tooltip.classList.add("visible");
//       }, 100);
//     });

//     link.addEventListener("mouseleave", () => {
//       clearTimeout(showTimeout);
//       hideTimeout = setTimeout(() => {
//         tooltip.classList.remove("visible");
//       }, 60);
//     });

//   });

// // Ensure ScrollTrigger calculates layout correctly on load and resize
// window.addEventListener("load", () => {
//   ScrollTrigger.refresh();
// });

// window.addEventListener("resize", () => {
//   ScrollTrigger.refresh();
// });




gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // ========== UTILITY FUNCTIONS ==========
  const splitTextToSpans = (el, className = "") => {
    const text = el.textContent;
    el.textContent = "";
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      if (className && char !== " ") span.classList.add(className);
      el.appendChild(span);
    });
  };

  const animateLettersOnScroll = () => {
    document.querySelectorAll(".letter-section h3").forEach(h3 => {
      splitTextToSpans(h3, "letter-inner");
      h3.style.visibility = "visible";
    });

    gsap.set(".letter-inner", { y: "100%", opacity: 0 });

    gsap.to(".letter-inner", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".letter-section",
        start: "top 70%",
        end: "bottom 60%",
        scrub: 1,
      }
    });
  };

  const addWatermarks = () => {
    document.querySelectorAll(".img-wrapper").forEach(wrapper => {
      wrapper.style.position = "relative";
      const watermark = document.createElement("div");
      watermark.className = "watermark-collections";
      watermark.textContent = "© CainArchive";
      wrapper.appendChild(watermark);
    });
  };

  const enableImageFlipHover = () => {
    document.querySelectorAll(".img-wrapper img").forEach(img => {
      const frontSrc = img.dataset.front;
      const backSrc = img.dataset.back;
      img.addEventListener("mouseenter", () => backSrc && (img.src = backSrc));
      img.addEventListener("mouseleave", () => img.src = frontSrc);
    });
  };

  const enableSmoothNavScroll = () => {
    document.querySelectorAll(".gallery-nav a").forEach(anchor => {
      anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) ScrollSmoother.get()?.scrollTo(target, true);
      });
    });
  };

const animateNavbar = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Set initial hidden state once
  gsap.set("#navbar", { opacity: 0, y: -50, pointerEvents: "none" });

  ScrollTrigger.create({
    trigger: ".container",
    start: "top bottom",
    onEnter: () => {
      gsap.to("#navbar", {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.6,
        ease: "power2.out"
      });
    },
    onLeaveBack: () => {
      gsap.to("#navbar", {
        opacity: 0,
        y: -50,
        pointerEvents: "none",
        duration: 0.6,
        ease: "power2.in"
      });
    }
  });
};


    const startAnimation = () => {
    // ===== Animate title =====
    const title = document.getElementById("ww2-title");
    splitTextToSpans(title); 

    gsap.from(title.children, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      ease: "power3.out",
      duration: 1
    });

    // ===== Scroll-triggered pinning sequence =====
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=500",
        scrub: 1,
        pin: true
      }
    });

    tl.to(".mask h2", { scale: 30, ease: "none", duration: 0.5 });
    tl.to(".mask", { opacity: 0, ease: "power1.inOut", duration: 0.5 });
    tl.to({}, { duration: 0.3 });
    tl.fromTo("#collection-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=1.2");
    tl.fromTo(".collection-text-p", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }, "-=1");
    tl.to(".video-wrapper", { scale: 0.9, ease: "power2.out", duration: 1 });

    // ===== Scroll-based background color change =====
    gsap.to("body", {
      "--background": "#e7c9af",
      ease: "none",
      scrollTrigger: {
        trigger: ".navigational-links",
        start: "top center",
        end: "bottom top",
        scrub: true,
      }
    });
  };

  const animateScrollDown = () => {
    const scrollDown = document.getElementById("scrollDown");
    if (!scrollDown) return;

    gsap.to(scrollDown, {
      opacity: 0,
      y: 30,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".container",
        start: "top top+=50",
        end: "center top",
        scrub: true,
        onLeaveBack: () => {
          gsap.to(scrollDown, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        }
      }
    });
  };

  const initModal = () => {
    const modal = document.getElementById("imageModal");
    const modalFlipCard = document.getElementById("modalFlipCard");
    const modalImgFront = document.getElementById("modalImgFront");
    const modalImgBack = document.getElementById("modalImgBack");
    const allImages = Array.from(document.querySelectorAll(".gallery-grid img"));
    let currentIndex = 0;

    const updateModal = () => {
      const currentImg = allImages[currentIndex];
      modalImgFront.src = currentImg.dataset.front;
      modalImgBack.src = currentImg.dataset.back || "/img/fallback.jpg";
      modalFlipCard.classList.remove("flipped");
    };

    const openModal = (i) => {
      currentIndex = i;
      updateModal();
      modal.style.display = "flex";
      document.querySelectorAll(".modal-btn").forEach(btn => {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
      });
    };

    const closeModal = () => {
      modal.style.display = "none";
      document.querySelectorAll(".modal-btn").forEach(btn => {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
      });
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % allImages.length;
      updateModal();
    };

    const showPrev = () => {
      currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
      updateModal();
    };

    allImages.forEach((img, i) => img.addEventListener("click", () => openModal(i)));
    document.getElementById("modalClose").addEventListener("click", closeModal);
    document.getElementById("prevBtn").addEventListener("click", showPrev);
    document.getElementById("nextBtn").addEventListener("click", showNext);
    modal.addEventListener("click", e => e.target === modal && closeModal());

    // Wheel scroll
    let lastScrollTime = 0;
    modal.addEventListener("wheel", e => {
      if (Date.now() - lastScrollTime > 600) {
        e.deltaY > 0 ? showNext() : showPrev();
        lastScrollTime = Date.now();
      }
      e.preventDefault();
    }, { passive: false });

    // Touch swipe
    let touchStartX = 0;
    modal.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX);
    modal.addEventListener("touchend", e => {
      const deltaX = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(deltaX) > 50) deltaX > 0 ? showPrev() : showNext();
    });

    // Keyboard nav
    document.addEventListener("keydown", e => {
      if (modal.style.display === "flex") {
        if (e.key === "ArrowRight") showNext();
        else if (e.key === "ArrowLeft") showPrev();
        else if (e.key === "Escape") closeModal();
      }
    });

    // Flip on click
    document.querySelectorAll(".flip-container").forEach(container => {
      container.addEventListener("click", () => container.classList.toggle("flipped"));
    });
  };

  // ===== INIT EVERYTHING IN ORDER =====
  animateNavbar();
  animateScrollDown();
  enableImageFlipHover();
  enableSmoothNavScroll();
  addWatermarks();
  animateLettersOnScroll();
  initModal();

  // Wait for ScrollSmoother, then run intro animation
  const waitForSmoother = () => {
    if (ScrollSmoother.get()) {
      startAnimation();
    } else {
      requestAnimationFrame(waitForSmoother);
    }
  };
  waitForSmoother();

  // Always refresh ScrollTrigger on resize/load
  ["load", "resize"].forEach(event =>
    window.addEventListener(event, () => ScrollTrigger.refresh())
  );
});

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const startAnimation = () => {
    // ===== Split title for staggered intro =====
    const title = document.getElementById("ww2-title");
    const chars = title.textContent.split("");
    title.textContent = "";
    chars.forEach(ch => {
      const span = document.createElement("span");
      span.textContent = ch === " " ? "\u00A0" : ch;
      span.style.display = "inline-block";
      title.appendChild(span);
    });

    // ===== Initial letter animation =====
    gsap.from(title.children, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      ease: "power3.out",
      duration: 1
    });

    // ===== Smooth Scroll Scaling =====

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=1000",
        scrub: 1,
        pin: true
      }
    });

    tl.to(".mask h2", {
      scale: 30,
      ease: "none",
      duration: 1
    });

    tl.to(".mask", {
      opacity: 0,
      ease: "power1.inOut",
      duration: 1
    }, ">");

    tl.to({}, { duration: 0.3 });

    tl.fromTo("#collection-text", {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out"
    }, "-=1.2");

    // Animate "photos in our collection"
    tl.fromTo(".collection-text-p", {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: "power2.out"
    }, "-=1");

    tl.to(".video-wrapper", {
      scale: 0.9, 
      ease: "power2.out",
      duration: 1
    })

document.querySelectorAll(".gallery-nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      ScrollSmoother.get().scrollTo(target, true);
    }
  });
});


  // ===== NAVBAR VISIBILITY CONTROL =====
    const navbar = document.getElementById("navbar");

    // hide navbar initially
    gsap.set(navbar, { opacity: 0, y: -50, pointerEvents: "none" });

    ScrollTrigger.create({
      trigger: ".container",
      start: "top center ",   
      onEnter: () => {
        gsap.to(navbar, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.6, ease: "power2.out" });
      },
      // onEnterBack: () => {
      //   gsap.to(navbar, { opacity: 0, pointerEvents: "none", duration: 0.6, ease: "power2.in" });
      // },
      onLeaveBack: () => {
        gsap.to(navbar, { opacity: 0, y: -50, pointerEvents: "none", duration: 0.6, ease: "power2.in" });
      }
    });

    // ===== NAVBAR SHOW ON SCROLL =====
// const navbar = document.getElementById("navbar");

// if (navbar) {
//   gsap.set(navbar, { opacity: 0, y: -50, pointerEvents: "none" });

//   ScrollTrigger.create({
//     trigger: ".container", // Or any section below hero
//     start: "top center",
//     onEnter: () => {
//       gsap.to(navbar, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
//       navbar.classList.add("visible");
//     },
//     onLeaveBack: () => {
//       gsap.to(navbar, { opacity: 0, y: -20, duration: 0.6, ease: "power2.in" });
//       navbar.classList.remove("visible");
//     }
//   });
// }

  };




// ===== SCROLL DOWN BUTTON CONTROL =====
const scrollDown = document.getElementById("scrollDown");

if (scrollDown) {
  gsap.to(scrollDown, {
    opacity: 0,
    y: 30,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".container",
      start: "top top+=50", // starts hiding early as user scrolls
      end: "center top",
      scrub: true,
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

  // Wait for ScrollSmoother before triggering animation
  if (ScrollSmoother.get()) {
    startAnimation();
  } else {
    const interval = setInterval(() => {
      if (ScrollSmoother.get()) {
        clearInterval(interval);
        startAnimation();
      }
    }, 50);
  }







  // ===== GALLERY MODAL =====
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.getElementById("modalClose");
  const modalPrev = document.getElementById("prevBtn");
  const modalNext = document.getElementById("nextBtn");
  const modalFlipCard = document.getElementById("modalFlipCard");
  const modalImgFront = document.getElementById("modalImgFront");
  const modalImgBack = document.getElementById("modalImgBack");

  const allImages = Array.from(document.querySelectorAll(".gallery-grid img"));
  let currentIndex = 0;


  const openModal = (index) => {
    currentIndex = index;
    const currentImg = allImages[currentIndex];
    
    modalImgFront.src = currentImg.src;

    // Use the data-back attribute for the flip image
    const backSrc = currentImg.dataset.back;
    modalImgBack.src = backSrc || "/img/Kennedy/The Legacy/Photo 133_result copy-min.jpg"; // fallback

    modalFlipCard.classList.remove("flipped");
    modal.style.display = "flex";

      // ✅ Show carousel buttons
  document.querySelectorAll(".modal-btn").forEach(btn => {
    btn.style.opacity = "1";
    btn.style.pointerEvents = "auto";
  });
  };

document.querySelectorAll('.flip-container').forEach(container => {
  container.addEventListener('click', () => {
    container.classList.toggle('flipped');
  });
});


  const closeModal = () => {
  modal.style.display = "none";

  // ✅ Hide carousel buttons
  document.querySelectorAll(".modal-btn").forEach(btn => {
    btn.style.opacity = "0";
    btn.style.pointerEvents = "none";
  });
};


const showNext = () => {
  modalFlipCard.classList.remove("flipped"); // reset flip
  currentIndex = (currentIndex + 1) % allImages.length;
  updateModalImages();
};

const showPrev = () => {
  modalFlipCard.classList.remove("flipped");
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  updateModalImages();
};


  function updateModalImages() {
    const currentImg = allImages[currentIndex];
    modalImgFront.src = currentImg.src;
    const backSrc = currentImg.dataset.back;
    modalImgBack.src = backSrc || "/img/Kennedy/The Legacy/Photo 133_result copy-min.jpg";
    // modalFlipCard.classList.remove("flipped");
  }

  allImages.forEach((img, i) => {
    img.addEventListener("click", () => openModal(i));
  });

  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", showPrev);
  modalNext.addEventListener("click", showNext);

modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }
});
let lastScrollTime = 0;

//FOR MOBILE SCROLL
modal.addEventListener("wheel", (e) => {
  const now = Date.now();
  const delta = now - lastScrollTime;

  if (delta > 600) {
    if (e.deltaY > 0) {
      showNext();
    } else {
      showPrev();
    }
    lastScrollTime = now;
  }

  e.preventDefault();
}, { passive: false });


let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});



function handleSwipeGesture() {
  const threshold = 50;
  if (touchEndX < touchStartX - threshold) {
    showNext();
  } else if (touchEndX > touchStartX + threshold) {
    showPrev();
  }

}





  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeModal();
    }
  });

  // ===== LETTER-SECTION ANIMATION =====
  function splitTextToLetters(el) {
    const text = el.textContent;
    el.textContent = "";
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      if (char !== " ") span.classList.add("letter-inner");
      el.appendChild(span);
    });
  }

  document.querySelectorAll(".letter-section").forEach(section => {
    section.querySelectorAll("h3").forEach(h3 => {
      splitTextToLetters(h3);
      h3.style.visibility = "visible";
    });

    gsap.set(section.querySelectorAll(".letter-inner"), {
      y: "100%",
      opacity: 0
    });

    gsap.to(section.querySelectorAll(".letter-inner"), {
      y: "0%",
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 1
      }
    });
  });
});

// ===== GALLERY NAV LINKS SLIDE-IN + HIDE ON SCROLL UP =====
const navButtons = document.querySelectorAll(".nav-link-gallery");

gsap.set(navButtons, {
  x: -60,
  opacity: 0
});

gsap.to(navButtons, {
  x: 0,
  opacity: 1,
  stagger: 0.2,
  ease: "power3.out",
  duration: 1.2,
  scrollTrigger: {
    trigger: "#gallery-words",
    start: "top 80%",
    end: "bottom top",
    toggleActions: "play none none reverse",
    onLeaveBack: () => {
      gsap.to(navButtons, {
        x: -60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }
});



  // Hover behavior for gallery nav links
  navLinks.forEach(link => {
    let showTimeout, hideTimeout;

    link.addEventListener("mouseenter", () => {
      tooltip.textContent = link.textContent.trim();
      clearTimeout(hideTimeout);
      showTimeout = setTimeout(() => {
        tooltip.classList.add("visible");
      }, 100);
    });

    link.addEventListener("mouseleave", () => {
      clearTimeout(showTimeout);
      hideTimeout = setTimeout(() => {
        tooltip.classList.remove("visible");
      }, 60);
    });

  });


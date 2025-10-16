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

// // Step 3: Scale the video in subtly, fade it in if needed
// tl.to(".video-wrapper", {
//   scale: 0.93,
//   opacity: 1,
//   ease: "power4.out",
//   duration: 1.6
// }, "<0.3"); // starts slightly after mask begins fading

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true
      }
    });

    tl.to(".mask h2", {
      scale: 30,
      ease: "none",
      duration: 1.3
    });

    tl.to(".mask", {
      opacity: 0,
      ease: "power1.inOut",
      duration: 1.4
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
      scale: 0.85, 
      ease: "power2.out",
      duration: 1
    })




    // ===== NAVBAR VISIBILITY CONTROL =====
    const navbar = document.getElementById("navbar");

    // hide navbar initially
    gsap.set(navbar, { opacity: 0, pointerEvents: "none" });

    ScrollTrigger.create({
      trigger: ".container",
      start: "bottom bottom",   // when bottom of container hits bottom of viewport
      onEnter: () => {
        gsap.to(navbar, { opacity: 1, pointerEvents: "auto", duration: 0.5, ease: "power2.out" });
      },
      onEnterBack: () => {
        gsap.to(navbar, { opacity: 0, pointerEvents: "none", duration: 0.5, ease: "power2.in" });
      },
      onLeaveBack: () => {
        gsap.to(navbar, { opacity: 0, pointerEvents: "none", duration: 0.5, ease: "power2.in" });
      }
    });
  };

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
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");

  const allImages = Array.from(document.querySelectorAll(".gallery-grid img"));
  let currentIndex = 0;

  const openModal = (index) => {
    currentIndex = index;
    modalImg.src = allImages[currentIndex].src;
    modal.style.display = "flex";
  };

  const closeModal = () => {
    modal.style.display = "none";
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    modalImg.src = allImages[currentIndex].src;
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % allImages.length;
    modalImg.src = allImages[currentIndex].src;
  };

  allImages.forEach((img, i) => {
    img.addEventListener("click", () => openModal(i));
  });

  modalClose.addEventListener("click", closeModal);
  modalPrev.addEventListener("click", showPrev);
  modalNext.addEventListener("click", showNext);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

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

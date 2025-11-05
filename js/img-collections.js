
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

// === Animate paragraph in #gallery-words on scroll ===
gsap.fromTo(
  "#gallery-words > p",
  { opacity: 0, y: 10 },
  {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#gallery-words > p",
      start: "top 85%",
      toggleActions: "play none none reset"
    }
  }
);

// === Animate each .nav-link-gallery on scroll ===
document.querySelectorAll(".nav-link-gallery").forEach(link => {
  gsap.fromTo(
    link,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: link,
        start: "top 90%",
        toggleActions: "play none none reset"
      }
    }
  );
});



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
    tl.fromTo("#collection-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, ">");
    tl.fromTo(".collection-text-p", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }, ">");
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


    // ===== MODAL =====

const initModal = () => {
  const modal = document.getElementById("imageModal");
  const modalImgFront = document.getElementById("modalImgFront");
  const modalImgBack = document.getElementById("modalImgBack");
  const allImages = Array.from(document.querySelectorAll(".gallery-grid img, .gallery-grid-ww2 img"));
  let currentIndex = 0;

const updateModal = () => {
  const currentImg = allImages[currentIndex];
  modalImgFront.src = currentImg.dataset.front;
  modalImgBack.src = currentImg.dataset.back || "/img/fallback.jpg";

  const flipContainer = document.getElementById("modalFlipCard");
  const flipHint = document.querySelector(".flip-hint");

  //Safari
  modalImgFront.onload = modalImgBack.onload = () => {
  flipContainer.classList.remove("flipped");
};

  // Reset flip state
  flipContainer.classList.remove("flipped");

  // Add click-to-flip
  flipContainer.onclick = () => {
    flipContainer.classList.toggle("flipped");
    // Hide the flip hint after first flip
    if (flipHint) flipHint.classList.remove("visible");
  };

  // Show flip hint (both desktop & mobile)
  if (flipHint) flipHint.classList.add("visible");
};


  const openModal = (i) => {
    currentIndex = i;
    updateModal();
    modal.style.display = "flex";

    // Show navigation buttons
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

  // Image click opens modal
  allImages.forEach((img, i) => img.addEventListener("click", () => openModal(i)));

  // Modal interactions
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

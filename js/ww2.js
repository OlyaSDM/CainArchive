gsap.registerPlugin(ScrollTrigger);

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
    end: "+=5000", 
    scrub: 1,
    pin: true
  }
});


tl.to(".mask h2", {
  scale: 30,          
  ease: "none",
  duration: 0.7
});


tl.to(".mask", {
  opacity: 0,
  ease: "power1.inOut",
  duration: 0.3
}, ">"); 


tl.to({}, { duration: 0.3 });


tl.to(".video-wrapper", {
  opacity: 0,
  ease: "power2.out",
  duration: 0.6
});


// GALLERY SECTION

document.addEventListener("DOMContentLoaded", () => {
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
});

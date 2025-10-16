gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".contact-left",
  { y: "100%" },
  {
    y: "0%",
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#contactBlock",
      start: "top 50%",
      end: "top 20%",
      scrub: 1.5,
      markers: false
    }
  }
);

gsap.fromTo(".contact-right",
  { y: "-100%" },
  {
    y: "0%",
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#contactBlock",
      start: "top 50%",
      end: "top 20%",
      scrub: 1.5,
      markers: false
    }
  }
);

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("privacyModal");
  const openLink = document.querySelector(".privacy-link");
  const closeBtn = document.querySelector(".close-modal");

  openLink.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex"; 
    document.body.style.overflow = "hidden"; 

    gsap.fromTo(
      modal.querySelector(".modal-content"),
      { opacity: 0, scale: 0.9, y: -50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  });

  const closeModal = () => {
    gsap.to(modal.querySelector(".modal-content"), {
      opacity: 0,
      scale: 0.9,
      y: -50,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});


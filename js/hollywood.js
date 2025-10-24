document.addEventListener("DOMContentLoaded", () => {

  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.warn("GSAP or ScrollTrigger not found!");
    return;
  }

  // Navbar logic 
  const navbar = document.getElementById("navbar");
  if (navbar) {
    gsap.set(navbar, { opacity: 1, y: 0, pointerEvents: "auto" });
  }

  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isOpen = menu.classList.contains("open");
      menu.classList.toggle("open", !isOpen);
      burger.classList.toggle("open", !isOpen);
      burger.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  // Animation for .coming section
  const comingSection = document.querySelector(".coming");
  if (!comingSection) {
    console.warn("No section with class .coming found.");
    return;
  }

  const headingEls = comingSection.querySelectorAll("h2, h3, h5");
  if (headingEls.length === 0) {
    console.warn("No h2, h3, h5 found inside .coming.");
  }


  gsap.set(headingEls, {
    y: 80,
    opacity: 0
  });


  gsap.to(headingEls, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    stagger: 0.2,
    scrollTrigger: {
      trigger: comingSection,
      start: "top 90%",  
      end: "top 50%",
      scrub: false      
    }
  });
});

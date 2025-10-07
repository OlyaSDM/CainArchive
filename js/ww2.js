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



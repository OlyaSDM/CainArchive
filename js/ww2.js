

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".grid-item:not(#ww2-text)");
  const wwText = document.getElementById("ww2-text");


  items.forEach(item => {
    const yOffset = item.classList.contains("block1") ? 80 : 40;
    gsap.set(item, { opacity: 0, y: yOffset });
  });

  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15, 
    ease: "power3.out",
  });


const wwTextEls = wwText.querySelectorAll("h2, p");

gsap.set(wwText.querySelector("h2"), {
  opacity: 0,
  x: -60,
  filter: "blur(4px)"
});

gsap.to(wwText.querySelector("h2"), {
  opacity: 1,
  x: 0,
  filter: "blur(0px)",
  duration: 0.9,
  delay: 0.5,
  ease: "power3.out"
});


gsap.set(wwText.querySelector("p"), {
  opacity: 0,
  x: 60,
  filter: "blur(4px)"
});

gsap.to(wwText.querySelector("p"), {
  opacity: 1,
  x: 0,
  filter: "blur(0px)",
  duration: 0.9,
  delay: 0.65, 
  ease: "power3.out"
});


});







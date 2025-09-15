gsap.registerPlugin(ScrollTrigger);

const collections = gsap.utils.toArray("#horizontal .collection");

gsap.to(collections, {
    xPercent: - 100 * (collections.length - 1),
    scrollTrigger: {
        trigger: "#horizontal",
        pin: true,
        scrub: 3,
        end: () => "+=" + window.innerWidth * collections.length
    }
})


// 👑 Animate overlay + texts when each collection enters viewport
collections.forEach((section) => {
  const h3 = section.querySelector("h3");
  const p = section.querySelector("p");
  const overlay = section.querySelector(".overlay");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "left center",
      toggleActions: "play none none reverse"
    }
  });

  tl.to(overlay, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  })
  .to(h3, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.3")
  .to(p, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  }, "-=0.4");
});
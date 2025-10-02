gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".panel");

gsap.set(panels[0], { y: "0%", width: "100%" });

panels.forEach((panel, i) => {
  if (i === 0) return;

  gsap.fromTo(panel,
    { y: "100%", width: "80%" },
    {
      y: "0%",
      width: "100%",
      ease: "power2.out",
      scrollTrigger: {
        trigger: panel,
        start: "top bottom", 
        end: "top top",      
        scrub: 0.3,          
      }
    }
  );
});

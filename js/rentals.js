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

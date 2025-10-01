gsap.registerPlugin(ScrollTrigger);

gsap.to(".rec-img", {
  y: 220,
  ease: "power2.out", 
  duration: 2,         
  scrollTrigger: {
    trigger: ".cain-section",
    start: "top top",
    endTrigger: ".mosaic-section",
    end: "top top",
    scrub: true 
  }
});

gsap.to(".rec1-img", {
  y: 200,
  ease: "power2.out", 
  duration: 2,         
  scrollTrigger: {
    trigger: ".cain-section",
    start: "top top",
        endTrigger: ".mosaic-section",

    end: "top top",
    scrub: true 
  }
});

gsap.to(".rec2-img", {
  rotation: 180,
  ease: "power2.out",
  duration: 2,
  scrollTrigger: {
    trigger: ".quote-two",
    start: "top 80%", 
    end: "top 50%",   
    scrub: true
  }
});


gsap.to(".rec3-img", {
  rotation: 90,
  transformOrigin: "center center",
  ease: "power2.out",
  duration: 2,
  scrollTrigger: {
    trigger: ".coll-intro",
    start: "top 70%",   
    end: "top 30%",    
    scrub: true
  }
});


gsap.to(".rec6-img", {
  y: -200,
  ease: "power2.out",  
  duration: 2,         
  scrollTrigger: {
    trigger: "#press",     
    start: "top bottom",  
    end: "bottom top",     
    scrub: true            
  }
});

gsap.to(".rec7-img", {
  y: 320,
  ease: "power2.out",  
  duration: 2,         
  scrollTrigger: {
    trigger: "#press",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});





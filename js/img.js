gsap.registerPlugin(ScrollTrigger);

gsap.to(".rec-img", {
  y: 250,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".cain-section",
    start: "top top",
    endTrigger: ".highlights-section",
    end: "top top",
    scrub: true 
  }
});

gsap.to(".rec1-img", {
  y: 200,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".highlights-section",
    start: "top bottom",
    end: "top top",
    scrub: true 
  }
});



gsap.to(".rec2-img", {
  rotation: 180,
  scrollTrigger: {
    trigger: ".quote-two",
    start: "top bottom",  
    end: "top center",    
    scrub: true
  }
});

gsap.to(".rec3-img", {
  rotation: 90,
  transformOrigin: "center center",
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".coll-intro",
    start: "top bottom",   
    end: "top center",    
    scrub: true            
  }
});

gsap.to(".rec4-img", {
  rotation: -90, 
  transformOrigin: "center center", 
  ease: "power1.out",
  scrollTrigger: {
    trigger: "#interviews",       
    start: "top bottom",           
    end: "bottom top",             
    scrub: true                   
  }
});

gsap.to(".rec5-img", {
  rotation: 90, 
  ease: "power1.out",
  scrollTrigger: {
    trigger: "#interviews",
    start: "top bottom",  
    end: "bottom top",   
    scrub: true           
  }
});

gsap.to(".rec6-img", {
  rotation: 90,
  transformOrigin: "center center",
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".contact-block",
    start: "top bottom",   
    end: "bottom top",     
    scrub: true            
  }
});







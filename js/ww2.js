

// document.addEventListener("DOMContentLoaded", () => {
//   const items = document.querySelectorAll(".grid-item:not(#ww2-text)");
//   const wwText = document.getElementById("ww2-text");


//   items.forEach(item => {
//     const yOffset = item.classList.contains("block1") ? 100 : 40;
//     gsap.set(item, { opacity: 0, y: yOffset });
//   });

//   gsap.to(items, {
//     opacity: 1,
//     y: 0,
//     duration: 0.8,
//     stagger: 0.3, 
//     ease: "power3.out",
//   });


// const wwTextEls = wwText.querySelectorAll("h2, p");

// gsap.set(wwText.querySelector("h2"), {
//   opacity: 0,
//   x: -60,
//   filter: "blur(4px)"
// });

// gsap.to(wwText.querySelector("h2"), {
//   opacity: 1,
//   x: 0,
//   filter: "blur(0px)",
//   duration: 0.9,
//   delay: 0.8,
//   ease: "power3.out"
// });


// gsap.set(wwText.querySelector("p"), {
//   opacity: 0,
//   x: 60,
//   filter: "blur(4px)"
// });

// gsap.to(wwText.querySelector("p"), {
//   opacity: 1,
//   x: 0,
//   filter: "blur(0px)",
//   duration: 0.9,
//   delay: 0.8, 
//   ease: "power3.out"
// });


// });
function animateWW2GridItems() {
  const items = document.querySelectorAll(".grid-item:not(#ww2-text)");
  const wwText = document.getElementById("ww2-text");

  // Animate grid items
  items.forEach(item => {
    const yOffset = item.classList.contains("block1") ? 100 : 40;
    gsap.set(item, { opacity: 0, y: yOffset });
  });

  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: "power3.out"
  });

  // Animate WW2 center text
  if (wwText) {
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
      delay: 0.8,
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
      delay: 0.8,
      ease: "power3.out"
    });
  }
}

function animateHeroWW2Title() {
  // Initial setup
  gsap.set(".ww2-left", { opacity: 0, x: -100 });
  gsap.set(".ww2-right", { opacity: 0, x: 100 });
  gsap.set("#ww2-hero-titile p", { opacity: 0, y: 50 });

  // Timeline for text entrance
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-ww2",
      start: "top center",
      scrub: false,
      once: true
    }
  });

  tl.to(".ww2-left", {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(".ww2-right", {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=1")
    // Animate the large paragraph first
    .to("#ww2-hero-titile .big-p", {
      opacity: 1,
      y: 0,
      duration: 1.3,
      ease: "power3.out"
    }, "-=0.4")
    // Then animate the second paragraph slightly later
    .to("#ww2-hero-titile p:not(.big-p)", {
      opacity: 1,
      y: 0,
      duration: 1.3,
      ease: "power3.out"
    }, "-=0.7");

  // Background scale effect on scroll
  gsap.to(".hero-ww2", {
    scale: 1.2,
    transformOrigin: "center center",
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-ww2",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}


function waitForSmootherWW2() {
  if (ScrollSmoother.get()) {
    animateWW2GridItems();
    animateHeroWW2Title();
  } else {
    requestAnimationFrame(waitForSmootherWW2);
  }
}

waitForSmootherWW2();


    gsap.to("body", {
      "--background": "#e7c9af",
      ease: "none",
      scrollTrigger: {
        trigger: ".breadcrumb",
        start: "top center",
        end: "bottom top",
        scrub: true,
      }
    });
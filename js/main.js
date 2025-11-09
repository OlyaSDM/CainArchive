// SCROLLTRIGGER FOR HERO SECTION

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("loaderFinished", () => {

  gsap.set([
    ".hero-content h1",
    ".hero-content h1 span",
    ".hero-content p",
    ".hero-cta",        
    ".hero-btn-text" 
    // ".scroll-btn"      
  ], {
    opacity: 0,
    x: -30
  });

  const tl = gsap.timeline({
    delay: 0.5,
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
      toggleActions: "restart none none none"
    }
  });

  // H1 + span
  tl.to([".hero-content h1", ".hero-content h1 span"], {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.4
  })
  // Paragraph
  .to(".hero-content p", {
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.out"
  }, "-=0.4")
  // Buttons (the two children you actually want to reveal)
  .to([".hero-cta", ".hero-btn-text"], {  
    opacity: 1,
    x: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.3
  }, "-=0.3");
});


// Hero Section Luxury Fade + Parallax
gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  }
})

.to(".hero-video", {
  scale: 1.2,
  // opacity: 0,
  ease: "power2.out"
}, 0);


// VIDEO FOR SMALLER SCREENS
  // const video = document.querySelector('.hero-video');
  // const source = video.querySelector('source');

  // const setResponsiveVideo = () => {
  //   const isMobile = window.innerWidth <= 480;
  //   const newSrc = isMobile ? '/video/sm-hero.MP4' : '/video/HERO.MP4';

  //   if (source.getAttribute('src') !== newSrc) {
  //     source.setAttribute('src', newSrc);
  //     video.load();
  //   }
  // };

  // setResponsiveVideo();
  // window.addEventListener('resize', setResponsiveVideo);
  
const video = document.querySelector('.hero-video');
const source = video.querySelector('source');

const setResponsiveVideo = () => {
  const isMobile = window.innerWidth <= 480;
  const newSrc = isMobile ? '/video/sm-hero.MP4' : '/video/HERO.MP4';

  if (source.getAttribute('src') !== newSrc) {
    video.pause();
    source.setAttribute('src', newSrc);
    video.load();
    video.onloadedmetadata = () => {
      video.play();
    };
  }
};

video.addEventListener('ended', () => {
  video.currentTime = 0;
  video.play();
});

setResponsiveVideo();
window.addEventListener('resize', setResponsiveVideo);




// ANIMATION FOR SCROLL DOWN BUTTON ON HERO
document.getElementById('scrollDownBtn').addEventListener('click', function () {
  const target = document.getElementById('cain-section');
  const offsetTop = target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  });
});



// QUOTE TWO, CALL-INTRO, PRESS-INTRO ANIMATIONS + BACKGROUND TRANSITIONS + COLL-P FIX

window.addEventListener("loaderFinished", () => {
  // --- Split text into letters ---
  function splitTextToLetters(el) {
    const text = el.textContent;
    el.textContent = "";
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      if (char !== " ") span.classList.add("letter-inner");
      el.appendChild(span);
    });
  }

  // --- Animate all sections with class "letter-section" ---
  document.querySelectorAll(".letter-section").forEach(section => {
    // Animate H3 headline (letter by letter)
    section.querySelectorAll("h3").forEach(h3 => {
      splitTextToLetters(h3);
      h3.style.visibility = "visible";
    });

    gsap.set(section.querySelectorAll(".letter-inner"), {
      y: "100%",
      opacity: 0
    });

    gsap.to(section.querySelectorAll(".letter-inner"), {
      y: "0%",
      opacity: 1,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 1
      }
    });

    // Animate Paragraph(s)
    // const paragraphs = section.querySelectorAll("p");
    // if (paragraphs.length) {
    //   gsap.fromTo(paragraphs,
    //     { y: 20, opacity: 0 },
    //     {
    //       y: 0,
    //       opacity: 1,
    //       duration: 1,
    //       ease: "power2.out",
    //       scrollTrigger: {
    //         trigger: section,
    //         start: "top 65%",
    //         end: "bottom 50%",
    //         scrub: 1
    //       }
    //     }
    //   );
    // }
  });

  // --- Animate .coll-p paragraph independently ---
  const collParagraph = document.querySelector(".quote-two .coll-p p");
if (collParagraph) {
  gsap.fromTo(collParagraph,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".quote-two .coll-p",
        start: "top 80%",
        end: "top 60%",
        scrub: 1
      }
    }
  );
}






  // --- Background transition between .quote-two and .mosaic-section ---
  gsap.to("body", {
    backgroundColor: "var(--sandy)",
    ease: "none",
    scrollTrigger: {
      trigger: ".quote-two",
      start: "bottom center",
      endTrigger: ".mosaic-section",
      end: "top center",
      scrub: true
    }
  });

  // --- Fade background back after .mosaic-section ---
  gsap.to("body", {
    backgroundColor: "var(--background)",
    ease: "none",
    scrollTrigger: {
      trigger: "#collections",
      start: "bottom center",
      end: "bottom top",
      scrub: true
    }
  });

  ScrollTrigger.refresh();
});



//CURSOR-TOOLTIP

const tooltip = document.querySelector(".cursor-tooltip");

let mouseX = 0, mouseY = 0;
let tooltipX = 0, tooltipY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX + 35;
  mouseY = e.clientY + 20;
});

function animateTooltip() {
  tooltipX += (mouseX - tooltipX) * 0.15;
  tooltipY += (mouseY - tooltipY) * 0.15;

  gsap.set(tooltip, {
    x: tooltipX,
    y: tooltipY
  });

  requestAnimationFrame(animateTooltip);
}
animateTooltip();

document.querySelectorAll(".coll-background").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to(tooltip, {
      opacity: 1,
      scale: 1.1,
      duration: 0.3,
      ease: "power3.out"
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(tooltip, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power3.inOut"
    });
  });
});




//ANIMATION FOR PRESS 


// gsap.set(".press-intro h3, .press-intro p", { opacity: 0, y: 100 });

// gsap.fromTo(".press-intro h3, .press-intro p",
//   { opacity: 0, y: 100 },
//   {
//     opacity: 1,
//     y: 0,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: ".press-intro",
//       start: "top 60%",
//       end: "top 30%",
//       scrub: 0.2
//     }
//   }
// );




        // Animate both sections
// animateLetterSection(".quote-two");

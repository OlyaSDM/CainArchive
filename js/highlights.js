gsap.registerPlugin(ScrollTrigger);

const navbarh = document.querySelector(".navbar");

// Make the navbar transparent immediately upon loading
navbarh.classList.add("transparent");
navbarh.classList.remove("background-visible");

function updateNavbarBackground() {
  const offsetTop = 600;    
  const offsetBottom = 600; 

  const heroBlock = document.querySelector("#hero");

  // Blocks where the background should be transparent
  const transparentBlocks = [
    heroBlock,
    document.querySelector(".highlights-section"),
    document.querySelector(".mosaic-section"),
    document.querySelector("#collections")
  ];

  // We check: if the hero is in the visible zone, it is always transparent
  if (heroBlock) {
    const rect = heroBlock.getBoundingClientRect();
    if (rect.bottom > 0) { 
      navbarh.classList.add("transparent");
      navbarh.classList.remove("background-visible");
      return; 
    }
  }

  //Let's check the remaining transparent blocks
  const inTransparentZone = transparentBlocks.some(block => {
    if (!block) return false;
    const rect = block.getBoundingClientRect();
    return (
      rect.bottom > offsetBottom &&
      rect.top < window.innerHeight - offsetTop
    );
  });

  if (inTransparentZone) {
    navbarh.classList.add("transparent");
    navbarh.classList.remove("background-visible");
  } else {
    navbarh.classList.remove("transparent");
    navbarh.classList.add("background-visible");
  }
}

window.addEventListener("scroll", updateNavbarBackground);
window.addEventListener("resize", updateNavbarBackground);

updateNavbarBackground();

// Анимация Highlights

const photos = gsap.utils.toArray('.photo');
const texts = gsap.utils.toArray('.highlight-text');
const segments = document.querySelectorAll('.si-segment');
const numSegments = segments.length;

// Adding fill to segments
segments.forEach(seg => {
  const fill = document.createElement('div');
  fill.classList.add('fill');
  seg.appendChild(fill);
});

//Initial positions of photos and text
photos.forEach((photo, i) => {
  gsap.set(photo, { yPercent: i === 0 ? 0 : 100, scale: 1, zIndex: i === 0 ? 2 : 1 });
});
texts.forEach((text, i) => {
  gsap.set(text, { yPercent: i === 0 ? 0 : 200, opacity: i === 0 ? 1 : 0 });
});

// Timeline for scrolling
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.highlights-section',
    start: 'top top',
    end: `+=${photos.length * 150}%`,
    scrub: 4,
    pin: true,
    snap: false,
    onUpdate: self => {
      const totalProgress = self.progress;
      segments.forEach((seg, i) => {
        const fill = seg.querySelector('.fill');
        const segStart = i / numSegments;
        const segEnd = (i + 1) / numSegments;
        let segProgress = (totalProgress - segStart) / (segEnd - segStart);
        segProgress = Math.min(Math.max(segProgress, 0), 1);
        fill.style.height = `${segProgress * 100}%`;
        fill.style.background = segProgress > 0 ? "#0d3b66" : "rgba(0,0,0,0.1)";
      });
    }
  }
});

// Photo and text animation
photos.forEach((photo, i) => {
  if (i === 0) return;

  const prevPhoto = photos[i - 1];
  const prevText = texts[i - 1];
  const currentText = texts[i];

  tl.to(photo, {
    yPercent: 0,
    scale: 1.2,
    zIndex: 3,
    ease: "power2.out",
    onStart: () => {
      photo.classList.add('active');
      prevPhoto.style.zIndex = 2;
    },
    onReverseComplete: () => {
      gsap.to(photo, { scale: 1, duration: 0.3, ease: "power2.inOut" });
    }
  }, i);

  tl.to(prevPhoto, { scale: 1, ease: "power2.inOut" }, i);

  tl.to(currentText, {
    yPercent: 0,
    opacity: 1,
    ease: "none",
    onStart: () => {
      currentText.classList.add('active');
      prevText.classList.remove('active');
    }
  }, i + 0.2);

  tl.to(prevText, { yPercent: -200, opacity: 0, ease: "none" }, i + 0.2);
});

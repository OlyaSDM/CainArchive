gsap.registerPlugin(ScrollTrigger);

//  Navbar 
const navbar = document.querySelector(".navbar");

navbar.classList.add("transparent");
navbar.classList.remove("background-visible");

function updateNavbarBackground() {
  const heroBlock = document.querySelector("#hero");
  const otherBlocks = [
    document.querySelector(".highlights-section"),
    document.querySelector(".gallery"),
    document.querySelector("#collections")
  ];

  const heroOffsetBottom = 900;
  const otherOffsetBottom = 500;

  if (heroBlock) {
    const rect = heroBlock.getBoundingClientRect();
    if (rect.bottom > heroOffsetBottom) {
      navbar.classList.add("transparent");
      navbar.classList.remove("background-visible");
      return; 
    }
  }

  const inOtherTransparent = otherBlocks.some(block => {
    if (!block) return false;
    const rect = block.getBoundingClientRect();
    return rect.bottom > otherOffsetBottom && rect.top < window.innerHeight - otherOffsetBottom;
  });

  if (inOtherTransparent) {
    navbar.classList.add("transparent");
    navbar.classList.remove("background-visible");
  } else {
    navbar.classList.remove("transparent");
    navbar.classList.add("background-visible");
  }
}

window.addEventListener("scroll", updateNavbarBackground);
window.addEventListener("resize", updateNavbarBackground);
updateNavbarBackground();


// Highlights Animation 
const photos = gsap.utils.toArray('.photo');
const texts = gsap.utils.toArray('.highlight-text');
const segments = document.querySelectorAll('.si-segment');
const numSegments = segments.length;

segments.forEach(seg => {
  const fill = document.createElement('div');
  fill.classList.add('fill');
  seg.appendChild(fill);
});

photos.forEach((photo, i) => {
  gsap.set(photo, { yPercent: i === 0 ? 0 : 100, scale: 1, zIndex: i === 0 ? 2 : 1 });
});
texts.forEach((text, i) => {
  gsap.set(text, { yPercent: i === 0 ? 0 : 200, opacity: i === 0 ? 1 : 0 });
});

// Timeline animation with ScrollTrigger
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.highlights-section',
    start: 'top top',
    end: `+=${photos.length * 120}%`, 
    scrub: 1.5,
    pin: true,
    onUpdate: self => {
      const progress = self.progress;

      // Animation scroll-indicator
      segments.forEach((seg, i) => {
        const fill = seg.querySelector('.fill');
        const segStart = i / numSegments;
        const segEnd = (i + 1) / numSegments;

        let segProgress = (progress - segStart) / (segEnd - segStart);
        segProgress = Math.min(Math.max(segProgress, 0), 1);

        gsap.set(fill, {
          height: `${segProgress * 100}%`,
          backgroundColor: segProgress > 0 ? "#0d3b66" : "rgba(0,0,0,0.1)"
        });
      });
    }
  }
});

// Animations for photos + text
photos.forEach((photo, i) => {
  if (i === 0) return;

  const prevPhoto = photos[i - 1];
  const prevText = texts[i - 1];
  const currentText = texts[i];

  const tweenIndex = i;

  tl.to(photo, {
    yPercent: 0,
    scale: 1.2,
    zIndex: 3,
    ease: "none",
    onStart: () => {
      photo.classList.add('active');
      prevPhoto.style.zIndex = 2;
    },
    onReverseComplete: () => {
      gsap.to(photo, { scale: 1, duration: 0.3, ease: "none" });
    }
  }, tweenIndex);

  tl.to(prevPhoto, { scale: 1, ease: "none" }, tweenIndex);

  tl.to(currentText, {
    yPercent: 0,
    opacity: 1,
    ease: "none",
    onStart: () => {
      currentText.classList.add('active');
      prevText.classList.remove('active');
    }
  }, tweenIndex + 0.2);

  tl.to(prevText, { yPercent: -90, opacity: 0, ease: "none" }, tweenIndex + 0.2);

  if (i === photos.length - 1) {
    tl.to(photo, { scale: 1.2, duration: 0.5, ease: "none" }, tweenIndex + 0.4);
  }
});

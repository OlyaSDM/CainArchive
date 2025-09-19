gsap.registerPlugin(ScrollTrigger);

const photos = gsap.utils.toArray('.photo');
const texts = gsap.utils.toArray('.highlight-text');
const segments = document.querySelectorAll('.si-segment');
const numSegments = segments.length;

// Add fill for each segment
segments.forEach(seg => {
  const fill = document.createElement('div');
  fill.classList.add('fill');
  seg.appendChild(fill);
});

// Starting positions of photos and text
photos.forEach((photo, i) => {
  gsap.set(photo, { yPercent: i === 0 ? 0 : -100, zIndex: i === 0 ? 2 : 1 });
});
texts.forEach((text, i) => {
  gsap.set(text, { yPercent: i === 0 ? 0 : 200, opacity: i === 0 ? 1 : 0 });
});

// Animation Timeline 
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.highlights-section',
    start: 'top top',
    end: `+=${(photos.length * 150) + 50}%`,
    scrub: 1,
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

        if (segProgress > 0) {
          fill.style.background = "#0d3b66"; 
        } else {
          fill.style.background = "rgba(0,0,0,0.1)"; 
        }
      });
    }
  }
});

// Photo and text animations
photos.forEach((photo, i) => {
  if (i === 0) return;

  const prevPhoto = photos[i - 1];
  const prevText = texts[i - 1];
  const currentText = texts[i];

tl.to(photo, {
  yPercent: 0,
  zIndex: 3,
  scale: 1.2,         
  ease: "power2.out",  
  onStart: () => {
    photo.classList.add('active');
    prevPhoto.style.zIndex = 2;
  },
  onReverseComplete: () => {
    gsap.to(photo, { scale: 1, duration: 0.3, ease: "power2.inOut" }); 
  }
}, i);


tl.to(prevPhoto, {
  scale: 1,
  ease: "power2.inOut"
}, i);


  tl.to(currentText, {
    yPercent: 0,
    opacity: 1,
    ease: "none",
    onStart: () => {
      currentText.classList.add('active');
      prevText.classList.remove('active');
    }
  }, i + 0.2);

  tl.to(prevText, {
    yPercent: -200,
    opacity: 0,
    ease: "none"
  }, i + 0.2);
});


// Scroll Zoom Effect on Active Photo in Highlights Section
gsap.to(".photo-stack .photo.active", {
  scale: 1.1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".highlights-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  }
});

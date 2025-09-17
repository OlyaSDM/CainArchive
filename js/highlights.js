gsap.registerPlugin(ScrollTrigger);

const photos = gsap.utils.toArray('.photo');
const texts = gsap.utils.toArray('.highlight-text');

// Starting positions
photos.forEach((photo, i) => {
  gsap.set(photo, { yPercent: i === 0 ? 0 : -100, zIndex: i === 0 ? 2 : 1 });
  if (i === 0) photo.classList.add('active');
});

texts.forEach((text, i) => {
  gsap.set(text, { yPercent: i === 0 ? 0 : 200, opacity: i === 0 ? 1 : 0 });
  if (i === 0) text.classList.add('active');
});

// Timeline with pin and snap
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.highlights-section',
    start: 'top top',
    end: `+=${photos.length * 200}%`, 
    scrub: 8,                        
    pin: true,
    snap: 1 / (photos.length - 1)
  }
});

// Photo + text animation
photos.forEach((photo, i) => {
  if (i === 0) return;

  const prevPhoto = photos[i - 1];
  const prevText = texts[i - 1];
  const currentText = texts[i];

  // The photo enters from above
  tl.to(photo, {
    yPercent: 0,
    zIndex: 3,
    ease: "none",
    onStart: () => {
      photo.classList.add('active');
      prevPhoto.style.zIndex = 2;
    }
  }, i);

  // Text appears below
  tl.to(currentText, {
    yPercent: 0,
    opacity: 1,
    ease: "none",
    onStart: () => {
      currentText.classList.add('active');
      prevText.classList.remove('active');
    }
  }, i + 0.2);

  // Old text goes up
  tl.to(prevText, {
    yPercent: -200,
    opacity: 0,
    ease: "none"
  }, i + 0.2);
});


 tl.to({}, { duration: 1.2 });

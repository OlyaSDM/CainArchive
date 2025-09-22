gsap.registerPlugin(ScrollTrigger);

const gallery = document.querySelector('.gallery');
const galleryHeight = window.innerHeight;
const scrollDuration = galleryHeight * 3;

const item1 = document.querySelector('.item1');
const item1OldImg = item1.querySelector('img:first-child');
const item1NewImg = item1.querySelector('img:last-child');

// === Track scroll direction ===
let lastScrollY = window.scrollY;

function getScrub(el) {
  const currentScroll = window.scrollY;
  let scrubValue = 3.5; 

  if(currentScroll < lastScrollY && el === item1) {
    scrubValue = 4; 
  }

  lastScrollY = currentScroll;
  return scrubValue;
}

// === Animate other gallery items ===
const otherItems = gsap.utils.toArray('.gallery .item:not(.item1)');
otherItems.forEach(el => {
  const target = el.querySelector('.inner') || el;
  let x = 0, y = 0;

  if(el.classList.contains('item2')) { x = '-50vw'; y = '-50vh'; }
  if(el.classList.contains('item3')) { x = '50vw'; y = '-50vh'; }
  if(el.classList.contains('item4')) { x = '-60vw'; y = '-30vh'; }
  if(el.classList.contains('item4b')) { x = '-40vw'; y = '-30vh'; }
  if(el.classList.contains('item5')) { x = '50vw'; y = '50vh'; }

  gsap.to(target, {
    scrollTrigger: {
      trigger: '.gallery',
      start: 'top top',
      end: `+=${scrollDuration}`,
      scrub: 2.5
    },
    x,
    y,
    opacity: 0,
    ease: "power1.out"
  });
});

// === Pin and scale item1 with delay when scrolling up ===
gsap.to(item1, {
  scrollTrigger: {
    trigger: '.gallery',
    start: 'top top',
    end: `+=${scrollDuration + 500}`,
    scrub: () => getScrub(item1),
    pin: true
  },
  width: '100vw',
  height: gallery.scrollHeight + 'px',
  x: () => {
    return window.innerWidth <= 750 ? '-2.4%' : '-0.6%';
  },
  y: 0,
  ease: 'power1.out'
});



// === Image transition in item1 ===
gsap.timeline({
  scrollTrigger: {
    trigger: '.gallery',
    start: 'top top+=100',
    end: `top top+=${scrollDuration * 1.5}`,
    scrub: () => getScrub(item1)
  }
})
.to(item1OldImg, { opacity: 0, scale: 1.05, ease: "power2.out" }, 0)
.fromTo(item1NewImg, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, ease: "power2.out" }, 0);

// === Animate new items ===
const newItems = gsap.utils.toArray('.item6, .item7, .item8, .item9');
newItems.forEach(el => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: '.gallery',
      start: 'top top',
      end: `+=${scrollDuration}`,
      scrub: 1.5
    },
    y: '50vh',
    opacity: 0,
    ease: "power1.out"
  });
});

// === Parallax effect for all images ===
const parallaxItems = gsap.utils.toArray('.gallery .item img');
parallaxItems.forEach(img => {
  gsap.to(img, {
    scrollTrigger: {
      trigger: img,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    y: '-10vh',
    ease: 'none'
  });
});

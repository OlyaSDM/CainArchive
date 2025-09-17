// // gsap.registerPlugin(ScrollTrigger);

// // window.addEventListener("load", () => {
// //    const cosmosGroups = document.querySelectorAll(".cosmos");
// //    const allItems = [];
// //    const wanderTweens = new Map();
// //    let active = false;
// //    let lastIndex = -1;
// //    let focusTween = null;
// //    let focusActive = false;

// //    const heroText = document.querySelector(".hero-text");

// //    //timeline for text - easier to restart 
// //    const heroTextTimeline = gsap.timeline({
// //          paused: true
// //       })
// //       .fromTo(heroText ?? ".hero-text", {
// //          opacity: 0,
// //          scale: 0.2
// //       }, {
// //          opacity: 1,
// //          scale: 1,
// //          duration: 2.5,
// //          ease: "power2.out"
// //       });

// //    // Hide the text immediately (start state)
// //    if (heroText) gsap.set(heroText, {
// //       opacity: 0,
// //       scale: 0.2
// //    });

// //    // Initializing a photo
// //    cosmosGroups.forEach(group => {
// //       group.querySelectorAll(".cosmic-item").forEach(item => {
// //          const inner = item.querySelector(".cosmic-inner");
// //          if (!inner) return;

// //          gsap.set(inner, {
// //             x: window.innerWidth / 2,
// //             y: window.innerHeight / 2,
// //             scale: 0,
// //             opacity: 0,
// //             zIndex: 1,
// //             transformOrigin: "center center",
// //          });

// //          allItems.push(inner);
// //       });
// //    });

// //    // Vortex
// //    const startWander = (item) => {
// //       const t = gsap.to(item, {
// //          x: () => (Math.random() - 0.5) * window.innerWidth * 1.4,
// //          y: () => (Math.random() - 0.5) * window.innerHeight * 1.4,
// //          duration: 4 + Math.random() * 3,
// //          ease: "sine.inOut",
// //          repeat: -8,
// //          yoyo: true,
// //       });
// //       wanderTweens.set(item, t);
// //    };

// //    // Approaching the center
// //    const focusNext = () => {
// //       if (!active || focusActive || allItems.length === 0) return;
// //       focusActive = true;

// //       let randomIndex;
// //       do {
// //          randomIndex = Math.floor(Math.random() * allItems.length);
// //       }
// //       while (randomIndex === lastIndex && allItems.length > 1);
// //       lastIndex = randomIndex;

// //       const item = allItems[randomIndex];
// //       const wt = wanderTweens.get(item);
// //       if (wt) wt.kill();

// //       allItems.forEach(i => {
// //          if (i !== item) gsap.to(i, {
// //             scale: 0.5,
// //             zIndex: 1,
// //             duration: 0.5
// //          });
// //       });

// //       const rect = item.getBoundingClientRect();

// //       // Center X based on width
// //       const viewportCenterX = window.innerWidth > 1200 ?
// //          window.innerWidth / 1.6 // a little to the right on larger screens
// //          :
// //          window.innerWidth / 2; // exactly in the center at <=1200px

// //       const viewportCenterY = window.innerHeight / 2;

// //       // For small screens, move the photo below the text
// //       const textHeight = heroText ? heroText.offsetHeight : 0;
// //       const safeTop = textHeight + 20;
// //       const safeBottom = window.innerHeight - 50;
// //       let targetY = viewportCenterY;
// //       if (window.innerWidth < 768) {
// //          targetY = Math.max(safeTop, viewportCenterY);
// //          targetY = Math.min(targetY, safeBottom);
// //       }

// //       const deltaX = viewportCenterX - (rect.left + rect.width / 2);
// //       const deltaY = targetY - (rect.top + rect.height / 2);

// //       // Scale to fit different screen sizes
// //       let scaleValue;
// //       if (window.innerWidth >= 1200) scaleValue = 4.2;
// //       else if (window.innerWidth >= 768) scaleValue = 5.2;
// //       else scaleValue = 6.5;

// //       focusTween = gsap.to(item, {
// //          x: `+=${deltaX}`,
// //          y: `+=${deltaY}`,
// //          scale: scaleValue,
// //          zIndex: 1000,
// //          duration: 3,
// //          ease: "power3.out",
// //          onComplete: () => {
// //             gsap.delayedCall(1, () => {
// //                focusTween = gsap.to(item, {
// //                   x: Math.random() * window.innerWidth,
// //                   y: Math.random() * window.innerHeight,
// //                   scale: 0.5,
// //                   zIndex: 1,
// //                   duration: 2,
// //                   ease: "power2.inOut",
// //                   onComplete: () => {
// //                      startWander(item);
// //                      focusActive = false;
// //                      if (active) focusNext();
// //                   },
// //                });
// //             });
// //          },
// //       });
// //    };

// //    // Scene start function (used in both onEnter and onEnterBack)
// //    function startScene() {
// //       active = true;

// //       //Let's make sure the old twins are killed
// //       wanderTweens.forEach(t => t.kill());
// //       wanderTweens.clear();
// //       if (focusTween) {
// //          focusTween.kill();
// //          focusTween = null;
// //          focusActive = false;
// //       }

// //       // Reset positions and visibility
// //       allItems.forEach(item => {
// //          gsap.set(item, {
// //             x: Math.random() * window.innerWidth,
// //             y: Math.random() * window.innerHeight,
// //             scale: 0.5,
// //             opacity: 0,
// //             zIndex: 1,
// //          });
// //       });

// //       // We launch a vortex and make photos visible
// //       gsap.delayedCall(0.1, () => {
// //          allItems.forEach(item => {
// //             startWander(item);
// //             gsap.to(item, {
// //                opacity: 1,
// //                duration: 1.2,
// //                ease: "power1.out"
// //             });
// //          });
// //       });

// //       // We start the focus in 4 seconds
// //       gsap.delayedCall(4, () => {
// //          if (active) focusNext();
// //       });

// //       // Restarting text animation from scratch
// //       if (heroText) heroTextTimeline.restart(true);
// //    }

// //    // Scene stop function (when going up/down)
// //    function stopScene() {
// //       active = false;

// //       // Hide photos and kill twins
// //       gsap.to(allItems, {
// //          opacity: 0,
// //          duration: 0.5,
// //          stagger: 0.02
// //       });
// //       wanderTweens.forEach(t => t.kill());
// //       wanderTweens.clear();

// //       if (focusTween) {
// //          focusTween.kill();
// //          focusTween = null;
// //       }
// //       focusActive = false;

// //       // Reset the text to its initial state (so that when you log in again it starts over)
// //       if (heroText) gsap.set(heroText, {
// //          opacity: 0,
// //          scale: 0.2
// //       });
// //    }

// //    // ScrollTrigger - now use onEnter and onEnterBack to repeat when scrolling up
// //    ScrollTrigger.create({
// //       trigger: ".container",
// //       start: "top bottom",
// //       end: "bottom top",
// //       onEnter: () => startScene(),
// //       onEnterBack: () => startScene(),
// //       onLeaveBack: () => stopScene(),
// //       onLeave: () => stopScene(),
// //    });

// //    // Update on resize
// //    window.addEventListener("resize", () => {
// //       allItems.forEach(item => {
// //          gsap.set(item, {
// //             x: Math.random() * window.innerWidth,
// //             y: Math.random() * window.innerHeight,
// //          });
// //       });
// //    });
// // });





gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// --- Column Animation ---
const leftCol = document.querySelector(".column.left .column-inner") || document.querySelector(".column.left");
const middleCol = document.querySelector(".column.middle .column-inner");
const rightCol = document.querySelector(".column.right .column-inner");

const leftAnim = gsap.to(leftCol, { y: -leftCol.scrollHeight / 4, duration: 18, ease: "linear", repeat: -1 });
const middleAnim = gsap.to(middleCol, { y: -middleCol.scrollHeight / 4, duration: 18, ease: "linear", repeat: -1 });
const rightAnim = gsap.to(rightCol, { y: -rightCol.scrollHeight / 4, duration: 18, ease: "linear", repeat: -1 });

ScrollTrigger.create({
  trigger: ".mosaic-section",
  start: "top top",
  end: "bottom bottom",
  onUpdate: self => {
    const dir = self.direction;
    leftAnim.timeScale(dir === 1 ? 1 : -1);
    middleAnim.timeScale(dir === 1 ? -1 : 1);
    rightAnim.timeScale(dir === 1 ? 1 : -1);
  }
});

// Overlay 
(function() {
  const overlay = document.querySelector('.mosaic-overlay');
  if(!overlay) return;

  const overlayText = overlay.querySelector('.overlay-text');
  const overlayPhoto = overlay.querySelector('.overlay-photo'); 
  if(!overlayText) return;

  let overlayTimer = null;

  // First, hide the overlay completely
  gsap.set(overlay, {opacity: 0, pointerEvents: 'none'});
  gsap.set(overlayText, {opacity: 0, y: 30});
  if(overlayPhoto) gsap.set(overlayPhoto, {opacity: 0, scale: 0.9});

  const showOverlay = () => {
    gsap.to(overlay, {opacity: 1, pointerEvents: 'auto', duration: 0.8, ease: 'power2.out'});
    gsap.to(overlayText, {opacity: 1, y: 0, duration: 1, ease: 'power3.out'});
    if(overlayPhoto) gsap.to(overlayPhoto, {opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out', delay: 0.3});
    startHideTimer();
  };

  const hideOverlay = () => {
    gsap.to(overlay, {opacity: 0, pointerEvents: 'none', duration: 1.2, ease: 'power2.inOut'});
  };

  const startHideTimer = () => {
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(hideOverlay, 6000);
  };

  // SscrollTrigger to show/hide the overlay
  const mosaicSection = document.querySelector('.mosaic-section');
  if(!mosaicSection) return;

  ScrollTrigger.create({
    trigger: mosaicSection,
    start: 'top center',
    end: 'bottom top',
    onEnter: () => showOverlay(),      
    onEnterBack: () => showOverlay()   
  });
})();







































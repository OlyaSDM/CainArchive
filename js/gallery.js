// gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// // --- Column Animation ---
// const leftCol = document.querySelector(".column.left .column-inner") || document.querySelector(".column.left");
// const middleCol = document.querySelector(".column.middle .column-inner");
// const rightCol = document.querySelector(".column.right .column-inner");

// const leftAnim = gsap.to(leftCol, { y: -leftCol.scrollHeight / 4, duration: 18, ease: "linear", repeat: -1 });
// const middleAnim = gsap.to(middleCol, { y: -middleCol.scrollHeight / 4, duration: 18, ease: "linear", repeat: -1 });
// const rightAnim = gsap.to(rightCol, { y: -rightCol.scrollHeight / 4, duration: 18, ease: "linear", repeat: -1 });

// ScrollTrigger.create({
//   trigger: ".mosaic-section",
//   start: "top top",
//   end: "bottom bottom",
//   onUpdate: self => {
//     if (window.innerWidth > 768) {
//       const dir = self.direction;
//       leftAnim.timeScale(dir === 1 ? 1 : -1);
//       middleAnim.timeScale(dir === 1 ? -1 : 1);
//       rightAnim.timeScale(dir === 1 ? 1 : -1);
//     } else {
//       leftAnim.timeScale(1);
//       middleAnim.timeScale(-1);
//       rightAnim.timeScale(1);
//     }
//   }
// });

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", initMosaicAnimation);

function initMosaicAnimation() {
  const leftCol = document.querySelector(".column.left .column-inner") || document.querySelector(".column.left");
  const middleCol = document.querySelector(".column.middle .column-inner");
  const rightCol = document.querySelector(".column.right .column-inner");

  if (!leftCol || !middleCol || !rightCol) return;

  const DURATION = 30; 
  const cols = [
    { el: leftCol, dirFactor:  1, offset: 0, height: 0, shift: 0, speed: 0 },
    { el: middleCol, dirFactor:-1, offset: 0, height: 0, shift: 0, speed: 0 },
    { el: rightCol, dirFactor: 1, offset: 0, height: 0, shift: 0, speed: 0 }
  ];

  function updateSizes() {
    cols.forEach(c => {
      c.height = c.el.scrollHeight || 1;
      c.shift = Math.max(1, c.height / 4);        
      c.speed = c.shift / DURATION;               
      c.offset = ((c.offset % c.shift) + c.shift) % c.shift; 
      c.offset = c.offset === 0 ? 0 : c.offset - c.shift;
    });
  }
  updateSizes();

  let targetDir = 1;   
  let currentDir = 1;

  ScrollTrigger.create({
    trigger: ".mosaic-section",
    start: "top top",
    end: "bottom bottom",
    onUpdate(self) {
      if (window.innerWidth > 768) {
        targetDir = self.direction === 1 ? 1 : -1;
      } else {
        targetDir = 1; 
      }
    }
  });

  let last = performance.now();
  gsap.ticker.add(() => {
    const now = performance.now();
    const dt = Math.max(0, (now - last) / 1000); 
    last = now;

    const responsiveness = Math.min(1, dt * 12); 
    currentDir += (targetDir - currentDir) * responsiveness;

    cols.forEach(c => {

      c.offset += - currentDir * c.dirFactor * c.speed * dt;

      if (c.offset <= -c.shift) c.offset += c.shift;
      if (c.offset > 0) c.offset -= c.shift;

      gsap.set(c.el, { y: Math.round(c.offset) });
    });
  });

  let resizeId;
  window.addEventListener("resize", () => {
    clearTimeout(resizeId);
    resizeId = setTimeout(() => {
      updateSizes();
      ScrollTrigger.refresh();
    }, 120);
  });
}

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  requestAnimationFrame(initMosaicAnimation);
});

function initMosaicAnimation() {
  const leftCol = document.querySelector(".column.left .column-inner") || document.querySelector(".column.left");
  const middleCol = document.querySelector(".column.middle .column-inner");
  const rightCol = document.querySelector(".column.right .column-inner");

  if (!leftCol || !middleCol || !rightCol) return;

  const DURATION = 60; 
  const cols = [
    { el: leftCol, dirFactor: 1, offset: 0, shift: 0, speed: 0 },
    { el: middleCol, dirFactor: -1, offset: 0, shift: 0, speed: 0 },
    { el: rightCol, dirFactor: 1, offset: 0, shift: 0, speed: 0 },
  ];

  cols.forEach(c => {
    c.el.style.willChange = "transform";
    c.el.style.transform = "translateZ(0)";
  });

  function updateSizes() {
    cols.forEach(c => {
      const h = c.el.scrollHeight || 1;
      c.shift = h / 3.5; 
      c.speed = c.shift / DURATION; 
      c.offset = 0;
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
      targetDir = window.innerWidth > 768 ? (self.direction === 1 ? 1 : -1) : 1;
    },
  });

  gsap.ticker.fps(30);

  let lastTime = performance.now();

  gsap.ticker.add(() => {
    const now = performance.now();
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    currentDir += (targetDir - currentDir) * 0.15;

    cols.forEach(c => {
      c.offset += -currentDir * c.dirFactor * c.speed * dt;

      if (c.offset <= -c.shift) c.offset += c.shift;
      if (c.offset > 0) c.offset -= c.shift;

      gsap.set(c.el, { y: c.offset });
    });
  });

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateSizes();
      ScrollTrigger.refresh();
    }, 200);
  });
}

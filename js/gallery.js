gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  requestAnimationFrame(initMosaicAnimation);
});

function initMosaicAnimation() {
  const leftCol = document.querySelector(".column.left");
  const middleCol = document.querySelector(".column.middle");
  const rightCol = document.querySelector(".column.right");

  if (!leftCol || !middleCol || !rightCol) return;

  const images = Array.from({ length: 30 }, (_, i) => `/img/gallery/${i + 1}.webp`);

  const cols = [
    { el: leftCol, dirFactor: 1, imgs: images.filter((_, i) => i % 3 === 0) },
    { el: middleCol, dirFactor: -1, imgs: images.filter((_, i) => i % 3 === 1) },
    { el: rightCol, dirFactor: 1, imgs: images.filter((_, i) => i % 3 === 2) },
  ];

  cols.forEach(c => {
    const totalImages = [...c.imgs, ...c.imgs];
    const fragment = document.createDocumentFragment();

    totalImages.forEach((src, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";

      const imgTag = document.createElement("img");
      imgTag.src = src;
      imgTag.alt = "photo";
      imgTag.loading = index < 3 ? "eager" : "lazy";
      if (index < 3) imgTag.setAttribute("fetchpriority", "high");

      const watermark = document.createElement("div");
      watermark.className = "watermark";
      watermark.textContent = "© CainArchive";

      wrapper.append(imgTag, watermark);
      fragment.appendChild(wrapper);
    });

    c.el.appendChild(fragment);
    c.el.style.willChange = "transform";
    c.el.style.transform = "translate3d(0,0,0)";
    c.el.offset = 0;
  });

  let targetDir = 1;
  let currentDir = 1;
  const SPEED = 25; 

  ScrollTrigger.create({
    trigger: ".mosaic-section",
    start: "top top",
    end: "bottom bottom",
    scrub: false,
    onUpdate(self) {
      if (window.innerWidth > 768) {
        targetDir = self.direction === 1 ? 1 : -1;
      } else {
        targetDir = 1;
      }
    },
  });

  let lastTime = performance.now();
  const frameInterval = 1000 / 30; 

  function animate(now) {
    const delta = now - lastTime;
    if (delta < frameInterval) {
      requestAnimationFrame(animate);
      return;
    }
    lastTime = now;

    currentDir += (targetDir - currentDir) * 0.1;

    cols.forEach(c => {
      const el = c.el;
      el.offset += -currentDir * c.dirFactor * SPEED * (delta / 1000);

      const shift = el.scrollHeight / 2;
      if (el.offset <= -shift) el.offset += shift;
      if (el.offset >= 0) el.offset -= shift;

      el.style.transform = `translate3d(0, ${el.offset}px, 0)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  window.addEventListener("resize", () => {
    cols.forEach(c => (c.el.offset = c.el.offset || 0));
    ScrollTrigger.refresh();
  });
}

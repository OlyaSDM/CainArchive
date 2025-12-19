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
    totalImages.forEach((src, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";

      const imgTag = document.createElement("img");
      imgTag.src = src;
      imgTag.alt = "photo";
      imgTag.loading = index < 3 ? "eager" : "lazy";
      if (index < 3) imgTag.setAttribute("fetchpriority", "high");

      wrapper.appendChild(imgTag);
      wrapper.insertAdjacentHTML("beforeend", '<div class="watermark">© CainArchive</div>');

      c.el.appendChild(wrapper);
    });

    c.el.offset = 0;
    c.el.shift = c.el.scrollHeight / 2;

    c.el.style.willChange = "transform";
    c.el.style.transform = "translateZ(0)";
  });

  let targetDir = 1;
  let currentDir = 1;

  const SPEED = window.innerWidth <= 768 ? 20 : 50; 

  let ready = false;
  setTimeout(() => { ready = true; }, 100);

  if (window.innerWidth > 768) {
    ScrollTrigger.create({
      trigger: ".mosaic-section",
      start: "top top",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      onUpdate(self) {
        targetDir = self.direction === 1 ? 1 : -1;
      },
    });
  }

  gsap.ticker.fps(30);

  let lastTime = performance.now();

  gsap.ticker.add(() => {
    if (!ready) return; 

    const now = performance.now();
    const dt = (now - lastTime) / 1000;
    lastTime = now;

    currentDir += (targetDir - currentDir) * 0.15;

    cols.forEach(c => {
      c.el.offset += -currentDir * c.dirFactor * SPEED * dt;
      const shift = c.el.shift;

      if (c.el.offset <= -shift) c.el.offset += shift;
      if (c.el.offset > 0) c.el.offset -= shift;

      gsap.set(c.el, { y: c.el.offset });
    });
  });

  window.addEventListener("resize", () => {
    cols.forEach(c => {
      c.el.offset = 0;
      c.el.shift = c.el.scrollHeight / 2;
    });
    ScrollTrigger.refresh();
  });
}

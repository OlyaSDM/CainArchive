// gsap.registerPlugin(ScrollTrigger);

// window.addEventListener("load", () => {
//   requestAnimationFrame(initMosaicAnimation);
// });

// function initMosaicAnimation() {
//   const leftCol = document.querySelector(".column.left");
//   const middleCol = document.querySelector(".column.middle");
//   const rightCol = document.querySelector(".column.right");

//   if (!leftCol || !middleCol || !rightCol) return;

//   const images = [
//     "/img/gallery/1.webp", "/img/gallery/2.webp", "/img/gallery/3.webp",
//     "/img/gallery/4.webp", "/img/gallery/5.webp", "/img/gallery/6.webp",
//     "/img/gallery/7.webp", "/img/gallery/8.webp", "/img/gallery/9.webp",
//     "/img/gallery/10.webp", "/img/gallery/11.webp", "/img/gallery/12.webp",
//     "/img/gallery/13.webp", "/img/gallery/14.webp", "/img/gallery/15.webp",
//     "/img/gallery/16.webp", "/img/gallery/17.webp", "/img/gallery/18.webp",
//     "/img/gallery/19.webp", "/img/gallery/20.webp", "/img/gallery/21.webp",
//     "/img/gallery/22.webp", "/img/gallery/23.webp", "/img/gallery/24.webp",
//     "/img/gallery/25.webp", "/img/gallery/26.webp", "/img/gallery/27.webp",
//     "/img/gallery/28.webp", "/img/gallery/29.webp", "/img/gallery/30.webp"
//   ];

//   const cols = [
//     { el: leftCol, dirFactor: 1, imgs: images.filter((_, i) => i % 3 === 0) },
//     { el: middleCol, dirFactor: -1, imgs: images.filter((_, i) => i % 3 === 1) },
//     { el: rightCol, dirFactor: 1, imgs: images.filter((_, i) => i % 3 === 2) },
//   ];

//   // Оптимизация: загрузка изображений с высоким приоритетом для LCP
//   cols.forEach(c => {
//     const totalImages = [...c.imgs, ...c.imgs]; // Дублируем для бесконечной прокрутки
//     totalImages.forEach((src, index) => {
//       const wrapper = document.createElement("div");
//       wrapper.className = "image-wrapper";
      
//       // Если это первое изображение в каждой колонке (LCP), делаем его с высоким приоритетом
//       const imgTag = document.createElement("img");
//       imgTag.src = src;
//       imgTag.alt = "photo";
//       imgTag.loading = index < 3 ? "eager" : "lazy"; // Первые изображения сразу, остальные — лениво
//       if (index < 3) imgTag.setAttribute("fetchpriority", "high"); // Устанавливаем fetchpriority для LCP

//       wrapper.appendChild(imgTag);
//       wrapper.innerHTML += '<div class="watermark">© CainArchive</div>';
//       c.el.appendChild(wrapper);
//     });

//     // Применение стилей для ускорения рендеринга
//     c.el.style.willChange = "transform";
//     c.el.style.transform = "translateZ(0)";
//   });

//   let targetDir = 1;
//   let currentDir = 1;

//   const SPEED = 50;

//   // ScrollTrigger обновляется для каждого скролла
//   ScrollTrigger.create({
//     trigger: ".mosaic-section",
//     start: "top top",
//     end: "bottom bottom",
//     invalidateOnRefresh: true, // Обновляем размеры при изменении окна
//     onUpdate(self) {
//       targetDir = window.innerWidth > 768 ? (self.direction === 1 ? 1 : -1) : 1;
//     },
//   });

//   // Снижаем частоту обновлений до 30 fps для производительности
//   gsap.ticker.fps(30); // Снижение до 30 fps для экономии ресурсов

//   let lastTime = performance.now();

//   gsap.ticker.add(() => {
//     const now = performance.now();
//     const dt = Math.min(0.05, (now - lastTime) / 1000); // Ограничиваем изменение времени
//     lastTime = now;

//     currentDir += (targetDir - currentDir) * 0.15;

//     cols.forEach(c => {
//       c.el.offset = (c.el.offset || 0) + -currentDir * c.dirFactor * SPEED * dt;
//       const shift = c.el.scrollHeight / 2;

//       // Бесконечная прокрутка
//       if (c.el.offset <= -shift) c.el.offset += shift;
//       if (c.el.offset > 0) c.el.offset -= shift;

//       gsap.set(c.el, { y: c.el.offset });
//     });
//   });

//   // Обновление размеров при изменении окна
//   window.addEventListener("resize", () => {
//     cols.forEach(c => {
//       c.el.offset = c.el.offset || 0;
//     });
//     ScrollTrigger.refresh(); // Пересчёт размеров ScrollTrigger
//   });
// }



gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  initMosaicAnimation();
});

function initMosaicAnimation() {
  const leftCol = document.querySelector(".column.left");
  const middleCol = document.querySelector(".column.middle");
  const rightCol = document.querySelector(".column.right");

  if (!leftCol || !middleCol || !rightCol) return;

  const images = [
    "/img/gallery/1.webp","/img/gallery/2.webp","/img/gallery/3.webp",
    "/img/gallery/4.webp","/img/gallery/5.webp","/img/gallery/6.webp",
    "/img/gallery/7.webp","/img/gallery/8.webp","/img/gallery/9.webp",
    "/img/gallery/10.webp","/img/gallery/11.webp","/img/gallery/12.webp",
    "/img/gallery/13.webp","/img/gallery/14.webp","/img/gallery/15.webp",
    "/img/gallery/16.webp","/img/gallery/17.webp","/img/gallery/18.webp",
    "/img/gallery/19.webp","/img/gallery/20.webp","/img/gallery/21.webp",
    "/img/gallery/22.webp","/img/gallery/23.webp","/img/gallery/24.webp",
    "/img/gallery/25.webp","/img/gallery/26.webp","/img/gallery/27.webp",
    "/img/gallery/28.webp","/img/gallery/29.webp","/img/gallery/30.webp"
  ];

  const cols = [
    { el: leftCol, imgs: images.filter((_, i) => i % 3 === 0), dir: "normal" },
    { el: middleCol, imgs: images.filter((_, i) => i % 3 === 1), dir: "reverse" },
    { el: rightCol, imgs: images.filter((_, i) => i % 3 === 2), dir: "normal" },
  ];

  // Добавляем изображения в колонки
  cols.forEach(c => {
    const totalImages = [...c.imgs, ...c.imgs]; // дублируем для бесконечной прокрутки
    totalImages.forEach((src, idx) => {
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";

      const img = document.createElement("img");
      img.src = src;
      img.alt = "photo";
      img.loading = idx < 2 ? "eager" : "lazy";
      if(idx < 2) img.setAttribute("fetchpriority", "high");

      wrapper.appendChild(img);

      const watermark = document.createElement("div");
      watermark.className = "watermark";
      watermark.textContent = "© CainArchive";
      wrapper.appendChild(watermark);

      c.el.appendChild(wrapper);
    });

    // Устанавливаем начальное направление анимации
    c.el.style.animationDirection = c.dir;
  });

  // ScrollTrigger для смены направления при скролле (если нужно)
  ScrollTrigger.create({
    trigger: ".mosaic-section",
    start: "top top",
    end: "bottom bottom",
    onUpdate: self => {
      const dirFactor = self.direction === 1 ? 1 : -1;
      cols.forEach(c => {
        // левая и правая: normal/reverse, средняя — противоположно
        if(c.el.classList.contains("middle")) {
          c.el.style.animationDirection = dirFactor === 1 ? "reverse" : "normal";
        } else {
          c.el.style.animationDirection = dirFactor === 1 ? "normal" : "reverse";
        }
      });
    }
  });
}

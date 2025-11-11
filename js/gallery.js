 gsap.registerPlugin(ScrollTrigger);

 window.addEventListener("load", () => {
   requestAnimationFrame(initMosaicAnimation);
 });

 function initMosaicAnimation() {
   const leftCol = document.querySelector(".column.left");
   const middleCol = document.querySelector(".column.middle");
   const rightCol = document.querySelector(".column.right");

   if (!leftCol || !middleCol || !rightCol) return;

   const images = [
     "/img/gallery/1.webp", "/img/gallery/2.webp", "/img/gallery/3.webp",
     "/img/gallery/4.webp", "/img/gallery/5.webp", "/img/gallery/6.webp",
     "/img/gallery/7.webp", "/img/gallery/8.webp", "/img/gallery/9.webp",
     "/img/gallery/10.webp", "/img/gallery/11.webp", "/img/gallery/12.webp",
     "/img/gallery/13.webp", "/img/gallery/14.webp", "/img/gallery/15.webp",
     "/img/gallery/16.webp", "/img/gallery/17.webp", "/img/gallery/18.webp",
     "/img/gallery/19.webp", "/img/gallery/20.webp", "/img/gallery/21.webp",
     "/img/gallery/22.webp", "/img/gallery/23.webp", "/img/gallery/24.webp",
     "/img/gallery/25.webp", "/img/gallery/26.webp", "/img/gallery/27.webp",
     "/img/gallery/28.webp", "/img/gallery/29.webp", "/img/gallery/30.webp"
   ];

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
       wrapper.innerHTML += '<div class="watermark">© CainArchive</div>';
       c.el.appendChild(wrapper);
     });

     c.el.style.willChange = "transform";
     c.el.style.transform = "translateZ(0)";
   });

   let targetDir = 1;
   let currentDir = 1;

   const SPEED = 50;

   ScrollTrigger.create({
     trigger: ".mosaic-section",
     start: "top top",
     end: "bottom bottom",
     invalidateOnRefresh: true,  
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
       c.el.offset = (c.el.offset || 0) + -currentDir * c.dirFactor * SPEED * dt;
       const shift = c.el.scrollHeight / 2;

       if (c.el.offset <= -shift) c.el.offset += shift;
       if (c.el.offset > 0) c.el.offset -= shift;

       gsap.set(c.el, { y: c.el.offset });
     });
   });

   window.addEventListener("resize", () => {
     cols.forEach(c => {
       c.el.offset = c.el.offset || 0;
     });
     ScrollTrigger.refresh(); 
   });
 }

ф
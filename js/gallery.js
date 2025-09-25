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
    if (window.innerWidth > 768) {
      const dir = self.direction;
      leftAnim.timeScale(dir === 1 ? 1 : -1);
      middleAnim.timeScale(dir === 1 ? -1 : 1);
      rightAnim.timeScale(dir === 1 ? 1 : -1);
    } else {
      leftAnim.timeScale(1);
      middleAnim.timeScale(-1);
      rightAnim.timeScale(1);
    }
  }
});
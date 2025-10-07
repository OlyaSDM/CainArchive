// Navbar
const navbarg = document.querySelector(".navbar");
let isHighlightsActive = false; 

function updateNavbarBackground() {
  if (isHighlightsActive) return;

  const heroBlock = document.querySelector("#hero");
  const otherBlocks = [
    document.querySelector("#collections")
  ];

  const heroOffsetBottom = 900;
  const otherOffsetBottom = 500;

  let forceTransparent = false;

  if (heroBlock) {
    const rect = heroBlock.getBoundingClientRect();
    if (rect.bottom > heroOffsetBottom) {
      forceTransparent = true;
    }
  }

  const inOtherTransparent = otherBlocks.some(block => {
    if (!block) return false;
    const rect = block.getBoundingClientRect();
    return rect.bottom > otherOffsetBottom && rect.top < window.innerHeight - otherOffsetBottom;
  });

  if (inOtherTransparent) forceTransparent = true;

  const scrolled = window.scrollY > 50;

  if (forceTransparent) {
    navbarg.classList.add("transparent");
    navbarg.classList.remove("background-visible");
  } else if (scrolled) {
    navbarg.classList.remove("transparent");
    navbarg.classList.add("background-visible");
  } else {
    navbarg.classList.add("transparent");
    navbarg.classList.remove("background-visible");
  }
}

window.addEventListener("scroll", updateNavbarBackground);
window.addEventListener("resize", updateNavbarBackground);
updateNavbarBackground();

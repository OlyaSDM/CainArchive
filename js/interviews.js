const track = document.querySelector('.carousel-track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const itemCount = 6;
const visibleItems = 3;
let currentIndex = 0;
const itemWidth = track.querySelector('.carousel-item').offsetWidth + 10; // +gap

function updateCarousel(direction) {
  const items = document.querySelectorAll('.carousel-item');
  let maxIndex = itemCount - visibleItems;

  if (direction === 'next') {
    currentIndex = Math.min(currentIndex + 1, maxIndex);
  } else if (direction === 'prev') {
    currentIndex = Math.max(currentIndex - 1, 0);
  }

  const newPosition = -(itemWidth * currentIndex);

  gsap.to(track, {
    x: newPosition,
    duration: 0.6,
    ease: 'power2.out',
    onUpdate: highlightCenterItem
  });

  highlightCenterItem();
}
document.querySelectorAll('[data-play]').forEach(overlay => {
  overlay.addEventListener('click', () => {
    const video = overlay.previousElementSibling;
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    video.play();
  });
});


function highlightCenterItem() {
  const items = document.querySelectorAll('.carousel-item');
  items.forEach((item, index) => {
    item.classList.remove('center');
  });

  const centerIndex = currentIndex + 1; // middle of 3
  if (items[centerIndex]) {
    items[centerIndex].classList.add('center');
  }
}


nextBtn.addEventListener('click', () => updateCarousel('next'));
prevBtn.addEventListener('click', () => updateCarousel('prev'));

// Highlight center video on initial load
window.addEventListener('DOMContentLoaded', () => {
  highlightCenterItem();
});


window.addEventListener('DOMContentLoaded', () => {
  highlightCenterItem();
  track.classList.add('ready');
});
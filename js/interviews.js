

const track = document.querySelector(".carousel-track");
const viewport = document.querySelector(".carousel-viewport");

let items = Array.from(track.children);

// === Clone first and last items ===
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

// Refresh full list after cloning
items = Array.from(track.children);

// === State ===
let currentIndex = 1;
let startX = 0;
let isDragging = false;
let dragStartOffset = 0;

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  // === Update center item style ===
  function updateCenterItem() {
    items.forEach(item => item.classList.remove("center"));
    const current = items[currentIndex];
    if (current && !current.classList.contains("clone")) {
      current.classList.add("center");
    }
  }

  // === Move to index with optional animation skip ===
  function moveToIndex(index, skipTransition = false) {
    currentIndex = index;

    const item = items[currentIndex];
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const containerCenter = viewport.offsetWidth / 2;
    const offset = containerCenter - itemCenter;

    track.style.transition = skipTransition ? "none" : "transform 0.5s ease";
    track.style.transform = `translateX(${offset}px)`;

    updateCenterItem();
  }

  // === Infinite Loop Logic ===
  track.addEventListener("transitionend", () => {
    const currentItem = items[currentIndex];
    if (currentItem.classList.contains("clone")) {
      track.style.transition = "none";
      if (currentIndex === 0) {
        currentIndex = items.length - 2;
      } else if (currentIndex === items.length - 1) {
        currentIndex = 1;
      }

      // Use animation frame to wait before jumping
      requestAnimationFrame(() => {
        moveToIndex(currentIndex, true);
      });
    }
  });

  // === Button Navigation ===
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    moveToIndex(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex--;
    moveToIndex(currentIndex);
  });

  // === Drag Navigation ===
  track.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    dragStartOffset = parseFloat(track.style.transform.replace("translateX(", "")) || 0;
    track.style.transition = "none";
  });

  track.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    track.style.transform = `translateX(${dragStartOffset + delta}px)`;
  });

  track.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const delta = e.clientX - startX;

    if (delta < -50) currentIndex++;
    else if (delta > 50) currentIndex--;

    moveToIndex(currentIndex);
  });

  // Prevent ghost drag image
  track.addEventListener("dragstart", e => e.preventDefault());

  // === Resize Support ===
  window.addEventListener("resize", () => moveToIndex(currentIndex));

  // === Init ===
  moveToIndex(currentIndex);
});



// Modal elements
const modal = document.getElementById("video-modal");
const modalIframe = document.getElementById("modal-iframe");
const modalName = document.getElementById("modal-name");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalAvatar = document.getElementById("modal-avatar");
const modalClose = document.getElementById("modal-close");

const modalOverlay = document.getElementById("modal-video-overlay");
const modalPlayBtn = document.getElementById("modal-play-btn");
const modalFrameWrap = document.getElementById("modal-video-frame");
const modalThumbnail = document.getElementById("modal-thumbnail");

let modalVideoSrc = "";

// Open modal (but don't autoplay video yet)
document.querySelectorAll('.carousel-item').forEach(item => {
  const overlay = item.querySelector('[data-play]');
  if (!overlay) return;

  overlay.addEventListener('click', () => {
    const iframe = item.querySelector('iframe');
    modalVideoSrc = iframe.getAttribute('src')?.replace(/[?&]autoplay=1/, '') || "";

    // Show overlay, hide iframe
    modalOverlay.style.display = "flex";
    modalFrameWrap.style.display = "none";
    modalIframe.setAttribute('src', ""); // clear

    // Set poster image
    const thumb = item.dataset.avatar || overlay.querySelector('img')?.getAttribute('src') || "";
    modalThumbnail.setAttribute('src', thumb);

    // Info
    modalName.textContent = item.dataset.name || item.querySelector('.carousel-item-name')?.textContent || '';
    modalTitle.textContent = item.dataset.title || '';
    modalDescription.textContent = item.dataset.description || item.querySelector('.carousel-item-description')?.textContent || '';
    modalAvatar.setAttribute('src', thumb);

    modal.classList.add("active");
    document.body.classList.add("modal-open");

    stopAutoSlide?.();
    window.carouselLocked = true;
  });
});

// Play video when play button clicked
modalPlayBtn.addEventListener("click", () => {
  if (!modalVideoSrc) return;

  // Show iframe and hide overlay
  modalOverlay.style.display = "none";
  modalFrameWrap.style.display = "block";

  // Add autoplay
  let autoplaySrc = modalVideoSrc + (modalVideoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
  modalIframe.setAttribute('src', autoplaySrc);
});

// Close modal
function closeModal() {
  modal.classList.remove("active");
  modalIframe.setAttribute('src', ""); // clear video
  document.body.classList.remove("modal-open");

  modalVideoSrc = "";
  stopAutoSlide?.();
  startAutoSlide?.();
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// const modal = document.getElementById("video-modal");
// const modalIframe = document.getElementById("modal-iframe");
// const modalName = document.getElementById("modal-name");
// const modalTitle = document.getElementById("modal-title");
// const modalDescription = document.getElementById("modal-description");
// const modalAvatar = document.getElementById("modal-avatar");
// const modalClose = document.getElementById("modal-close");

// // Open modal on play (but no autoplay)
// document.querySelectorAll('.carousel-item').forEach(item => {
//   const overlay = item.querySelector('[data-play]');
//   if (!overlay) return;

//   overlay.addEventListener('click', () => {
//     const iframe = item.querySelector('iframe');
    
//     // Remove autoplay
//     let src = iframe.getAttribute('src') || '';
//     src = src.replace(/[?&]autoplay=1/, ''); // remove autoplay if exists

//     // Strip autoplay from src and assign it to modal iframe
//     modalIframe.setAttribute('src', src);

//     // Pull info into modal
//     modalName.textContent = item.dataset.name || item.querySelector('.carousel-item-name')?.textContent || '';
//     modalTitle.textContent = item.dataset.title || '';
//     modalDescription.textContent = item.dataset.description || item.querySelector('.carousel-item-description')?.textContent || '';
//     modalAvatar.setAttribute('src', item.dataset.avatar || overlay.querySelector('img')?.getAttribute('src') || '');

//     modal.classList.add("active");
//     document.body.classList.add("modal-open");

//     stopAutoSlide?.();
//     window.carouselLocked = true;
//   });
// });

// // Close modal function
// function closeModal() {
//   modal.classList.remove("active");
//   modalIframe.setAttribute('src', ""); // clear to stop video
//   document.body.classList.remove("modal-open");

//   window.carouselLocked = false;
//   startAutoSlide?.();
// }

// modalClose.addEventListener('click', closeModal);

// modal.addEventListener('click', (e) => {
//   if (e.target === modal) {
//     closeModal();
//   }
// });



// const modal = document.getElementById("video-modal");
// const modalIframe = document.getElementById("modal-iframe");
// const modalName = document.getElementById("modal-name");
// const modalTitle = document.getElementById("modal-title");
// const modalDescription = document.getElementById("modal-description");
// const modalAvatar = document.getElementById("modal-avatar");
// const modalClose = document.getElementById("modal-close");

// // Open modal on play
// document.querySelectorAll('.carousel-item').forEach(item => {
//   const overlay = item.querySelector('[data-play]');
//   if (!overlay) return;

//   overlay.addEventListener('click', () => {
//     const iframe = item.querySelector('iframe');

//     // Video src with autoplay
//     let src = iframe.getAttribute('src');
//     if (!src.includes('autoplay=1')) {
//       src += (src.includes('?') ? '&' : '?') + 'autoplay=1';
//     }
//     modalIframe.setAttribute('src', src);

//     // Pull info dynamically
//     modalName.textContent = item.dataset.name || item.querySelector('.carousel-item-name')?.textContent;
//     modalTitle.textContent = item.dataset.title || "";
//     modalDescription.textContent = item.dataset.description || item.querySelector('.carousel-item-description')?.textContent;
//     modalAvatar.setAttribute('src', item.dataset.avatar || overlay.querySelector('img')?.getAttribute('src') || "");

//     modal.classList.add("active");

//     // ✅ Stop carousel auto-slide while modal is open
//     stopAutoSlide();
//     carouselLocked = true;
//   });
// });

// // Close modal
// function closeModal() {
//   modal.classList.remove("active");
//   modalIframe.setAttribute('src', ""); // stop video

//   carouselLocked = false;
//   // ✅ Resume carousel auto-slide when modal closes
//   startAutoSlide();
// }

// modalClose.addEventListener('click', closeModal);

// // Close when clicking backdrop
// modal.addEventListener('click', (e) => {
//   if (e.target === modal) {
//     closeModal();
//   }
// });



//CURSOR-TOOLTIP

document.addEventListener("DOMContentLoaded", () => {
  const tooltip = document.querySelector(".cursor-tooltip-play");
  const targets = document.querySelectorAll(".video-wrapper");

  let mouseX = 0, mouseY = 0;     
  let tooltipX = 0, tooltipY = 0; 
  const speed = 0.15;             
  const offsetX = 25;             
  const offsetY = 20;              

  // Track real cursor
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX + offsetX;
    mouseY = e.clientY + offsetY;
  });

  // Smooth animation loop
  function animateTooltip() {
    tooltipX += (mouseX - tooltipX) * speed;
    tooltipY += (mouseY - tooltipY) * speed;
    tooltip.style.left = tooltipX + "px";
    tooltip.style.top = tooltipY + "px";
    requestAnimationFrame(animateTooltip);
  }
  animateTooltip();

  // Show/Hide tooltip on hover
  targets.forEach(target => {
    target.addEventListener("mouseenter", () => {
      tooltip.classList.add("visible");
    });
    target.addEventListener("mouseleave", () => {
      tooltip.classList.remove("visible");
    });
  });
});
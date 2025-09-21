// const track = document.querySelector('.carousel-track');
// const nextBtn = document.getElementById('nextBtn');
// const prevBtn = document.getElementById('prevBtn');
// let items = Array.from(track.children);

// const visibleItems = 3;
// let currentIndex = 1; // start after left clone
// let itemWidth = items[0].offsetWidth + 10;
// const slideInterval = 5000; // auto-scroll every 5s
// let autoSlide;

// // Clone first & last
// const firstClone = items[0].cloneNode(true);
// const lastClone = items[items.length - 1].cloneNode(true);
// firstClone.id = "first-clone";
// lastClone.id = "last-clone";

// track.appendChild(firstClone);
// track.insertBefore(lastClone, items[0]);

// // Refresh items list
// items = Array.from(track.children);

// // Position track initially
// gsap.set(track, { x: -(itemWidth * currentIndex) });

// // Scrollbar
// const scrollbar = document.createElement("div");
// scrollbar.className = "carousel-scrollbar";
// const scrollbarFill = document.createElement("div");
// scrollbarFill.className = "carousel-scrollbar-fill";
// scrollbar.appendChild(scrollbarFill);
// track.parentElement.appendChild(scrollbar);

// function updateCarousel(direction) {
//   if (direction === 'next') {
//     currentIndex++;
//   } else if (direction === 'prev') {
//     currentIndex--;
//   }

//   gsap.to(track, {
//     x: -(itemWidth * currentIndex),
//     duration: 0.6,
//     ease: 'power2.out',
//     onComplete: () => {
//       checkLoop();
//       pauseNonCenterVideos();
//     },
//     onUpdate: () => {
//       highlightCenterItem();
//       updateScrollbar();
//     }
//   });
// }

// function checkLoop() {
//   if (items[currentIndex].id === "first-clone") {
//     currentIndex = 1;
//     gsap.set(track, { x: -(itemWidth * currentIndex) });
//     updateScrollbar();
//   }
//   if (items[currentIndex].id === "last-clone") {
//     currentIndex = items.length - 2;
//     gsap.set(track, { x: -(itemWidth * currentIndex) });
//     updateScrollbar();
//   }
// }

// function highlightCenterItem() {
//   items.forEach(item => item.classList.remove('center'));
//   const centerIndex = currentIndex + 1; // middle of 3 visible
//   if (items[centerIndex]) {
//     items[centerIndex].classList.add('center');
//   }
// }

// function updateScrollbar() {
//   const progress = (currentIndex - 1) / (items.length - 3); 
//   scrollbarFill.style.width = `${progress * 100}%`;
// }

// // === YouTube IFrame API integration ===
// let players = [];

// function onYouTubeIframeAPIReady() {
//   document.querySelectorAll('.video-wrapper iframe').forEach((iframe, idx) => {
//     players[idx] = new YT.Player(iframe, {
//       events: {
//         'onStateChange': (event) => {
//           if (event.data === YT.PlayerState.PLAYING) {
//             pauseNonCenterVideos();
//           }
//         }
//       }
//     });
//   });
// }

// window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

// function pauseNonCenterVideos() {
//   const centerIndex = currentIndex + 1;
//   players.forEach((player, idx) => {
//     if (!player) return;
//     const item = items[idx];
//     if (item && !item.classList.contains('center')) {
//       player.pauseVideo();
//     }
//   });
// }

// // Overlay click → autoplay YouTube
// document.querySelectorAll('[data-play]').forEach((overlay, index) => {
//   overlay.addEventListener('click', () => {
//     const iframe = overlay.previousElementSibling;
//     if (!iframe) return;

//     // Find matching YT.Player
//     const player = players.find(p => p.getIframe() === iframe);

//     if (player && typeof player.playVideo === 'function') {
//       player.playVideo();
//     } else {
//       // If player not ready yet, force iframe reload with autoplay
//       let src = iframe.getAttribute('src');
//       if (!src.includes('autoplay=1')) {
//         src += (src.includes('?') ? '&' : '?') + 'autoplay=1';
//         iframe.setAttribute('src', src);
//       }
//     }

//     // Hide overlay
//     overlay.style.opacity = '0';
//     overlay.style.pointerEvents = 'none';
//   });
// });

// // Auto-slide
// function startAutoSlide() {
//   autoSlide = setInterval(() => {
//     updateCarousel('next');
//   }, slideInterval);
// }
// function stopAutoSlide() {
//   clearInterval(autoSlide);
// }

// // Pause auto-slide when hover
// track.parentElement.addEventListener('mouseenter', stopAutoSlide);
// track.parentElement.addEventListener('mouseleave', startAutoSlide);

// // Buttons
// nextBtn.addEventListener('click', () => {
//   updateCarousel('next');
//   stopAutoSlide();
//   startAutoSlide();
// });
// prevBtn.addEventListener('click', () => {
//   updateCarousel('prev');
//   stopAutoSlide();
//   startAutoSlide();
// });

// // --- Swipe / Drag support ---
// let isDragging = false;
// let startX = 0;

// track.addEventListener("pointerdown", (e) => {
//   isDragging = true;
//   startX = e.clientX;
//   stopAutoSlide();
// });

// track.addEventListener("pointermove", (e) => {
//   if (!isDragging) return;
//   const diff = e.clientX - startX;
//   gsap.set(track, { x: -(itemWidth * currentIndex) + diff });
// });

// track.addEventListener("pointerup", (e) => {
//   if (!isDragging) return;
//   isDragging = false;
//   const diff = e.clientX - startX;

//   if (diff > 50) {
//     updateCarousel('prev');
//   } else if (diff < -50) {
//     updateCarousel('next');
//   } else {
//     gsap.to(track, { x: -(itemWidth * currentIndex), duration: 0.3 });
//   }
//   startAutoSlide();
// });

// track.addEventListener("dragstart", (e) => e.preventDefault());

// // Init
// window.addEventListener('DOMContentLoaded', () => {
//   highlightCenterItem();
//   track.classList.add('ready');
//   updateScrollbar();
//   startAutoSlide();
// });

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

// Open modal on play
document.querySelectorAll('.carousel-item').forEach(item => {
  const overlay = item.querySelector('[data-play]');
  if (!overlay) return;

  overlay.addEventListener('click', () => {
    const iframe = item.querySelector('iframe');

    // Video src with autoplay
    let src = iframe.getAttribute('src');
    if (!src.includes('autoplay=1')) {
      src += (src.includes('?') ? '&' : '?') + 'autoplay=1';
    }
    modalIframe.setAttribute('src', src);

    // Pull info dynamically
    modalName.textContent = item.dataset.name || item.querySelector('.carousel-item-name')?.textContent;
    modalTitle.textContent = item.dataset.title || "";
    modalDescription.textContent = item.dataset.description || item.querySelector('.carousel-item-description')?.textContent;
    modalAvatar.setAttribute('src', item.dataset.avatar || overlay.querySelector('img')?.getAttribute('src') || "");

    modal.classList.add("active");

    // ✅ Stop carousel auto-slide while modal is open
    stopAutoSlide();
    carouselLocked = true;
  });
});

// Close modal
function closeModal() {
  modal.classList.remove("active");
  modalIframe.setAttribute('src', ""); // stop video

  carouselLocked = false;
  // ✅ Resume carousel auto-slide when modal closes
  startAutoSlide();
}

modalClose.addEventListener('click', closeModal);

// Close when clicking backdrop
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});



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
document.addEventListener("DOMContentLoaded", () => {
  const pressItems = document.querySelectorAll('.press-item');
  const popupWindow = document.getElementById('popup-window');
  const closePopupBtn = document.getElementById('close-popup-btn');
  const pdfPopup = document.getElementById('pdf-popup');

  pressItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const pdfFile = item.getAttribute('data-pdf');
      if (!pdfFile) return;

      pdfPopup.setAttribute('src', pdfFile);
      popupWindow.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  const closePopup = () => {
    popupWindow.classList.remove('show');
    pdfPopup.setAttribute('src', '');
    document.body.style.overflow = '';
  };

  closePopupBtn.addEventListener('click', closePopup);
  popupWindow.addEventListener('click', (e) => {
    if (e.target === popupWindow) closePopup();
  });

  let hoverTweenRotate = null;
  let hoverTweenColor = null;

  closePopupBtn.addEventListener("mouseenter", () => {
    if (hoverTweenRotate) hoverTweenRotate.kill();
    if (hoverTweenColor) hoverTweenColor.kill();

    hoverTweenRotate = gsap.to(closePopupBtn, { 
      rotate: 90,
      duration: 0.3,
      ease: "power2.out"
    });

    hoverTweenColor = gsap.to(closePopupBtn, {
      color: "rgb(72, 202, 228)",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  closePopupBtn.addEventListener("mouseleave", () => {
    if (hoverTweenRotate) hoverTweenRotate.kill();
    if (hoverTweenColor) hoverTweenColor.kill();

    hoverTweenRotate = gsap.to(closePopupBtn, { 
      rotate: 0,
      duration: 0.3,
      ease: "power2.out"
    });

    hoverTweenColor = gsap.to(closePopupBtn, {
      color: "var(--fonts)",
      duration: 0.3,
      ease: "power2.out"
    });
  });

  const watchMoreBtn = document.querySelector(".watch-more-btn");
  const moreItems = document.querySelectorAll(".more-item");

  if (watchMoreBtn) {
    watchMoreBtn.addEventListener("click", () => {
      moreItems.forEach(item => {
        item.style.display = "block"; 
      });
      watchMoreBtn.style.display = "none"; 
    });
  }

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    moreItems.forEach((item, index) => {
      if (index >= 3) { 
        item.style.display = "none"; 
      }
    });

    if (watchMoreBtn) {
      watchMoreBtn.style.display = "block"; 
    }
  }
});

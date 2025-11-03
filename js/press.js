document.addEventListener("DOMContentLoaded", () => {
  const pressItems = document.querySelectorAll(".press-item");
  const popupWindow = document.getElementById("popup-window");
  const closePopupBtn = document.getElementById("close-popup-btn");
  const pdfPopup = document.getElementById("pdf-popup");
  const popupText = document.querySelector(".popup-p");

  pressItems.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      const pdfFile = item.getAttribute("data-pdf");
      if (!pdfFile) return;

      pdfPopup.setAttribute("src", `${pdfFile}#toolbar=0&navpanes=0&scrollbar=0`);
      popupWindow.classList.add("show");
      document.body.style.overflow = "hidden";

      popupText.style.opacity = "0";

      setTimeout(() => {
        gsap.to(popupText, { opacity: 1, duration: 1 });
      }, 1500);
    });
  });

  const closePopup = () => {
    popupWindow.classList.remove("show");
    pdfPopup.setAttribute("src", "");
    document.body.style.overflow = "";
    gsap.set(popupText, { opacity: 0 });
  };

  closePopupBtn.addEventListener("click", closePopup);
  popupWindow.addEventListener("click", e => {
    if (e.target === popupWindow) closePopup();
  });

  const watchMoreBtn = document.querySelector(".watch-more-btn");
  const allItems = document.querySelectorAll(".press-item");

  const showInitialItems = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      allItems.forEach((item, i) => (item.style.display = i < 3 ? "block" : "none"));
      if (watchMoreBtn) watchMoreBtn.style.display = "block";
    } else {
      allItems.forEach(item => (item.style.display = "block"));
      if (watchMoreBtn) watchMoreBtn.style.display = "none";
    }
  };

  showInitialItems();

  if (watchMoreBtn) {
    watchMoreBtn.addEventListener("click", () => {
      allItems.forEach(item => (item.style.display = "block"));
      watchMoreBtn.style.display = "none";
    });
  }

  window.addEventListener("resize", showInitialItems);
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(TextPlugin);

  const pressItems = document.querySelectorAll(".press-item");
  const popupWindow = document.getElementById("popup-window");
  const closePopupBtn = document.getElementById("close-popup-btn");
  const pdfPopup = document.getElementById("pdf-popup");
  const popupText = document.querySelector(".popup-p");

  // ---------- ОТКРЫТИЕ ПОПАПА ----------
  pressItems.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      const pdfFile = item.getAttribute("data-pdf");
      if (!pdfFile) return;

      pdfPopup.setAttribute("src", pdfFile);
      popupWindow.classList.add("show");
      document.body.style.overflow = "hidden";

      const text = "If you want to read the full article, please contact us.";
      popupText.textContent = "";

      const textSpan = document.createElement("span");
      const cursor = document.createElement("span");
      cursor.classList.add("cursor");
      cursor.textContent = "|";
      cursor.style.opacity = "0"; // курсор сначала невидим

      popupText.appendChild(textSpan);
      popupText.appendChild(cursor);

      // курсор появляется чуть позже
      gsap.to(cursor, {
        opacity: 1,
        delay: 0.3
      });

      gsap.to(textSpan, {
        duration: 4,
        text: text,
        ease: "none",
        onComplete: () => {
          gsap.to(cursor, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => cursor.remove()
          });
        }
      });
    });
  });

  // ---------- ЗАКРЫТИЕ ПОПАПА ----------
  const closePopup = () => {
    popupWindow.classList.remove("show");
    pdfPopup.setAttribute("src", "");
    document.body.style.overflow = "";
  };

  closePopupBtn.addEventListener("click", closePopup);
  popupWindow.addEventListener("click", e => {
    if (e.target === popupWindow) closePopup();
  });

  // ---------- WATCH MORE ----------
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

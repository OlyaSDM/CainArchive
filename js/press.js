document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("pdf-modal");
  const pdfObject = modal.querySelector(".pdf-viewer");
  const closeBtn = modal.querySelector(".modal-close.item-3");
  const popupMsg = modal.querySelector("#pdf-popup-msg");

  let popupTimeout = null;

  function openModal(pdfUrl) {
    if (!pdfUrl) return;

    pdfUrl = pdfUrl.trim().replace(/\.pdf+$/, ".pdf");

    pdfObject.data = pdfUrl + "#zoom=100"; // zoom=100 для нормального масштаба

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    if (popupTimeout) clearTimeout(popupTimeout);
    popupMsg.classList.remove("show");

    popupTimeout = setTimeout(() => {
      popupMsg.classList.add("show");
    }, 4000);
  }

  function closeModal() {
    modal.classList.remove("active");
    pdfObject.data = "";
    document.body.style.overflow = "";
    popupMsg.classList.remove("show");
    if (popupTimeout) clearTimeout(popupTimeout);
  }

  document.querySelectorAll(".press-item").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      const pdfUrl = item.getAttribute("data-pdf");
      if (pdfUrl) openModal(pdfUrl);
    });
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});

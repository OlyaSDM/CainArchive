// document.addEventListener("DOMContentLoaded", () => {
//   const modal = document.getElementById("pdf-modal");
//   const iframe = modal.querySelector(".pdf-viewer");
//   const closeBtn = modal.querySelector(".modal-close.item-3");
//   const popupMsg = modal.querySelector("#pdf-popup-msg");

//   let popupTimeout = null;

// function openModal(pdfUrl) {
//   if (!pdfUrl) return;

//   pdfUrl = pdfUrl.trim().replace(/\.pdf+$/, ".pdf");

//   iframe.src = pdfUrl + "#zoom=fit";

//   modal.classList.add("active");
//   document.body.style.overflow = "hidden";

//   if (popupTimeout) clearTimeout(popupTimeout);
//   popupMsg.classList.remove("show");

//   popupTimeout = setTimeout(() => {
//     popupMsg.classList.add("show");
//   }, 4000);
// }



//   function closeModal() {
//     modal.classList.remove("active");
//     iframe.src = "";
//     document.body.style.overflow = "";
//     popupMsg.classList.remove("show");
//     if (popupTimeout) clearTimeout(popupTimeout);
//   }

//   document.querySelectorAll(".press-item").forEach(item => {
//     item.addEventListener("click", e => {
//       e.preventDefault();
//       const pdfUrl = item.getAttribute("data-pdf");
//       if (pdfUrl) openModal(pdfUrl);
//     });
//   });

//   modal.addEventListener("click", e => {
//     if (e.target === modal) closeModal();
//   });

//   closeBtn.addEventListener("click", closeModal);

//   document.addEventListener("keydown", e => {
//     if (e.key === "Escape" && modal.classList.contains("active")) {
//       closeModal();
//     }
//   });
// });




const pressItems = document.querySelectorAll('.press-item');
const pdfModal = document.getElementById('pdf-modal');
const modalClose = pdfModal.querySelector('.modal-close');
const pdfViewer = pdfModal.querySelector('.pdf-viewer');
const pdfMsg = pdfModal.querySelector('#pdf-popup-msg');

pressItems.forEach(item => {
  const link = item.querySelector('.press-item-img');
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pdfPath = item.dataset.pdf;

    if (pdfPath) {
      pdfViewer.src = pdfPath;
      pdfViewer.style.display = 'block';
      pdfMsg.style.display = 'none';
    } else {
      pdfViewer.style.display = 'none';
      pdfMsg.style.display = 'block';
    }

    pdfModal.style.display = 'flex';
  });
});

// Закрытие модального окна
modalClose.addEventListener('click', () => {
  pdfModal.style.display = 'none';
  pdfViewer.src = '';
});

// Закрытие по клику на фон
pdfModal.addEventListener('click', (e) => {
  if (e.target === pdfModal) {
    pdfModal.style.display = 'none';
    pdfViewer.src = '';
  }
});







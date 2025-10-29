// const pressItems = document.querySelectorAll('.press-item');
// const popupWindow = document.getElementById('popup-window');
// const closePopupBtn = document.getElementById('close-popup-btn');
// const pdfPopup = document.getElementById('pdf-popup');

// pressItems.forEach(item => {
//   item.addEventListener('click', (e) => {
//     e.preventDefault();

//     // Логируем, чтобы убедиться, что клик срабатывает
//     console.log('Press item clicked');

//     const pdfFile = item.getAttribute('data-pdf');
//     if (!pdfFile) {
//       console.warn('PDF file not found!');
//       return;
//     }

//     pdfPopup.setAttribute('src', pdfFile);

//     // Показываем popup
//     popupWindow.classList.add('show');
//     document.body.style.overflow = 'hidden'; // блокируем прокрутку
//   });
// });

// closePopupBtn.addEventListener('click', () => {
//   console.log('Close button clicked');
//   popupWindow.classList.remove('show');
//   pdfPopup.setAttribute('src', '');
//   document.body.style.overflow = ''; // восстанавливаем прокрутку
// });

// popupWindow.addEventListener('click', (e) => {
//   // Закрытие по клику на фон
//   if (e.target === popupWindow) {
//     console.log('Popup background clicked');
//     popupWindow.classList.remove('show');
//     pdfPopup.setAttribute('src', '');
//     document.body.style.overflow = ''; // восстанавливаем прокрутку
//   }
// });

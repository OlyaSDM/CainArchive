const images = [
    "img/gallery/1.JPEG",
    "img/gallery/2.JPEG",
    "img/gallery/3.JPEG",
    "img/gallery/4.JPEG",
    "img/gallery/5.JPEG",
    "img/gallery/6.JPEG",
    "img/gallery/7.JPEG",
    "img/gallery/8.JPEG",
    "img/gallery/9.JPEG",
    "img/gallery/10.JPEG",
    "img/gallery/11.JPEG",
    "img/gallery/12.JPEG",
    "img/gallery/13.JPEG",
    "img/gallery/14.JPEG",
    "img/gallery/15.JPEG",
    "img/gallery/16.JPEG",
    "img/gallery/17.JPEG",
    "img/gallery/18.JPEG",
    "img/gallery/19.JPEG",
    "img/gallery/20.JPEG",
    "img/gallery/21.JPEG",
    "img/gallery/22.JPEG",
    "img/gallery/23.JPEG",
    "img/gallery/24.JPEG",
    "img/gallery/25.JPEG",
    "img/gallery/26.JPEG",
    "img/gallery/27.JPEG",
    "img/gallery/28.jpg",
    "img/gallery/29.JPEG",
    "img/gallery/30.JPEG",
  ];

  // Create a hidden canvas for each image
  images.forEach(src => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.crossOrigin = "anonymous"; // for CDN
    img.src = src;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);


    };
  });

// Disable the context menu (right click)
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable keyboard shortcuts for saving a page or viewing the source code
// document.addEventListener("keydown", e => {
//   Ctrl+S, Ctrl+U, Ctrl+Shift+I, или F12
//   if (
//     (e.ctrlKey && ['s', 'u'].includes(e.key.toLowerCase())) || // Ctrl+S или Ctrl+U
//     (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || // Ctrl+Shift+I
//     (e.key.toLowerCase() === 'f12') // F12
//   ) {
//     e.preventDefault(); 
//   }
// });

// // Disable only the F12 key separately
// document.addEventListener("keydown", e => {
//   if (e.key === "F12") {
//     e.preventDefault(); 
//   }
// });


  document.addEventListener('keydown', (e) => {
  if (e.key === "PrintScreen") {
    e.preventDefault();
    alert("Скриншоты запрещены!");
  }
});




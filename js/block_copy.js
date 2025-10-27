const images = [
    "img/gallery/1.webp",
    "img/gallery/2.webp",
    "img/gallery/3.webp",
    "img/gallery/4.webp",
    "img/gallery/5.webp",
    "img/gallery/6.webp",
    "img/gallery/7.webp",
    "img/gallery/8.webp",
    "img/gallery/9.webp",
    "img/gallery/10.webp",
    "img/gallery/11.webp",
    "img/gallery/12.webp",
    "img/gallery/13.webp",
    "img/gallery/14.webp",
    "img/gallery/15.webp",
    "img/gallery/16.webp",
    "img/gallery/17.webp",
    "img/gallery/18.webp",
    "img/gallery/19.webp",
    "img/gallery/20.webp",
    "img/gallery/21.webp",
    "img/gallery/22.webp",
    "img/gallery/23.webp",
    "img/gallery/24.webp",
    "img/gallery/25.webp",
    "img/gallery/26.webp",
    "img/gallery/27.webp",
    "img/gallery/28.jpg",
    "img/gallery/29.webp",
    "img/gallery/30.webp",
    "img/gallery/31-1.webp",

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




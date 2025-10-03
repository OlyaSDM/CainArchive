// document.addEventListener("DOMContentLoaded", () => {
//   const letters = document.querySelectorAll(".letter-inner");
//   // const cainTooltip = document.getElementById("cain-tooltip");
//   const infoBox = document.getElementById("cain-desc");
//   const titleDiv = infoBox.querySelector(".desc-title");
//   const textDiv = infoBox.querySelector(".desc-text");
//   const cainSection = document.querySelector(".cain-section");
//   const tooltip = document.querySelector(".cain-tooltip");
//   const hoverZone = document.querySelector(".cain-section");

//   const isDesktop = window.innerWidth > 1324;

//   gsap.set(letters, { y: "100%", opacity: 0 });

//   const tl = gsap.timeline({ paused: true });
//   tl.to(letters, { y: "0%", opacity: 1, duration: 1.5, ease: "power3.out", stagger: 0.3 });

//   window.addEventListener("scroll", () => {
//     const rect = cainSection.getBoundingClientRect();
//     const windowHeight = window.innerHeight;
//     let progress = 1 - rect.top / (windowHeight * 0.6);
//     progress = Math.min(Math.max(progress, 0), 1);
//     gsap.to(tl, { progress: progress, duration: 1.5, ease: "power3.out" });
//   });

  // --- Tooltip ---
  // if (isDesktop) {
  //   cainSection.addEventListener("mousemove", (e) => {
  //     const rect = cainSection.getBoundingClientRect();
  //     const x = e.clientX - rect.left;
  //     const y = e.clientY - rect.top;
  //     cainTooltip.style.left = x + "px";
  //     cainTooltip.style.top = y + "px";
  //   });

  //   cainSection.addEventListener("mouseenter", () => {
  //     gsap.to(cainTooltip, { opacity: 1, duration: 0.3 });
  //   });

  //   cainSection.addEventListener("mouseleave", () => {
  //     gsap.to(cainTooltip, { opacity: 0, duration: 0.3 });
  //   });
  // }

//   let mouseX = 0, mouseY = 0;
//   let tooltipX = 0, tooltipY = 0;
//   const speed = 0.15;
//   const offsetX = 25;
//   const offsetY = 20;

//   // Track mouse
//   document.addEventListener("mousemove", (e) => {
//     mouseX = e.clientX + offsetX;
//     mouseY = e.clientY + offsetY;
//   });

//   // Animate tooltip movement
//   function animateTooltip() {
//     tooltipX += (mouseX - tooltipX) * speed;
//     tooltipY += (mouseY - tooltipY) * speed;
//     tooltip.style.left = `${tooltipX}px`;
//     tooltip.style.top = `${tooltipY}px`;
//     requestAnimationFrame(animateTooltip);
//   }
//   animateTooltip();

//   // Handle fade in/out with small delay
//   let showTimeout, hideTimeout;
//   hoverZone.addEventListener("mouseenter", () => {
//     clearTimeout(hideTimeout);
//     showTimeout = setTimeout(() => {
//       tooltip.classList.add("visible");
//     }, 100); // slight delay in
//   });

//   hoverZone.addEventListener("mouseleave", () => {
//     clearTimeout(showTimeout);
//     hideTimeout = setTimeout(() => {
//       tooltip.classList.remove("visible");
//     }, 60); // fast out
//   });

//   // --- Hover/Click  ---
//   letters.forEach(letter => {
//     const wrapper = letter.parentElement;

//     if (isDesktop) {
//       // Desktop
//       wrapper.addEventListener("mouseenter", () => {
//         const fullText = letter.dataset.desc || "";
//         const splitIndex = fullText.indexOf(":") + 1;
//         const title = fullText.slice(0, splitIndex).trim();
//         const rest = fullText.slice(splitIndex).trim();

//         gsap.killTweensOf([titleDiv, textDiv, infoBox]);
//         const tlText = gsap.timeline();
//         tlText.to([titleDiv, textDiv], { y: 10, opacity: 0, duration: 0.4, ease: "power2.in" });
//         tlText.to(infoBox, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "+=0.05");
//         tlText.to(titleDiv, { y: 0, opacity: 1, textContent: title, duration: 0.4, ease: "power2.out" }, "-=0.2");
//         tlText.to(textDiv, { y: 0, opacity: 1, textContent: rest, duration: 0.4, ease: "power2.out" }, "-=0.25");
//       });

//       wrapper.addEventListener("mouseleave", () => {
//         gsap.killTweensOf([titleDiv, textDiv, infoBox]);
//         gsap.to([titleDiv, textDiv, infoBox], { y: 10, opacity: 0, duration: 0.3, ease: "power2.in" });
//       });

//     } else {
//       letter.style.cursor = "pointer"; 

//       wrapper.addEventListener("click", () => {
//         const fullText = letter.dataset.desc || "";
//         const splitIndex = fullText.indexOf(":") + 1;
//         const title = fullText.slice(0, splitIndex).trim();
//         const rest = fullText.slice(splitIndex).trim();

//         titleDiv.textContent = title;
//         textDiv.textContent = rest;
//         infoBox.style.opacity = "1";

//         cainTooltip.textContent = "click the letter";
//       });
//     }
//   });

//   if (!isDesktop && letters[0]) {
//     const firstText = letters[0].dataset.desc || "";
//     const splitIndex = firstText.indexOf(":") + 1;
//     titleDiv.textContent = firstText.slice(0, splitIndex).trim();
//     textDiv.textContent = firstText.slice(splitIndex).trim();
//     infoBox.style.opacity = "1";

//     cainTooltip.textContent = "click the letter";
//   }
// });



document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".letter-inner");
  const cainSection = document.querySelector(".cain-section");
  const infoBox = document.getElementById("cain-desc");
  const titleDiv = infoBox.querySelector(".desc-title");
  const textDiv = infoBox.querySelector(".desc-text");
  const tooltip = document.querySelector(".cain-tooltip");
  const hoverZone = cainSection;

  const isDesktop = window.innerWidth > 1324;
  let scrollIntroFinished = false;

  // --- Setup Initial State ---
  letters.forEach(l => {
    l.style.transform = "translateY(100%)";
    l.style.opacity = "0";
  });
  titleDiv.style.opacity = "0";
  textDiv.style.opacity = "0";

  const defaultDesc = letters[1]?.dataset.desc || "";
  const splitIndex = defaultDesc.indexOf(":") + 1;
  const defaultTitle = defaultDesc.slice(0, splitIndex).trim();
  const defaultText = defaultDesc.slice(splitIndex).trim();

  // --- Scroll-in Animation (GSAP) ---
  const tlLetters = gsap.timeline({ paused: true });
  tlLetters.to(letters, { y: "0%", opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.1 });

  const tlDesc = gsap.timeline({ paused: true });
  tlDesc.to(titleDiv, { textContent: defaultTitle, y: 0, opacity: 1, duration: 0.5 })
        .to(textDiv, { textContent: defaultText, y: 0, opacity: 1, duration: 0.5 }, "-=0.3");

  function updateScrollProgress() {
    const rect = cainSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let progress = 1 - rect.top / (windowHeight * 0.6);
    progress = Math.min(Math.max(progress, 0), 1);

    gsap.to(tlLetters, { progress, duration: 0.2 });
    gsap.to(tlDesc, { progress, duration: 0.1 });

    if (progress >= 0.99 && !scrollIntroFinished) {
      scrollIntroFinished = true;
      letters.forEach(l => l.classList.remove("active"));
      letters[1]?.classList.add("active");
    }
  }

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress);

  // --- Tooltip Tracking ---
  let mouseX = 0, mouseY = 0, tooltipX = 0, tooltipY = 0;
  const speed = 0.15, offsetX = 25, offsetY = 20;
  document.addEventListener("mousemove", e => {
    mouseX = e.clientX + offsetX;
    mouseY = e.clientY + offsetY;
  });
  function animateTooltip() {
    tooltipX += (mouseX - tooltipX) * speed;
    tooltipY += (mouseY - tooltipY) * speed;
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
    requestAnimationFrame(animateTooltip);
  }
  animateTooltip();

  let showTimeout, hideTimeout;
  hoverZone.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => tooltip.classList.add("visible"), 100);
  });
  hoverZone.addEventListener("mouseleave", () => {
    clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => tooltip.classList.remove("visible"), 60);
  });

  // --- Letter Hover / Click (Instant, без анимаций) ---
  letters.forEach(letter => {
    const wrapper = letter.parentElement;

    const updateDesc = (fullText) => {
      const splitIndex = fullText.indexOf(":") + 1;
      const title = fullText.slice(0, splitIndex).trim();
      const rest = fullText.slice(splitIndex).trim();

      // мгновенно меняем текст и стиль
      titleDiv.textContent = title;
      textDiv.textContent = rest;
      titleDiv.style.opacity = "1";
      textDiv.style.opacity = "1";
      titleDiv.style.transform = "translateY(0)";
      textDiv.style.transform = "translateY(0)";
    };

    if (isDesktop) {
      wrapper.addEventListener("mouseenter", () => {
        if (!scrollIntroFinished) return;
        letters.forEach(l => l.classList.remove("active"));
        letter.classList.add("active");
        updateDesc(letter.dataset.desc || "");
      });
    } else {
      // Mobile click
      letter.style.cursor = "pointer";
      wrapper.addEventListener("click", () => {
        letters.forEach(l => l.classList.remove("active"));
        letter.classList.add("active");
        const fullText = letter.dataset.desc || "";
        const splitIndex = fullText.indexOf(":") + 1;
        titleDiv.textContent = fullText.slice(0, splitIndex).trim();
        textDiv.textContent = fullText.slice(splitIndex).trim();
        infoBox.style.opacity = "1";
      });
    }
  });

  // --- Mobile fallback ---
  if (!isDesktop && letters[1]) {
    titleDiv.textContent = defaultTitle;
    textDiv.textContent = defaultText;
    infoBox.style.opacity = "1";
    letters[1]?.classList.add("active");
  }
});





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
  gsap.set(letters, { y: "100%", opacity: 0 });
  gsap.set([titleDiv, textDiv], { y: 10, opacity: 0 });

  const defaultDesc = letters[1].dataset.desc || "";
  const splitIndex = defaultDesc.indexOf(":") + 1;
  const defaultTitle = defaultDesc.slice(0, splitIndex).trim();
  const defaultText = defaultDesc.slice(splitIndex).trim();

  // --- Scroll-in Animations ---
  const tlLetters = gsap.timeline({ paused: true });
  tlLetters.to(letters, {
    y: "0%",
    opacity: 1,
    duration: 1.5,
    ease: "power3.out",
    stagger: 0.15
  });

  const tlDesc = gsap.timeline({ paused: true });
  tlDesc.to(titleDiv, {
    textContent: defaultTitle,
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out"
  });
  tlDesc.to(textDiv, {
    textContent: defaultText,
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out"
  }, "-=0.4");

  // --- Scroll Trigger Logic ---
  window.addEventListener("scroll", () => {
    const rect = cainSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let progress = 1 - rect.top / (windowHeight * 0.6);
    progress = Math.min(Math.max(progress, 0), 1);

    gsap.to(tlLetters, { progress, duration: 1.5, ease: "power3.out" });
    gsap.to(tlDesc, { progress, duration: 0.6, ease: "power3.out" });

    // 🚨 Only allow hover interactions AFTER scroll reveal
    if (progress >= 0.99 && !scrollIntroFinished) {
      scrollIntroFinished = true;

      // Activate A after scroll completes
      letters.forEach(l => l.classList.remove("active"));
      letters[1].classList.add("active");
    }
  });

  // --- Tooltip Tracking ---
  let mouseX = 0, mouseY = 0;
  let tooltipX = 0, tooltipY = 0;
  const speed = 0.15;
  const offsetX = 25;
  const offsetY = 20;

  document.addEventListener("mousemove", (e) => {
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

  // --- Tooltip Show/Hide ---
  let showTimeout, hideTimeout;
  hoverZone.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    showTimeout = setTimeout(() => {
      tooltip.classList.add("visible");
    }, 100);
  });

  hoverZone.addEventListener("mouseleave", () => {
    clearTimeout(showTimeout);
    hideTimeout = setTimeout(() => {
      tooltip.classList.remove("visible");
    }, 60);
  });

  // --- Letter Hover Interactions ---
  letters.forEach(letter => {
    const wrapper = letter.parentElement;

    if (isDesktop) {
      wrapper.addEventListener("mouseenter", () => {
        if (!scrollIntroFinished) return;

        letters.forEach(l => l.classList.remove("active"));
        letter.classList.add("active");

        const fullText = letter.dataset.desc || "";
        const splitIndex = fullText.indexOf(":") + 1;
        const title = fullText.slice(0, splitIndex).trim();
        const rest = fullText.slice(splitIndex).trim();

        gsap.killTweensOf([titleDiv, textDiv]);
        const tlText = gsap.timeline();
        tlText.to([titleDiv, textDiv], { y: 10, opacity: 0, duration: 0.3 });
        tlText.to(titleDiv, {
          textContent: title,
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        });
        tlText.to(textDiv, {
          textContent: rest,
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.3");
      });

      // 🔥 Do NOT hide on mouseleave anymore — active state handles that
      wrapper.addEventListener("mouseleave", () => {});
    } else {
      // Mobile
      letter.style.cursor = "pointer";
      wrapper.addEventListener("click", () => {
        const fullText = letter.dataset.desc || "";
        const splitIndex = fullText.indexOf(":") + 1;
        const title = fullText.slice(0, splitIndex).trim();
        const rest = fullText.slice(splitIndex).trim();

        titleDiv.textContent = title;
        textDiv.textContent = rest;
        infoBox.style.opacity = "1";

        tooltip.textContent = "click the letter";
      });
    }
  });

  // --- Mobile Init Fallback ---
  if (!isDesktop && letters[1]) {
    titleDiv.textContent = defaultTitle;
    textDiv.textContent = defaultText;
    infoBox.style.opacity = "1";
    tooltip.textContent = "click the letter";
  }
});

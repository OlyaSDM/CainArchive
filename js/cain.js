document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".letter-inner");
  const cainTooltip = document.getElementById("cain-tooltip");
  const infoBox = document.getElementById("cain-desc");
  const titleDiv = infoBox.querySelector(".desc-title");
  const textDiv = infoBox.querySelector(".desc-text");
  const cainSection = document.querySelector(".cain-section");

  const isDesktop = window.innerWidth > 1324;


  if (isDesktop) {
    gsap.set(letters, { y: "100%", opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(letters, { y: "0%", opacity: 1, duration: 1.5, ease: "power3.out", stagger: 0.3 });

    window.addEventListener("scroll", () => {
      const rect = cainSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      let progress = 1 - rect.top / (windowHeight * 0.6);
      progress = Math.min(Math.max(progress, 0), 1);
      gsap.to(tl, { progress: progress, duration: 1.5, ease: "power3.out" });
    });

    // --- Tooltip ---
    cainSection.addEventListener("mousemove", (e) => {
      const rect = cainSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cainTooltip.style.left = x + "px";
      cainTooltip.style.top = y + "px";
    });

    cainSection.addEventListener("mouseenter", () => {
      gsap.to(cainTooltip, { opacity: 1, duration: 0.3 });
    });

    cainSection.addEventListener("mouseleave", () => {
      gsap.to(cainTooltip, { opacity: 0, duration: 0.3 });
    });

    // --- Hover  ---
    letters.forEach(letter => {
      const wrapper = letter.parentElement;

      wrapper.addEventListener("mouseenter", () => {
        const fullText = letter.dataset.desc || "";
        const splitIndex = fullText.indexOf(":") + 1;
        const title = fullText.slice(0, splitIndex).trim();
        const rest = fullText.slice(splitIndex).trim();

        gsap.killTweensOf([titleDiv, textDiv, infoBox]);
        const tlText = gsap.timeline();

        tlText.to([titleDiv, textDiv], { y: 10, opacity: 0, duration: 0.4, ease: "power2.in" });
        tlText.to(infoBox, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "+=0.05");
        tlText.to(titleDiv, { y: 0, opacity: 1, textContent: title, duration: 0.4, ease: "power2.out" }, "-=0.2");
        tlText.to(textDiv, { y: 0, opacity: 1, textContent: rest, duration: 0.4, ease: "power2.out" }, "-=0.25");
      });

      wrapper.addEventListener("mouseleave", () => {
        gsap.killTweensOf([titleDiv, textDiv, infoBox]);
        gsap.to([titleDiv, textDiv, infoBox], { y: 10, opacity: 0, duration: 0.3, ease: "power2.in" });
      });
    });

  } else {
    // --- Tablet/Mobile ---
    letters.forEach(letter => {
      letter.style.transform = "translateY(0)";
      letter.style.opacity = "1";

      const wrapper = letter.parentElement;

      wrapper.addEventListener("click", () => {
        const fullText = letter.dataset.desc || "";
        const splitIndex = fullText.indexOf(":") + 1;
        const title = fullText.slice(0, splitIndex).trim();
        const rest = fullText.slice(splitIndex).trim();

        titleDiv.textContent = title;
        textDiv.textContent = rest;

        infoBox.style.opacity = "1";
      });
    });

    if (letters[0]) {
      const firstText = letters[0].dataset.desc || "";
      const splitIndex = firstText.indexOf(":") + 1;
      titleDiv.textContent = firstText.slice(0, splitIndex).trim();
      textDiv.textContent = firstText.slice(splitIndex).trim();
      infoBox.style.opacity = "1";
    }
  }
});




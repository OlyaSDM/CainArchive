document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".letter-inner");
  const cainSection = document.querySelector(".cain-section");
  const infoBox = document.getElementById("cain-desc");
  const titleDiv = infoBox.querySelector(".desc-title");
  const textDiv = infoBox.querySelector(".desc-text");
  const tooltip = document.querySelector(".cain-tooltip");
  const defaultIndex = 1;
  const isDesktop = window.innerWidth > 1324;
  let scrollIntroFinished = false;

  // GSAP Initialization
  letters.forEach(l => { l.style.transform = "translateY(100%)"; l.style.opacity = "0"; });
  gsap.set([titleDiv, textDiv], { opacity: 0, y: 20 });

  function getDescriptions(lang) {
    const t = translations[lang]?.cainSection;
    return Array.from(letters).map(letter => {
      const key = letter.textContent.trim()[0];
      if (t && t[key]) return { title: t[key].title, text: t[key].text };
      return { title: "", text: "" };
    });
  }

  let currentLang = localStorage.getItem("lang") || "en";
  let descriptions = getDescriptions(currentLang);

  function updateInfoBox(index) {
    const desc = descriptions[index];
    if (!desc) return;

    gsap.to([titleDiv, textDiv], {
      opacity: 0,
      y: 20,
      duration: 0.2,
      onComplete: () => {
        titleDiv.textContent = desc.title;
        textDiv.textContent = desc.text;
        gsap.to([titleDiv, textDiv], { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
      }
    });
  }

  function setActiveLetter(index) {
    letters.forEach(l => l.classList.remove("active"));
    letters[index]?.classList.add("active");
    updateInfoBox(index);
  }

  setActiveLetter(defaultIndex);

  // GSAP timelines
  const tlLetters = gsap.timeline({ paused: true });
  tlLetters.to(letters, { y: "0%", opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.1 });

  const tlDesc = gsap.timeline({ paused: true });
  tlDesc.to(titleDiv, { y: 0, opacity: 1, duration: 0.5 })
        .to(textDiv, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");

  function updateScrollProgress() {
    const rect = cainSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    let progress = 1 - rect.top / (windowHeight * 0.6);
    progress = Math.min(Math.max(progress, 0), 1);

    gsap.to(tlLetters, { progress, duration: 0.2 });
    gsap.to(tlDesc, { progress, duration: 0.1 });

    if (progress >= 0.99 && !scrollIntroFinished) {
      scrollIntroFinished = true;
      setActiveLetter(defaultIndex);
    }
  }

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress);

  // Tooltip
  let mouseX = 0, mouseY = 0, tooltipX = 0, tooltipY = 0;
  const speed = 0.15, offsetX = 25, offsetY = 20;
  document.addEventListener("mousemove", e => { mouseX = e.clientX + offsetX; mouseY = e.clientY + offsetY; });
  function animateTooltip() {
    tooltipX += (mouseX - tooltipX) * speed;
    tooltipY += (mouseY - tooltipY) * speed;
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;
    requestAnimationFrame(animateTooltip);
  }
  animateTooltip();
  let showTimeout, hideTimeout;
  cainSection.addEventListener("mouseenter", () => { clearTimeout(hideTimeout); showTimeout = setTimeout(() => tooltip.classList.add("visible"), 100); });
  cainSection.addEventListener("mouseleave", () => { clearTimeout(showTimeout); hideTimeout = setTimeout(() => tooltip.classList.remove("visible"), 60); });

  // Hover / click letters
  letters.forEach((letter, i) => {
    const wrapper = letter.parentElement;
    if (!wrapper) return;

    const activateLetter = () => {
      letters.forEach(l => l.classList.remove("active"));
      letter.classList.add("active");
      updateInfoBox(i);
    };

    if (isDesktop) wrapper.addEventListener("mouseenter", () => { if (scrollIntroFinished) activateLetter(); });
    else { letter.style.cursor = "pointer"; wrapper.addEventListener("click", activateLetter); }
  });

  if (!isDesktop) { infoBox.style.opacity = "1"; setActiveLetter(defaultIndex); }

  // Update when changing language
  document.addEventListener("languageChange", (e) => {
    currentLang = e.detail.lang;
    descriptions = getDescriptions(currentLang);
    const activeIndex = Array.from(letters).findIndex(l => l.classList.contains("active")) || defaultIndex;
    setActiveLetter(activeIndex);
  });
});

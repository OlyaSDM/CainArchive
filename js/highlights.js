gsap.registerPlugin(ScrollTrigger);

// Title animation
const title = document.querySelector(".highlights-title");
const titleText = title.textContent.trim();
title.textContent = "";

const half = Math.ceil(titleText.length / 2);
titleText.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char;
  if (i < half) span.style.color = "#219EBC";
  title.appendChild(span);
});

// GSAP for letters
gsap.set(".highlights-title span", {
  x: -80,
  opacity: 0,
  rotateY: -120,
  rotateX: 8,
  scale: 0.6,
});

gsap.to(".highlights-title span", {
  x: 0,
  opacity: 1,
  rotateY: 0,
  rotateX: 0,
  scale: 1,
  duration: 6,
  ease: "power2.out",
  stagger: 1.05,
  scrollTrigger: {
    trigger: ".highlights",
    start: "top 90%",
    end: "top 10%",
    scrub: true,
  },
});

// Cards animation on scroll
gsap.utils.toArray(".card").forEach((card) => {
  gsap.fromTo(
    card,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        end: "top 50%",
        scrub: true,
      },
    }
  );
});

// Hover + click animation for cards
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  const extra = card.querySelector(".extra");
  const toggleButton = card.querySelector(".card-arrow-wrapper");
  const fullText = extra.textContent.trim();
  extra.dataset.full = fullText;

  // Hover GSAP
  const cardTween = gsap.to(card, {
    minHeight: 300,
    boxShadow: "0 5px 20px rgba(33, 158, 188, 0.5)",
    duration: 4.8,
    ease: "power1.out",
    paused: true,
  });
  const textTween = gsap.to(extra, {
    minHeight: 300,
    opacity: 1,
    duration: 4.0,
    ease: "power1.out",
    paused: true,
  });

  let interval;

  // Hover
  card.addEventListener("mouseenter", () => {
    cardTween.play();
    textTween.play();
    extra.textContent = "";
    let i = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      extra.textContent += fullText[i];
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 40);
  });

  card.addEventListener("mouseleave", () => {
    if (!card.classList.contains("active")) {
      cardTween.reverse();
      textTween.reverse();
    }
    clearInterval(interval);
  });

  // Click toggle
  toggleButton.addEventListener("click", (e) => {
    e.stopPropagation();
    card.classList.toggle("active");

    if (card.classList.contains("active")) {
      cardTween.play();
      textTween.play();
    } else {
      cardTween.reverse();
      textTween.reverse();
    }
  });
});

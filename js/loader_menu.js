window.addEventListener('load', () => {
  const delayed = document.querySelectorAll('.delayed');
  if (!delayed.length) return;

  gsap.to(delayed, {
    duration: 1.2,
    opacity: 1,
    y: 0,
    ease: "power2.out",
    delay: 2.6
  });
});

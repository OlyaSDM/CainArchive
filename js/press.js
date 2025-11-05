document.addEventListener("DOMContentLoaded", () => {
  let currentLang = localStorage.getItem('lang') || "en";

  const translations = {
    en: {
      "nav.press": "Home",
      "nav.collections": "Collections",
      "nav.voices": "Voices & Dialogues",
      "nav.rentals": "Exhibitions & Collaborations",
      "contact.founderTitle": "Founder & Director | Cain Archive",
      "contact.coordinatorTitle": "Institutional & Archive Coordinator | Cain Archive",
      "footer.slogan": ["History that shapes ", "Tomorrow"],
      "footer.founder.title": "Founder & Director | Cain Archive",
      "footer.founder.email": "john@cainarchive.com",
      "footer.founder.phone": "+1 561 884 0648",
      "footer.coordinator.title": "Institutional & Archive Coordinator | Cain Archive",
      "footer.coordinator.email": "dina.kriukova@cainarchive.com",
      "footer.copyright": "© 2025 Cain Archive. All Rights Reserved.",
      "footer.protectedText": "Original vintage photographs are displayed for documentary, educational, and research purposes. Cain Archive holds physical ownership of the original prints but does not claim copyright to the underlying images. Unauthorized reproduction or commercial use is prohibited.",
      "press.title": "Press on Us",
      "press.subtitle": "Discover what leading publications are saying about Cain Archive",
      "press.watchMore": "Watch More"
    },
    ar: {
      "nav.press": "الصفحة الرئيسية",
      "nav.collections": "المجموعات",
      "nav.voices": "الأصوات والحوار",
      "nav.rentals": "المعارض والتعاون",
      "contact.founderTitle": "المؤسس والمدير | Cain الأرشيف",
      "contact.coordinatorTitle": "منسقة المؤسسات والأرشيف | Cain الأرشيف",
      "footer.slogan": ["التاريخ الذي يشكل ", "الغد"],
      "footer.founder.title": "المؤسس والمدير | Cain الأرشيف",
      "footer.founder.email": "john@cainarchive.com",
      "footer.founder.phone": "+1 561 884 0648",
      "footer.coordinator.title": "منسقة المؤسسات والأرشيف | Cain الأرشيف",
      "footer.coordinator.email": "dina.kriukova@cainarchive.com",
      "footer.copyright": "© 2025 Cain الأرشيف. جميع الحقوق محفوظة.",
      "footer.protectedText": "يتم عرض الصور الفوتوغرافية الأصلية القديمة لأغراض توثيقية وتعليمية وبحثية. Cain الأرشيف يحتفظ بالملكية المادية للنسخ الأصلية، ولكنه لا يطالب بحقوق الطبع والنشر للصور. يُحظر النسخ أو الاستخدام التجاري غير المصرح به.",
      "press.title": "تغطيتنا الإعلامية",
      "press.subtitle": "اكتشف ما تقوله المنشورات الرائدة عن Cain الأرشيف",
      "press.watchMore": "شاهد المزيد"
    },
    ja: {
      "nav.press": "ホーム",
      "nav.collections": "コレクション",
      "nav.voices": "声と対話",
      "nav.rentals": "展示会とコラボレーション",
      "contact.founderTitle": "創設者兼ディレクター | Cain アーカイブ",
      "contact.coordinatorTitle": "機関・アーカイブコーディネーター | Cain アーカイブ",
      "footer.slogan": ["未来を形作る", "明日"],
      "footer.founder.title": "創設者兼ディレクター | Cain アーカイブ",
      "footer.founder.email": "john@cainarchive.com",
      "footer.founder.phone": "+1 561 884 0648",
      "footer.coordinator.title": "機関・アーカイブコーディネーター | Cain アーカイブ",
      "footer.coordinator.email": "dina.kriukova@cainarchive.com",
      "footer.copyright": "© 2025 Cain アーカイブ. 無断転載禁止。",
      "footer.protectedText": "オリジナルのヴィンテージ写真は、記録・教育・研究目的で展示されています。Cain アーカイブは原本の所有権を有しますが、画像の著作権を主張しません。無断複製・商用利用は禁止されています。",
      "press.title": "私たちの報道",
      "press.subtitle": "主要な出版物が Cain アーカイブについて語る内容をご覧ください",
      "press.watchMore": "もっと見る"
    },
    es: {
      "nav.press": "Inicio",
      "nav.collections": "Colecciones",
      "nav.voices": "Voces y Diálogos",
      "nav.rentals": "Exposiciones y Colaboraciones",
      "contact.founderTitle": "Fundador y Director | Cain Archivo",
      "contact.coordinatorTitle": "Coordinadora Institucional y de Archivo | Cain Archivo",
      "footer.slogan": ["Historia que da forma al ", "mañana"],
      "footer.founder.title": "Fundador y Director | Cain Archivo",
      "footer.founder.email": "john@cainarchive.com",
      "footer.founder.phone": "+1 561 884 0648",
      "footer.coordinator.title": "Coordinadora Institucional y de Archivo | Cain Archivo",
      "footer.coordinator.email": "dina.kriukova@cainarchive.com",
      "footer.copyright": "© 2025 Cain Archivo. Todos los derechos reservados.",
      "footer.protectedText": "Las fotografías originales se presentan con fines documentales, educativos e investigativos. Cain Archivo posee físicamente las copias originales, pero no reclama derechos de autor sobre las imágenes. Se prohíbe la reproducción o el uso comercial no autorizado.",
      "press.title": "Prensa sobre nosotros",
      "press.subtitle": "Descubre lo que dicen las principales publicaciones sobre Cain Archivo",
      "press.watchMore": "Ver más"
    },
    zh: {
      "nav.press": "首页",
      "nav.collections": "藏品",
      "nav.voices": "声音与对话",
      "nav.rentals": "展览与合作",
      "contact.founderTitle": "创始人兼馆长 | Cain 档案",
      "contact.coordinatorTitle": "机构与档案协调员 | Cain 档案",
      "footer.slogan": ["塑造", "明天"],
      "footer.founder.title": "创始人兼馆长 | Cain 档案",
      "footer.founder.email": "john@cainarchive.com",
      "footer.founder.phone": "+1 561 884 0648",
      "footer.coordinator.title": "机构与档案协调员 | Cain 档案",
      "footer.coordinator.email": "dina.kriukova@cainarchive.com",
      "footer.copyright": "© 2025 Cain 档案 版权所有。",
      "footer.protectedText": "展示的原版老照片仅供文献、教育和研究用途。Cain 档案 拥有原始照片的实物所有权，但不主张图片的版权。禁止未经授权的复制或商业使用。",
      "press.title": "媒体报道",
      "press.subtitle": "了解各大媒体对 Cain 档案 的评价",
      "press.watchMore": "查看更多"
    }
  };

  const updateTranslations = (lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");

      if (key === "footer.slogan" && Array.isArray(translations[lang][key])) {
        const [before, after] = translations[lang][key];
        const span = el.querySelector("span");
        if (span) {
          span.textContent = after;
          if (el.firstChild) el.firstChild.textContent = before;
        } else {
          el.textContent = before + after;
        }
      } else if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  };

  // -------------------------
  // Language switcher
  // -------------------------
  const langSwitcher = document.getElementById('langSwitcher');
  const langToggle = document.getElementById('lang-toggle');
  const langMenu = document.getElementById('lang-menu');
  const langCurrent = document.getElementById('lang-current');

  function setLanguage(lang) {
    updateTranslations(lang);
    langCurrent.textContent = langMenu.querySelector(`li[data-lang="${lang}"]`).textContent;
    langMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    langMenu.querySelector(`li[data-lang="${lang}"]`)?.classList.add('active');
  }

  if (langSwitcher && langToggle && langMenu) {
    setLanguage(currentLang);

    langToggle.addEventListener('click', e => {
      e.stopPropagation();
      langSwitcher.classList.toggle('open');
      langToggle.setAttribute('aria-expanded', langSwitcher.classList.contains('open'));
    });

    langMenu.querySelectorAll('li').forEach(option => {
      option.addEventListener('click', () => {
        setLanguage(option.dataset.lang);
        langSwitcher.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', e => {
      if (!langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setLanguage(lang) {
    updateTranslations(lang);
    langCurrent.textContent = langMenu.querySelector(`li[data-lang="${lang}"]`).textContent;
    langMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    langMenu.querySelector(`li[data-lang="${lang}"]`)?.classList.add('active');
  }

  const splitTextToLetters = (el) => {
    const text = el.textContent || "";
    el.textContent = "";
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      if (char !== " ") span.classList.add("letter-inner");
      else span.appendChild(document.createTextNode(" "));
      el.appendChild(span);
    });
  };

  document.querySelectorAll(".letter-section").forEach(section => {
    const headings = section.querySelectorAll("h3");
    headings.forEach(h3 => {
      splitTextToLetters(h3);
      h3.style.visibility = "visible";
    });

    const letters = section.querySelectorAll(".letter-inner");
    if (!letters.length) return;

    gsap.set(letters, { y: "100%", opacity: 0 });
    gsap.to(letters, {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 40%",
        toggleActions: "play none none reverse"
      }
    });
  });

  const pressItems = document.querySelectorAll(".press-item");
  const popupWindow = document.getElementById("popup-window");
  const closePopupBtn = document.getElementById("close-popup-btn");
  const pdfPopup = document.getElementById("pdf-popup");
  const popupText = document.querySelector(".popup-p");

  const openPopup = (pdfFile) => {
    if (!pdfFile) return;
    pdfPopup.setAttribute("src", `${pdfFile}#toolbar=0&navpanes=0&scrollbar=0`);
    popupWindow.classList.add("show");
    document.body.style.overflow = "hidden";
    gsap.set(popupText, { opacity: 0 });
    setTimeout(() => gsap.to(popupText, { opacity: 1, duration: 1 }), 500);
  };

  const closePopup = () => {
    popupWindow.classList.remove("show");
    pdfPopup.setAttribute("src", "");
    document.body.style.overflow = "";
    gsap.set(popupText, { opacity: 0 });
  };

  pressItems.forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      openPopup(item.getAttribute("data-pdf"));
    });
  });

  if (closePopupBtn) closePopupBtn.addEventListener("click", closePopup);
  if (popupWindow) popupWindow.addEventListener("click", e => {
    if (e.target === popupWindow) closePopup();
  });

  // --- Watch More ---
  const watchMoreBtn = document.querySelector(".watch-more-btn");
  const allItems = document.querySelectorAll(".press-item");

  const showItems = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    allItems.forEach((item, i) => item.style.display = (isMobile ? i < 3 : true) ? "block" : "none");
    if (watchMoreBtn) watchMoreBtn.style.display = (isMobile ? "block" : "none");
  };

  showItems();
  window.addEventListener("resize", showItems);

  if (watchMoreBtn) {
    watchMoreBtn.addEventListener("click", () => {
      allItems.forEach(item => (item.style.display = "block"));
      watchMoreBtn.style.display = "none";
    });
  }
});
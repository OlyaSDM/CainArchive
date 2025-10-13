const translations = {
  en: {
    nav: {
      mission: "Our Mission",
      collections: "Collections",
      voices: "Voices & Dialogues",
      rentals: "Exhibitions & Collaborations",
      press: "Press",
    },
    contact: {
      founderTitle: "Founder & Director | Cain Archive",
      coordinatorTitle: "Institutional & Archive Coordinator | Cain Archive",
    },
    footer: {
      heading: 'History that shapes <span>Tomorrow</span>',
      founder: {
        name: 'John Cain',
        title: 'Founder & Director | Cain Archive',
        email: 'john@cainarchive.com',
        phone: '+1 561 884 06 48',
      },
      coordinator: {
        name: 'Dina Kriukova-Lichman',
        title: 'Institutional & Archive Coordinator | Cain Archive',
        email: 'dina.kriukova@cainarchive.com',
      },
      copyright: '© 2025 Cain Archive. All rights reserved.',
    },
  },

  ar: {
    nav: {
      mission: "مهمتنا",
      collections: "المجموعات",
      voices: "أصوات المناصرة",
      rentals: "المعارض والإيجارات",
      press: "الصحافة",
    },
    contact: {
      founderTitle: "المؤسس والمدير | أرشيف كاين",
      coordinatorTitle: "منسق المؤسسات والأرشيف | أرشيف كاين",
    },
    footer: {
      heading: 'التاريخ <span>الذي يشكل الغد</span>',
      founder: {
        name: 'جون كاين',
        title: 'المؤسس والمدير | أرشيف كاين',
        email: 'john@cainarchive.com',
        phone: '+1 561 884 0648',
      },
      coordinator: {
        name: 'دينا كريوكوفا-ليتشمان',
        title: 'منسق المؤسسات والأرشيف | أرشيف كاين',
        email: 'dina.kriukova@cainarchive.com',
      },
      copyright: '© 2025 أرشيف كاين. جميع الحقوق محفوظة.',
    },
  },

  ja: {
    nav: {
      mission: "私たちの使命",
      collections: "コレクション",
      voices: "アドボカシーの声",
      rentals: "展示会とレンタル",
      press: "プレス",
    },
    contact: {
      founderTitle: "創設者兼ディレクター | カインアーカイブ",
      coordinatorTitle: "機関およびアーカイブコーディネーター | カインアーカイブ",
    },
    footer: {
      heading: '歴史 <span>が明日を形作る</span>',
      founder: {
        name: 'ジョン・ケイン',
        title: '創設者兼ディレクター | カインアーカイブ',
        email: 'john@cainarchive.com',
        phone: '+1 561 884 0648',
      },
      coordinator: {
        name: 'ディナ・クリュコヴァ＝リチマン',
        title: '機関およびアーカイブコーディネーター | カインアーカイブ',
        email: 'dina.kriukova@cainarchive.com',
      },
      copyright: '© 2025 カインアーカイブ。無断転載を禁じます。',
    },
  },

  es: {
    nav: {
      mission: "Nuestra misión",
      collections: "Colecciones",
      voices: "Voces de defensa",
      rentals: "Exposiciones y alquileres",
      press: "Prensa",
    },
    contact: {
      founderTitle: "Fundador y Director | Archivo Cain",
      coordinatorTitle: "Coordinadora Institucional y de Archivo | Archivo Cain",
    },
    footer: {
      heading: 'Historia que da forma <span>al mañana</span>',
      founder: {
        name: 'John Cain',
        title: 'Fundador y Director | Archivo Cain',
        email: 'john@cainarchive.com',
        phone: '+1 561 884 0648',
      },
      coordinator: {
        name: 'Dina Kriukova-Lichman',
        title: 'Coordinadora Institucional y de Archivo | Archivo Cain',
        email: 'dina.kriukova@cainarchive.com',
      },
      copyright: '© 2025 Archivo Cain. Todos los derechos reservados.',
    },
  },

  zh: {
    nav: {
      mission: "我们的使命",
      collections: "藏品",
      voices: "倡导之声",
      rentals: "展览与租赁",
      press: "媒体",
    },
    contact: {
      founderTitle: "创始人兼主任 | 凯恩档案馆",
      coordinatorTitle: "机构与档案协调员 | 凯恩档案馆",
    },
    footer: {
      heading: '塑造 <span>明天</span> 的历史',
      founder: {
        name: '约翰·凯恩',
        title: '创始人兼主任 | 凯恩档案馆',
        email: 'john@cainarchive.com',
        phone: '+1 561 884 0648',
      },
      coordinator: {
        name: '迪娜·克里乌科娃-利奇曼',
        title: '机构与档案协调员 | 凯恩档案馆',
        email: 'dina.kriukova@cainarchive.com',
      },
      copyright: '© 2025 凯恩档案馆。版权所有。',
    },
  },
};

// HELPERS 
const getValue = (obj, path) => {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, key) => acc && acc[key] !== undefined ? acc[key] : undefined, obj);
};

const applyText = (el, text) => {
  if (!el || text == null) return;
  if (el.dataset?.attr) {
    el.setAttribute(el.dataset.attr, text);
    return;
  }
  if (["input", "textarea"].includes(el.tagName.toLowerCase())) {
    el.placeholder = text;
  } else {
    el.innerHTML = text;
  }
};

// TRANSLATION LOGIC 
const setLanguage = (lang) => {
  const t = translations[lang];
  if (!t) return;

  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-key]").forEach((el) => {
    const value = getValue(t, el.dataset.key);
    if (value != null) applyText(el, value);
  });

  document.dispatchEvent(new CustomEvent("languageChange", { detail: { lang } }));

  const currentLangEl = document.getElementById("lang-current");
  if (currentLangEl) currentLangEl.textContent = lang.toUpperCase();
};

//INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  const langSwitcher = document.getElementById("langSwitcher");
  const langToggle = document.getElementById("lang-toggle");
  const langMenu = document.getElementById("lang-menu");
  const langCurrent = document.getElementById("lang-current");

  const savedLang = localStorage.getItem("lang") || "en";
  setLanguage(savedLang);

  langToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    langSwitcher.classList.toggle("open");
    langToggle.setAttribute("aria-expanded", langSwitcher.classList.contains("open"));
  });

  langMenu.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", () => {
      const selectedLang = option.getAttribute("data-lang");
      langSwitcher.classList.remove("open");
      langToggle.setAttribute("aria-expanded", "false");
      setLanguage(selectedLang);
    });
  });

  document.addEventListener("click", (e) => {
    if (!langSwitcher.contains(e.target)) {
      langSwitcher.classList.remove("open");
      langToggle.setAttribute("aria-expanded", "false");
    }
  });
});

/***************************************************
==================== JS INDEX ======================
01. Site Loader (Preloader Hide on Load)
02. Mobile Sidebar Drawer (Hamburger Menu Toggle)
03. Hero Client/Mission/Vision Tabs Slider (Swiper)
04. Services Cards Slider (Swiper) + Desktop Active Card Fix
05. Works / Projects Filter Tabs + Counter
06. Works / Projects Slider (Swiper)
07. Testimonials Slider (Swiper)
08. Arrow Button Draw Animation (GSAP Line Draw on Hover)
09. Lenis Smooth Scroll + GSAP ScrollTrigger Sync
10. Hero Floating Image Parallax (ScrollTrigger)
11. Generic Image Parallax (.parallax-wrap / .parallax-img)
12. Background Image Parallax (Why Choose Us / Banner)
13. About Section Stats Ball Swap Animation
****************************************************/


/***************************************************
 * 01. Site Loader (Preloader Hide on Load)
 ***************************************************/
window.addEventListener("load", () => {
  const loader = document.getElementById("site-loader");
  setTimeout(() => {
    loader.classList.add("opacity-0", "invisible", "pointer-events-none");
    setTimeout(() => loader.remove(), 700);
  }, 400);
});


/***************************************************
 * 02. Mobile Sidebar Drawer (Hamburger Menu Toggle)
 ***************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const menuToggles = document.querySelectorAll(".hamburger-menu, .hamburger-menu-sticky");
  const sidebar = document.getElementById("mobile-sidebar");
  const overlay = document.getElementById("mobile-sidebar-overlay");
  const sidebarClose = document.getElementById("sidebar-close");
  const sidebarLinks = sidebar.querySelectorAll("nav a");

  function openSidebar() {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("opacity-0", "invisible");
    document.body.classList.add("overflow-hidden");
  }

  function closeSidebar() {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("opacity-0", "invisible");
    document.body.classList.remove("overflow-hidden");
  }

  menuToggles.forEach((toggle) => toggle.addEventListener("click", openSidebar));
  sidebarClose.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
  sidebarLinks.forEach((link) => link.addEventListener("click", closeSidebar));
});


/***************************************************
 * 03. Hero Client/Mission/Vision Tabs Slider (Swiper)
 ***************************************************/
const tabsSwiper = new Swiper(".tabs-swiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  grabCursor: true,
  loop: true,
  speed: 1000, // Smooth transition (1 second)

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});


/***************************************************
 * 04. Services Cards Slider (Swiper) + Desktop Active Card Fix
 ***************************************************/
const servicesSwiper = new Swiper(".services-swiper", {
  slidesPerView: 1.15,
  centeredSlides: true,
  loop: false,
  initialSlide: 1,
  spaceBetween: 24,
  speed: 500,
  grabCursor: true,
  navigation: {
    nextEl: ".services-next",
    prevEl: ".services-prev",
  },
  pagination: {
    el: ".services-pagination",
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 1.6, centeredSlides: true },
    1024: { slidesPerView: 2.4, centeredSlides: true },
    1280: { slidesPerView: 3, centeredSlides: false },
  },
});

function forceDesktopActiveCard() {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    const slides = document.querySelectorAll(".services-swiper .swiper-slide");
    slides.forEach((slide, i) => {
      slide.classList.toggle("swiper-slide-active", i === 1);
    });
  }
}

servicesSwiper.on("init", () => setTimeout(forceDesktopActiveCard, 0));
servicesSwiper.on("resize", () => setTimeout(forceDesktopActiveCard, 0));
servicesSwiper.on("breakpoint", () => setTimeout(forceDesktopActiveCard, 0));
window.addEventListener("resize", forceDesktopActiveCard);
setTimeout(forceDesktopActiveCard, 0);


/***************************************************
 * 05. Works / Projects Filter Tabs + Counter
 ***************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".work-tab");
  const slides = document.querySelectorAll(".works-swiper .work-item");

  const getCount = (filter) => {
    let count = 0;
    slides.forEach((slide) => {
      const cats = slide.dataset.category.split(" ");
      if (filter === "all" || cats.includes(filter)) count++;
    });
    return count;
  };

  tabs.forEach((tab) => {
    const sup = tab.querySelector("sup");
    if (sup) sup.textContent = getCount(tab.dataset.filter);
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter;

      tabs.forEach((t) => {
        t.classList.remove("text-[#111]", "active");
        t.classList.add("text-[#999]");
      });
      tab.classList.remove("text-[#999]");
      tab.classList.add("text-[#111]", "active");

      slides.forEach((slide) => {
        const cats = slide.dataset.category.split(" ");
        const show = filter === "all" || cats.includes(filter);
        slide.style.display = show ? "block" : "none";
      });

      worksSwiper.slideTo(0, 0);
      worksSwiper.update();
    });
  });
});


/***************************************************
 * 06. Works / Projects Slider (Swiper)
 ***************************************************/
(function () {
  const worksV2Swiper = new Swiper('.works-v2-swiper', {
  centeredSlides: true,
  loop: false,
  slidesPerView: 1,          // ✅ mobile: full-width, no bleed
  spaceBetween: 16,
  speed: 650,
  grabCursor: true,
  watchSlidesProgress: true,

  autoplay: {                 // ✅ auto-slide every few seconds
    delay: 3500,
    disableOnInteraction: false, // manual swipe ke baad bhi autoplay chalta rahega
    pauseOnMouseEnter: true,     // hover pe pause — desktop pe nice touch
  },

  breakpoints: {
    640:  { slidesPerView: 1.4,  spaceBetween: 24 }, // peek effect yahan se start
    1024: { slidesPerView: 1.8,  spaceBetween: 32 },
    1280: { slidesPerView: 2.2,  spaceBetween: 40 },
  },

  navigation: {
    nextEl: '.works-v2-next',
    prevEl: '.works-v2-prev',
  },

  on: {
    init: syncActiveSlide,
    slideChange: syncActiveSlide,
    setTransition: applyDepthStyles,
    progress: applyDepthStyles,
  },
});

  function applyDepthStyles(swiper) {
    swiper.slides.forEach((slideEl) => {
      const progress = slideEl.progress;
      const distance = Math.min(Math.abs(progress), 2);
      const scale = 1 - distance * 0.12;
      const opacity = 1 - distance * 0.35;
      slideEl.style.transform = `scale(${Math.max(scale, 0.72)})`;
      slideEl.style.opacity = Math.max(opacity, 0.25);
    });
  }

  function syncActiveSlide(swiper) {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const title = activeSlide.dataset.title || '';
    const desc  = activeSlide.dataset.desc  || '';
    const tags  = (activeSlide.dataset.tags || '').split(',').map(t => t.trim()).filter(Boolean);

    const titleEl = document.getElementById('worksV2Title');
    const descEl  = document.getElementById('worksV2Desc');
    const tagsEl  = document.getElementById('worksV2Tags');

    [titleEl, descEl].forEach(el => el.style.opacity = 0);

    setTimeout(() => {
      titleEl.textContent = title;
      descEl.textContent  = desc;
      tagsEl.innerHTML = tags.map(tag =>
        `<span class="text-[13px] font-secondary text-[#666] border border-[#11111126] rounded-full px-4 py-1.5">${tag}</span>`
      ).join('');
      titleEl.style.opacity = 1;
      descEl.style.opacity  = 1;
    }, 180);
  }

  // ✅ hide arrows automatically when the filtered set can't actually scroll
  function toggleNavVisibility(swiper) {
    const prevBtn = document.querySelector('.works-v2-prev');
    const nextBtn = document.querySelector('.works-v2-next');
    const canScroll = !(swiper.isBeginning && swiper.isEnd);
    prevBtn.style.display = canScroll ? '' : 'none';
    nextBtn.style.display = canScroll ? '' : 'none';
  }

  const tabs = document.querySelectorAll('.work-v2-tab');
  const allItems = document.querySelectorAll('.work-v2-item');

  function updateCounts() {
    tabs.forEach(tab => {
      const filter = tab.dataset.filter;
      const count = filter === 'all'
        ? allItems.length
        : Array.from(allItems).filter(el => el.dataset.category.split(' ').includes(filter)).length;
      tab.querySelector('sup').textContent = count;
    });
  }

  function applyFilter(filter) {
    allItems.forEach(el => {
      const match = filter === 'all' || el.dataset.category.split(' ').includes(filter);
      el.style.display = match ? '' : 'none';
    });
    worksV2Swiper.update();
    worksV2Swiper.slideTo(0, 0);   // no more slideToLoop, loop is off
    syncActiveSlide(worksV2Swiper);
    toggleNavVisibility(worksV2Swiper);
  }

 tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active', 'border-black', 'text-[#111]'));
    tabs.forEach(t => t.classList.add('border-transparent'));
    tab.classList.remove('border-transparent');
    tab.classList.add('active', 'border-black', 'text-[#111]');
    applyFilter(tab.dataset.filter);
  });
});

  updateCounts();
  toggleNavVisibility(worksV2Swiper);
})();

/***************************************************
 * 07. Testimonials Slider (Swiper)
 ***************************************************/
const testimonialsSwiper = new Swiper(".testimonials-swiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  navigation: {
    nextEl: ".testimonials-next",
    prevEl: ".testimonials-prev",
  },
  pagination: {
    el: ".testimonials-pagination",
    type: "fraction",
  },
});


/***************************************************
 * 08. Arrow Button Draw Animation (GSAP Line Draw on Hover)
 ***************************************************/
document.querySelectorAll(".arrow-btn").forEach((btn) => {
  const paths = btn.querySelectorAll(".arrow-line, .arrow-head");

  // Show initially
  paths.forEach((path) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: 0, // visible
    });
  });

  btn.addEventListener("mouseenter", () => {
    // Hide instantly
    paths.forEach((path) => {
      gsap.set(path, {
        strokeDashoffset: path.getTotalLength(),
      });
    });

    // Draw again
    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    });
  });
});


/***************************************************
 * 09. Lenis Smooth Scroll + GSAP ScrollTrigger Sync
 ***************************************************/
const lenis = new Lenis({
  autoRaf: true,
});

// lenis.on("scroll", ScrollTrigger.update);


/***************************************************
 * 10. Hero Floating Image Parallax (ScrollTrigger)
 ***************************************************/
gsap.registerPlugin(ScrollTrigger);

const heroFloatImg = document.getElementById("hero-float-img");
if (heroFloatImg) {
  gsap.to(heroFloatImg, {
    x: 100,
    ease: "none",
    scrollTrigger: {
      trigger: heroFloatImg.closest("section"),
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}


/***************************************************
 * 11. Generic Image Parallax (.parallax-wrap / .parallax-img)
 ***************************************************/
document.querySelectorAll(".parallax-wrap").forEach((wrap) => {
  const img = wrap.querySelector(".parallax-img");
  if (!img) return;

  gsap.fromTo(
    img,
    { yPercent: -30 },
    {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        
      },
    }
  );
});





/***************************************************
 * 13. About Section Stats Ball Swap Animation
 ***************************************************/
const balls = document.querySelectorAll(".stats-ball");

balls.forEach((ball) => {
  ball.addEventListener("click", () => {
    if (ball.classList.contains("active")) return;

    const active = document.querySelector(".stats-ball.active");

    // Swap left positions
    const activeLeft = active.style.left || getComputedStyle(active).left;
    const clickedLeft = ball.style.left || getComputedStyle(ball).left;

    active.style.left = clickedLeft;
    ball.style.left = activeLeft;

    // Swap z-index
    active.style.zIndex = "1";
    ball.style.zIndex = "2";

    // Rotate clicked ball
    ball.style.transform = "rotate(360deg)";
    active.style.transform = "rotate(0deg)";

    active.classList.remove("active");
    ball.classList.add("active");
  });
});
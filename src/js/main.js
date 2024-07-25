var images = document.images,
  images_total_count = images.length,
  images_loaded_count = 0;
perc_display = document.getElementById("load_perc");
progress_bar = document.getElementById("progress");

for (var i = 0; i < images_total_count; i++) {
  image_clone = new Image();
  image_clone.onload = image_loaded;
  image_clone.onerror = image_loaded;
  image_clone.src = images[i].src;
}

function image_loaded() {
  images_loaded_count++;
  progress_bar.style.width = `${
    (100 / images_total_count) * images_loaded_count
  }%`;
  perc_display.innerHTML =
    (((100 / images_total_count) * images_loaded_count) << 0) + "%";

  if (images_loaded_count >= images_total_count) {
    document.body.onload = function () {
      var preloader = document.getElementById("page-preloader");
      setTimeout(function () {
        if (!preloader.classList.contains("done")) {
          preloader.classList.add("done");
        }
      }, 200);
    };
  }
}


function openTab(event, id) {
  var i, content, btn;

  closestImage1 = document.querySelector(".main-tab-1");
  closestImage2 = document.querySelector(".main-tab-2");
  closestImage3 = document.querySelector(".main-tab-3");
  defaultImage = document.querySelector(".defaul-image");
  content = document.getElementsByClassName("item-tabs-base__img");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
    content[i].style.animation = "fadein 0.5s ease-in-out";
  }

  btn = document.getElementsByClassName("nav-tabs-base__item");
  for (i = 0; i < btn.length; i++) {
    btn[i].className = btn[i].className.replace(" is-active", "");
  }

  document.getElementById(id).style.display = "block";
  event.currentTarget.className += " is-active";

  if (event.type === "mouseout") {
    closestImage1.style.display = "none";
    closestImage2.style.display = "none";
    closestImage3.style.display = "none";
    defaultImage.style.display = "block";
  }
}


const defImage = document.querySelector(".defaul-image");

const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
  }
  animOnScroll();
}

const burgerIcon = document.querySelector(".burger");
const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".menu");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const header = document.querySelector(".header");
const menus = document.querySelector(".menus");

if (burgerIcon) {
  burgerIcon.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    burger.classList.toggle("active");
    menu.classList.toggle("active");
    main.classList.toggle("active");
    footer.classList.toggle("active");
    header.classList.toggle("active");
    menus.classList.toggle("active");
  });
}

const accordionItems = document.querySelectorAll(".accordion-item");

for (let i = 0; i < accordionItems.length; i++) {
  accordionItems[i].addEventListener("click", function () {
    this.classList.toggle("active");

    for (let j = 0; j < accordionItems.length; j++) {
      if (accordionItems[j] !== this) {
        accordionItems[j].classList.remove("active");
      }
    }
  });
}

let link = document.querySelectorAll(".menu__link");

for (i = 0; i < link.length; i++) {
  let subMenu = link[i].nextElementSibling;
  let thisLink = link[i];
  link[i].addEventListener("click", function () {
    subMenu.classList.toggle("open");
    thisLink.classList.toggle("active");
  });
}

let subLink = document.querySelectorAll(".sub-menu__link");
for (i = 0; i < subLink.length; i++) {
  let subSubMenu = subLink[i].nextElementSibling;
  let thisSubLink = subLink[i];
  subLink[i].addEventListener("click", function () {
    subSubMenu.classList.toggle("open");
    thisSubLink.classList.toggle("active");

    for (let j = 0; j < subLink.length; j++) {
      if (subLink[j] !== this) {
        subLink[j].classList.remove("active");
        subLink[j].nextElementSibling.classList.remove("open");
      }
    }
  });
}

let projectTab = function () {
  let projectTabNav = document.querySelectorAll(".nav-project__item"),
    projectTabContent = document.querySelectorAll(".project__body"),
    projectTabName;

  projectTabNav.forEach((item) => {
    item.addEventListener("click", selectProjectTabNav);
  });

  function selectProjectTabNav() {
    projectTabNav.forEach((item) => {
      item.classList.remove("is-active");
    });
    this.classList.add("is-active");
    projectTabName = this.getAttribute("data-tab-name");
    selectProjectTabContent(projectTabName);
  }

  function selectProjectTabContent(projectTabName) {
    projectTabContent.forEach((item) => {
      item.classList.contains(projectTabName)
        ? item.classList.add("is-active")
        : item.classList.remove("is-active");
    });

    projectTabContent.forEach((item) => {
      item.style.animation = "fadein 1s ease";
    });
  }
};
projectTab();

const anchors = document.querySelectorAll("a[href*='#']");

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const blockID = anchor.getAttribute("href");
    document.querySelector(" " + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

const swiperProducts = new Swiper(".products__body", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: { slidesPerView: 1.4, spaceBetween: 20 },

    485: { slidesPerView: 1.65 },

    740: { slidesPerView: 1.95, spaceBetween: 40 },

    1100: { slidesPerView: 2.95 },

    1620: { slidesPerView: 3.95 },
  },
  scrollbar: {
    el: ".swiper-scrollbar",

    draggable: true,
  },
});

const swiperTeam = new Swiper(".team__body", {
  navigation: {
    nextEl: ".team-next",
    prevEl: ".team-prev",
  },

  breakpoints: {
    320: { slidesPerView: 1.35, spaceBetween: 20 },

    485: { slidesPerView: 1.8 },

    740: { slidesPerView: 3.4, spaceBetween: 40 },

    1100: { slidesPerView: 4.4 },

    1620: { slidesPerView: 5.7 },
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

const swiperPhoto = new Swiper(".photo-items__wrapper", {
  navigation: {
    nextEl: ".photo-items-next",
    prevEl: ".photo-items-prev",
  },

  breakpoints: {
    320: { slidesPerView: 1.1, spaceBetween: 20 },

    485: { slidesPerView: 1.5 },

    740: { slidesPerView: 1.8 },

    1100: { slidesPerView: 2.4, spaceBetween: 50 },

    1620: { slidesPerView: 2.7 },
  },
});

const spoilerItems = document.querySelectorAll(".spoiler-item");

for (let i = 0; i < spoilerItems.length; i++) {
  spoilerItems[i].addEventListener("click", function () {
    this.classList.toggle("active");

    for (let j = 0; j < spoilerItems.length; j++) {
      if (spoilerItems[j] !== this) {
        spoilerItems[j].classList.remove("active");
      }
    }
  });
}



document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    "._anim-fade-in-left-delay"
  );

  animatedElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.05}s`;
  });
});








// Набирающийся текст: начало
let typed =new Typed('#typed', {
  typeSpeed: 200,
  backSpeed: 100,
  startDelay: 100,
  loop: false,
  stringsElement: '#typed-strings',
})
//Набирающийся текст: конец




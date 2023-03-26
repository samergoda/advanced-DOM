"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
const nav = document.querySelector(".nav");
const container = document.querySelector(".operations__tab-container");
const content = document.querySelectorAll(".operations__content");
const taps = document.querySelectorAll(".operations__tab");
const header = document.querySelector(".header");
const allSection = document.querySelectorAll(".section");
const allImg = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");



window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href"); //=== section--1 || section--2
    document.querySelector(id).scrollIntoView({ behavior: "smooth" }); // yro7looo
  }
});

container.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  //guard
  if (!clicked) return;
  taps.forEach((t) => t.classList.remove("operations__tab--active"));
  content.forEach((c) => c.classList.remove("operations__content--active"));
  //active tap
  clicked.classList.add("operations__tab--active");
  //content
  // console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

const navHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sbling = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    sbling.forEach((sb) => (sb !== link ? (sb.style.opacity = opacity) : null));

    logo.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", function (e) {
  navHover(e, 0.5);
});
nav.addEventListener("mouseout", function (e) {
  navHover(e, 1);
});

const height = nav.getBoundingClientRect().height;

const stickyNav = function (entris) {
  const [enter] = entris;

  if (!enter.isIntersecting) nav.classList.add("sticky");
  else {
    nav.classList.remove("sticky");
  }
};
const interNav = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${height}px`,
});
interNav.observe(header);

const revalSection = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observe.unobserve(entry.target);
};

const interSection = new IntersectionObserver(revalSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach((section) => {
  interSection.observe(section);
  section.classList.add("section--hidden");
});

const loadImg = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observe.unobserve(entry.target);
};
const imgObserve = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // rootMargin: "200px",
});
allImg.forEach((img) => imgObserve.observe(img));

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
activeDots(curSlide)

};
const prevSlide = function () {
  if (curSlide == 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
activeDots(curSlide)
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
const dotContainer=document.querySelector('.dots')
document.addEventListener("keydown", e => e.key==='ArrowRight'? nextSlide() :prevSlide());
const createDots= function () {
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`)
  })

}
createDots()
const activeDots = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(
    dot=>dot.classList.remove('dots__dot--active'))
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}
activeDots(0)


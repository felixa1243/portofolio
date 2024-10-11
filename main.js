import "./public/style.scss";
import "@fontsource/poppins";
import Alpine from "alpinejs";
import Swiper from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Attach Alpine to the global window object
window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  const navbar = ["Home", "Profile", "Projects"];
  const list = navbar.map((el) => ({
    url: `#${el.toLocaleLowerCase()}`,
    title: el,
  }));
  Alpine.data("navbar", () => ({
    list,
  }));
});
const swiperSlider = new Swiper(".hero-slider", {
  slidesPerView: 1,
  preventInteractionOnTransition: true,
});
const innerSlider = new Swiper(".hero-slider .profile", {
  slidesPerView: 1,
  spaceBetween: 10,
  nested: true,
  pagination: {
    el: ".hero-slider .profile .swiper-pagination",
  },
  modules: [Pagination],
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function checkHashAndSlide() {
  if (window.location.hash === "#profile") {
    scrollToTop();
    swiperSlider.slideTo(1);
  }
  if (window.location.hash == "#home") {
    scrollToTop();
    swiperSlider.slideTo(0);
  }
}

// Listen for hash changes
window.addEventListener("hashchange", checkHashAndSlide);
// Start Alpine after defining the data
Alpine.start();

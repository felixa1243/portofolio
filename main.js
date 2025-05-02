import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Aos from "aos";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import "@fontsource/fira-code";
import "@fontsource-variable/reddit-mono";
import Alpine from "alpinejs";

gsap.registerPlugin(SplitText);
window.Alpine = Alpine;

const swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  centeredSlides: true,
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      centeredSlides: false
    },
    1024: {
      slidesPerView: 3,
      centeredSlides: false
    }
  },
  modules: [Navigation]
});

gsap.utils.toArray(".animate-btt").forEach((textElement) => {
  const splitText = new SplitText(textElement, { type: "chars" });
  gsap.from(splitText.chars, {
    opacity: 0,
    y: 50,
    duration: 0.3,
    stagger: 0.05,
    ease: "power3.out"
  });
});

document.addEventListener("alpine:init", () => {
  Alpine.data("projects", () => ({
    projects: [
      {
        title: "Safiro Jewelry",
        description: `
We built a sleek, responsive WooCommerce site for a jewelry brand using WordPress, Alpine.js, GSAP, and Swiper. It showcases products with elegant design, smooth animations, and intuitive UX—blending beauty with a seamless shopping experience.`,
        link: 'https://safirojewelry.com'
      }, {
        title: "HiQua",
        description: `
HiQua is Sport center that sell many products for sport their product is Racket, Shoe, Shirt , etc.
The customer demanding a website to introduce their company and view the catalogue for their products, they also wanting to add an article to their website.`,
        link: 'https://hiqua.id'
      }, {
        title: "OLaundry",
        description: `
Olaundry is laundry company located in yogyakarta, they need a website that introduce their product so the customer can easily contact them..`,
        link: 'https://kitatechnology.com/preview/dev/iqbal/olaundry'
      }, {
        title: "Discord Bot Task management system",
        description: `A powerful Notion bot that helps you manage projects and tasks directly from Discord or Telegram. Create, update, and filter Notion pages in real-time with slash commands, smart autocompletion, and seamless integration.`
      },
    ]
  }));
});

Aos.init();

Alpine.start();

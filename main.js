import gsap from "gsap";
import Aos from "aos";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import "@fontsource/bebas-neue";
import "@fontsource/poppins";
import Alpine from "alpinejs";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollSmoother);
window.Alpine = Alpine;

const swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 3,
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

const smoother = ScrollSmoother.create({
  content: '#smooth-content',
  smooth: 3,
  normalizeScroll: true,
  ignoreMobileResize: true,
  effects: true,
})
let splitTextLines = gsap.utils.toArray(".js-splittext-lines");

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: splitTextLines,
    start: 'top 90%',
    end: 'bottom 60%',
    scrub: 2,
    markers: false,
    toggleActions: 'play none play reset'
  }
});
const itemSplitted = new SplitText(splitTextLines, { type: 'lines' });
tl.from(itemSplitted.lines, { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'back.inOut' });
const sections = document.querySelectorAll('[data-bgcolor]');

sections.forEach((section, i) => {
  const prevBg = i === 0 ? 'oklch(37.3% 0.034 259.733)' : sections[i - 1].dataset.bgcolor;
  const prevText = i === 0 ? '#ffffff' : sections[i - 1].dataset.textcolor;

  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    onEnter: () => {
      gsap.to(document.body, {
        backgroundColor: section.dataset.bgcolor,
        color: section.dataset.textcolor,
        overwrite: 'auto',
        duration: 1
      });
    },
    onLeaveBack: () => {
      gsap.to(document.body, {
        backgroundColor: prevBg,
        color: prevText,
        overwrite: 'auto'
      });
    }
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
Aos.init()

Alpine.start();
import 'iconify-icon';
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import "@fontsource/bebas-neue";
import "@fontsource/poppins";
import Alpine from "alpinejs";
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText);
window.Alpine = Alpine;
document.addEventListener('alpine:init', () => {
  Alpine.data('hyperlinks', () => ({
    navbar: [
      { text: 'Home', link: '#home' },
      { text: 'About', link: '#about' },
      { text: 'Education', link: '#educations' },
      { text: 'Experience', link: '#experience' },
      { text: 'Skills', link: '#skills' },
      { text: 'Projects', link: '#projects' },
    ],
    socialLinks: [
      { name: 'github', link: 'https://github.com/felixa1243', icon: 'line-md:github' },
      { name: 'linkedin', link: 'https://www.linkedin.com/in/rajiph-iqbal-ghandi-426a56186/', icon: 'line-md:linkedin' },
      { name: 'email', link: 'mailto:felixarajiph@gmail.com', icon: 'line-md:email' },
      { name: 'cv', link: './cv.pdf', icon: 'line-md:download' }
    ]
  }));
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
      {
        title: 'DKSH Snack Pairs',
        description: `DKSH Snack Pairs is a promotional website for a snack brand, they need a website that introduce their product so the customer can easily contact them. DKSH, also known as DiethelmKellerSiberHegner,
        is a Swiss holding company specialising in market expansion services, e.g. outsourcing`,
        link: 'https://kitatechnology.com/preview/dev/iqbal/microsite/dksh-june-2025'
      }
    ]
  }));
  const smoother = ScrollSmoother.create({
    content: '#smooth-content',
    smooth: 5,
    smoothTouch: 0.1,
    normalizeScroll: true,
    ignoreMobileResize: true,
    effects: true,
  });

  Alpine.nextTick(() => {
    const navbar = document.querySelector('.navbar');
    function navigate(nav) {
      nav.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
          const targetSelector = e.currentTarget.dataset.link;
          if (targetSelector) {
            smoother.scrollTo(targetSelector, true);
          }
        });
      });
    }
    navigate(navbar);
    const navbarMobile = document.querySelector('.nav-mb');
    navigate(navbarMobile);
  });
  const swiper = new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 3,
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,

      }
    },
    modules: [Navigation]
  })
});
const section = document.querySelectorAll('section');
section.forEach((section, index) => {


  ScrollTrigger.create({
    trigger: section,
    onEnter: () => {
      animateSection();
    },
    onEnterBack: () => {
      animateSection();
    }
  })
  function animateSection() {
    const tl = gsap.timeline();
    switch (index) {
      case 0:
        const title = section.querySelector('h1');
        animateHeroTitle(title)
        break;
      case 1:
        const title2 = section.querySelector('h2');
        const text = section.querySelector('.about-text-container')
        animateHeroTitle(title2, tl)
        tl.fromTo(text, {
          x: 100,
          opacity: 0
        }, {
          x: 0,
          duration: 1.2,
          opacity: 1,
        }, 1)
        break;
      case 2:
        const title3 = section.querySelector('h2');
        animateHeroTitle(title3)
        break;
      case 4:
        const title4 = section.querySelector('h2', tl);
        const grid = section.querySelector('.grid');
        const skills = grid.querySelectorAll('.skill');
        tl.fromTo(skills, {
          autoAlpha: 0,
          y: 100
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.2
        }, 1)
        animateHeroTitle(title4)
        break;
      case 3:
        const title5 = section.querySelector('h2');
        animateHeroTitle(title5)
        break;
      case 5:
        const title6 = section.querySelector('h2');
        animateHeroTitle(title6)
        break;
    }
  }
  function animateHeroTitle(title, tl) {
    if (tl) {
      tl.fromTo(SplitText.create(title, 'chars').chars, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        duration: 1,
        opacity: 1,
        stagger: 0.05
      })
    } else {
      gsap.fromTo(SplitText.create(title, 'chars').chars, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        duration: 1.2,
        opacity: 1,
        stagger: 0.05
      })
    }
  }
})
Alpine.start();


import 'iconify-icon';
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { Navigation, EffectCards } from "swiper/modules";
import "@fontsource/bebas-neue";
import "@fontsource/poppins";
import Alpine from "alpinejs";
gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText);
window.Alpine = Alpine;
document.addEventListener("DOMContentLoaded", function () {
  const smoother = ScrollSmoother.create({
    smooth: 3
  })
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      smoother.scrollTo(link.getAttribute('href'), true);
    });
  })
  gsap.registerPlugin(SplitText);
  let counter = { value: 0 };
  let percentage = document.getElementById("loader-percentage");
  let tl_load = gsap.timeline();

  tl_load.to(counter, {
    value: 100,
    duration: 2.5,
    ease: "power1.in",
    onUpdate: () => {
      let currentPercentage = Math.floor(counter.value);
      percentage.textContent = currentPercentage + "%";
      gsap.set(percentage, { top: currentPercentage - 3 + "%" });
    },
    onComplete: () => {
      const fadeOut = {
        opacity: 0,
        duration: 0.7
      }
      gsap.to('#loader-progress-bar', fadeOut)
      gsap.to('#loader-percentage', fadeOut)
      runTransition()
    }
  });

  tl_load.to("#loader-progress-bar", {
    height: "100%",
    duration: 2.5,
    ease: "power1.in"
  }, 0);
  function runTransition() {
    let tl_main = gsap.timeline();
    const title = document.querySelector(".my-title");
    const titleSplit = new SplitText(title, { type: "chars" });
    tl_main
      .to("#transition-wipe", {
        x: "0%",
        duration: 0.5,
        ease: "power2.inOut"
      })
      .to("#loader", {
        opacity: 0,
        duration: 0.5
      }, 1)
      .fromTo(titleSplit.chars, {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out"
      })
      .addLabel("flickerStart", ">")
      .to(".my-title", { opacity: 0, filter: "brightness(0.2)" })
      .to(title, { opacity: 1, duration: 0.1, ease: "power2.out" }, "flickerStart")
      .to(title, { opacity: 0.2, duration: 0.05, ease: "power2.out" })
      .to(title, { opacity: 1, duration: 0.1, ease: "power2.out" })
      .to(title, { opacity: 0.4, duration: 0.07, ease: "power2.out" })
      .to(title, { opacity: 1, duration: 0.12, ease: "power2.out" })
      .to(title, { filter: "brightness(1.2)", duration: 0.3, ease: "power2.out" });
  }

});
document.addEventListener('alpine:init', () => {
  Alpine.store('navbar', {
    activeLink: '',
    navbarMobileActive: false,
    showCV: false,
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
    ],

    // 3. The Logic (Runs only ONCE)
    init() {
      // We wait for the DOM to be ready
      setTimeout(() => {
        this.setupScrollSpy();
      }, 100);
    },

    setupScrollSpy() {
      // Setup the Skills Animation (moved out of the loop for cleaner logic)
      const skillsGrid = document.querySelector('#skills .grid');
      if (skillsGrid) {
        const skills = skillsGrid.querySelectorAll('.skill');
        gsap.set(skills, { y: 100, autoAlpha: 0 }); // Set initial state
      }

      this.navbar.forEach((navItem) => {
        const section = document.querySelector(navItem.link);

        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          // Update the Alpine Store variable instead of manipulating DOM classes manually
          onToggle: (self) => {
            if (self.isActive) {
              this.activeLink = navItem.link;
            }
          },
          // Specific animation for Skills section
          onEnter: () => {
            if (navItem.link === '#skills') {
              const grid = section.querySelector('.grid');
              const skills = grid?.querySelectorAll('.skill');
              if (skills) {
                gsap.to(skills, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 1,
                  stagger: 0.2,
                  overwrite: true // prevents conflict
                });
              }
            }
          }
        });
      });
    },

    toggle() { this.navbarMobileActive = !this.navbarMobileActive; },
    close() { this.navbarMobileActive = false; }
  });
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
      }, {
        title: "Vanilla Unstyled UI",
        description: `A flexible set of modular and unstyled UI components built for Tailwind CSS & Alpine.js.
Designed for makers who want full control—build your design system from scratch, extend every piece, and scaffold your own UI toolkit with zero opinionated styles.`,
        link: "https://felixa1243.github.io/vanilla-classic-ui/"
      }
    ]
  }));
  const swiper = new Swiper('.mySwiper', {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 3,
    breakpoints: {
      320: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,

      }
    },
    effect: 'cards',
    modules: [EffectCards]
  })
})

Alpine.start();


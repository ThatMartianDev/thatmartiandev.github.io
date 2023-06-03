import {
  throttle,
  pageLoaderFuncs,
  general,
  headerFuncs,
  fadersFuncs,
  randomStars,
  slideOutText,
  magneticEffect,
  talkSliderFuncs,
  isVisible,
  isFocusable,
  getVisibleFocusableElements,
} from "./mutual.js";

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    // TimeOut to apply the function after, will depend on isVisited value
    let timeOut = sessionStorage.isVisited === "true" ? 0 : 3200;

    pageLoaderFuncs();

    setTimeout(() => {
      // Declaring The Stars Divs and assign the function as a boxShadow value
      const starsG1 = document.getElementById("stars");
      const starsG2 = document.getElementById("stars2");
      const starsG3 = document.getElementById("stars3");

      starsG1.style.boxShadow = randomStars(3000);
      starsG2.style.boxShadow = randomStars(2000);
      starsG3.style.boxShadow = randomStars(600);

      general();
      headerFuncs();
      fadersFuncs();
      slideOutText();
      magneticEffect();
      talkSliderFuncs();

      const container = document.querySelector(".container");
      const sections = document.querySelectorAll(".section-slide");
      let currentIndex = 0;

      const body = document.querySelector("body");
      const mainEle = document.querySelector("main");
      const home = sections[0];
      const about = sections[1];
      const services = sections[2];
      const contact = sections[3];
      const planet = document.querySelector(".planet");

      const homeArrowDown = home.querySelector("#scroll-down");
      const introContainer = home.querySelector(".intro-container");

      const shortBIo = about.querySelector("#short-bio");
      const halaAbout = about.querySelector("#hala-home");
      const aboutBtn = about.querySelector("#about-btn");

      const sectionNav = document.getElementById("sections-nav");
      const links = sectionNav.querySelectorAll('a[href^="#section-"]');
      let activeLink = sectionNav.querySelector("a.active");

      // setting the fixed height for sections and body
      sections.forEach((section, sectionIndex) => {
        section.style.zIndex = 100 - sectionIndex;
      });

      function scrollHandler(index) {
        // Limit index to number of sections
        index = Math.max(0, Math.min(index, sections.length - 1));

        // Calculate new scroll position
        const newPosition = index * -window.innerHeight;

        // Scroll container to new position
        container.style.transform = `translateY(${newPosition}px)`;

        // Update current index
        currentIndex = index;

        // Add active class to current section
        sections.forEach((section, sectionIndex) => {
          if (sectionIndex === currentIndex) {
            section.classList.add("active");
            section
              .querySelectorAll("[tabindex]")
              .forEach((el) => (el.tabIndex = 0));
            links[currentIndex].classList.add("active");
          } else {
            section.classList.remove("active");
            section
              .querySelectorAll("[tabindex]")
              .forEach((el) => (el.tabIndex = -1));
            links[sectionIndex].classList.remove("active");
          }
        });

        if (home.classList.contains("active")) {
          homeActive();
        } else {
          homeIdle();
        }
        if (about.classList.contains("active")) {
          aboutActive();
        } else {
          aboutIdle();
        }
        if (services.classList.contains("active")) {
          servicesActive();
        } else {
          servicesIdle();
        }
        if (contact.classList.contains("active")) {
          contactActive();
        } else {
          contactIdle();
        }
      }

      // Add click event listener to each link
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const sectionId = link.getAttribute("href");
          const section = document.querySelector(sectionId);
          const sectionIndex = Array.from(sections).indexOf(section);
          link.classList.add("active");
          if (activeLink) {
            activeLink.classList.remove("active");
          }
          activeLink = link;
          scrollHandler(sectionIndex);
        });
      });

      // Scroll Down Arrow
      homeArrowDown.addEventListener(
        "click",
        throttle(() => {
          scrollHandler(1);
        }, 300)
      );

      // scroll event listener to container with throttle
      mainEle.addEventListener(
        "wheel",
        throttle(
          (e) => {
            e.preventDefault();
            const delta = e.deltaY;
            const direction = delta > 0 ? 1 : -1;
            const newIndex = currentIndex + direction;
            scrollHandler(newIndex);
          },
          1000,
          { passive: true }
        )
      );

      // Touch eventListener

      let startY = 0;
      window.addEventListener(
        "touchstart",
        throttle((e) => {
          startY = e.touches[0].clientY;
        }, 500)
      );

      window.addEventListener(
        "touchmove",
        throttle((e) => {
          e.preventDefault();
          const deltaY = e.touches[0].clientY - startY;
          const scrollThreshold = 4; // adjust this value as needed
          let index = currentIndex;

          if (deltaY > scrollThreshold) {
            index--;
          } else if (deltaY < -scrollThreshold) {
            index++;
          }

          scrollHandler(index);
        }, 500)
      );

      // Add keyboard event listeners to document with throttle
      document.addEventListener(
        "keydown",
        throttle((e) => {
          if (e.keyCode === 38 || e.keyCode === 40) {
            // Prevent default scrolling behavior
            e.preventDefault();

            // Calculate new index based on arrow key
            const direction = e.keyCode === 38 ? -1 : 1;
            const newIndex = currentIndex + direction;

            // Scroll to new section
            scrollHandler(newIndex);
          } else if (e.keyCode === 9) {
            // Tab key pressed - restrict tabbing to visible section
            const section = sections[currentIndex];
            const visibleElements = getVisibleFocusableElements(section);
            const firstElement = visibleElements[0];
            const lastElement = visibleElements[visibleElements.length - 1];

            // Set tabindex to -1 for focusable elements outside the visible section
            const outsideElements = document.querySelectorAll(
              ".section-slide:not(.active) *"
            );
            outsideElements.forEach((el) => {
              if (isFocusable(el) && isVisible(el)) {
                el.tabIndex = -1;
              }
            });

            if (e.shiftKey) {
              // Shift+Tab - move focus to previous element
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              // Tab - move focus to next element
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        }, 1000)
      );

      document.addEventListener(
        "keyup",
        throttle((e) => {
          if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 9) {
            e.preventDefault();
          }
        }, 1000)
      );

      //// Sections Transition Functions
      function homeIdle() {
        starsG1.classList.add("slide");
        starsG2.classList.add("slide");
        starsG3.classList.add("slide");
        planet.classList.remove("initial");
        introContainer.classList.add("idle");
        introContainer.classList.remove("active");
        homeArrowDown.classList.add("idle");
      }

      function homeActive() {
        starsG1.classList.remove("slide");
        starsG2.classList.remove("slide");
        starsG3.classList.remove("slide");
        setTimeout(() => {
          body.classList.remove("change-bg");
        }, 1200);
        planet.classList.add("initial");
        planet.classList.remove("move-to-about");
        introContainer.classList.add("active");
        introContainer.classList.remove("idle");
        homeArrowDown.classList.remove("idle");
      }

      function aboutIdle() {
        planet.classList.remove("move-to-about");
        shortBIo.classList.add("idle");
        shortBIo.classList.remove("active");
        halaAbout.classList.add("idle");
        aboutBtn.classList.add("idle");
      }

      function aboutActive() {
        setTimeout(() => {
          body.classList.add("change-bg");
        }, 2000);
        planet.classList.add("move-to-about");
        shortBIo.classList.add("active");
        shortBIo.classList.remove("idle");
        halaAbout.classList.remove("idle");
        aboutBtn.classList.remove("idle");

        const aboutFaders = about.querySelectorAll(".about-fader");
        const aboutFadersArray = Array.from(aboutFaders);
        const aboutFadersOpserver = new IntersectionObserver(function (
          entries,
          aboutFadersOpserver
        ) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(function () {
                entry.target.classList.add("fade-in");
              }, 1000);
            } else {
              entry.target.classList.remove("fade-in");
            }
          });
        });

        aboutFadersArray.forEach((fader) => {
          aboutFadersOpserver.observe(fader);
        });
      }

      function servicesActive() {
        setTimeout(() => {
          body.classList.add("change-bg");
        }, 2000);
        services.classList.add("active");
        services.classList.remove("idle");
      }

      function servicesIdle() {
        services.classList.add("idle");
        services.classList.remove("active");
      }

      function contactActive() {
        setTimeout(() => {
          body.classList.add("change-bg");
        }, 2000);
        planet.classList.remove("move-to-about");
        planet.classList.add("move-to-contact");
      }

      function contactIdle() {
        planet.classList.add("move-to-about");
        planet.classList.remove("move-to-contact");
      }

      function updateGradientPosition() {
        const rect = planet.getBoundingClientRect();
        const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
        const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
        document.documentElement.style.setProperty("--planet-x", `${x}%`);
        document.documentElement.style.setProperty("--planet-y", `${y}%`);
      }
      updateGradientPosition();
      window.addEventListener("resize", () => {
        updateGradientPosition();
      });

      // 02/02 Bio animation delay loop
      function bioAnimDelay() {
        const bio = document.getElementById("short-bio");
        let bioDelay = 20;
        const bioLength = bio.children.length;

        // let userAgent = navigator.userAgent;
        for (let i = 0; i < bioLength; i++) {
          bio.children[i].style["transition-delay"] = bioDelay * i + "ms";
        }
      }
      bioAnimDelay();
    }, timeOut);
  }
};

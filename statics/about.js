import {
  pageLoaderFuncs,
  general,
  headerFuncs,
  fadersFuncs,
  randomStars,
  slideOutText,
  magneticEffect,
  talkSliderFuncs,
} from "./mutual.js";

document.onreadystatechange = function () {
  if (document.readyState == "complete") {

    // TimeOut to apply the function after, will depend on isVisited value
    let timeOut = sessionStorage.isVisited === "true" ? 0 : 3000;

    pageLoaderFuncs();

    setTimeout(() => {
      general();
      headerFuncs();
      fadersFuncs();
      slideOutText();
      magneticEffect();
      talkSliderFuncs();

      const starsG1 = document.getElementById("stars");
      const starsG2 = document.getElementById("stars2");
      const starsG3 = document.getElementById("stars3");

      starsG1.style.boxShadow = randomStars(3000);
      starsG2.style.boxShadow = randomStars(2000);
      starsG3.style.boxShadow = randomStars(600);

      const home = document.getElementById("home");
      const about = document.getElementById("about-me");
      const contact = document.getElementById("contact");
      const projects = document.getElementById("projects");

      const observerObtions = {
        threshold: 0.01,
      };

      const passionObserver = new IntersectionObserver(
        (entries, passionObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              contact.classList.add("approaching");
              home.classList.add("idle");
            }
          });
        },
        observerObtions
      );

      passionObserver.observe(projects);

      const aboutObserver = new IntersectionObserver(
        (entries, aboutObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              contact.classList.remove("approaching");
              home.classList.remove("idle");
            }
          });
        },
        observerObtions
      );

      aboutObserver.observe(about);
    }, timeOut);
  }
};

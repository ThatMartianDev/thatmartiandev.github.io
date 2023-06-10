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
    }, timeOut);
  }
};

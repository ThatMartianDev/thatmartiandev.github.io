import {
    throttle,
    general,
    headerFuncs,
    fadersFuncs,
    randomStars,
    slideOutText,
    talkSliderFuncs,
  } from "./mutual.js";


general()
headerFuncs();
fadersFuncs();
slideOutText();
talkSliderFuncs();

const starsG1 = document.getElementById("stars");
const starsG2 = document.getElementById("stars2");
const starsG3 = document.getElementById("stars3");

const starsG4 = document.getElementById("stars4");
const starsG5 = document.getElementById("stars5");
const starsG6 = document.getElementById("stars6");

starsG1.style.boxShadow = randomStars(3000);
starsG2.style.boxShadow = randomStars(2000);
starsG3.style.boxShadow = randomStars(600);

starsG4.style.boxShadow = randomStars(3000);
starsG5.style.boxShadow = randomStars(2000);
starsG6.style.boxShadow = randomStars(600);


const home = document.getElementById("home")
const about = document.getElementById("about-me")
const contact = document.getElementById("contact")
const projects = document.getElementById("projects")

const observerObtions = {
  threshold: 0.01,
};

const passionObserver = new IntersectionObserver((entries, passionObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      contact.classList.add("approaching");
      home.classList.add("idle")
    }
  });
}, observerObtions);

passionObserver.observe(projects)

const aboutObserver = new IntersectionObserver((entries, aboutObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      contact.classList.remove("approaching");
      home.classList.remove("idle")
    }
  });
}, observerObtions);

aboutObserver.observe(about)
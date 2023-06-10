import {
  pageLoaderFuncs,
  general,
  headerFuncs,
  fadersFuncs,
  randomStars,
  slideOutText,
  magneticEffect,
  talkSliderFuncs,
  throttle,
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

      /// FORM STUFF

      const mustFill = document.querySelectorAll("[data-must-fill]");
      mustFill.forEach((ele) => {
        ele.classList.add("must");
      });

      const header = document.getElementById("header");
      const footer = document.querySelector(".footer");
      const formBtn = document.getElementById("form-button");
      const formCloseBtn = document.getElementById("form-close");
      const formWindow = document.getElementById("form-window");

      formBtn.onclick = function () {
        formWindow.classList.add("active");
        setTimeout(function () {
          header.classList.add("hide");
          footer.classList.add("hide");
        }, 700);
      };
      formCloseBtn.onclick = function () {
        formWindow.classList.remove("active");
        setTimeout(function () {
          header.classList.remove("hide");
          footer.classList.remove("hide");
        }, 500);
      };

      /// FORM STEPS NAVIGATION

      const form = document.querySelector("[data-multistep-form]");
      const formSteps = [...form.querySelectorAll("[data-step]")];
      const formDescr = document.querySelector("[data-form-descr]");
      const formDescrCard = [
        ...formDescr.querySelectorAll("[data-descr-card]"),
      ];

      let currentStep = formSteps.findIndex((step) => {
        return step.classList.contains("active");
      });

      let currentDescrCard = formDescrCard.findIndex((card) => {
        return card.classList.contains("active");
      });

      if (currentStep < 0) {
        currentStep = 0;
        showStep();
      }

      if (currentDescrCard < 0) {
        currentDescrCard = 0;
        showCard();
      }

      formDescrCard.forEach((card) => {
        card.addEventListener("animationend", (e) => {
          formDescrCard[currentDescrCard].classList.remove("hide");
          e.target.classList.toggle(
            "hide",
            !e.target.classList.contains("active")
          );
        });
      });

      formSteps.forEach((step) => {
        step.addEventListener("animationend", (e) => {
          formSteps[currentStep].classList.remove("hide");
          e.target.classList.toggle(
            "hide",
            !e.target.classList.contains("active")
          );
        });
      });

      // FORM BTNS EVEN LISTENER

      form.addEventListener(
        "click",
        throttle(function (e) {
          let incrementor;

          if (e.target.matches("[data-next]")) {
            incrementor = 1;
          } else if (e.target.matches("[data-prev]")) {
            incrementor = -1;
          }
          if (incrementor == null) return;

          const inputs = [...formSteps[currentStep].querySelectorAll("input")];
          const allValid = inputs.every((input) => input.reportValidity());
          if (allValid) {
            console.log(allValid);
            currentStep += incrementor;
            currentDescrCard += incrementor;
            showStep();
            showCard();
          }
        }),
        600
      );

      function showStep() {
        formSteps.forEach((step, index) => {
          step.classList.toggle("active", index === currentStep);
        });
      }

      function showCard() {
        formDescrCard.forEach((card, index) => {
          card.classList.toggle("active", index === currentDescrCard);
        });
      }

      /// Form Submit

      const submitBtn = document.getElementById("submit-btn");
      submitBtn.onclick = throttle(function () {
        const inputs = [...formSteps[currentStep].querySelectorAll("input")];
        const allValid = inputs.every((input) => input.reportValidity());
        if (allValid) {
          form.submit();
          submitBtn.innerText = "Processing...";
        }
      }, 2000);
    }, timeOut);
  }
};

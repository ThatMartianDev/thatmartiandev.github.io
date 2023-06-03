export {
  throttle,
  pageLoaderFuncs,
  general,
  headerFuncs,
  fadersFuncs,
  randomStars,
  slideOutText,
  magneticEffect,
  talkSliderFuncs,
  isFocusable,
  isVisible,
  getVisibleFocusableElements,
};

const throttle = function (func, timeout = 600) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
};

const pageLoaderFuncs = function(){
  const pageLoader = document.getElementById("loading-page")
  const pageLoaderP = pageLoader.querySelector("p")

  if (!sessionStorage.isVisited) {
    setTimeout(() => {
      pageLoader.classList.add("done");
    }, 1000);

    sessionStorage.isVisited = "true";
  } else {
    pageLoader.classList.add("hide");
  }
}

const general = () => {
  document.documentElement.style.setProperty(
    "--window-height",
    window.innerHeight + "px"
  );
  // reset the fixed height whenever the window resizes

  window.addEventListener("resize", () => {
    document.documentElement.style.setProperty(
      "--window-height",
      window.innerHeight + "px"
    );
  });
};

const headerFuncs = () => {
  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menu-btn");
  const servicesBtn = menu.querySelector("#service-btn");
  const servicesList = menu.querySelector("#services-cont");

  menu.style.height = window.innerHeight + "px";
  window.addEventListener("resize", () => {
    menu.style.height = window.innerHeight + "px";
  });

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");

    servicesList.classList.remove("active");
    servicesBtn.classList.remove("active");
  });
  servicesBtn.addEventListener("click", () => {
    servicesList.classList.toggle("active");
    servicesBtn.classList.toggle("active");
  });

  /// Menu Links Hover Effect Transition Delay
  const menuLinks = document.querySelectorAll(".menu-links");
  menuLinks.forEach((link) => {
    for (let i = 0; i < link.children.length; i++) {
      link.children[i].style["transition-delay"] = 10 + i * 30 + "ms";
    }
  });
};

const fadersFuncs = function () {
  const faders = document.querySelectorAll(".fader");
  const fadersOptions = {
    threshold: 0.6,
  };
  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add("fade-in");
        }, 400);
      }
    });
  },
  fadersOptions);
  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
};

/// Stary Background
// Function To Randomly Generate The Stars Position For Maximum 4000px
function randomStars(n) {
  let value = `${Math.floor(Math.random() * 3000 + 2)}px ${Math.floor(
    Math.random() * 3000 + 2
  )}px #FFF`;
  for (let i = 0; i < n; i = i + 2) {
    value = `${value} , ${Math.floor(Math.random() * 3000 + 2)}px ${Math.floor(
      Math.random() * 3000 + 2
    )}px #FFF`;
  }
  return value;
}

const slideOutText = function () {
  const paragraphs = document.querySelectorAll(".slide-out-text");
  paragraphs.forEach((paragraph) => {
    // Split the paragraph into words and return them as a Span tag inside a div tag
    paragraph.innerHTML = paragraph.innerHTML
      .split(" ")
      .map(function (word) {
        return "<span><span>" + word + "</span></span>";
      })
      .join(" ");
  });
};

const magneticEffect = () => {
  const magneticBtns = Array.from(document.querySelectorAll(".magnetic"));
  magneticBtns.forEach((button) => {
    button.addEventListener("mousemove", function (e) {
      const btnPos = button.getBoundingClientRect();
      const btnX = e.clientX - btnPos.left - btnPos.width / 2;
      const btnY = e.clientY - btnPos.top - btnPos.height / 2;

      this.style["transform"] =
        "translate(" + btnX * 0.15 + "px, " + btnY * 0.4 + "px)";
      this.style["transform"] +=
        "rotate3d(" + btnX * -0.1 + ", " + btnY * -0.2 + ", 0, 12deg)";
      this.children[0].style["transform"] = `translate(${btnX * 0.025}px, ${
        btnY * 0.075
      }px)`;
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translate3d(0px, 0px, 0px)";
      this.style.transform += "rotate3d(0, 0, 0, 0deg)";
      this.children[0].style.transform = "translate3d(0px, 0px, 0px)";

      this.style["transform"] = "translate3d(0px, 0px, 0px)";
      this.style["transform"] += "rotate3d(0, 0, 0, 0deg)";
      this.children[0].style["transform"] = "translate3d(0px, 0px, 0px)";
    });
  });
};

const talkSliderFuncs = () => {
  const talkSlider = document.getElementById("slider-container");
  const sliderChild = Array.from(talkSlider.children);
  const sliderChildWidth = sliderChild[0].getBoundingClientRect().width;

  sliderChild.forEach(function (child, index) {
    child.style.position = "absolute";
    child.style.left = sliderChildWidth * index * 1.1 + "px";
  });

  window.addEventListener("resize", function () {
    sliderChild.forEach(function (child, index) {
      child.style.position = "absolute";
      child.style.left = sliderChildWidth * index * 1.1 + "px";
    });
  });
};
// Helper function to check if an element is focusable
const isFocusable = function (element) {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute("tabIndex") !== null)
  ) {
    return true;
  }
  if (element.disabled || element.tagName === "SCRIPT") {
    return false;
  }
  switch (element.nodeName) {
    case "A":
      return !!element.href && element.rel !== "ignore";
    case "INPUT":
      return element.type !== "hidden" && element.type !== "file";
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      return true;
    default:
      return false;
  }
};

// Helper function to check if an element is visible
const isVisible = function (element) {
  const visible = window.getComputedStyle(element);
  return (
    visible.display !== "none" &&
    visible.visibility !== "hidden" &&
    visible.opacity !== "0"
  );
};

// Helper function to get all visible focusable elements
const getVisibleFocusableElements = function (container) {
  const elements = container.querySelectorAll("[tabindex]");
  const visibleElements = Array.from(elements).filter((element) => {
    return isFocusable(element) && isVisible(element);
  });
  return visibleElements;
};

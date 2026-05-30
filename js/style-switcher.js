/*============ toggle Style Switcher =============*/
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

// hide style switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

/*============ Theme colors =============*/
const alternatestyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    localStorage.setItem("theme-color", color);
    alternatestyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

// Apply persisted color skin immediately if saved
const savedColor = localStorage.getItem("theme-color");
if (savedColor) {
    setActiveStyle(savedColor);
}

/*============ Theme light and dark mode =============*/
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    dayNight.querySelector("i").classList.toggle("fa-sun");
    dayNight.querySelector("i").classList.toggle("fa-moon");
    document.body.classList.toggle("dark");
    
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("dark-mode", "dark");
    } else {
        localStorage.setItem("dark-mode", "light");
    }
});

window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("dark-mode");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    } else if (savedTheme === "light") {
        document.body.classList.remove("dark");
    }

    const icon = dayNight.querySelector("i");
    if (document.body.classList.contains("dark")) {
        icon.classList.add("fa-sun");
        icon.classList.remove("fa-moon");
    } else {
        icon.classList.add("fa-moon");
        icon.classList.remove("fa-sun");
    }
});

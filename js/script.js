/*============================= Typing animation =====================*/
var typed = new Typed(".typing", {
    strings: [
        "Business Intelligence Analyst",
        "Data Analyst",
        "Business Analyst",
        "Power BI Enthusiast",
        "SQL Enthusiast",
        "Analytics Enthusiast",
        "Problem Solver"
    ],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
});

/*============================= Aside / Sidebar Navigation =====================*/
const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

// Create Backdrop Overlay dynamically
const overlay = document.createElement("div");
overlay.className = "aside-overlay";
document.body.appendChild(overlay);

function toggleSidebar() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("active");
    overlay.classList.toggle("active");
}

navTogglerBtn.addEventListener("click", () => {
    toggleSidebar();
});

// Close sidebar on overlay click
overlay.addEventListener("click", () => {
    if (aside.classList.contains("open")) {
        toggleSidebar();
    }
});

// Auto-close sidebar when clicking navigation links on mobile
const navLinks = document.querySelectorAll(".aside .nav li a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 1199 && aside.classList.contains("open")) {
            toggleSidebar();
        }
    });
});

/*============================= Scrollspy =====================*/
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/*============================= Back to Top Button =====================*/
const backToTopBtn = document.querySelector(".top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 400) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});
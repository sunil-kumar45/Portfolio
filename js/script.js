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

/*============================= Services Card Mobile Click/Tap Toggle =====================*/
const serviceCards = document.querySelectorAll(".service .service-item-inner");

serviceCards.forEach(card => {
    card.addEventListener("click", () => {
        if (window.innerWidth < 1024) {
            const isActive = card.classList.contains("active");
            
            // Remove active state from all other service cards
            serviceCards.forEach(c => c.classList.remove("active"));
            
            // Toggle active state on current card
            if (!isActive) {
                card.classList.add("active");
            }
        }
    });
});

/*============================= Contact Form Web3Forms Submit =====================*/
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Prepare form data
        const formData = new FormData(contactForm);
        
        // Show sending state
        formStatus.textContent = "Sending message... Please wait.";
        formStatus.className = "form-status-box sending";
        formStatus.style.display = "block";
        
        // Disable button to prevent double submit
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success
                formStatus.textContent = "Thank you! Your message has been sent successfully.";
                formStatus.className = "form-status-box success";
                contactForm.reset();
            } else {
                // Error
                console.log(response);
                formStatus.textContent = json.message || "Something went wrong. Please try again later.";
                formStatus.className = "form-status-box error";
            }
        })
        .catch((error) => {
            console.log(error);
            formStatus.textContent = "Network error. Please check your internet connection.";
            formStatus.className = "form-status-box error";
        })
        .then(() => {
            // Re-enable submit button
            if (submitBtn) submitBtn.disabled = false;
            
            // Hide message after 6 seconds
            setTimeout(() => {
                formStatus.style.display = "none";
            }, 6000);
        });
    });
}
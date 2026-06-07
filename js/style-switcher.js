/* ============================================================
   Style Switcher — Definitive JS
   ============================================================ */

/* ── Theme Color Switching ─────────────────────────────────── */
const alternatestyles = document.querySelectorAll(".alternate-style");

window.setActiveStyle = function (color) {
    localStorage.setItem("theme-color", color);

    // Toggle skin stylesheets
    alternatestyles.forEach((style) => {
        style.disabled = (color !== style.getAttribute("title"));
    });

    // Update active dot highlight
    document.querySelectorAll(".palette-dot").forEach((dot) => {
        dot.classList.remove("active-color");
    });
    const activeDot = document.querySelector(`.palette-dot.${color}`);
    if (activeDot) activeDot.classList.add("active-color");
};

// Restore saved color on load
(function () {
    const saved = localStorage.getItem("theme-color");
    if (saved) window.setActiveStyle(saved);
})();

/* ── Gear Button — Toggle Color Popup ─────────────────────── */
const gearBtn   = document.querySelector(".style-switcher-toggler");
const colorPopup = document.getElementById("color-popup");

if (gearBtn && colorPopup) {
    gearBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        colorPopup.classList.toggle("open");
    });

    // Close when clicking a color dot (convenience)
    colorPopup.querySelectorAll(".palette-dot").forEach((dot) => {
        dot.addEventListener("click", () => {
            colorPopup.classList.remove("open");
        });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
        if (!gearBtn.contains(e.target) && !colorPopup.contains(e.target)) {
            colorPopup.classList.remove("open");
        }
    });

    // Close on scroll
    window.addEventListener("scroll", () => {
        colorPopup.classList.remove("open");
    }, { passive: true });
}

/* ── Dark / Light Mode Toggle (UNCHANGED) ─────────────────── */
const dayNightBtn = document.getElementById("day-night-btn");

if (dayNightBtn) {
    dayNightBtn.addEventListener("click", () => {
        const icon = dayNightBtn.querySelector("i");
        icon.classList.toggle("fa-sun");
        icon.classList.toggle("fa-moon");
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "dark-mode",
            document.body.classList.contains("dark") ? "dark" : "light"
        );
    });
}

// Restore dark/light mode and icon on page load
window.addEventListener("load", () => {
    const savedTheme = localStorage.getItem("dark-mode");
    if (savedTheme === "dark") document.body.classList.add("dark");
    else document.body.classList.remove("dark");

    if (dayNightBtn) {
        const icon = dayNightBtn.querySelector("i");
        if (document.body.classList.contains("dark")) {
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
        }
    }

    // Re-highlight active color dot after DOM is fully ready
    const saved = localStorage.getItem("theme-color");
    if (saved) {
        document.querySelectorAll(".palette-dot").forEach(d => d.classList.remove("active-color"));
        const dot = document.querySelector(`.palette-dot.${saved}`);
        if (dot) dot.classList.add("active-color");
    }
});

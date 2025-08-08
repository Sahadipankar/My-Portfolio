// ====================================
// NAVBAR COMPONENT
// ====================================
// Sticky navigation bar for the portfolio website
// Features: Smooth scrolling to sections, responsive design, backdrop blur effect
// UI: Horizontal navigation with section buttons and smooth transitions

// Import React for component functionality
import React from "react";

// ====================================
// NAVIGATION CONFIGURATION
// ====================================
// Array defining all portfolio sections for navigation
const sections = [
    { id: "about", label: "About" },           // About section
    { id: "experience", label: "Experience" }, // Work experience section
    { id: "timeline", label: "Academics" },    // Education timeline section
    { id: "skills", label: "Skills" },         // Technical skills section
    { id: "portfolio", label: "Projects" },    // Portfolio projects section
    { id: "myapps", label: "Software" },       // Software applications section
    { id: "contact", label: "Contact" },       // Contact form section
];

// ====================================
// SCROLL UTILITY FUNCTION
// ====================================
/**
 * Smooth scroll to specific section
 * Handles special case for 'about' section (scroll to top)
 * @param {string} id - Section ID to scroll to
 */
const scrollToSection = (id) => {
    if (id === "about") {
        // Special case: scroll to top for about section
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        // Find and scroll to specific section element
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
};

/**
 * Navbar Component
 * Sticky navigation bar with smooth scrolling functionality
 * Provides quick access to all portfolio sections
 */
const Navbar = () => {
    return (
        <nav className="w-full max-w-[1050px] mx-auto px-2 py-2 flex flex-wrap justify-center gap-1 sm:gap-4 sticky top-0 z-50 bg-background/80 backdrop-blur-md rounded-b-lg shadow-md">
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-tubeLight-effect transition-colors px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-tubeLight-effect"
                >
                    {section.label}
                </button>
            ))}
        </nav>
    );
};

export default Navbar;

// ====================================
// NAVBAR COMPONENT
// ====================================
// Responsive navigation bar for the portfolio website
// Features: Mobile hamburger menu, smooth scrolling to sections, backdrop blur effect
// Mobile: Toggle menu from top middle with blurred background
// Desktop: Horizontal navigation with section buttons

// Import React hooks for state management and component functionality
import React, { useState, useEffect } from "react";

// Import Lucide React icons for mobile menu toggle
import { Menu, X } from "lucide-react";

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
 * Enhanced smooth scroll to specific section with proper offset calculation
 * @param {string} id - Section ID to scroll to
 */
const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        // Calculate the navbar height dynamically
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight : 64; // fallback to 64px

        // Get the element's position
        const elementPosition = element.offsetTop;

        // Calculate scroll position with proper offset
        // Reduced padding for more precise positioning
        const offsetPosition = elementPosition - navbarHeight - 10; // Reduced from 20px to 10px

        // Smooth scroll to calculated position
        window.scrollTo({
            top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative values
            behavior: 'smooth'
        });
    }
};

/**
 * Navbar Component
 * Fixed navigation bar with responsive design and mobile menu
 * Provides quick access to all portfolio sections with active section tracking
 */
const Navbar = () => {
    // State management
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("about");

    // Effect to handle keyboard navigation and escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    // Effect to track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 64;
            const scrollPosition = window.scrollY + navbarHeight + 100; // Add buffer

            // Find the active section
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Set initial active section

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /**
     * Handle navigation click
     * Scrolls to section, updates active section, and closes mobile menu
     */
    const handleNavClick = (sectionId) => {
        setActiveSection(sectionId);
        scrollToSection(sectionId);
        setIsMobileMenuOpen(false);
    };

    /**
     * Handle favicon click
     * Scrolls to top of page and closes mobile menu
     */
    const handleFaviconClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsMobileMenuOpen(false);
        setActiveSection("about"); // Set about as active when scrolling to top
    };

    return (
        <>
            {/* ====================================
                MAIN NAVBAR
                ==================================== */}
            <nav className="fixed bg-transparent top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-800/50 shadow-lg">
                <div className="w-full max-w-[1200px] mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">

                        {/* ====================================
                            LEFT SIDE: FAVICON + DS
                            ==================================== */}
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={handleFaviconClick}
                        >
                            {/* Favicon */}
                            <img
                                src="/favicon-512.png"
                                alt="Portfolio Logo"
                                className="w-8 h-8 rounded-full transition-transform group-hover:scale-110 ring-2 ring-transparent group-hover:ring-[#8245ec]/50"
                            />
                            {/* DS Text */}
                            <span className="text-xl font-bold text-white group-hover:text-[#8245ec] transition-colors">
                                Dipankar Saha
                            </span>
                        </div>

                        {/* ====================================
                            DESKTOP NAVIGATION (HIDDEN ON MOBILE)
                            ==================================== */}
                        <div className="hidden md:flex items-center gap-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => handleNavClick(section.id)}
                                    className={`text-sm font-semibold transition-all duration-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8245ec] hover:bg-gray-800/50 relative group ${activeSection === section.id
                                        ? 'text-[#8245ec]'
                                        : 'text-gray-300 hover:text-[#8245ec]'
                                        }`}
                                >
                                    {section.label}
                                    <span className={`absolute bottom-0 left-1/2 h-0.5 bg-[#8245ec] transition-all duration-200 ${activeSection === section.id
                                        ? 'w-full -translate-x-1/2'
                                        : 'w-0 group-hover:w-full group-hover:-translate-x-1/2'
                                        }`}></span>
                                </button>
                            ))}
                        </div>

                        {/* ====================================
                            MOBILE MENU TOGGLE (VISIBLE ON MOBILE)
                            ==================================== */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-300 hover:text-[#8245ec] hover:bg-gray-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8245ec] active:scale-95"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ====================================
                MOBILE MENU OVERLAY
                ==================================== */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Mobile Menu */}
                    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 w-80 max-w-[90vw] bg-gradient-to-b from-black/95 to-gray-900/95 backdrop-blur-xl border border-gray-700/80 rounded-xl shadow-2xl md:hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
                        <div className="py-4">
                            {sections.map((section, index) => (
                                <button
                                    key={section.id}
                                    onClick={() => handleNavClick(section.id)}
                                    className={`mobile-menu-item w-full text-left px-6 py-3 text-base font-medium border-b border-gray-800/50 last:border-b-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8245ec] focus:ring-inset group ${activeSection === section.id
                                        ? 'text-[#8245ec] bg-gradient-to-r from-[#8245ec]/20 to-transparent'
                                        : 'text-gray-300 hover:text-[#8245ec] hover:bg-gradient-to-r hover:from-[#8245ec]/10 hover:to-transparent'
                                        }`}
                                    style={{
                                        animationDelay: `${index * 50}ms`
                                    }}
                                >
                                    <span className="flex items-center justify-between">
                                        {section.label}
                                        <span className={`transition-opacity duration-200 ${activeSection === section.id
                                            ? 'opacity-100 text-[#8245ec]'
                                            : 'opacity-0 group-hover:opacity-100 text-[#8245ec]'
                                            }`}>→</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* ====================================
                SPACER FOR FIXED NAVBAR
                ==================================== */}
            <div className="h-16" />
        </>
    );
};

export default Navbar;

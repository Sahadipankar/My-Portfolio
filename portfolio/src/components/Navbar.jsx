import React from "react";

const sections = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "timeline", label: "Academics" },
    { id: "skills", label: "Skills" },
    { id: "portfolio", label: "Projects" },
    { id: "myapps", label: "Software" },
    { id: "contact", label: "Contact" },
];

const scrollToSection = (id) => {
    if (id === "about") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
};

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

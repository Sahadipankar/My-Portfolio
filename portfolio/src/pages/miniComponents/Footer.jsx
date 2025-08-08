// ====================================
// FOOTER COMPONENT
// ====================================
// This component renders the footer section of the portfolio website
// Features: Simple design with horizontal rule and thank you message
// Styling: Responsive typography with special tube light effect

// Import React
import React from "react"; // React library for component creation

/**
 * Footer Component
 * Simple footer with a thank you message and divider line
 * Uses responsive design for different screen sizes
 */
const Footer = () => {
  return (
    <footer className="p-5 mt-6 w-full max-w-[1050px] mx-auto">
      {/* ====================================
          FOOTER DIVIDER
          ==================================== */}
      {/* Horizontal rule to separate footer from main content */}
      <hr />

      {/* ====================================
          THANK YOU MESSAGE
          ==================================== */}
      {/* Responsive thank you message with special styling */}
      <h1 className="text-tubeLight-effect text-2xl sm:text-3xl mt-5 flex justify-center items-center text-center tracking-[4px] sm:tracking-[8px]">
        Thank You For Scrolling
      </h1>
    </footer>
  );
};

export default Footer;

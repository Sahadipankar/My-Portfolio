// ====================================
// PORTFOLIO HOME PAGE COMPONENT
// ====================================
// This is the main homepage for the public-facing portfolio website
// Combines all portfolio sections into a single-page layout
// Provides comprehensive overview of skills, projects, and experience

// Import React for component creation
import React from "react";

// Import individual section components for portfolio layout
import Hero from "./miniComponents/Hero";           // Hero section with introduction and avatar
import Timeline from "./miniComponents/Timeline";   // Career timeline and milestones
import Skills from "./miniComponents/Skills";       // Technical skills showcase
import MyApps from "./miniComponents/MyApps";       // Software applications and tools
import About from "./miniComponents/About";         // About me section with biography
import Portfolio from "./miniComponents/Portfolio"; // Projects portfolio gallery
import Contact from "./miniComponents/Contact";     // Contact form and information
import Experience from "./miniComponents/Experience"; // Work experience section

// Import navigation component
import Navbar from "../components/Navbar";          // Site navigation with smooth scrolling

/**
 * Home Component
 * Main portfolio homepage that combines all sections into a cohesive layout
 * Organized in logical order to tell the professional story effectively
 * Uses semantic HTML sections with proper scroll anchoring for navigation
 */
const Home = () => {
  return (
    <>
      {/* ====================================
          NAVIGATION
          ==================================== */}
      <Navbar />

      {/* ====================================
          MAIN CONTENT ARTICLE
          ==================================== */}
      {/* 
        Main content container with responsive layout and spacing
        - Responsive padding and margins for different screen sizes
        - Maximum width constraint for optimal reading experience
        - Consistent gap spacing between sections
      */}
      <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">

        {/* ====================================
            ABOUT SECTION
            ==================================== */}
        {/* Hero introduction and personal information */}
        <section id="about" className="scroll-mt-20">
          <Hero />   {/* Main hero banner with name, title, and call-to-action */}
          <About />  {/* Detailed about me section with biography */}
        </section>

        {/* ====================================
            EXPERIENCE SECTION
            ==================================== */}
        {/* Professional work experience and achievements */}
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>

        {/* ====================================
            TIMELINE SECTION
            ==================================== */}
        {/* Career progression and important milestones */}
        <section id="timeline" className="scroll-mt-20">
          <Timeline />
        </section>

        {/* ====================================
            SKILLS SECTION
            ==================================== */}
        {/* Technical skills with proficiency indicators */}
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>

        {/* ====================================
            PORTFOLIO SECTION
            ==================================== */}
        {/* Showcase of completed projects and work samples */}
        <section id="portfolio" className="scroll-mt-20">
          <Portfolio />
        </section>

        {/* ====================================
            SOFTWARE APPLICATIONS SECTION
            ==================================== */}
        {/* Tools, software, and technologies used */}
        <section id="myapps" className="scroll-mt-20">
          <MyApps />
        </section>

        {/* ====================================
            CONTACT SECTION
            ==================================== */}
        {/* Contact form and communication channels */}
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>

      </article>
    </>
  );
};

export default Home;

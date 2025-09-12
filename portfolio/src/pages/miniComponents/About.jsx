// ====================================
// ABOUT COMPONENT
// ====================================
// This component renders the About Me section of the portfolio
// Features: Profile introduction, personal photo, skills overview, and background information
// Layout: Two-column grid with image and text content

// Import React hooks (useEffect and useState are imported but not used in current implementation)
import React, { useEffect, useState } from "react";

/**
 * About Component
 * Displays personal introduction with photo and background information
 * Uses responsive grid layout for optimal viewing across devices
 */
const About = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">

      {/* ====================================
          SECTION TITLE WITH DECORATIVE STYLING
          ==================================== */}
      <div className="relative">
        {/* Main heading with responsive typography and special effects */}
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1 bg-clip-text bg-gradient-to-r from-[#8245ec] to-[#fff] drop-shadow-2xl animate-gradient"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <span className="ml-3">ABOUT</span><span className=" font-extrabold">ME</span>
        </h1>
        {/* Decorative line behind the heading */}
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      {/* ====================================
          SECTION SUBTITLE
          ==================================== */}
      <div className="text-center">
        <p className="uppercase text-xl text-gray-400 mb-5">
          Allow me to introduce myself.
        </p>
      </div>

      {/* ====================================
          MAIN CONTENT AREA
          ==================================== */}
      <div>
        {/* Two-column grid layout for photo and bio content */}
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">

          {/* ====================================
              PROFILE IMAGE SECTION
              ==================================== */}
          <div className="flex justify-center items-center">
            {/* Personal photo with styling effects */}
            <img
              src="https://res.cloudinary.com/dyjrsgbze/image/upload/v1757616486/Picsart_24-10-13_17-19-01-247_k4e0jb.jpg"
              alt="avatar"
              className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[440px]"
            />
          </div>

          {/* ====================================
              PERSONAL INFORMATION SECTION
              ==================================== */}
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5 ml-3 text-gray-300">
            {/* Introduction paragraph with name and roles */}
            <p>
              My name is <span className="text-[#8245ec] font-semibold">Dipankar Saha</span> 👨‍💻, an aspiring Data Scientist 📊 and Full Stack Developer 🌐 from Kolkata.
            </p>

            {/* Technical skills and technologies overview */}
            <p>
              I build scalable web and data-driven solutions using technologies like <span className="text-[#8245ec]">React, Next.js, Node.js, Express.js, MongoDB, MySQL, Firebase</span> ⚙️, along with Tailwind, Bootstrap 🎨 and RESTful APIs 🔗.
            </p>

            {/* Data Science expertise */}
            <p>
              In the field of Data Science, I work with <span className="text-[#8245ec]">Python and other Libraries</span> 🧠 to solve problems involving data analysis and AI.
            </p>

            {/* Current learning and exploration areas */}
            <p>
              Currently I'm exploring advanced domains like <span className="text-[#8245ec]">AI/ML, Deep Learning, NLP and Neural Network</span>.
            </p>
          </div>
        </div>

        {/* ====================================
            CLOSING STATEMENT
            ==================================== */}
        {/* Personal philosophy and motivation */}
        <p className="tracking-[1px] text-xl text-center text-gray-300">
          I'm driven by a passion for solving real-world problems through clean code, continuous learning, and innovation.
        </p>
      </div>
    </div>
  );
};

export default About;
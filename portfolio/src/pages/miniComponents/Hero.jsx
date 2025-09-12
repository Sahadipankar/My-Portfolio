// ====================================
// HERO SECTION COMPONENT
// ====================================
// This component renders the main hero section of the portfolio website
// Features dynamic typing animation, profile information, and social media links
// Serves as the primary introduction and call-to-action area

// Import Lucide React icons for social media and external links
import {
  ExternalLink,  // External link icon
  Facebook,      // Facebook social icon
  Github,        // GitHub social icon
  Instagram,     // Instagram social icon
  Linkedin,      // LinkedIn social icon
  Twitter,       // Twitter social icon
  Youtube,       // YouTube social icon
} from "lucide-react";

// Import React hooks for state management and effects
import React, { useEffect, useState } from "react";

// Import React Router for navigation
import { Link } from "react-router-dom";

// Import typewriter effect for dynamic text animation
import { Typewriter } from "react-simple-typewriter";

// Import Tilt component for 3D image effect
import Tilt from 'react-parallax-tilt';

// Import shadcn/ui button component
import { Button } from "@/components/ui/button";

// Import Axios for API requests
import axios from "axios";

/**
 * Hero Component
 * Renders the main introduction section with dynamic elements
 * Fetches user profile data and displays professional information
 */
const Hero = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================

  // User profile data state
  const [user, setUser] = useState({});

  // Loading state for profile data fetch
  const [loading, setLoading] = useState(true);

  // ====================================
  // DATA FETCHING EFFECT
  // ====================================

  /**
   * Profile Data Fetching Effect
   * Retrieves user profile information from backend API
   * Runs once on component mount
   */
  useEffect(() => {
    const getMyProfile = async () => {
      // Fetch user profile data from backend API
      // Uses environment-specific URL for development/production
      const { data } = await axios.get(
        `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/portfolio/me`,
        { withCredentials: true } // Include cookies for authentication if needed
      );

      setUser(data.user);    // Set user profile data
      setLoading(false);     // Stop loading state
    };

    getMyProfile();
  }, []);

  // ====================================
  // LOADING STATE RENDER
  // ====================================

  // Show loading message while fetching profile data
  if (loading) {
    return (
      <div className="text-center text-white text-xl animate-pulse">
        Loading profile... Please wait patiently.
      </div>
    );
  }

  // ====================================
  // COMPONENT RENDER
  // ====================================

  return (
    <div className="w-full mt-5">
      <br></br>

      {/* ====================================
          MAIN CONTENT LAYOUT
          ==================================== */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8">

        {/* ====================================
            LEFT SIDE - TEXT CONTENT
            ==================================== */}
        <div className="md:w-1/2 text-center md:text-left">
          {/* ====================================
              ONLINE STATUS INDICATOR
              ==================================== */}
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <span className="bg-green-400 rounded-full h-2 w-2"></span>
            <p>Online</p>
          </div>

          {/* ====================================
              MAIN HEADING WITH NAME
              ==================================== */}
          <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
          md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4 text-white font-bold">
            Hey, I am <br></br>
            <span className="text-[#a985e7]">Dipankar Saha</span>
          </h1>

          {/* ====================================
              DYNAMIC TYPEWRITER HEADING
              ==================================== */}
          <h1 className="overflow-x-hidden text-[0.8rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[1.6rem] tracking-[4px] flex flex-wrap items-center justify-center md:justify-start font-bold">
            <span className="inline-block">I'm a&nbsp;</span>
            <span className="inline-block text-[#885ad9]">
              {/* Dynamic typewriter effect displaying different roles */}
              <Typewriter
                words={["FULLSTACK DEVELOPER", "SOFTWARE DEVELOPER", "DATA SCIENTIST"]}
                loop={50}           // Number of animation loops
                cursor              // Show blinking cursor
                typeSpeed={70}      // Typing speed in milliseconds
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>
          {/* ====================================
              SOCIAL MEDIA LINKS
              ==================================== */}
          <div className="w-fit px-5 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-[20px] flex gap-5 
          items-center mt-4 md:mt-8 lg:mt-10 mx-auto md:mx-0">
            <Link to={user.linkedInURL} target="_blank">
              <Linkedin className="text-sky-500 w-7 h-7 hover:text-sky-400 transition-colors" />
            </Link>
            <Link to={user.facebookURL} target="_blank">
              <Facebook className="text-blue-800 w-7 h-7 hover:text-blue-700 transition-colors" />
            </Link>
            <Link to={user.instagramURL} target="_blank">
              <Instagram className="text-pink-500 w-7 h-7 hover:text-pink-400 transition-colors" />
            </Link>
            <Link to={user.twitterURL} target="_blank">
              <Twitter className="text-blue-800 w-7 h-7 hover:text-blue-700 transition-colors" />
            </Link>
            <Link to={"https://www.youtube.com"} target="_blank">
              <Youtube className="text-red-500 w-7 h-7 hover:text-red-400 transition-colors" />
            </Link>
          </div>

          {/* ====================================
              ACTION BUTTONS
              ==================================== */}
          <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3 justify-center md:justify-start">
            <Link to={user.githubURL} target="_blank">
              <Button className="rounded-[30px] flex items-center gap-2 flex-row bg-[#8245ec] hover:bg-[#7239d4] border-[#8245ec]">
                <span>
                  <Github />
                </span>
                <span>Github</span>
              </Button>
            </Link>
            <Link to={user.resume && user.resume.url} target="_blank">
              <Button className="rounded-[30px] flex items-center gap-2 flex-row bg-transparent border-[#8245ec] text-[#8245ec] hover:bg-[#8245ec] hover:text-white">
                <span>
                  <ExternalLink />
                </span>
                <span>Resume </span>
              </Button>
            </Link>
          </div>

          {/* ====================================
              ABOUT ME DESCRIPTION
              ==================================== */}
          <p className="mt-8 text-xl tracking-[2px] text-gray-300 text-center md:text-left">{user.aboutMe}</p>
        </div>

        {/* ====================================
            RIGHT SIDE - PROFILE IMAGE WITH TILT EFFECT
            ==================================== */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[27rem] md:h-[27rem] border-4 border-[#8245ec] rounded-full"
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <img
              src="https://res.cloudinary.com/dyjrsgbze/image/upload/v1757616484/1_xahqjj.jpg"
              alt="Dipankar Saha"
              className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
            />
          </Tilt>
        </div>
      </div>

      {/* ====================================
          SECTION DIVIDER
          ==================================== */}
      <br></br>
      <hr className="my-8 md:my-10 border-gray-700" />
    </div>
  );
};

export default Hero;

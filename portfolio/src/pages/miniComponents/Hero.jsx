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
    <div className="w-full">
      {/* ====================================
          ONLINE STATUS INDICATOR
          ==================================== */}
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div>

      {/* ====================================
          MAIN HEADING WITH NAME
          ==================================== */}
      <h1 className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4">
        Hey, I'm Dipankar Saha
      </h1>

      {/* ====================================
          DYNAMIC TYPEWRITER HEADING
          ==================================== */}
      <h1 className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px] flex flex-wrap items-center">
        <span className="inline-block">I'm a&nbsp;</span>
        <span className="inline-block">
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
      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10">
        <Link to={user.linkedInURL} target="_blank">
          <Linkedin className="text-sky-500 w-7 h-7" />
        </Link>
        <Link to={user.facebookURL} target="_blank">
          <Facebook className="text-blue-800 w-7 h-7" />
        </Link>
        <Link to={user.instagramURL} target="_blank">
          <Instagram className="text-pink-500 w-7 h-7" />
        </Link>
        <Link to={user.twitterURL} target="_blank">
          <Twitter className="text-blue-800 w-7 h-7" />
        </Link>
        <Link to={"https://www.youtube.com"} target="_blank">
          <Youtube className="text-red-500 w-7 h-7" />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10  flex gap-3">
        <Link to={user.githubURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Github />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link to={user.resume && user.resume.url} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span>Resume </span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>
      <hr className="my-8 md::my-10 " />
    </div>
  );
};

export default Hero;

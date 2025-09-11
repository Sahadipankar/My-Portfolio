// ====================================
// PORTFOLIO COMPONENT
// ====================================
// This component displays a showcase of portfolio projects
// Features: Dynamic data fetching, responsive grid layout, view all/less functionality
// Navigation: Links to individual project detail pages

// Import UI components, HTTP client, and navigation
import { Button } from "@/components/ui/button";  // Button component for show more/less
import { Card } from "@/components/ui/card";      // Card component (imported but not used)
import axios from "axios";                        // HTTP client for API requests
import React, { useEffect, useState } from "react"; // React hooks for state and side effects
import { Link } from "react-router-dom";          // Navigation component for project links

/**
 * Portfolio Component
 * Displays a grid of project cards with navigation to individual project pages
 * Includes toggle functionality to show all projects or just the first 3
 */
const Portfolio = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================
  const [viewAll, setViewAll] = useState(false);   // Toggle state for showing all projects
  const [projects, setProjects] = useState([]);    // Array to store fetched projects data
  const [loading, setLoading] = useState(true);    // Loading state for data fetching

  // ====================================
  // DATA FETCHING EFFECT
  // ====================================
  useEffect(() => {
    /**
     * Fetches projects data from the backend API
     * Updates state with fetched data and manages loading state
     */
    const getMyProjects = async () => {
      try {
        // API call to fetch all projects with credentials
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/project/getall`,
          { withCredentials: true }
        );
        setProjects(data.projects);  // Update projects state with fetched data
        setLoading(false);           // Set loading to false after successful fetch
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);           // Set loading to false even on error
      }
    };
    getMyProjects();
  }, []); // Empty dependency array - runs once on component mount
  // ====================================
  // RENDER COMPONENT
  // ====================================
  return (
    <div>
      {/* ====================================
          SECTION TITLE WITH RESPONSIVE DESIGN
          ==================================== */}
      <div className="relative mb-12">
        {/* Desktop/Tablet title - "MY PROJECTS" */}
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <span className="ml-3">MY</span>{" "}
          <span className="font-extrabold">
            PROJECTS
          </span>
        </h1>

        {/* Mobile title - "MY WORK" (shorter for mobile) */}
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <span className="ml-3">MY</span><span className="font-extrabold">WORK</span>
        </h1>

        {/* Decorative line behind the heading */}
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>

      {/* ====================================
          CONDITIONAL RENDERING: LOADING VS CONTENT
          ==================================== */}
      {loading ? (
        // Loading state display
        <div className="text-center text-white text-xl animate-pulse">
          Loading projects... Please wait patiently.
        </div>
      ) : (
        // Projects grid display
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* ====================================
              PROJECT CARDS RENDERING
              ==================================== */}
          {viewAll
            ? // Show all projects when viewAll is true
            projects &&
            projects.map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <div className="flex flex-col items-center group">
                    {/* Project banner image */}
                    <img
                      src={element.projectBanner && element.projectBanner.url}
                      alt={element.title}
                      className="w-48 h-32 object-cover rounded-lg border border-gray-700 group-hover:border-[#8245ec] transition-colors"
                    />
                    {/* Project title */}
                    <p className="mt-2 text-center font-semibold text-gray-300 group-hover:text-[#8245ec] transition-colors">{element.title}</p>
                  </div>
                </Link>
              );
            })
            : // Show only first 3 projects when viewAll is false
            projects &&
            projects.slice(0, 3).map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <div className="flex flex-col items-center group">
                    {/* Project banner image */}
                    <img
                      src={element.projectBanner && element.projectBanner.url}
                      alt={element.title}
                      className="w-48 h-32 object-cover rounded-lg border border-gray-700 group-hover:border-[#8245ec] transition-colors"
                    />
                    {/* Project title */}
                    <p className="mt-2 text-center font-semibold text-gray-300 group-hover:text-[#8245ec] transition-colors">{element.title}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      )}

      {/* ====================================
          SHOW MORE/LESS BUTTON
          ==================================== */}
      {/* Only show button if there are more than 9 projects */}
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52 bg-[#8245ec] hover:bg-[#7239d4] text-white" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

// ====================================
// SKILLS COMPONENT
// ====================================
// This component displays technical skills organized by categories
// Features: Dynamic data fetching, loading states, categorized skill display
// Categories: Programming Languages, Frontend, Backend, Database, Tools, Libraries

// Import UI components and HTTP client
import { Card } from "@/components/ui/card";  // Reusable card component for skill display
import axios from "axios";                   // HTTP client for API requests
import React, { useEffect, useState } from "react"; // React hooks for state and side effects

/**
 * Skills Component
 * Fetches and displays technical skills grouped by categories
 * Uses responsive grid layout for optimal viewing across devices
 */
const Skills = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================
  const [skills, setSkills] = useState([]);      // Array to store fetched skills data
  const [loading, setLoading] = useState(true);  // Loading state for data fetching

  // ====================================
  // DATA FETCHING EFFECT
  // ====================================
  useEffect(() => {
    /**
     * Fetches skills data from the backend API
     * Updates state with fetched data and manages loading state
     */
    const getMySkills = async () => {
      try {
        // API call to fetch all skills with credentials
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/skill/getall`,
          { withCredentials: true }
        );
        setSkills(data.skills);  // Update skills state with fetched data
        setLoading(false);       // Set loading to false after successful fetch
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);       // Set loading to false even on error
      }
    };
    getMySkills();
  }, []); // Empty dependency array - runs once on component mount
  // ====================================
  // RENDER COMPONENT
  // ====================================
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      {/* ====================================
          SECTION TITLE
          ==================================== */}
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        SKILLS
      </h1>

      {/* ====================================
          CONDITIONAL RENDERING: LOADING VS CONTENT
          ==================================== */}
      {loading ? (
        // Loading state display
        <div className="text-center text-white text-xl animate-pulse">
          Loading skills data... Please wait patiently.
        </div>
      ) : (
        // Main content: Skills organized by categories
        ["programming languages", "frontend", "backend", "database", "tools", "libraries"].map((cat) => {
          return (
            <div key={cat} className="mb-5">
              {/* ====================================
                  CATEGORY HEADER
                  ==================================== */}
              <h2 className="text-xl font-bold mb-4 capitalize">{cat}</h2>

              {/* ====================================
                  SKILLS GRID FOR CATEGORY
                  ==================================== */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Check if skills exist for this category */}
                {skills && skills.filter((s) => s.category === cat).length > 0 ? (
                  // Render skill cards for this category
                  skills.filter((s) => s.category === cat).map((element) => (
                    <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={element._id}>
                      {/* Skill icon/logo */}
                      <img
                        src={element.svg && element.svg.url}
                        alt="skill"
                        className="h-12 sm:h-24 w-auto"
                      />
                      {/* Skill name */}
                      <p className="text-muted-foreground text-center">
                        {element.title}
                      </p>
                    </Card>
                  ))
                ) : (
                  // Display message if no skills found for this category
                  <p className="text-lg text-muted-foreground">No {cat} skill added.</p>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Skills;

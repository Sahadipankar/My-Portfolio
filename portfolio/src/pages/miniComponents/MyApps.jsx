// ====================================
// MY APPS COMPONENT
// ====================================
// This component displays software applications and tools used in development
// Features: Dynamic data fetching, responsive grid layout, loading states
// Content: Software applications with logos and names

// Import UI components and HTTP client
import { Card } from "@/components/ui/card";      // Reusable card component for app display
import axios from "axios";                        // HTTP client for API requests
import React, { useEffect, useState } from "react"; // React hooks for state and side effects

/**
 * MyApps Component
 * Displays a grid of software applications and development tools
 * Each app is shown with its logo and name in a card format
 */
const MyApps = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================
  const [apps, setApps] = useState([]);        // Array to store fetched applications data
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  // ====================================
  // DATA FETCHING EFFECT
  // ====================================
  useEffect(() => {
    /**
     * Fetches software applications data from the backend API
     * Updates state with fetched data and manages loading state
     */
    const getMyApps = async () => {
      try {
        // API call to fetch all software applications with credentials
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/softwareapplication/getall`,
          { withCredentials: true }
        );
        setApps(data.softwareApplications); // Update apps state with fetched data
        setLoading(false);                  // Set loading to false after successful fetch
      } catch (error) {
        console.error("Error fetching software applications:", error);
        setLoading(false);                  // Set loading to false even on error
      }
    };
    getMyApps();
  }, []); // Empty dependency array - runs once on component mount

  // ====================================
  // RENDER COMPONENT
  // ====================================
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      {/* ====================================
          SECTION TITLE
          ==================================== */}
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        SOFTWARE
      </h1>

      {/* ====================================
          CONDITIONAL RENDERING: LOADING VS CONTENT
          ==================================== */}
      {loading ? (
        // Loading state display
        <div className="text-center text-white text-xl animate-pulse">
          Loading software applications... Please wait patiently.
        </div>
      ) : (
        // Applications grid display
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* ====================================
              APPLICATIONS MAPPING
              ==================================== */}
          {apps &&
            apps.map((element) => {
              return (
                <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={element._id}>
                  {/* Application logo/icon */}
                  <img
                    src={element.svg && element.svg.url}
                    alt="software application"
                    className="h-12 sm:h-24 w-auto"
                  />
                  {/* Application name */}
                  <p className="text-muted-foreground text-center">
                    {element.name}
                  </p>
                </Card>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MyApps;

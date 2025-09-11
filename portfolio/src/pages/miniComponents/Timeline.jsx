// ====================================
// TIMELINE COMPONENT
// ====================================
// This component displays academic achievements and milestones in chronological order
// Features: Dynamic data fetching, timeline visualization, reverse chronological order
// Layout: Vertical timeline with icons, dates, and descriptions

// Import HTTP client and React hooks
import axios from "axios";                        // HTTP client for API requests
import React, { useEffect, useState } from "react"; // React hooks for state and side effects
import BlurBlob from "../../components/BlurBlob";

/**
 * Timeline Component
 * Displays academic timeline events in a visually appealing vertical timeline format
 * Events are displayed in reverse chronological order (newest first)
 */
const Timeline = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================
  const [timeline, setTimeline] = useState([]); // Array to store fetched timeline data

  // ====================================
  // DATA FETCHING EFFECT
  // ====================================
  useEffect(() => {
    /**
     * Fetches timeline data from the backend API
     * Updates state with fetched data for academic milestones
     */
    const getMyTimeline = async () => {
      try {
        // API call to fetch all timeline events with credentials
        const { data } = await axios.get(
          `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/timeline/getall`,
          { withCredentials: true }
        );
        setTimeline(data.timelines); // Update timeline state with fetched data
      } catch (error) {
        console.error("Error fetching timeline:", error);
        setTimeline([]); // Set empty array on error
      }
    };
    getMyTimeline();
  }, []); // Empty dependency array - runs once on component mount
  // ====================================
  // RENDER COMPONENT
  // ====================================
  return (
    <div>
      {/* ====================================
          SECTION TITLE
          ==================================== */}
      <h1 className="overflow-x-hidden text-[2rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] mb-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] to-[#fff] drop-shadow-2xl animate-gradient">
        ACADEMICS
      </h1>

      {/* ====================================
          CONDITIONAL RENDERING: LOADING VS TIMELINE
          ==================================== */}
      {timeline.length === 0 ? (
        // Loading state display when no timeline data is available
        <div className="text-center text-white text-xl animate-pulse">
          Loading academics data... Please wait patiently.
        </div>
      ) : (
        // Timeline visualization with vertical line and icons
        <ol className="relative border-s border-[#8245ec]">
          {/* ====================================
              TIMELINE ITEMS RENDERING
              ==================================== */}
          {timeline &&
            [...timeline].reverse().map((element) => { // Reverse array to show newest first
              return (
                <li className="mb-10 ms-6" key={element._id}>
                  {/* ====================================
                      TIMELINE ICON/MARKER
                      ==================================== */}
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-[#8245ec] rounded-full -start-3 ring-8 ring-gray-900">
                    {/* Calendar icon to represent timeline events */}
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </span>

                  {/* ====================================
                      TIMELINE CONTENT
                      ==================================== */}
                  {/* Event title */}
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {element.title}
                  </h3>

                  {/* Event timeframe (from - to dates) */}
                  <time className="block mb-2 mt-1 text-sm font-normal leading-none text-gray-400">
                    {element.timeline.from} - {element.timeline.to ? element.timeline.to : " "}
                  </time>

                  {/* Event description */}
                  <p className="text-base font-normal text-gray-300">
                    {element.description}
                  </p>
                </li>
              );
            })}
        </ol>
      )}
    </div>
  );
};

export default Timeline;

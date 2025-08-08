// ====================================
// EXPERIENCE COMPONENT
// ====================================
// This component displays work experience and professional background
// Features: Dynamic data fetching, timeline visualization, loading states, error handling
// Layout: Vertical timeline with alternating left/right positioning for visual appeal

// Import React hooks and HTTP client
import React, { useEffect, useState } from "react"; // React hooks for state and side effects
import axios from "axios";                         // HTTP client for API requests

/**
 * Experience Component
 * Displays professional work experience in a visually appealing timeline format
 * Features alternating positioning and gradient styling for enhanced presentation
 */
const Experience = () => {
    // ====================================
    // STATE MANAGEMENT
    // ====================================
    const [experiences, setExperiences] = useState([]); // Array to store fetched experience data
    const [loading, setLoading] = useState(true);       // Loading state for data fetching
    const [error, setError] = useState("");             // Error state for handling API failures

    // ====================================
    // DATA FETCHING EFFECT
    // ====================================
    useEffect(() => {
        /**
         * Fetches experience data from the backend API
         * Updates state with fetched data and manages loading/error states
         */
        const getExperiences = async () => {
            try {
                // API call to fetch all experience entries with credentials
                const { data } = await axios.get(
                    `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/experience/getall`,
                    { withCredentials: true }
                );
                setExperiences(data.experiences); // Update experiences state with fetched data
            } catch (err) {
                setError("Failed to fetch experiences"); // Set error message on API failure
            } finally {
                setLoading(false); // Set loading to false regardless of success/failure
            }
        };
        getExperiences();
    }, []); // Empty dependency array - runs once on component mount

    // ====================================
    // RENDER COMPONENT
    // ====================================
    return (
        <section
            id="experience"
            className="pt-0 sm:pt-0 md:pt-0 pb-16 px-2 md:px-10 lg:px-32 font-sans min-h-screen bg-gradient-to-br relative overflow-x-hidden"
        >
            {/* ====================================
                BACKGROUND EFFECTS
                ==================================== */}
            {/* Static glowing background for visual enhancement */}
            <div className="absolute inset-0 z-0 pointer-events-none">
            </div>

            {/* ====================================
                SECTION HEADER
                ==================================== */}
            <div className="text-center mb-12 relative z-10">
                {/* Main section title with gradient text effect */}
                <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] to-[#fff] drop-shadow-2xl animate-gradient">
                    Experience
                </h2>
                {/* Section description */}
                <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl mx-auto font-medium animate-fadein uppercase">
                    My professional journey & experience in various organizations.
                </p>
            </div>

            {/* ====================================
                MAIN CONTENT AREA
                ==================================== */}
            <div className="flex flex-col items-center w-full relative z-10">
                {/* ====================================
                    CONDITIONAL RENDERING: LOADING/ERROR/CONTENT
                    ==================================== */}
                {loading ? (
                    // Loading state display
                    <div className="text-center text-white text-xl animate-pulse">
                        Loading experience data... Please wait patiently.
                    </div>
                ) : error ? (
                    // Error state display
                    <div className="text-center text-red-500 text-lg">{error}</div>
                ) : experiences.length > 0 ? (
                    // Experience timeline display
                    <div className="relative w-full max-w-3xl">
                        {/* ====================================
                            TIMELINE VERTICAL LINE
                            ==================================== */}
                        {/* Glowing Timeline vertical line for visual connection */}
                        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#8245ec] via-[#fff] to-[#8245ec] shadow-[0_0_10px_5px_rgba(130,69,236,0.5)]"></div>
                        {/* ====================================
                            EXPERIENCE TIMELINE LIST
                            ==================================== */}
                        <ul className="space-y-16">
                            {/* Reverse array to show newest experience first */}
                            {[...experiences].reverse().map((experience, index) => (
                                <li key={experience._id || index} className="relative z-10 min-h-[120px]">

                                    {/* ====================================
                                        DESKTOP LAYOUT (MD AND UP)
                                        ==================================== */}
                                    <div className="w-full hidden md:flex flex-row items-center justify-between gap-8">

                                        {/* ====================================
                                            LEFT SIDE CARD (EVEN INDICES)
                                            ==================================== */}
                                        {index % 2 === 0 ? (
                                            <div className="w-1/2 flex justify-end">
                                                {/* Experience card with gradient background and hover effects */}
                                                <div className="bg-gradient-to-br from-[#20133e] via-[#0a011f] to-[#020817] bg-opacity-80 backdrop-blur-2xl rounded-2xl shadow-xl border border-[#46247f] p-3 md:p-5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_8px_rgba(130,69,236,0.4)] hover:border-white group-hover:ring-2 group-hover:ring-[#190e2e]">
                                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                                        {/* ====================================
                                                            COMPANY LOGO
                                                            ==================================== */}
                                                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden shadow-md border border-[#8245ec] animate-fadein">
                                                            <img
                                                                src={experience.experienceBanner?.url || experience.img}
                                                                alt={experience.company}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>

                                                        {/* ====================================
                                                            EXPERIENCE DETAILS
                                                            ==================================== */}
                                                        <div className="flex flex-col justify-between">
                                                            {/* Job role/position */}
                                                            <h3 className="text-xl font-extrabold text-white mb-1 drop-shadow-lg">
                                                                {experience.role}
                                                            </h3>
                                                            {/* Company name */}
                                                            <h4 className="text-base text-[#aa96be] font-bold mb-1">
                                                                {experience.company}
                                                            </h4>
                                                            {/* Employment duration */}
                                                            <p className="text-xs text-gray-400 mt-1 italic">
                                                                {experience.date}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Experience description */}
                                                    <p className="mt-3 text-gray-200 text-base leading-relaxed animate-fadein">
                                                        {experience.desc}
                                                    </p>

                                                    {/* ====================================
                                                        SKILLS SECTION
                                                        ==================================== */}
                                                    <div className="mt-3">
                                                        <h5 className="font-bold text-white mb-2">Skills:</h5>
                                                        <ul className="flex flex-wrap gap-2">
                                                            {/* Parse skills array or comma-separated string */}
                                                            {(Array.isArray(experience.skills) ? experience.skills : (experience.skills || "").split(",")).map((skill, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="font-semibold capitalize bg-gradient-to-r from-[#8245ec] to-[#fff] text-[#1a1333] px-3 py-1 text-xs md:text-xs rounded-lg border border-[#8245ec] shadow-md hover:scale-110 hover:bg-[#fff] hover:text-[#8245ec] transition-all duration-200 cursor-pointer"
                                                                >
                                                                    {skill}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            // Empty space for right side when card is on left
                                            <div className="w-1/2"></div>
                                        )}

                                        {/* ====================================
                                            TIMELINE CENTER DOT
                                            ==================================== */}
                                        {/* Timeline Dot always centered with company icon */}
                                        <span className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#8245ec] to-[#fff] border-4 border-[#9c82cb] rounded-full flex items-center justify-center shadow-[0_0_20px_5px_rgba(130,69,236,0.7)] z-20 mx-auto">
                                            <img
                                                src={experience.experienceBanner?.url || experience.img}
                                                alt={experience.company}
                                                className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full"
                                            />
                                        </span>

                                        {/* ====================================
                                            RIGHT SIDE CARD (ODD INDICES)
                                            ==================================== */}
                                        {index % 2 !== 0 ? (
                                            <div className="w-1/2 flex justify-start">
                                                {/* Experience card with gradient background and hover effects */}
                                                <div className="bg-gradient-to-br from-[#20133e] via-[#0a011f] to-[#020817] bg-opacity-80 backdrop-blur-2xl rounded-2xl shadow-xl border border-[#46247f] p-3 md:p-5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_8px_rgba(130,69,236,0.4)] hover:border-white group-hover:ring-2 group-hover:ring-[#190e2e]">
                                                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                                                        {/* Company logo */}
                                                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden shadow-md border border-[#8245ec] animate-fadein">
                                                            <img
                                                                src={experience.experienceBanner?.url || experience.img}
                                                                alt={experience.company}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        {/* Experience details */}
                                                        <div className="flex flex-col justify-between">
                                                            <h3 className="text-xl font-extrabold text-white mb-1 drop-shadow-lg">
                                                                {experience.role}
                                                            </h3>
                                                            <h4 className="text-base text-[#aa96be] font-bold mb-1">
                                                                {experience.company}
                                                            </h4>
                                                            <p className="text-xs text-gray-400 mt-1 italic">
                                                                {experience.date}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* Experience description */}
                                                    <p className="mt-3 text-gray-200 text-base leading-relaxed animate-fadein">
                                                        {experience.desc}
                                                    </p>
                                                    {/* Skills section */}
                                                    <div className="mt-3">
                                                        <h5 className="font-bold text-white mb-2">Skills:</h5>
                                                        <ul className="flex flex-wrap gap-2">
                                                            {(Array.isArray(experience.skills) ? experience.skills : (experience.skills || "").split(",")).map((skill, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="font-semibold capitalize bg-gradient-to-r from-[#8245ec] to-[#fff] text-[#1a1333] px-3 py-1 text-xs md:text-xs rounded-lg border border-[#8245ec] shadow-md hover:scale-110 hover:bg-[#fff] hover:text-[#8245ec] transition-all duration-200 cursor-pointer"
                                                                >
                                                                    {skill}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            // Empty space for left side when card is on right
                                            <div className="w-1/2"></div>
                                        )}
                                    </div>

                                    {/* ====================================
                                        MOBILE LAYOUT (BELOW MD BREAKPOINT)
                                        ==================================== */}
                                    {/* Mobile layout: card below dot for simpler vertical layout */}
                                    <div className="w-full flex md:hidden flex-col items-center mt-4">
                                        {/* Timeline dot for mobile */}
                                        <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#8245ec] to-[#fff] border-4 border-[#9c82cb] rounded-full flex items-center justify-center shadow-[0_0_20px_5px_rgba(130,69,236,0.7)] z-20 mx-auto mb-4">
                                            <img
                                                src={experience.experienceBanner?.url || experience.img}
                                                alt={experience.company}
                                                className="w-8 h-8 object-cover rounded-full"
                                            />
                                        </span>

                                        {/* Mobile experience card */}
                                        <div className="w-full bg-gradient-to-br from-[#20133e] via-[#0a011f] to-[#020817] bg-opacity-80 backdrop-blur-2xl rounded-2xl shadow-xl border border-[#46247f] p-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_8px_rgba(130,69,236,0.4)] hover:border-white group-hover:ring-2 group-hover:ring-[#190e2e]">
                                            {/* Mobile card header with logo and basic info */}
                                            <div className="flex flex-row items-center gap-3">
                                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg overflow-hidden shadow-md border border-[#8245ec] animate-fadein">
                                                    <img
                                                        src={experience.experienceBanner?.url || experience.img}
                                                        alt={experience.company}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col justify-between">
                                                    <h3 className="text-xl font-extrabold text-white mb-1 drop-shadow-lg">
                                                        {experience.role}
                                                    </h3>
                                                    <h4 className="text-base text-[#aa96be] font-bold mb-1">
                                                        {experience.company}
                                                    </h4>
                                                    <p className="text-xs text-gray-400 mt-1 italic">
                                                        {experience.date}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Mobile card description */}
                                            <p className="mt-3 text-gray-200 text-base leading-relaxed animate-fadein">
                                                {experience.desc}
                                            </p>

                                            {/* Mobile card skills */}
                                            <div className="mt-3">
                                                <h5 className="font-bold text-white mb-2">Skills:</h5>
                                                <ul className="flex flex-wrap gap-2">
                                                    {(Array.isArray(experience.skills) ? experience.skills : (experience.skills || "").split(",")).map((skill, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="font-semibold capitalize bg-gradient-to-r from-[#8245ec] to-[#fff] text-[#1a1333] px-3 py-1 text-xs rounded-lg border border-[#8245ec] shadow-md hover:scale-110 hover:bg-[#fff] hover:text-[#8245ec] transition-all duration-200 cursor-pointer"
                                                        >
                                                            {skill}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    // No experience message
                    <div className="text-center text-white text-lg">No experience added yet.</div>
                )}
            </div>

            {/* ====================================
                CUSTOM CSS ANIMATIONS
                ==================================== */}
            {/* Custom keyframes for gradient and fade effects */}
            <style>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 4s ease-in-out infinite;
                }
                
                /* Fade-in animation for smooth content appearance */
                @keyframes fadein {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadein {
                    animation: fadein 1s ease;
                }
                
                /* Glow animation for enhanced visual effects */
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 30px 10px rgba(130,69,236,0.5); }
                    50% { box-shadow: 0 0 50px 20px rgba(130,69,236,0.8); }
                }
                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Experience;

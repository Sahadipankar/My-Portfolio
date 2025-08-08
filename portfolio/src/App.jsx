// ====================================
// PORTFOLIO WEBSITE MAIN COMPONENT
// ====================================
// This is the root component for the public-facing portfolio website
// Handles routing, theme management, and overall application structure
// Displays portfolio content to visitors and potential employers

// Import global styles
import "./App.css";

// Import theme management components for dark/light mode functionality
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

// Import React Router components for navigation
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import page components
import Home from "./pages/Home";                    // Main portfolio homepage
import ProjectView from "./pages/ProjectView";      // Individual project details page

// Import shared components
import Footer from "./pages/miniComponents/Footer"; // Site footer with links and info

// Import toast notification system for user feedback
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Main Portfolio Application Component
 * Sets up the public-facing portfolio website with routing and theme support
 * Provides a professional interface for showcasing work and skills
 */
function App() {
  return (
    // ====================================
    // THEME PROVIDER WRAPPER
    // ====================================
    // Provides dark/light theme functionality across the entire application
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {/* ====================================
            APPLICATION ROUTING
            ==================================== */}
        <Routes>
          {/* Main portfolio homepage - displays all sections */}
          <Route path="/" element={<Home />} />

          {/* Individual project view with dynamic project ID */}
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>

        {/* ====================================
            GLOBAL COMPONENTS
            ==================================== */}

        {/* Site footer - appears on all pages */}
        <Footer />

        {/* Global toast notification container for user feedback */}
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

export default App;

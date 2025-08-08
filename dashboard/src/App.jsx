// ====================================
// DASHBOARD APPLICATION MAIN COMPONENT
// ====================================
// This is the root component for the portfolio admin dashboard
// Handles routing, global state initialization, and application structure
// Provides admin interface for managing portfolio content

// Import global styles
import "./App.css";

// Import React Router components for navigation
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import toast notification system
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import page components for different admin functions
import Login from "./pages/Login";                    // User authentication
import HomePage from "./pages/HomePage";              // Dashboard home/overview
import ManageSkills from "./pages/ManageSkills";      // Skills management
import ManageProjects from "./pages/ManageProjects";  // Projects management
import UpdateProject from "./pages/UpdateProject";    // Individual project editing
import ForgotPassword from "./pages/ForgotPassword";  // Password recovery initiation
import ResetPassword from "./pages/ResetPassword";    // Password reset form
import ManageTimeline from "./pages/ManageTimeline";  // Timeline/career events management
import ViewProject from "./pages/ViewProject";        // Project details view
import ManageExperience from "./pages/ManageExperience"; // Work experience management
import EditExperience from "./pages/sub-components/UpdateExperience"; // Experience editing

// Import Redux store management
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// Import Redux action creators for initial data loading
import { getUser } from "./store/slices/userSlice";                           // User profile data
import { getAllSkills } from "./store/slices/skillSlice";                    // Technical skills
import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice"; // Software tools
import { getAllTimeline } from "./store/slices/timelineSlice";               // Career timeline
import { getAllMessages } from "./store/slices/messageSlice";                // Contact messages
import { getAllProjects } from "./store/slices/projectSlice";                // Portfolio projects

/**
 * Main Application Component
 * Sets up routing, initializes global state, and renders the dashboard interface
 * Fetches all necessary data on application startup
 */
function App() {
  const dispatch = useDispatch();

  // ====================================
  // INITIAL DATA LOADING
  // ====================================

  /**
   * Effect hook for loading initial application data
   * Dispatches actions to fetch all portfolio data when app starts
   * Ensures dashboard has all necessary data for management operations
   */
  useEffect(() => {
    dispatch(getUser());                      // Load user profile information
    dispatch(getAllSkills());                // Load technical skills data
    dispatch(getAllSoftwareApplications());  // Load software tools data
    dispatch(getAllTimeline());              // Load career timeline events
    dispatch(getAllMessages());              // Load contact form messages
    dispatch(getAllProjects());              // Load portfolio projects
  }, []);

  // ====================================
  // APPLICATION ROUTING AND STRUCTURE
  // ====================================

  return (
    <Router>
      {/* Define application routes for different admin pages */}
      <Routes>
        {/* Dashboard home - overview of all portfolio data */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Content management routes */}
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/timeline" element={<ManageTimeline />} />
        <Route path="/manage/projects" element={<ManageProjects />} />
        <Route path="/manage/experience" element={<ManageExperience />} />

        {/* Project-specific routes with dynamic parameters */}
        <Route path="/view/project/:id" element={<ViewProject />} />
        <Route path="/update/project/:id" element={<UpdateProject />} />
        <Route path="/update/experience/:id" element={<EditExperience />} />
      </Routes>

      {/* Global toast notification container for user feedback */}
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;

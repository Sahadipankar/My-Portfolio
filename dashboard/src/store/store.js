// ====================================
// REDUX STORE CONFIGURATION - DASHBOARD
// ====================================
// This file configures the Redux store for the admin dashboard application.
// Combines all slice reducers to manage global application state.
// Handles state management for all portfolio data and UI operations.

// Import Redux Toolkit store configuration function
import { configureStore } from "@reduxjs/toolkit";

// Import all slice reducers for different data domains
import userReducer from "./slices/userSlice";                           // User authentication and profile
import forgotPasswordReducer from "./slices/forgotResetPasswordSlice";   // Password reset functionality
import skillReducer from "./slices/skillSlice";                         // Technical skills management
import projectReducer from "./slices/projectSlice";                     // Portfolio projects management
import timelineReducer from "./slices/timelineSlice";                   // Career timeline management
import softwareApplicationReducer from "./slices/softwareApplicationSlice"; // Software tools management
import messageReducer from "./slices/messageSlice";                     // Contact messages management
import experienceReducer from "./slices/experienceSlice";               // Work experience management

/**
 * Redux Store Configuration
 * Combines all reducers into a single store for centralized state management.
 * Each slice handles a specific domain of the portfolio application.
 *
 * Store Structure:
 * - user: Authentication status, profile data, login/logout operations
 * - forgotPassword: Password reset flow state and operations
 * - skill: Technical skills CRUD operations and state
 * - project: Portfolio projects CRUD operations and state
 * - timeline: Career timeline CRUD operations and state
 * - softwareApplications: Software tools CRUD operations and state
 * - messages: Contact form messages and state
 * - experience: Work experience CRUD operations and state
 */
export const store = configureStore({
  reducer: {
    user: userReducer,                        // User authentication and profile management
    forgotPassword: forgotPasswordReducer,    // Password reset workflow
    skill: skillReducer,                      // Technical skills data
    project: projectReducer,                  // Portfolio projects data
    timeline: timelineReducer,                // Career timeline events
    softwareApplications: softwareApplicationReducer, // Software tools and applications
    messages: messageReducer,                 // Contact form messages
    experience: experienceReducer,            // Work experience data
  },
});

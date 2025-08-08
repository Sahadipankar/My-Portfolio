// ====================================
// DASHBOARD APPLICATION ENTRY POINT
// ====================================
// Main entry file for the admin dashboard React application
// Sets up React root, Redux store provider, and renders the main App component
// Includes global styles and Redux state management integration

// Import React core library
import React from "react";
// Import ReactDOM for rendering React components to the DOM
import ReactDOM from "react-dom/client";
// Import main App component
import App from "./App.jsx";
// Import global CSS styles
import "./index.css";
// Import Redux Provider for state management
import { Provider } from "react-redux";
// Import Redux store configuration
import { store } from "@/store/store.js";

// ====================================
// APPLICATION BOOTSTRAP
// ====================================
// Create React root and render the application with Redux Provider
// Provider makes Redux store available to all components in the app tree
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

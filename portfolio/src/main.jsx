// ====================================
// PORTFOLIO APPLICATION ENTRY POINT
// ====================================
// Main entry file for the portfolio React application
// Sets up React root and renders the main App component
// Includes global styles and React StrictMode for development

// Import React core library
import React from 'react'
// Import ReactDOM for rendering React components to the DOM
import ReactDOM from 'react-dom/client'
// Import main App component
import App from './App.jsx'
// Import global CSS styles
import './index.css'

// ====================================
// APPLICATION INITIALIZATION
// ====================================
// Create React root and render the application
// StrictMode helps identify potential problems in the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

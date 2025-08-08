// ====================================
// VITE CONFIGURATION - DASHBOARD
// ====================================
// This file configures Vite build tool for the admin dashboard application
// Sets up React plugin, path aliases, and development server options
// Optimizes build process and development experience

// Import Vite configuration function
import { defineConfig } from "vite";

// Import React plugin for Vite - enables React development features
import react from "@vitejs/plugin-react";

// Import Node.js path module for handling file paths
import path from "path";

/**
 * Vite Configuration
 * Configures the build tool for optimal development and production builds
 * 
 * Configuration includes:
 * - React plugin for JSX transformation and hot reload
 * - Path aliases for cleaner import statements
 * - Development server optimizations
 */
// Official Vite documentation: https://vitejs.dev/config/
export default defineConfig({
  // ====================================
  // PLUGINS CONFIGURATION
  // ====================================

  plugins: [
    react() // Enables React support with fast refresh and JSX transformation
  ],

  // ====================================
  // MODULE RESOLUTION CONFIGURATION
  // ====================================

  resolve: {
    alias: {
      // Create '@' alias pointing to src directory
      // Allows imports like: import Component from "@/components/Component"
      // Instead of: import Component from "../../components/Component"
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

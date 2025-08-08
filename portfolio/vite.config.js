// ====================================
// VITE CONFIGURATION - PORTFOLIO
// ====================================
// This file configures Vite build tool for the public portfolio website
// Sets up React plugin, path aliases, and build optimizations
// Ensures fast development and optimized production builds

// Import Node.js path module for handling file paths
import path from "path"

// Import React plugin for Vite - enables React development features
import react from "@vitejs/plugin-react"

// Import Vite configuration function
import { defineConfig } from "vite"

/**
 * Vite Configuration for Portfolio Website
 * Configures the build tool for optimal development and production builds
 * 
 * Configuration includes:
 * - React plugin for JSX transformation and hot module replacement
 * - Path aliases for cleaner import statements
 * - Build optimizations for production deployment
 */
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
      // Enables cleaner imports: import Component from "@/components/Component"
      // Instead of relative paths: import Component from "../../components/Component"
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
// ====================================
// POSTCSS CONFIGURATION - DASHBOARD
// ====================================
// PostCSS configuration for the admin dashboard application
// Processes CSS with Tailwind CSS and Autoprefixer plugins
// Enables modern CSS features and browser compatibility

/**
 * PostCSS Configuration
 * Defines CSS processing pipeline for the build process
 */
export default {
  plugins: {
    // Tailwind CSS plugin - processes utility classes and generates final CSS
    tailwindcss: {},
    // Autoprefixer plugin - adds vendor prefixes for cross-browser compatibility
    autoprefixer: {},
  },
}

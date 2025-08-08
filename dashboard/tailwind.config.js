// ====================================
// TAILWIND CSS CONFIGURATION - DASHBOARD
// ====================================
// This file configures Tailwind CSS for the admin dashboard application
// Includes custom theme, colors, animations, and component styling
// Uses shadcn/ui design system for consistent UI components

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ====================================
  // DARK MODE CONFIGURATION
  // ====================================

  // Enable class-based dark mode switching
  // Allows toggling between light and dark themes via CSS classes
  darkMode: ["class"],

  // ====================================
  // CONTENT PATHS
  // ====================================

  // Specify file paths where Tailwind classes are used
  // Ensures proper CSS purging and optimization in production
  content: [
    './pages/**/*.{js,jsx}',      // Page components
    './components/**/*.{js,jsx}', // Reusable components
    './app/**/*.{js,jsx}',        // App-level components
    './src/**/*.{js,jsx}',        // All source files
  ],

  // ====================================
  // CLASS PREFIX
  // ====================================

  // No prefix for Tailwind classes (default behavior)
  prefix: "",

  // ====================================
  // THEME CONFIGURATION
  // ====================================

  theme: {
    // Container settings for responsive layout
    container: {
      center: true,           // Center containers horizontally
      padding: "2rem",        // Default padding for containers
      screens: {
        "2xl": "1400px",     // Custom breakpoint for extra large screens
      },
    },

    extend: {
      // ====================================
      // CUSTOM COLOR SYSTEM
      // ====================================

      // CSS custom property-based color system for theme switching
      // Colors are defined using HSL values from CSS variables
      colors: {
        // Base UI colors
        border: "hsl(var(--border))",           // Border elements
        input: "hsl(var(--input))",             // Form inputs
        ring: "hsl(var(--ring))",               // Focus rings
        background: "hsl(var(--background))",   // Page backgrounds
        foreground: "hsl(var(--foreground))",   // Text colors

        // Primary brand colors
        primary: {
          DEFAULT: "hsl(var(--primary))",              // Main brand color
          foreground: "hsl(var(--primary-foreground))", // Text on primary backgrounds
        },

        // Secondary colors
        secondary: {
          DEFAULT: "hsl(var(--secondary))",              // Secondary UI elements
          foreground: "hsl(var(--secondary-foreground))", // Text on secondary backgrounds
        },

        // Destructive/error colors
        destructive: {
          DEFAULT: "hsl(var(--destructive))",              // Error states
          foreground: "hsl(var(--destructive-foreground))", // Text on error backgrounds
        },

        // Muted/subtle colors
        muted: {
          DEFAULT: "hsl(var(--muted))",              // Subtle backgrounds
          foreground: "hsl(var(--muted-foreground))", // Subtle text
        },

        // Accent colors
        accent: {
          DEFAULT: "hsl(var(--accent))",              // Accent elements
          foreground: "hsl(var(--accent-foreground))", // Text on accent backgrounds
        },

        // Popover/modal colors
        popover: {
          DEFAULT: "hsl(var(--popover))",              // Modal backgrounds
          foreground: "hsl(var(--popover-foreground))", // Text in modals
        },

        // Card component colors
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
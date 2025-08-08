// ====================================
// DATE UTILITY FUNCTIONS
// ====================================
// This module provides date formatting utilities for the application
// Handles timezone-specific date formatting for consistent timestamps

// Import date formatting function with timezone support
import { formatInTimeZone } from 'date-fns-tz';

/**
 * Get Current Date and Time in Indian Standard Time
 * Returns formatted date string in DD-MM-YYYY_HH-MM-SS_AM/PM format
 * Used for file naming, logging, and timestamp generation
 * 
 * @function getCurrentDate
 * @returns {string} Formatted date string in IST timezone
 * 
 * Example output: "07-08-2025_02-30-45_PM"
 */
export function getCurrentDate() {
    // Set timezone to Indian Standard Time
    const timeZone = 'Asia/Kolkata';

    // Format current date/time in specified timezone
    // Pattern: DD-MM-YYYY_hh-mm-ss_AM/PM
    // Used for creating unique filenames and timestamps
    return formatInTimeZone(new Date(), timeZone, "dd-MM-yyyy_hh-mm-ss_a");
}
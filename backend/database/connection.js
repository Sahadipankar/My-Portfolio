// ====================================
// DATABASE CONNECTION CONFIGURATION
// ====================================
// This module handles MongoDB database connection using Mongoose ODM
// Provides centralized database connection management for the portfolio application

// Import Mongoose ODM for MongoDB connection and schema management
import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB database
 * Uses environment variables for connection string and database name
 * Handles connection success and error scenarios
 * 
 * @function dbConnection
 * @returns {void}
 */
export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MY_PORTFOLIO", // Specify the database name for the portfolio application
    })
    .then(() => {
      // Log successful database connection
      console.log("Connected to database Successfully!");
    })
    .catch((err) => {
      // Log connection errors for debugging
      console.log("Error connecting to database:", err);
    });
};

// ====================================
// EMAIL SENDING UTILITY
// ====================================
// This module handles email sending functionality for the portfolio application
// Used for contact form submissions, password reset emails, and notifications

// Import Nodemailer for email handling
import nodeMailer from "nodemailer";

/**
 * Send Email Function
 * Sends emails using SMTP configuration for various application needs
 * Supports contact form messages, password reset emails, and notifications
 * 
 * @param {Object} options - Email configuration object
 * @param {string} options.email - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} options.message - Email body content (plain text)
 * 
 * Environment Variables Required:
 * - SMTP_HOST: SMTP server hostname
 * - SMTP_PORT: SMTP server port
 * - SMTP_SERVICE: Email service provider (Gmail, Outlook, etc.)
 * - SMTP_MAIL: Sender email address
 * - SMTP_PASSWORD: Email account password or app password
 */
export const sendEmail = async (options) => {
  // Create SMTP transporter with configuration from environment variables
  const transporter = nodeMailer.createTransporter({
    host: process.env.SMTP_HOST,       // SMTP server hostname
    port: process.env.SMTP_PORT,       // SMTP server port (usually 587 for TLS)
    service: process.env.SMTP_SERVICE, // Email service provider
    auth: {
      user: process.env.SMTP_MAIL,     // Sender email address
      pass: process.env.SMTP_PASSWORD, // Email account password or app-specific password
    },
  });

  // Configure email options
  const mailOptions = {
    from: process.env.SMTP_MAIL, // Sender email address
    to: options.email,           // Recipient email address
    subject: options.subject,    // Email subject line
    text: options.message,       // Email body content (plain text)
  };

  // Send the email using configured transporter
  await transporter.sendMail(mailOptions);
};

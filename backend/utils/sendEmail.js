// Import nodemailer for sending emails
import nodeMailer from "nodemailer";

// Utility function to send an email using nodemailer
export const sendEmail = async (options) => {
  // Create a transporter object using SMTP settings from environment variables
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST, // SMTP host
    port: process.env.SMTP_PORT, // SMTP port
    service: process.env.SMTP_SERVICE, // Email service (e.g., Gmail)
    auth: {
      user: process.env.SMTP_MAIL, // SMTP email address
      pass: process.env.SMTP_PASSWORD, // SMTP email password
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.SMTP_MAIL, // Sender address
    to: options.email, // Recipient address
    subject: options.subject, // Email subject
    text: options.message, // Email body (plain text)
  };
  // Send the email
  await transporter.sendMail(mailOptions);
};

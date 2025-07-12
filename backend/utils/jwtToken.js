// Utility function to generate and send JWT token as a cookie and JSON response
export const generateToken = (user, message, statusCode, res) => {
  // Generate JWT token using user method
  const token = user.generateJsonWebToken();
  // Set token as HTTP-only cookie and send JSON response
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ), // Set cookie expiration
      httpOnly: true, // Prevent client-side JS access
    })
    .json({
      success: true,
      message, // Custom message
      token, // JWT token
      user // User data
    });
};


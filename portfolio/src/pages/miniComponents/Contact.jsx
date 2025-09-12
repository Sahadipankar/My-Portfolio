// ====================================
// CONTACT COMPONENT
// ====================================
// This component provides a contact form for users to send messages
// Features: Form validation, loading states, toast notifications, responsive design
// Form fields: Name, Subject, Message with submit functionality

// Import UI components, HTTP client, and notification system
import { Button } from "@/components/ui/button";  // Button component for form submission
import { Input } from "@/components/ui/input";    // Input component for form fields
import { Label } from "@/components/ui/label";    // Label component for form labels
import axios from "axios";                        // HTTP client for API requests
import React, { useState } from "react";          // React hooks for state management
import { toast } from "react-toastify";           // Toast notifications for user feedback

/**
 * Contact Component
 * Renders a contact form with name, subject, and message fields
 * Handles form submission and provides user feedback through toast notifications
 */
const Contact = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================
  const [senderName, setSenderName] = useState(""); // Store sender's name input
  const [subject, setSubject] = useState("");       // Store message subject input
  const [message, setMessage] = useState("");       // Store message content input
  const [loading, setLoading] = useState(false);    // Loading state for form submission

  // ====================================
  // FORM SUBMISSION HANDLER
  // ====================================
  /**
   * Handles contact form submission
   * Sends message data to backend API and provides user feedback
   * @param {Event} e - Form submission event
   */
  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call to send the contact message
      const response = await axios.post(
        `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/message/send`,
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Success handling
      toast.success(response.data.message);
      // Reset form fields after successful submission
      setSenderName("");
      setSubject("");
      setMessage("");
      setLoading(false);
    } catch (error) {
      // Error handling
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  // ====================================
  // RENDER COMPONENT
  // ====================================
  return (
    <>
      <div className="overflow-x-hidden">
        {/* ====================================
            SECTION TITLE WITH DECORATIVE STYLING
            ==================================== */}
        <div className="relative mb-8">
          <h1
            className="flex gap-4 items-center text-[1.4rem] sm:text-[2.5rem] md:text-[3rem] 
            lg:text-[3rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
            tracking-[15px] mx-auto w-fit font-extrabold about-h1"
            style={{
              background: "hsl(222.2 84% 4.9%)",
            }}
          >
            <span className="ml-3">CONTACT</span>
            <span className="font-extrabold">ME</span>
          </h1>
          {/* Decorative line behind the heading */}
          <span className="absolute w-full h-1 top-7 sm:top-7 
          md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
        </div>

        {/* ====================================
            CONTACT FORM
            ==================================== */}
        <form onSubmit={handleMessage} className="flex flex-col gap-6">

          {/* ====================================
              SENDER NAME INPUT FIELD
              ==================================== */}
          <div className="flex flex-col gap-2 px-1.5">
            <Label className="text-xl text-gray-300">Your Name</Label>
            <Input
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your Name"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#8245ec]"
              required
            />
          </div>

          {/* ====================================
              SUBJECT INPUT FIELD
              ==================================== */}
          <div className="flex flex-col gap-2 px-1.5">
            <Label className="text-xl text-gray-300">Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#8245ec]"
              required
            />
          </div>

          {/* ====================================
              MESSAGE INPUT FIELD
              ==================================== */}
          <div className="flex flex-col gap-2 px-1.5">
            <Label className="text-xl text-gray-300">Message</Label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-[#8245ec]"
              required
            />
          </div>

          {/* ====================================
              SUBMIT BUTTON WITH LOADING STATE
              ==================================== */}
          <div className="flex justify-end">
            {!loading ? (
              // Normal submit button
              <Button className="w-full sm:w-52 bg-[#8245ec] hover:bg-[#7239d4] text-white">SEND MESSAGE</Button>
            ) : (
              // Loading button with spinner
              <button
                disabled
                type="button"
                className="w-full sm:w-52 text-white bg-[#8245ec]/70 hover:bg-[#8245ec]/70 focus:ring-4 focus:outline-none focus:ring-[#8245ec]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
              >
                {/* Loading spinner icon */}
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Sending...
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;

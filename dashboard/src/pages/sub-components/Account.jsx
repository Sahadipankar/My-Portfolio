// Import necessary modules and components
import { Link } from "react-router-dom";
import { useState } from "react";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";


/**
 * Account component provides a settings page with navigation to Profile, Update Profile, and Update Password sections.
 * Uses a sidebar for navigation and displays the selected component in the main content area.
 */
const Account = () => {
  // State to track which component is currently selected in the sidebar
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  return (
    // Main container with gradient background and vertical layout
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <main className="flex flex-1 flex-col gap-6 p-2 sm:p-4 md:gap-10 sm:pl-20">
        {/* Header section */}
        <div className="mx-auto w-full max-w-5xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 tracking-tight mb-2 ml-6">Settings</h1>
        </div>
        {/* Main content and sidebar layout */}
        <div className="mx-auto w-full max-w-5xl flex flex-col md:grid md:items-stretch md:gap-8 md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_280px] gap-4">
          {/* Main Content Card: displays the selected component */}
          <div className="flex justify-center w-full">
            <div className="bg-white/90 rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-8 flex flex-col w-full max-w-2xl min-h-[320px] transition-all duration-200">
              {/* Render the selected component based on sidebar selection */}
              {(() => {
                switch (selectedComponent) {
                  case "Profile":
                    return <Profile />; // Show user profile
                  case "Update Profile":
                    return <UpdateProfile />; // Show update profile form
                  case "Update Password":
                    return <UpdatePassword />; // Show update password form
                  default:
                    return <Profile />;
                }
              })()}
            </div>
          </div>
          {/* Sidebar Navigation (right section): allows switching between sections */}
          <nav className="flex flex-row md:flex-col gap-2 md:gap-4 rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-purple-100 shadow-lg border border-indigo-100 p-3 sm:p-6 min-h-[120px] md:min-h-[480px] w-full max-w-full md:max-w-xs ml-0 md:ml-auto items-stretch transition-all duration-200 mt-4 md:mt-0">
            {/* Sidebar button for Profile */}
            <button
              type="button"
              className={`w-full text-center px-4 py-3 rounded-lg transition font-semibold text-base tracking-wide ${selectedComponent === "Profile" ? "bg-indigo-200 text-indigo-800 shadow-md" : "text-gray-700 hover:bg-indigo-50"}`}
              onClick={() => setSelectedComponent("Profile")}
            >
              Profile
            </button>
            {/* Sidebar button for Update Profile */}
            <button
              type="button"
              className={`w-full text-center px-4 py-3 rounded-lg transition font-semibold text-base tracking-wide ${selectedComponent === "Update Profile" ? "bg-indigo-200 text-indigo-800 shadow-md" : "text-gray-700 hover:bg-indigo-50"}`}
              onClick={() => setSelectedComponent("Update Profile")}
            >
              Update Profile
            </button>
            {/* Sidebar button for Update Password */}
            <button
              type="button"
              className={`w-full text-center px-4 py-3 rounded-lg transition font-semibold text-base tracking-wide ${selectedComponent === "Update Password" ? "bg-indigo-200 text-indigo-800 shadow-md" : "text-gray-700 hover:bg-indigo-50"}`}
              onClick={() => setSelectedComponent("Update Password")}
            >
              Update Password
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Account;

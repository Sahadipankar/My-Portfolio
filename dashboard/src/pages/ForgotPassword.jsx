// ====================================
// FORGOT PASSWORD PAGE COMPONENT
// ====================================
// This page allows users to request a password reset by entering their email address.
// Features: Form validation, Redux state management, toast notifications, loading state, navigation
// UI: Responsive layout with form and illustration

// Import required modules and components
import { Link, useNavigate } from "react-router-dom"; // Navigation and routing
import { Button } from "@/components/ui/button";      // UI button component
import { Input } from "@/components/ui/input";        // UI input component
import { Label } from "@/components/ui/label";        // UI label component
import { useDispatch, useSelector } from "react-redux"; // Redux hooks for state and actions
import { useEffect, useState } from "react";          // React hooks
import { clearAllUserErrors } from "@/store/slices/userSlice"; // Redux action to clear errors
import { forgotPassword } from "@/store/slices/forgotResetPasswordSlice"; // Redux thunk for forgot password
import { toast } from "react-toastify";               // Toast notifications
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton"; // Custom loading button


const ForgotPassword = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================
  const [email, setEmail] = useState(""); // Store email input value
  const { loading, error, message } = useSelector((state) => state.forgotPassword); // Redux state for forgot password
  const { isAuthenticated } = useSelector((state) => state.user); // Redux state for authentication
  const dispatch = useDispatch(); // Redux dispatch function
  const navigateTo = useNavigate(); // Navigation function

  // ====================================
  // HANDLE FORGOT PASSWORD SUBMISSION
  // ====================================
  /**
   * Dispatches forgot password action with the entered email
   * @param {string} email - User's email address
   */
  const handleForgotPassword = (email) => {
    dispatch(forgotPassword(email));
  };

  // ====================================
  // SIDE EFFECTS: ERROR, SUCCESS, AUTH REDIRECT
  // ====================================
  useEffect(() => {
    // Show error toast and clear errors if any
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    // Redirect to home if already authenticated
    if (isAuthenticated) {
      navigateTo("/");
    }
    // Show success toast if message is present
    if (message !== null) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, loading]);

  // ====================================
  // RENDER COMPONENT
  // ====================================
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* LEFT: FORM CARD */}
      <div className="flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">Forgot Password</h1>
          <p className="text-balance text-muted-foreground mb-8 text-center">
            Enter your email to request for reset password
          </p>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                to="/login"
                className="text-sm underline text-indigo-600 hover:text-indigo-800 transition"
              >
                Remember your password?
              </Link>
            </div>
            {!loading ? (
              <Button
                type="button"
                onClick={() => handleForgotPassword(email)}
                className="w-56 self-end bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
              >
                Forgot Password
              </Button>
            ) : (
              <SpecialLoadingButton content={"Requesting"} width="w-56" />
            )}
          </form>
        </div>
      </div>
      {/* RIGHT: ILLUSTRATION */}
      <div className="flex flex-1 justify-center items-center bg-muted">
        <img src="/forgot.png" alt="login" className="max-w-xs w-full" />
      </div>
    </div>
  );
};

export default ForgotPassword;

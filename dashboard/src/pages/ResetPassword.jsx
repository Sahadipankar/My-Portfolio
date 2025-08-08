// ====================================
// RESET PASSWORD PAGE COMPONENT
// ====================================
// This page allows users to reset their password using a token from the reset email.
// Features: Password reset form, error/success handling, loading state, redirects
// UI: Responsive form with validation and toast notifications

// Import required modules and components
import { useNavigate, useParams } from "react-router-dom"; // Navigation and route params
import { Button } from "@/components/ui/button"; // UI button
import { Input } from "@/components/ui/input"; // UI input
import { Label } from "@/components/ui/label"; // UI label
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { useEffect, useState } from "react"; // React hooks
import {
  resetPassword,
  clearAllForgotResetPassErrors,
} from "@/store/slices/forgotResetPasswordSlice"; // Redux actions for password reset
import { getUser } from "@/store/slices/userSlice"; // Redux action to fetch user
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton"; // Custom loading button
import { toast } from "react-toastify"; // Toast notifications

const ResetPassword = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================
  const { token } = useParams(); // Get reset token from URL
  const [password, setPassword] = useState(""); // New password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  ); // Password reset state
  const { isAuthenticated } = useSelector((state) => state.user); // Auth state
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // ====================================
  // HANDLE PASSWORD RESET
  // ====================================
  /**
   * Dispatches password reset action
   * @param {string} password - New password
   * @param {string} confirmPassword - Confirm password
   */
  const handleResetPassword = (password, confirmPassword) => {
    dispatch(resetPassword(token, password, confirmPassword));
  };

  // ====================================
  // HANDLE ERROR & SUCCESS TOASTS, REDIRECTS
  // ====================================
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPassErrors());
    }
    if (isAuthenticated) {
      navigateTo("/");
    }
    if (message !== null) {
      toast.success(message);
      dispatch(getUser());
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
          <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">Reset Password</h1>
          <p className="text-balance text-muted-foreground mb-8 text-center">
            Set a new password
          </p>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            {!loading ? (
              <Button
                type="button"
                onClick={() => handleResetPassword(password, confirmPassword)}
                className="w-56 self-end bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
              >
                Reset Password
              </Button>
            ) : (
              <SpecialLoadingButton content={"Resetting Your Password"} width="w-56" />
            )}
          </form>
        </div>
      </div>
      {/* RIGHT: ILLUSTRATION */}
      <div className="flex flex-1 justify-center items-center bg-muted">
        <img src="/reset.png" alt="reset password illustration" className="max-w-xs w-full" />
      </div>
    </div>
  );
};

export default ResetPassword;

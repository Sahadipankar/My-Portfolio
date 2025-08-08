// ====================================
// LOGIN PAGE COMPONENT
// ====================================
// This component provides the authentication interface for the admin dashboard
// Handles user login with email and password validation
// Redirects to dashboard upon successful authentication

// Import React Router components for navigation
import { Link, useNavigate } from "react-router-dom";

// Import shadcn/ui components for consistent design
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import Redux hooks and actions for state management
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearAllUserErrors, login } from "@/store/slices/userSlice";

// Import toast notifications for user feedback
import { toast } from "react-toastify";

// Import custom loading button component
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

/**
 * Login Component
 * Renders the login form for admin dashboard access
 * Handles authentication state and redirects upon success
 */
const Login = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================

  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux state for authentication
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  // Redux dispatch for actions
  const dispatch = useDispatch();

  // Navigation hook for programmatic routing
  const navigateTo = useNavigate();

  // ====================================
  // EVENT HANDLERS
  // ====================================

  /**
   * Handle Login Form Submission
   * Dispatches login action with email and password
   */
  const handleLogin = () => {
    dispatch(login(email, password));
  };

  // ====================================
  // EFFECT HOOKS
  // ====================================

  /**
   * Authentication State Effect
   * Handles error display and successful login redirection
   * Monitors authentication state changes
   */
  useEffect(() => {
    // Display error messages if login fails
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    // Redirect to dashboard if authentication is successful
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, error, loading]);

  // ====================================
  // COMPONENT RENDER
  // ====================================

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* LEFT: FORM CARD */}
      <div className="flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">Login</h1>
          <p className="text-balance text-muted-foreground mb-8 text-center">
            Enter your email below to login to your account
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
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Password</Label>
                <Link
                  to="/password/forgot"
                  className="text-sm underline text-indigo-600 hover:text-indigo-800 transition"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
              />
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Loggin In"} width="w-56" />
            ) : (
              <Button
                type="button"
                onClick={handleLogin}
                className="w-56 self-end bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
              >
                Login
              </Button>
            )}
          </form>
        </div>
      </div>
      {/* RIGHT: ILLUSTRATION */}
      <div className="flex flex-1 justify-center items-center bg-muted">
        <img src="/login.png" alt="login" className="max-w-xs w-full" />
      </div>
    </div>
  );
};

export default Login;

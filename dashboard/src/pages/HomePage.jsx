// ====================================
// DASHBOARD HOME PAGE COMPONENT
// ====================================
// This is the main dashboard page that serves as the admin control center
// Provides navigation, authentication handling, and component switching
// Acts as the primary interface for managing all portfolio content

// Import React Router components for navigation
import { Link, useNavigate } from "react-router-dom";

// Import Lucide React icons for navigation and UI elements
import {
  FolderGit,          // Projects icon
  History,            // Timeline icon
  Home,               // Dashboard home icon
  LayoutGrid,         // Skills grid icon
  LogOut,             // Logout icon
  MessageSquareMore,  // Messages icon
  Package2,           // Brand/logo icon
  PanelLeft,          // Menu toggle icon
  PencilRuler,        // Software applications icon
  User,               // User account icon
  GraduationCap,      // Education/timeline icon
  Briefcase,          // Experience/work icon
} from "lucide-react";

// Import shadcn/ui components for consistent UI design
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import React hooks for state and lifecycle management
import { useEffect, useState } from "react";

// Import sub-components for different dashboard sections
import Dashboard from "./sub-components/Dashboard";                      // Main overview component
import AddSkill from "./sub-components/AddSkill";                        // Skills management
import AddProject from "./sub-components/AddProject";                    // Projects management
import AddSoftwareApplications from "./sub-components/AddSoftwareApplications"; // Software tools management
import Account from "./sub-components/Account";                          // User account settings
import Messages from "./sub-components/Messages";                        // Contact messages management
import AddTimeline from "./sub-components/AddTimeline";                  // Timeline/career events management
import AddExperience from "./sub-components/AddExperience";              // Work experience management

// Import Redux hooks and actions for state management
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";

// Import toast notifications for user feedback
import { toast } from "react-toastify";

/**
 * HomePage Component
 * Main dashboard interface for portfolio administration
 * Provides navigation between different management sections
 * Handles user authentication and logout functionality
 */
const HomePage = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================

  // Active section state - determines which component to display
  const [active, setActive] = useState("Dashboard");

  // Mobile menu state - controls sidebar visibility on mobile devices
  const [menuOpen, setMenuOpen] = useState(false);

  // Redux state for user authentication and data
  const { isAuthenticated, error, user } = useSelector((state) => state.user);

  // Redux dispatch for actions
  const dispatch = useDispatch();

  // Navigation hook for programmatic routing
  const navigateTo = useNavigate();

  // ====================================
  // EVENT HANDLERS
  // ====================================

  /**
   * Handle User Logout
   * Dispatches logout action and shows success message
   */
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };

  // ====================================
  // EFFECT HOOKS
  // ====================================

  /**
   * Authentication and Error Handling Effect
   * Monitors authentication state and handles errors
   * Redirects unauthenticated users to login page
   */
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar for desktop, collapsible drawer for mobile */}
      <aside className="fixed inset-y-0 left-0 hidden w-20 flex-col bg-gradient-to-b from-indigo-100 via-white to-purple-100 border-r shadow-lg rounded-tr-3xl rounded-br-3xl sm:flex z-50 transition-all duration-300 max-[640px]:hidden">
        {/* Sidebar navigation for main dashboard sections */}
        <nav className="flex flex-col items-center gap-6 px-2 py-8">
          {/* Brand/logo link */}
          <Link className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-lg font-semibold text-white shadow-md md:h-10 md:w-10 md:text-base mb-4">
            <Package2 className="h-6 w-6 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {/* Navigation buttons */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Dashboard"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                    : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                    md:h-10 md:w-10`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="h-6 w-6" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Project"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                    : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                    md:h-10 md:w-10`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit className="h-6 w-6" />
                  <span className="sr-only">Add Project</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Project</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Skill"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                    : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                    md:h-10 md:w-10`}
                  onClick={() => setActive("Add Skill")}
                >
                  <PencilRuler className="h-6 w-6" />
                  <span className="sr-only">Add Skill</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Skill</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Uses"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                    : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                    md:h-10 md:w-10`}
                  onClick={() => setActive("Add Uses")}
                >
                  <LayoutGrid className="h-6 w-6" />
                  <span className="sr-only">Add Software</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Software</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Timeline"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                    : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                    md:h-10 md:w-10`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <GraduationCap className="h-6 w-6" />
                  <span className="sr-only">Add Timeline</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Timeline</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Experience"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                    : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                    md:h-10 md:w-10`}
                  onClick={() => setActive("Add Experience")}
                >
                  <Briefcase className="h-6 w-6" />
                  <span className="sr-only">Add Experience</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Experience</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Messages"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                    : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                    md:h-10 md:w-10`}
                  onClick={() => setActive("Messages")}
                >
                  <MessageSquareMore className="h-6 w-6" />
                  <span className="sr-only">Messages</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Messages</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Account"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                    : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                    md:h-10 md:w-10`}
                  onClick={() => setActive("Account")}
                >
                  <User className="h-6 w-6" />
                  <span className="sr-only">Account</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Account</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-6 px-2 py-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200 md:h-10 md:w-10 bg-white shadow-md"
                  onClick={handleLogout}
                >
                  <LogOut className="h-6 w-6" />
                  <span className="sr-only">Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <header className="flex flex-col gap-0 border-b bg-transparent px-2 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
        {/* Mobile menu button and drawer */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden mt-4" onClick={() => setMenuOpen(true)}>
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 max-w-[90vw] p-0 bg-gradient-to-b from-indigo-100 via-white to-purple-100 border-r shadow-lg rounded-tr-3xl rounded-br-3xl">
            <nav className="flex flex-col items-center gap-6 px-2 py-8">
              {/* Brand/logo link */}
              <Link className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-lg font-semibold text-white shadow-md md:h-10 md:w-10 md:text-base mb-4">
                <Package2 className="h-6 w-6 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              {/* Navigation buttons (same as sidebar) */}
              <Link className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Dashboard"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                md:h-10 md:w-10`} onClick={() => { setActive("Dashboard"); setMenuOpen(false); }}>
                <Home className="h-6 w-6" />
                <span className="sr-only">Dashboard</span>
              </Link>
              <Link className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Project"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                md:h-10 md:w-10`} onClick={() => { setActive("Add Project"); setMenuOpen(false); }}>
                <FolderGit className="h-6 w-6" />
                <span className="sr-only">Add Project</span>
              </Link>
              <Link className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Skill"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                md:h-10 md:w-10`} onClick={() => { setActive("Add Skill"); setMenuOpen(false); }}>
                <PencilRuler className="h-6 w-6" />
                <span className="sr-only">Add Skill</span>
              </Link>
              <Link className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Uses"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                md:h-10 md:w-10`} onClick={() => { setActive("Add Uses"); setMenuOpen(false); }}>
                <LayoutGrid className="h-6 w-6" />
                <span className="sr-only">Add Software</span>
              </Link>
              <Link className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Timeline"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                md:h-10 md:w-10`} onClick={() => { setActive("Add Timeline"); setMenuOpen(false); }}>
                <GraduationCap className="h-6 w-6" />
                <span className="sr-only">Add Timeline</span>
              </Link>
              <Link className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Add Experience"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                md:h-10 md:w-10`} onClick={() => { setActive("Add Experience"); setMenuOpen(false); }}>
                <Briefcase className="h-6 w-6" />
                <span className="sr-only">Add Experience</span>
              </Link>
              <Link className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Messages"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                md:h-10 md:w-10`} onClick={() => { setActive("Messages"); setMenuOpen(false); }}>
                <MessageSquareMore className="h-6 w-6" />
                <span className="sr-only">Messages</span>
              </Link>
              <Link className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 ${active === "Account"
                ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-lg"
                : "text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700"}
                md:h-10 md:w-10`} onClick={() => { setActive("Account"); setMenuOpen(false); }}>
                <User className="h-6 w-6" />
                <span className="sr-only">Account</span>
              </Link>
              {/* Logout button */}
              <Link className="flex h-12 w-12 items-center justify-center rounded-xl text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200 md:h-10 md:w-10 bg-white shadow-md mt-8" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                <LogOut className="h-6 w-6" />
                <span className="sr-only">Logout</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Responsive welcome card (always visible and readable) */}
        <div className="flex justify-center w-full px-1 z-10 relative">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white rounded-2xl shadow-lg px-4 sm:px-8 py-4 border border-gray-200 w-full max-w-3xl mt-6 mb-4 overflow-x-auto">
            <img
              src={user && user.avatar && user.avatar.url}
              alt="avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-indigo-200 shadow mb-2 sm:mb-0 sm:mr-4 shrink-0"
            />
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-indigo-700 text-center sm:text-left break-words w-full truncate" style={{ maxWidth: '100%' }}>
              Welcome Back, {user && user.fullName ? user.fullName : "User"}
            </h1>
          </div>
        </div>
      </header>
      {(() => {
        switch (active) {
          case "Dashboard":
            return <div className="flex-1 sm:ml-20 overflow-x-hidden"><Dashboard /></div>;
            break;
          case "Add Project":
            return <div className="flex-1 sm:ml-20 overflow-x-hidden"><AddProject /></div>;
            break;
          case "Add Skill":
            return <div className="flex-1 sm:ml-20 overflow-x-hidden"><AddSkill /></div>;
            break;
          case "Add Uses":
            return <div className="flex-1 sm:ml-20 overflow-x-hidden"><AddSoftwareApplications /></div>;
            break;
          case "Add Timeline":
            return <div className="flex-1 sm:ml-20 overflow-x-hidden"><AddTimeline /></div>;
            break;
          case "Messages":
            return <div className="flex-1 sm:ml-20 overflow-x-hidden"><Messages /></div>;
            break;
          case "Add Experience":
            return <div className="flex-1 sm:ml-20 overflow-x-hidden"><AddExperience /></div>;
            break;
          case "Account":
            return <div className="flex-1 sm:ml-20 overflow-x-hidden"><Account /></div>;
            break;
          default:
            return <div className="flex-1 sm:ml-20 overflow-x-hidden"><Dashboard /></div>;
            break;
        }
      })()}
    </div>
  );
};

export default HomePage;

// ====================================
// THEME MODE TOGGLE COMPONENT
// ====================================
// Provides theme switching functionality between light, dark, and system modes
// Features: Dropdown menu with theme options, animated icons, system preference detection
// UI: Button with sun/moon icons and dropdown menu for theme selection

// Import required icons from Lucide React
import { Moon, Sun } from "lucide-react";

// Import UI components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import theme context hook
import { useTheme } from "@/components/theme-provider";

/**
 * ModeToggle Component
 * Renders a theme toggle button with dropdown menu
 * Allows users to switch between light, dark, and system themes
 */
export function ModeToggle() {
  // Get theme setter function from context
  const { setTheme } = useTheme();

  return (
    <div className="px-5 sm:mx-auto w-full max-w-[1050px] text-end mt-10 mb-5">
      <DropdownMenu>
        {/* Theme toggle button with animated icons */}
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {/* Sun icon - visible in light mode */}
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            {/* Moon icon - visible in dark mode */}
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        {/* Theme selection dropdown */}
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

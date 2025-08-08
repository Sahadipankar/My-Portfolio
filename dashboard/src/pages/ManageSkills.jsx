// ====================================
// MANAGE SKILLS PAGE COMPONENT
// ====================================
// This page provides interface for managing existing skills in the portfolio
// Features: View all skills, update proficiency levels, delete skills, categorized display
// UI: Cards layout with skill information, proficiency sliders, and delete buttons

// Import required modules and components
import { useNavigate } from "react-router-dom"; // Navigation functionality
import { Button } from "@/components/ui/button"; // UI button component
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Tooltip components for enhanced UX
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // UI card components for skill display
import { Tabs, TabsContent } from "@/components/ui/tabs"; // Tab navigation (if used)
import { useDispatch, useSelector } from "react-redux"; // Redux state management
import { useEffect, useState } from "react"; // React hooks
import { toast } from "react-toastify"; // Toast notifications for feedback
import {
  clearAllSkillErrors,
  updateSkill,
  resetSkillSlice,
  deleteSkill,
  getAllSkills,
} from "@/store/slices/skillSlice"; // Redux actions for skills management
import { Label } from "@/components/ui/label"; // UI label component
import { Input } from "@/components/ui/input"; // UI input component
import { Trash2 } from "lucide-react"; // Delete icon

/**
 * ManageSkills Component
 * Provides interface for viewing, updating, and deleting existing skills
 * Includes proficiency level management and categorized skill display
 */
const ManageSkills = () => {
  // ====================================
  // STATE MANAGEMENT & NAVIGATION
  // ====================================

  // Navigation functionality
  const navigateTo = useNavigate();

  /**
   * Handle return to dashboard
   * Navigates back to the main dashboard page
   */
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  // Redux state for skills management
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );

  // Predefined skill categories for organization
  const skillCategories = ["programming languages", "frontend", "backend", "database", "tools", "libraries"];

  // Redux dispatch for actions
  const dispatch = useDispatch();

  // ====================================
  // LOCAL STATE FOR SKILL UPDATES
  // ====================================

  // State for new proficiency level when updating skills
  const [newProficiency, setNewProficiency] = useState(1);

  /**
   * Handle proficiency input change
   * @param {number} proficiency - New proficiency level (1-100)
   */
  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  // ====================================
  // EVENT HANDLERS
  // ====================================

  /**
   * Handle skill update
   * Dispatches update action with new proficiency level
   * @param {string} id - Skill document ID
   */
  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  /**
   * Handle skill deletion
   * Dispatches delete action and removes skill from database
   * @param {string} id - Skill document ID
   */
  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  // ====================================
  // EFFECTS FOR ERROR & SUCCESS HANDLING
  // ====================================

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card className="w-full max-w-5xl mx-auto rounded-2xl shadow-xl border border-gray-200">
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-t-2xl p-6">
              <CardTitle className="text-white text-2xl font-bold">Manage Your Skills</CardTitle>
              <Button
                className="w-fit bg-white text-indigo-700 font-semibold shadow hover:bg-indigo-50 border border-indigo-200"
                onClick={handleReturnToDashboard}
              >
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              {skillCategories.map((cat) => (
                <div key={cat} className="mb-10">
                  <h2 className="text-xl font-bold mb-4 capitalize text-indigo-700">{cat}</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {skills && skills.filter((s) => s.category === cat).length > 0 ? (
                      skills.filter((s) => s.category === cat).map((element) => (
                        <Card key={element._id} className="rounded-xl border border-gray-200 shadow hover:shadow-lg transition">
                          <CardHeader className="flex flex-row items-center justify-between gap-2 p-4 bg-indigo-50 rounded-t-xl">
                            <span className="text-lg font-semibold text-indigo-700">{element.title}</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => handleDeleteSkill(element._id)}
                                    className="border-red-500 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 bg-white hover:text-white hover:bg-red-500 shadow transition"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                  Delete
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </CardHeader>
                          <CardFooter className="flex flex-row items-center gap-4 p-4 bg-white rounded-b-xl">
                            <Label className="text-base text-indigo-700">Proficiency:</Label>
                            <Input
                              type="number"
                              min={1}
                              max={100}
                              defaultValue={element.proficiency}
                              onChange={(e) => handleInputChange(e.target.value)}
                              onBlur={() => handleUpdateSkill(element._id)}
                              className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 w-24"
                            />
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <p className="text-lg text-muted-foreground">No {cat} skills added.</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;

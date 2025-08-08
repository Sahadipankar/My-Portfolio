// ====================================
// MANAGE PROJECTS PAGE COMPONENT
// ====================================
// This page provides interface for managing existing portfolio projects
// Features: View all projects in table format, edit/delete/view individual projects
// UI: Data table with action buttons, tooltips, responsive layout

// Import required modules and components
import { Button } from "@/components/ui/button"; // UI button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // UI card components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Table components for data display
import { Tabs, TabsContent } from "@/components/ui/tabs"; // Tab navigation components
import {
  clearAllProjectErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice"; // Redux actions for project management
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip"; // Tooltip components for enhanced UX
import { Eye, Pen, Trash2 } from "lucide-react"; // Action icons
import { useEffect } from "react"; // React hooks
import { useDispatch, useSelector } from "react-redux"; // Redux state management
import { Link, useNavigate } from "react-router-dom"; // Navigation functionality
import { toast } from "react-toastify"; // Toast notifications

/**
 * ManageProjects Component
 * Provides interface for viewing, editing, and deleting portfolio projects
 * Displays projects in organized table format with action buttons
 */
const ManageProjects = () => {
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

  // Redux state for projects management
  const { projects, loading, error, message } = useSelector(
    (state) => state.project
  );

  // Redux dispatch for actions
  const dispatch = useDispatch();

  /**
   * Handle project deletion
   * Dispatches delete action and removes project from database
   * @param {string} id - Project document ID
   */
  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id));
  };

  // ====================================
  // EFFECTS FOR ERROR & SUCCESS HANDLING
  // ====================================

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, loading, message]);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
        <Tabs defaultValue="week">
          <TabsContent value="week">
            <Card className="w-full max-w-5xl mx-auto rounded-2xl shadow-xl border border-gray-200">
              <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-t-2xl p-6">
                <CardTitle className="text-white text-2xl font-bold">Manage Your Projects</CardTitle>
                <Button
                  className="w-fit bg-white text-indigo-700 font-semibold shadow hover:bg-indigo-50 border border-indigo-200"
                  onClick={handleReturnToDashboard}
                >
                  Return to Dashboard
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto rounded-xl">
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow className="bg-indigo-100">
                        <TableHead className="font-bold text-indigo-700">Banner</TableHead>
                        <TableHead className="font-bold text-indigo-700">Title</TableHead>
                        <TableHead className="hidden md:table-cell font-bold text-indigo-700">Stack</TableHead>
                        <TableHead className="hidden md:table-cell font-bold text-indigo-700">Deployed</TableHead>
                        <TableHead className="md:table-cell font-bold text-indigo-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects && projects.length > 0 ? (
                        projects.map((element) => {
                          return (
                            <TableRow className="bg-white hover:bg-indigo-50 transition" key={element._id}>
                              <TableCell>
                                <div className="font-medium">
                                  <img
                                    src={element.projectBanner && element.projectBanner.url}
                                    alt={element.title}
                                    className="w-16 h-16 rounded-xl border border-gray-200 object-cover shadow"
                                  />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-medium text-indigo-700">{element.title}</div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold">{element.stack}</span>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-semibold">{element.deployed}</span>
                              </TableCell>
                              <TableCell className="flex flex-row items-center gap-3 h-24">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Link to={`/view/project/${element._id}`}>
                                        <button
                                          className="border-green-500 border-2 rounded-full h-9 w-9 flex justify-center items-center text-green-600 bg-white hover:text-white hover:bg-green-500 shadow transition"
                                        >
                                          <Eye className="h-5 w-5" />
                                        </button>
                                      </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                      View
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Link to={`/update/project/${element._id}`}>
                                        <button className="border-yellow-400 border-2 rounded-full h-9 w-9 flex justify-center items-center text-yellow-500 bg-white hover:text-white hover:bg-yellow-400 shadow transition">
                                          <Pen className="h-5 w-5" />
                                        </button>
                                      </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                      Edit
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        className="border-red-500 border-2 rounded-full h-9 w-9 flex justify-center items-center text-red-600 bg-white hover:text-white hover:bg-red-500 shadow transition"
                                        onClick={() => handleProjectDelete(element._id)}
                                      >
                                        <Trash2 className="h-5 w-5" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                      Delete
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className="text-2xl py-8 text-center text-gray-400" colSpan={5}>
                            You have not added any project.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ManageProjects;

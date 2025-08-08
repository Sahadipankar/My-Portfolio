// ====================================
// MANAGE TIMELINE PAGE COMPONENT
// ====================================
// This page provides interface for managing timeline events in the portfolio
// Features: View all timeline entries, delete events, return to dashboard
// UI: Table format with timeline data and delete functionality

// Import required modules and components
import { useNavigate } from "react-router-dom"; // Navigation functionality
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
import { Tabs, TabsContent } from "@/components/ui/tabs"; // Tab navigation
import { useDispatch, useSelector } from "react-redux"; // Redux state management
import { useEffect } from "react"; // React hooks
import { toast } from "react-toastify"; // Toast notifications
import { Trash2 } from "lucide-react"; // Delete icon
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice"; // Redux actions for timeline management

/**
 * ManageTimeline Component
 * Provides interface for viewing and deleting timeline events
 * Displays timeline entries in organized table format
 */
const ManageTimeline = () => {
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

  // Redux state for timeline management
  const { loading, timeline, error, message } = useSelector(
    (state) => state.timeline
  );

  // Redux dispatch for actions
  const dispatch = useDispatch();

  /**
   * Handle timeline deletion
   * Dispatches delete action and removes timeline event from database
   * @param {string} id - Timeline document ID
   */
  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };

  // ====================================
  // EFFECTS FOR ERROR & SUCCESS HANDLING
  // ====================================

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card className="w-full max-w-5xl mx-auto rounded-2xl shadow-xl border border-gray-200">
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-t-2xl p-6">
              <CardTitle className="text-white text-2xl font-bold">Manage Your Timeline</CardTitle>
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
                      <TableHead className="font-bold text-indigo-700">Title</TableHead>
                      <TableHead className="md:table-cell font-bold text-indigo-700">Description</TableHead>
                      <TableHead className="md:table-cell font-bold text-indigo-700">From</TableHead>
                      <TableHead className="md:table-cell font-bold text-indigo-700">To</TableHead>
                      <TableHead className="text-right font-bold text-indigo-700">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeline.length > 0 ? (
                      timeline.map((element) => {
                        return (
                          <TableRow className="bg-white hover:bg-indigo-50 transition" key={element._id}>
                            <TableCell className="font-medium text-indigo-700">{element.title}</TableCell>
                            <TableCell className="md:table-cell">{element.description}</TableCell>
                            <TableCell className="md:table-cell">
                              <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold">{element.timeline.from}</span>
                            </TableCell>
                            <TableCell className="md:table-cell">
                              <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-semibold">{element.timeline.to ? element.timeline.to : "____"}</span>
                            </TableCell>
                            <TableCell className="flex justify-end">
                              <button
                                className="border-red-500 border-2 rounded-full h-9 w-9 flex justify-center items-center text-red-600 bg-white hover:text-white hover:bg-red-500 shadow transition"
                                onClick={() => handleDeleteTimeline(element._id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell className="text-2xl py-8 text-center text-gray-400" colSpan={5}>
                          You have not added any timeline.
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
  );
};

export default ManageTimeline;

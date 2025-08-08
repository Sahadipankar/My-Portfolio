// ManageExperience component allows the user to view, edit, and delete their experience entries.
// Displays all experiences in a table with actions for editing and deleting.
// Handles fetching, error/success notifications, and navigation.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
    clearAllExperienceErrors,
    getAllExperiences,
    resetExperienceSlice,
    deleteExperience,
} from "@/store/slices/experienceSlice";
import { Trash2, Pen, Eye } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


/**
 * ManageExperience component allows the user to view, edit, and delete their experience entries.
 * Displays all experiences in a table with actions for editing and deleting.
 * Handles fetching, error/success notifications, and navigation.
 */
const ManageExperience = () => {
    // Navigation hook for routing
    const navigateTo = useNavigate();
    // Handler to return to dashboard
    const handleReturnToDashboard = () => {
        navigateTo("/");
    };
    // Get experience state from Redux store
    const { experiences, loading, error, message } = useSelector(
        (state) => state.experience
    );
    const dispatch = useDispatch();

    // Handler to delete an experience entry
    const handleDeleteExperience = (id) => {
        dispatch(deleteExperience(id));
    };
    // Handler to edit an experience entry
    const handleEditExperience = (id) => {
        navigateTo(`/update/experience/${id}`);
    };
    // Handler to view an experience entry (not used in table, but available)
    const handleViewExperience = (id) => {
        navigateTo(`/view/experience/${id}`);
    };

    // Fetch all experiences and handle notifications for errors and success
    useEffect(() => {
        dispatch(getAllExperiences());
        if (error) {
            toast.error(error);
            dispatch(clearAllExperienceErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetExperienceSlice());
            dispatch(getAllExperiences());
        }
    }, [dispatch, error, message]);

    return (
        // Main container with gradient background
        <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
            <Tabs defaultValue="week">
                <TabsContent value="week">
                    <Card className="w-full max-w-5xl mx-auto rounded-2xl shadow-xl border border-gray-200">
                        {/* Card header with title and return button */}
                        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white rounded-t-2xl p-6 border-b border-gray-100">
                            <CardTitle className="text-2xl font-bold text-indigo-700">Manage Your Experience</CardTitle>
                            <Button
                                className="w-56 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
                                onClick={handleReturnToDashboard}
                            >
                                Return to Dashboard
                            </Button>
                        </CardHeader>
                        {/* Card content with experience table */}
                        <CardContent className="overflow-x-auto p-6 bg-white rounded-b-2xl">
                            <Table className="min-w-full">
                                <TableHeader>
                                    <TableRow className="bg-indigo-50">
                                        <TableHead className="font-semibold text-indigo-700">Banner</TableHead>
                                        <TableHead className="font-semibold text-indigo-700">Role</TableHead>
                                        <TableHead className="font-semibold text-indigo-700">Company</TableHead>
                                        <TableHead className="font-semibold text-indigo-700">Date</TableHead>
                                        <TableHead className="font-semibold text-indigo-700">Description</TableHead>
                                        <TableHead className="font-semibold text-indigo-700">Skills</TableHead>
                                        <TableHead className="font-semibold text-indigo-700 text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* Render each experience as a table row */}
                                    {experiences && experiences.length > 0 ? (
                                        experiences.map((element) => (
                                            <TableRow className="hover:bg-indigo-50 transition" key={element._id}>
                                                <TableCell>
                                                    {/* Experience banner image */}
                                                    <img
                                                        src={element.experienceBanner && element.experienceBanner.url}
                                                        alt={element.role}
                                                        className="w-16 h-16 rounded-xl object-cover border border-gray-200 shadow"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{element.role}</TableCell>
                                                <TableCell>{element.company}</TableCell>
                                                <TableCell>{element.date}</TableCell>
                                                <TableCell className="max-w-xs whitespace-pre-line break-words">{element.desc}</TableCell>
                                                <TableCell>{Array.isArray(element.skills) ? element.skills.join(", ") : element.skills}</TableCell>
                                                <TableCell className="flex flex-row items-center gap-3 h-24 justify-end">
                                                    {/* Edit experience button with tooltip */}
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    className="border-2 border-yellow-400 rounded-full h-10 w-10 flex justify-center items-center text-yellow-500 bg-white hover:text-white hover:bg-yellow-400 shadow transition"
                                                                    onClick={() => handleEditExperience(element._id)}
                                                                >
                                                                    <Pen className="h-5 w-5" />
                                                                </button>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="bottom">
                                                                Edit
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                    {/* Delete experience button with tooltip */}
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    className="border-2 border-red-500 rounded-full h-10 w-10 flex justify-center items-center text-red-500 bg-white hover:text-white hover:bg-red-500 shadow transition"
                                                                    onClick={() => handleDeleteExperience(element._id)}
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
                                        ))
                                    ) : (
                                        // Show message if no experiences are present
                                        <TableRow className="text-2xl">
                                            <TableCell colSpan={7} className="text-center py-8 text-gray-400">You have not added any experience.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ManageExperience;

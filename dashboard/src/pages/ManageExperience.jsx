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

const ManageExperience = () => {
    const navigateTo = useNavigate();
    const handleReturnToDashboard = () => {
        navigateTo("/");
    };
    const { experiences, loading, error, message } = useSelector(
        (state) => state.experience
    );
    const dispatch = useDispatch();

    const handleDeleteExperience = (id) => {
        dispatch(deleteExperience(id));
    };
    const handleEditExperience = (id) => {
        navigateTo(`/update/experience/${id}`);
    };
    const handleViewExperience = (id) => {
        navigateTo(`/view/experience/${id}`);
    };

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
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Tabs defaultValue="week">
                <TabsContent value="week">
                    <Card>
                        <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                            <CardTitle>Manage Your Experience</CardTitle>
                            <Button className="w-fit" onClick={handleReturnToDashboard}>
                                Return to Dashboard
                            </Button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Banner</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Skills</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {experiences && experiences.length > 0 ? (
                                        experiences.map((element) => (
                                            <TableRow className="bg-accent" key={element._id}>
                                                <TableCell>
                                                    <img
                                                        src={element.experienceBanner && element.experienceBanner.url}
                                                        alt={element.role}
                                                        className="w-16 h-16"
                                                    />
                                                </TableCell>
                                                <TableCell>{element.role}</TableCell>
                                                <TableCell>{element.company}</TableCell>
                                                <TableCell>{element.date}</TableCell>
                                                <TableCell>{element.desc}</TableCell>
                                                <TableCell>{Array.isArray(element.skills) ? element.skills.join(", ") : element.skills}</TableCell>
                                                <TableCell className="flex flex-row items-center gap-3 h-24">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400 hover:text-slate-950 hover:bg-yellow-400"
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
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600"
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
                                        <TableRow className="text-2xl">
                                            <TableCell>You have not added any experience.</TableCell>
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

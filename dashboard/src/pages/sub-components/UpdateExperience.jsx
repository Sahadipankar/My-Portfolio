// UpdateExperience component allows the user to update an existing experience in their portfolio.
// Handles form state, validation, and dispatches update actions to Redux.
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { clearAllExperienceErrors, getAllExperiences, resetExperienceSlice } from "@/store/slices/experienceSlice";

const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;

/**
 * UpdateExperience component allows the user to update an existing experience in their portfolio.
 * Handles form state, validation, and dispatches update actions to Redux.
 */
const UpdateExperience = () => {
    // Form state for experience fields
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");
    const [skills, setSkills] = useState("");
    const [experienceBanner, setExperienceBanner] = useState("");
    const [experienceBannerPreview, setExperienceBannerPreview] = useState("");
    // Get experience state from Redux store
    const { error, message, experiences } = useSelector((state) => state.experience);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    // Handle experience banner file input and preview
    const handleExperienceBanner = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setExperienceBannerPreview(reader.result);
            setExperienceBanner(file);
        };
    };

    // Fetch experience data if not already loaded
    useEffect(() => {
        const getExperience = async () => {
            if (!experiences || experiences.length === 0) {
                await dispatch(getAllExperiences());
            }
            const exp = experiences && experiences.find((e) => e._id === id);
            if (exp) {
                setRole(exp.role);
                setCompany(exp.company);
                setDate(exp.date);
                setDesc(exp.desc);
                setSkills(Array.isArray(exp.skills) ? exp.skills.join(", ") : exp.skills);
                setExperienceBannerPreview(exp.experienceBanner && exp.experienceBanner.url);
            }
        };
        getExperience();
        if (error) {
            toast.error(error);
            dispatch(clearAllExperienceErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetExperienceSlice());
            dispatch(getAllExperiences());
        }
    }, [id, message, error]);

    const handleUpdateExperience = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("role", role);
            formData.append("company", company);
            formData.append("date", date);
            formData.append("desc", desc);
            formData.append("skills", skills);
            if (experienceBanner) {
                formData.append("experienceBanner", experienceBanner);
            }
            await axios.put(`${baseUrl}/api/v1/experience/update/${id}`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Experience updated successfully!");
            dispatch(getAllExperiences());
            setLoading(false);
            window.location.href = "/manage/experience";
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update experience");
            setLoading(false);
        }
    };

    const navigateTo = useNavigate();
    const handleReturnToDashboard = () => {
        navigateTo("/");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
            <form
                onSubmit={handleUpdateExperience}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <h2 className="font-bold text-3xl text-indigo-700 tracking-tight">Update Experience</h2>
                    <Button onClick={handleReturnToDashboard} type="button" className="w-44 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600">Return to Dashboard</Button>
                </div>
                <div className="flex flex-col gap-6">
                    {/* Experience Banner */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience Banner</label>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-xl p-6 bg-indigo-50 mb-2">
                            <img
                                src={experienceBannerPreview ? experienceBannerPreview : "/avatarHolder.jpg"}
                                alt="experienceBanner"
                                className="mx-auto h-40 w-full object-contain rounded-lg shadow-md border border-gray-200 bg-white"
                            />
                            <label className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 mt-4 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition">
                                <span>Upload a file</span>
                                <input
                                    type="file"
                                    onChange={handleExperienceBanner}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                    </div>
                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            placeholder="Role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            placeholder="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition min-h-[80px]"
                            placeholder="Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                            placeholder="React, Node, MongoDB"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-8 flex items-center justify-end">
                    {loading ? (
                        <SpecialLoadingButton content={"Updating"} width={"w-56"} />
                    ) : (
                        <Button
                            type="submit"
                            className="w-56 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
                        >
                            Update
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UpdateExperience;

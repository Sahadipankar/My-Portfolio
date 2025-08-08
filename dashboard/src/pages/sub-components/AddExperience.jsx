// AddExperience component allows the user to add a new experience to their portfolio.
// Handles form state, validation, and dispatches add actions to Redux.
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllExperiences, addNewExperience, clearAllExperienceErrors, resetExperienceSlice } from "@/store/slices/experienceSlice";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Briefcase } from "lucide-react";

/**
 * AddExperience component allows the user to add a new experience to their portfolio.
 * Handles form state, validation, and dispatches add actions to Redux.
 */
const AddExperience = () => {
    const dispatch = useDispatch();
    // Get experience state from Redux store
    const { experiences, loading, error, message } = useSelector((state) => state.experience);
    // Form state for experience fields
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");
    const [skills, setSkills] = useState("");
    const [experienceBanner, setExperienceBanner] = useState("");
    const [experienceBannerPreview, setExperienceBannerPreview] = useState("");

    // Handle side effects for error and success state
    useEffect(() => {
        if (error) {
            if (typeof error === 'object' && error !== null) {
                toast.error(JSON.stringify(error));
            } else {
                toast.error(error);
            }
            dispatch(clearAllExperienceErrors());
        }
        if (message) {
            toast.success(message);
            dispatch(resetExperienceSlice());
        }
    }, [dispatch, error, message]);

    // Handle experience banner file input and preview
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setExperienceBannerPreview(reader.result);
        };
        setExperienceBanner(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role || !company || !date || !desc || !skills || !experienceBanner) {
            toast.error("Please fill all fields and upload a banner.");
            return;
        }
        const formData = new FormData();
        formData.append("role", role);
        formData.append("company", company);
        formData.append("date", date);
        formData.append("desc", desc);
        formData.append("skills", skills);
        formData.append("experienceBanner", experienceBanner);
        dispatch(addNewExperience(formData)).then((action) => {
            if (action.payload && Array.isArray(experiences)) {
                setExperiences([...experiences, action.payload[action.payload.length - 1]]);
            }
            setRole("");
            setCompany("");
            setDate("");
            setDesc("");
            setSkills("");
            setExperienceBanner("");
            setExperienceBannerPreview("");
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
            <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <h2 className="font-bold text-3xl text-indigo-700 mb-8 text-center tracking-tight">Add Experience</h2>
                <div className="flex flex-col gap-6">
                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                    </div>
                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition min-h-[80px]" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                        <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
                    </div>
                    {/* Experience Banner */}
                    <div>
                        <label htmlFor="experience-banner-upload" className="block text-sm font-medium text-gray-700 mb-1">Experience Banner</label>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-xl p-6 bg-indigo-50">
                            {experienceBannerPreview ? (
                                <img className="mx-auto h-[200px] w-full object-contain rounded-lg shadow-md border border-gray-200 bg-white" src={experienceBannerPreview} alt="Experience Banner Preview" />
                            ) : (
                                <Briefcase className="mx-auto h-12 w-12 text-indigo-300" />
                            )}
                            <div className="mt-4 flex flex-col items-center gap-2">
                                <label htmlFor="experience-banner-upload" className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition">
                                    <span>Upload a file</span>
                                    <input id="experience-banner-upload" name="experienceBanner" type="file" className="sr-only" onChange={handleBannerChange} />
                                </label>
                                <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex items-center justify-end">
                    {loading ? (
                        <SpecialLoadingButton content="Adding Experience" width="w-56" />
                    ) : (
                        <Button
                            type="submit"
                            className="w-56 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
                        >
                            Add Experience
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddExperience;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllExperiences, addNewExperience, clearAllExperienceErrors, resetExperienceSlice } from "@/store/slices/experienceSlice";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Briefcase } from "lucide-react";

const AddExperience = () => {
    const dispatch = useDispatch();
    const { experiences, loading, error, message } = useSelector((state) => state.experience);
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");
    const [skills, setSkills] = useState("");
    const [experienceBanner, setExperienceBanner] = useState("");
    const [experienceBannerPreview, setExperienceBannerPreview] = useState("");

    useEffect(() => {
        if (error) {
            // Show full error if available
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
        dispatch(addNewExperience(formData));
        setRole("");
        setCompany("");
        setDate("");
        setDesc("");
        setSkills("");
        setExperienceBanner("");
        setExperienceBannerPreview("");
    };

    return (
        <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
            <form onSubmit={handleSubmit} className="w-[100%] px-5 md:w-[1000px]">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="font-semibold leading-7 text-gray-900 text-3xl">ADD EXPERIENCE</h2>
                        <div className="mt-10 flex flex-col gap-5">
                            <div className="w-full sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Role</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Company</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                <div className="mt-2">
                                    <Textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                                </div>
                            </div>
                            <div className="w-full sm:col-span-4">
                                <label className="block text-sm font-medium leading-6 text-gray-900">Skills (comma separated)</label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                        <input type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full col-span-full">
                                <label htmlFor="experience-banner-upload" className="block text-sm font-medium leading-6 text-gray-900">Experience Banner</label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        {experienceBannerPreview ? (
                                            <img className="mx-auto h-[250px] w-full text-gray-300" src={experienceBannerPreview} alt="Experience Banner Preview" />
                                        ) : (
                                            <Briefcase className="mx-auto h-12 w-12 text-gray-300" />
                                        )}
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="experience-banner-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="experience-banner-upload" name="experienceBanner" type="file" className="sr-only" onChange={handleBannerChange} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    {loading ? (
                        <SpecialLoadingButton content="Adding Experience" width="w-full" />
                    ) : (
                        <Button type="submit" className="w-full">Add Experience</Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddExperience;

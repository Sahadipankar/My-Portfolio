
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { clearAllExperienceErrors, getAllExperiences, resetExperienceSlice } from "@/store/slices/experienceSlice";

const baseUrl = "http://localhost:5000";

const UpdateExperience = () => {
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");
    const [skills, setSkills] = useState("");
    const [experienceBanner, setExperienceBanner] = useState("");
    const [experienceBannerPreview, setExperienceBannerPreview] = useState("");
    const { error, message, experiences } = useSelector((state) => state.experience);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const handleExperienceBanner = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setExperienceBannerPreview(reader.result);
            setExperienceBanner(file);
        };
    };

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
        <>
            <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
                <form
                    onSubmit={handleUpdateExperience}
                    className="w-[100%] px-5 md:w-[1000px] pb-5"
                >
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
                                <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
                                    UPDATE EXPERIENCE
                                </h2>
                                <Button onClick={handleReturnToDashboard}>
                                    Return to Dashboard
                                </Button>
                            </div>
                            <div className="mt-10 flex flex-col gap-5">
                                <div className="w-full sm:col-span-4">
                                    <img
                                        src={experienceBannerPreview ? experienceBannerPreview : "/avatarHolder.jpg"}
                                        alt="experienceBanner"
                                        className="w-full h-auto"
                                    />
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={handleExperienceBanner}
                                            className="avatar-update-btn mt-4 w-full"
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:col-span-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Role
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Role"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:col-span-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Company
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Company"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:col-span-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Date
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="Date"
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:col-span-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <Textarea
                                                placeholder="Description"
                                                value={desc}
                                                onChange={(e) => setDesc(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full sm:col-span-4">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Skills (comma separated)
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                            <input
                                                type="text"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="React, Node, MongoDB"
                                                value={skills}
                                                onChange={(e) => setSkills(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        {loading ? (
                            <SpecialLoadingButton content={"Updating"} width={"w-52"} />
                        ) : (
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-52"
                            >
                                Update
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateExperience;

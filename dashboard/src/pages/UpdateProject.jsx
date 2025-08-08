// ====================================
// UPDATE PROJECT PAGE COMPONENT
// ====================================
// This page provides interface for editing existing portfolio projects
// Features: Project data pre-loading, image upload, form validation, real-time preview
// UI: Form with all project fields, image preview, loading states, success feedback

// Import required modules and components
import React, { useEffect, useState } from "react"; // React hooks
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Dropdown select components
import { Textarea } from "@/components/ui/textarea"; // Multi-line text input
import { Link } from "lucide-react"; // Link icon
import { useNavigate, useParams } from "react-router-dom"; // Navigation and URL params
import { useDispatch, useSelector } from "react-redux"; // Redux state management
import { toast } from "react-toastify"; // Toast notifications
import axios from "axios"; // HTTP client for API calls
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton"; // Custom loading button
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice"; // Redux actions for projects
import { Button } from "@/components/ui/button"; // UI button component

// Base URL for API endpoints - supports both development and production
const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;

/**
 * UpdateProject Component
 * Provides form interface for editing existing project details
 * Handles image upload, form validation, and API integration
 */
const UpdateProject = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================

  // Form field states for project data
  const [title, setTitle] = useState(""); // Project title
  const [description, setDescription] = useState(""); // Project description
  const [technologies, setTechnologies] = useState(""); // Technologies used
  const [stack, setStack] = useState(""); // Technology stack category
  const [gitRepoLink, setGitRepoLink] = useState(""); // GitHub repository URL
  const [deployed, setDeployed] = useState(""); // Deployment status/platform
  const [projectLink, setProjectLink] = useState(""); // Live project URL
  const [projectBanner, setProjectBanner] = useState(""); // New banner file for upload
  const [projectBannerPreview, setProjectBannerPreview] = useState(""); // Preview of new banner

  // Redux state for project operations
  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  // Get project ID from URL parameters
  const { id } = useParams();

  // ====================================
  // EVENT HANDLERS
  // ====================================

  /**
   * Handle project banner file selection
   * Creates preview and sets file for upload
   * @param {Event} e - File input change event
   */
  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  // ====================================
  // EFFECTS FOR DATA LOADING
  // ====================================

  /**
   * Load existing project data on component mount
   * Fetches project details and populates form fields
   */
  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`${baseUrl}/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
          setProjectBannerPreview(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, error]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
    formData.append("stack", stack);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("projectBanner", projectBanner);
    dispatch(updateProject(id, formData));
  };

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2 text-center">Update Project</h1>
        <p className="text-balance text-muted-foreground mb-8 text-center">Edit your project details below</p>
        <form onSubmit={handleUpdateProject} className="flex flex-col gap-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-3">
              <label className="font-semibold text-indigo-700">Project Banner</label>
              <img
                src={projectBannerPreview ? projectBannerPreview : "/avatarHolder.jpg"}
                alt="projectBanner"
                className="w-full max-w-xs h-48 object-cover rounded-2xl border border-gray-200 shadow"
              />
              <label className="w-full cursor-pointer mt-2">
                <div className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white rounded-lg shadow hover:from-indigo-600 hover:to-purple-600 transition">
                  Upload Banner
                  <input
                    type="file"
                    onChange={handleProjectBanner}
                    className="hidden"
                  />
                </div>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <label className="block text-sm font-medium text-indigo-700">Project Title</label>
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
                  placeholder="MERN STACK PORTFOLIO"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="block text-sm font-medium text-indigo-700">Stack</label>
                <Select
                  value={stack}
                  onValueChange={(selectedValue) => setStack(selectedValue)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Project Stack" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Stack">Full Stack</SelectItem>
                    <SelectItem value="Mern">MERN</SelectItem>
                    <SelectItem value="Mean">MEAN</SelectItem>
                    <SelectItem value="Next.JS">NEXT.JS</SelectItem>
                    <SelectItem value="React.JS">REACT.JS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 md:col-span-2">
                <label className="block text-sm font-medium text-indigo-700">Description</label>
                <Textarea
                  placeholder="Feature 1. Feature 2. Feature 3."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 min-h-[80px]"
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <label className="block text-sm font-medium text-indigo-700">Technologies Used</label>
                <Textarea
                  placeholder="HTML, CSS, JAVASCRIPT, REACT"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50 min-h-[80px]"
                />
              </div>
              <div className="grid gap-2">
                <label className="block text-sm font-medium text-indigo-700">Deployed</label>
                <Select
                  value={deployed}
                  onValueChange={(selectedValue) => setDeployed(selectedValue)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Is this project deployed?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="block text-sm font-medium text-indigo-700">Github Repository Link</label>
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
                  placeholder="Github Repository Link"
                  value={gitRepoLink}
                  onChange={(e) => setGitRepoLink(e.target.value)}
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <label className="block text-sm font-medium text-indigo-700">Project Link</label>
                <input
                  type="text"
                  className="rounded-lg border border-gray-300 px-3 py-2 bg-gray-50"
                  placeholder="Project Link"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            {loading ? (
              <SpecialLoadingButton content={"Updating"} width="w-56" />
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
    </div>
  );
};

export default UpdateProject;

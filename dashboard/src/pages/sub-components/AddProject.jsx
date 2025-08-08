// AddProject component allows the user to add a new project to their portfolio.
// Handles form state, validation, and dispatches add actions to Redux.
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewProject,
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";

/**
 * AddProject component allows the user to add a new project to their portfolio.
 * Handles form state, validation, and dispatches add actions to Redux.
 */
const AddProject = () => {
  // Form state for project fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  // Handle project banner file input and preview
  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const handleAddNewProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);
    dispatch(addNewProject(formData));
  };
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
      <form
        onSubmit={handleAddNewProject}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
      >
        <h2 className="font-bold text-3xl text-indigo-700 mb-8 text-center tracking-tight">Add New Project</h2>
        <div className="flex flex-col gap-6">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="MERN STACK PORTFOLIO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Textarea
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition min-h-[80px]"
              placeholder="Feature 1. Feature 2. Feature 3."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
            <Textarea
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition min-h-[60px]"
              placeholder="HTML, CSS, JAVASCRIPT, REACT"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            />
          </div>
          {/* Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stack</label>
            <Select
              value={stack}
              onValueChange={setStack}
            >
              <SelectTrigger className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition">
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
          {/* Deployed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deployed</label>
            <Select
              value={deployed}
              onValueChange={setDeployed}
            >
              <SelectTrigger className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition">
                <SelectValue placeholder="Is this project deployed?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Github Repo Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Github Repository Link</label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-10 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                placeholder="Github Repository Link"
                value={gitRepoLink}
                onChange={(e) => setGitRepoLink(e.target.value)}
              />
              <Link className="absolute w-5 h-5 left-3 top-2.5 text-indigo-400" />
            </div>
          </div>
          {/* Project Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-10 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                placeholder="Your Project Link"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
              />
              <Link className="absolute w-5 h-5 left-3 top-2.5 text-indigo-400" />
            </div>
          </div>
          {/* Project Banner */}
          <div>
            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 mb-1">Project Banner</label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 rounded-xl p-6 bg-indigo-50">
              {projectBannerPreview ? (
                <img
                  className="mx-auto h-[200px] w-full object-contain rounded-lg shadow-md border border-gray-200 bg-white"
                  src={projectBannerPreview}
                  alt="Project Banner Preview"
                />
              ) : (
                <svg
                  className="mx-auto h-12 w-12 text-indigo-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <div className="mt-4 flex flex-col items-center gap-2">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleSvg}
                  />
                </label>
                <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end">
          {loading ? (
            <SpecialLoadingButton
              content={"ADDING NEW PROJECT"}
              width={"w-56"}
            />
          ) : (
            <button
              type="submit"
              className="rounded-lg px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition w-56"
            >
              Add Project
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProject;

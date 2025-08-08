// ====================================
// VIEW PROJECT PAGE COMPONENT
// ====================================
// This page displays detailed view of a single project in read-only format
// Features: Project data display, image preview, navigation buttons, responsive layout
// UI: Clean project showcase with all details, edit/return navigation

// Import required modules and components
import React, { useEffect, useState } from "react"; // React hooks
import { useNavigate, useParams, Link } from "react-router-dom"; // Navigation and routing
import { toast } from "react-toastify"; // Toast notifications
import axios from "axios"; // HTTP client for API calls
import { Button } from "@/components/ui/button"; // UI button component

/**
 * ViewProject Component
 * Displays detailed information about a specific project
 * Fetches project data and presents it in a clean, readable format
 */
const ViewProject = () => {
  // ====================================
  // STATE MANAGEMENT
  // ====================================

  // State variables for project data display
  const [title, setTitle] = useState(""); // Project title
  const [description, setDescription] = useState(""); // Project description
  const [technologies, setTechnologies] = useState(""); // Technologies used
  const [stack, setStack] = useState(""); // Technology stack
  const [gitRepoLink, setGitRepoLink] = useState(""); // GitHub repository link
  const [deployed, setDeployed] = useState(""); // Deployment status/platform
  const [projectLink, setProjectLink] = useState(""); // Live project URL
  const [projectBanner, setProjectBanner] = useState(""); // Project banner image

  // Get project ID from URL parameters
  const { id } = useParams();

  // Base URL for API endpoints
  const baseUrl = import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL;


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
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <div className="flex justify-end mb-4">
          <Button onClick={handleReturnToDashboard} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold shadow hover:from-indigo-600 hover:to-purple-600 border border-indigo-200">
            Return to Dashboard
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">{title}</h1>
        <img
          src={projectBanner ? projectBanner : "/avatarHolder.jpg"}
          alt="projectBanner"
          className="w-full max-w-xl h-56 object-cover rounded-2xl border border-gray-200 shadow mx-auto mb-8"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xl font-semibold text-indigo-700 mb-2">Description</p>
            <ul className="list-disc ml-5 text-gray-700">
              {descriptionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xl font-semibold text-indigo-700 mb-2">Technologies</p>
            <ul className="list-disc ml-5 text-gray-700">
              {technologiesList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xl font-semibold text-indigo-700 mb-2">Stack</p>
            <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-semibold">{stack}</span>
          </div>
          <div>
            <p className="text-xl font-semibold text-indigo-700 mb-2">Deployed</p>
            <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 text-xs font-semibold">{deployed}</span>
          </div>
          <div className="md:col-span-2">
            <p className="text-xl font-semibold text-indigo-700 mb-2">Github Repository Link</p>
            <Link
              className="text-sky-700 underline break-all"
              target="_blank"
              to={gitRepoLink}
            >
              {gitRepoLink}
            </Link>
          </div>
          <div className="md:col-span-2">
            <p className="text-xl font-semibold text-indigo-700 mb-2">Project Link</p>
            <Link
              className="text-sky-700 underline break-all"
              target="_blank"
              to={projectLink}
            >
              {projectLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;

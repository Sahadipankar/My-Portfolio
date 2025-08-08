
// ProjectView.jsx
// This component displays detailed information about a single project, including title, description, technologies, stack, deployment status, and links.
// It fetches project data from the backend using the project ID from the URL params and provides a button to return to the portfolio homepage.

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";


const ProjectView = () => {
  // State variables for project details
  const [title, setTitle] = useState(""); // Project title
  const [description, setDescription] = useState(""); // Project description
  const [technologies, setTechnologies] = useState(""); // Technologies used (comma-separated string)
  const [stack, setStack] = useState(""); // Stack type (e.g., MERN, LAMP)
  const [gitRepoLink, setGitRepoLink] = useState(""); // GitHub repository link
  const [deployed, setDeployed] = useState(""); // Deployment status or platform
  const [projectLink, setProjectLink] = useState(""); // Live project link
  const [projectBanner, setProjectBanner] = useState(""); // Project banner image URL
  const [projectBannerPreview, setProjectBannerPreview] = useState(""); // Preview for project banner

  // Get project ID from URL params
  const { id } = useParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Loading state for async fetch
  const [loading, setLoading] = useState(true);

  // Fetch project details from backend when component mounts or id changes
  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(
          `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/project/get/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // Set all project details from response
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
          setLoading(false);
        })
        .catch((error) => {
          // Show error toast if fetch fails
          toast.error(error.response.data.message);
          setLoading(false);
        });
    };
    getProject();
  }, [id]);

  // Optionally split description and technologies for display (not used in render)
  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  // Navigation hook for returning to portfolio
  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  // Show loading indicator while fetching project data
  if (loading) {
    return (
      <div className="text-center text-white text-xl animate-pulse min-h-[60vh] flex items-center justify-center">
        Loading project details... Please wait patiently.
      </div>
    );
  }

  // Main render: display all project details in a styled layout
  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              {/* Return to Portfolio button */}
              <div className="flex justify-end">
                <Button onClick={handleReturnToPortfolio}>
                  Return to Portfolio
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                {/* Project Title and Banner */}
                <div className="w-full sm:col-span-4">
                  <h1 className="text-4xl font-bold mb-4">{title}</h1>
                  <img
                    src={
                      projectBannerPreview
                        ? projectBannerPreview
                        : "/avatarHolder.jpg"
                    }
                    alt="projectBanner"
                    className="w-full h-auto"
                  />
                </div>
                {/* Project Description */}
                <div className="w-full sm:col-span-4">
                  <p className="text-4xl mt-2 mb-5">Description:</p>
                  <ul className="text-lg font-mono list-disc">
                    <li>{description}</li>
                  </ul>
                </div>
                {/* Technologies Used */}
                <div className="w-full sm:col-span-4">
                  <p className="text-4xl mt-2 mb-5">Technologies:</p>
                  <ul className="text-lg font-mono list-disc">
                    {technologies
                      .split(",")
                      .map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                  </ul>
                </div>
                {/* Stack Information */}
                <div className="w-full sm:col-span-4">
                  <p className="text-4xl mt-2 mb-4">Stack:</p>
                  <p className="text-lg font-mono font-semibold uppercase">{stack}</p>
                </div>
                {/* Deployment Status */}
                <div className="w-full sm:col-span-4">
                  <p className="text-4xl mt-2 mb-4">Deployed:</p>
                  <p className="text-lg font-mono font-semibold">{deployed}</p>
                </div>
                {/* GitHub Repository Link */}
                <div className="w-full sm:col-span-4 mt-2">
                  <p className="text-4xl mb-4">Github Repository Link:</p>
                  <Link
                    className="text-sky-700 text-lg"
                    target="_blank"
                    to={gitRepoLink}
                  >
                    {gitRepoLink}
                  </Link>
                </div>
                {/* Live Project Link */}
                <div className="w-full sm:col-span-4 mt-2">
                  <p className="text-4xl mb-4">Project Link:</p>
                  <Link
                    className="text-sky-700 text-lg"
                    target="_blank"
                    to={projectLink}
                  >
                    {projectLink}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectView;

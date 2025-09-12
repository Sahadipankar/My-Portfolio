// ProjectView.jsx
// This component displays detailed information about a single project, including title, description, technologies, stack, deployment status, and links.
// It fetches project data from the backend using the project ID from the URL params and provides a button to return to the portfolio homepage.

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import BlurBlob from "@/components/BlurBlob";


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
      <div className="bg-[#050414] min-h-screen relative">
        {/* Animated background blob */}
        <BlurBlob position={{ top: '35%', left: '20%' }} size={{ width: '30%', height: '40%' }} />
        {/* Grid overlay background */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-white text-xl animate-pulse">
            Loading project details... Please wait patiently.
          </div>
        </div>
      </div>
    );
  }


  // Main render: display all project details in a styled layout, matching Home page background and theme
  return (
    <>
      <Navbar />
      <div className="bg-[#050414] min-h-screen relative">
        {/* Animated background blob */}
        <BlurBlob position={{ top: '35%', left: '20%' }} size={{ width: '30%', height: '40%' }} />
        {/* Grid overlay background */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>
        <div className="relative z-10 flex justify-center items-start min-h-[100vh] pt-6 pb-10 sm:pt-10 sm:pb-16">
          <div className="w-full max-w-[1050px] px-2 sm:px-5">
            <div className="p-3 sm:p-6 md:p-8 border-b border-gray-900/10 pb-8 sm:pb-12 bg-black/50 rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-md">
              {/* Return to Portfolio button */}
              <div className="flex justify-end pt-1 sm:pt-2">
                <Button onClick={handleReturnToPortfolio}>
                  Return to Portfolio
                </Button>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-col gap-6 sm:gap-8">
                {/* Project Title and Banner */}
                <div className="w-full">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#8245ec] to-[#fff] drop-shadow-2xl animate-gradient break-words">{title}</h1>
                  <img
                    src={projectBannerPreview ? projectBannerPreview : "/avatarHolder.jpg"}
                    alt="projectBanner"
                    className="w-full h-auto rounded-lg sm:rounded-xl shadow-lg object-cover"
                  />
                </div>
                {/* Project Description */}
                <div className="w-full">
                  <p className="text-2xl sm:text-3xl mt-2 mb-2 sm:mb-3 text-[#8245ec] font-semibold">Description:</p>
                  <ul className="text-base sm:text-lg font-mono list-disc ml-4 sm:ml-6 text-gray-200">
                    <li>{description}</li>
                  </ul>
                </div>
                {/* Technologies Used */}
                <div className="w-full">
                  <p className="text-2xl sm:text-3xl mt-2 mb-2 sm:mb-3 text-[#8245ec] font-semibold">Technologies:</p>
                  <ul className="text-base sm:text-lg font-mono list-disc ml-4 sm:ml-6 text-gray-200">
                    {technologies
                      .split(",")
                      .map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                  </ul>
                </div>
                {/* Stack Information */}
                <div className="w-full">
                  <p className="text-2xl sm:text-3xl mt-2 mb-2 sm:mb-3 text-[#8245ec] font-semibold">Stack:</p>
                  <p className="text-base sm:text-lg font-mono font-semibold uppercase text-gray-100">{stack}</p>
                </div>
                {/* Deployment Status */}
                <div className="w-full">
                  <p className="text-2xl sm:text-3xl mt-2 mb-2 sm:mb-3 text-[#8245ec] font-semibold">Deployed:</p>
                  <p className="text-base sm:text-lg font-mono font-semibold text-gray-100">{deployed}</p>
                </div>
                {/* GitHub Repository Link */}
                <div className="w-full mt-1 sm:mt-2">
                  <p className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-[#8245ec] font-semibold">Github Repository Link:</p>
                  <Link
                    className="text-sky-400 text-base sm:text-lg underline hover:text-sky-300 transition-colors break-all"
                    target="_blank"
                    to={gitRepoLink}
                  >
                    {gitRepoLink}
                  </Link>
                </div>
                {/* Live Project Link */}
                <div className="w-full mt-1 sm:mt-2">
                  <p className="text-2xl sm:text-3xl mb-2 sm:mb-3 text-[#8245ec] font-semibold">Project Link:</p>
                  <Link
                    className="text-sky-400 text-base sm:text-lg underline hover:text-sky-300 transition-colors break-all"
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

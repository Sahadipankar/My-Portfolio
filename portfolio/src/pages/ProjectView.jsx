import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/project/get/${id}`, {
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
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  if (loading) {
    return <div className="text-center text-white text-xl animate-pulse min-h-[60vh] flex items-center justify-center">Loading project details... Please wait patiently.</div>;
  }
  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-end">
                <Button onClick={handleReturnToPortfolio}>
                  Return to Portfolio
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
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
                <div className="w-full sm:col-span-4">
                  <p className="text-4xl mt-2 mb-5">Description:</p>
                  <ul className="text-lg font-mono list-disc">
                    <li>{description}</li>
                  </ul>
                </div>
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
                <div className="w-full sm:col-span-4">
                  <p className="text-4xl mt-2 mb-4">Stack:</p>
                  <p className="text-lg font-mono font-semibold uppercase">{stack}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-4xl mt-2 mb-4">Deployed:</p>
                  <p className="text-lg font-mono font-semibold">{deployed}</p>
                </div>
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

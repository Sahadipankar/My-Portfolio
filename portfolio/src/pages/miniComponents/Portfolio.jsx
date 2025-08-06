import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/project/getall`,
        { withCredentials: true }
      );
      setProjects(data.projects);
      setLoading(false);
    };
    getMyProjects();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          <nbsp></nbsp>MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            PROJECTS
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      {loading ? (
        <div className="text-center text-white text-xl animate-pulse">Loading projects... Please wait patiently.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {viewAll
            ? projects &&
            projects.map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <div className="flex flex-col items-center">
                    <img
                      src={element.projectBanner && element.projectBanner.url}
                      alt={element.title}
                      className="w-48 h-32 object-cover rounded-lg border"
                    />
                    <p className="mt-2 text-center font-semibold">{element.title}</p>
                  </div>
                </Link>
              );
            })
            : projects &&
            projects.slice(0, 3).map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <div className="flex flex-col items-center">
                    <img
                      src={element.projectBanner && element.projectBanner.url}
                      alt={element.title}
                      className="w-48 h-32 object-cover rounded-lg border"
                    />
                    <p className="mt-2 text-center font-semibold">{element.title}</p>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_DEVELOPMENT_URL || import.meta.env.VITE_PRODUCTION_URL}/api/v1/skill/getall`,
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit">
        SKILLS
      </h1>
      {["programming languages", "frontend", "backend", "database", "others"].map((cat) => (
        <div key={cat} className="mb-8">
          <h2 className="text-xl font-bold mb-4 capitalize">{cat}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills && skills.filter((s) => (cat === "programming languages" ? s.category === "programming languages" : cat === "others" ? s.category === "others" : s.category === cat)).length > 0 ? (
              skills.filter((s) => (cat === "programming languages" ? s.category === "programming languages" : cat === "others" ? s.category === "others" : s.category === cat)).map((element) => (
                <Card className="h-fit p-7 flex flex-col justify-center items-center gap-3" key={element._id}>
                  <img
                    src={element.svg && element.svg.url}
                    alt="skill"
                    className="h-12 sm:h-24 w-auto"
                  />
                  <p className="text-muted-foreground text-center">
                    {element.title}
                  </p>
                </Card>
              ))
            ) : (
              <p className="text-lg text-muted-foreground">No {cat} skills added.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;

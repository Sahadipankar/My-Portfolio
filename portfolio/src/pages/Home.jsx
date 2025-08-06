import React from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import Skills from "./miniComponents/Skills";
import MyApps from "./miniComponents/MyApps";
import About from "./miniComponents/About";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";
import Experience from "./miniComponents/Experience";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
        <section id="about" className="scroll-mt-20">
          <Hero />
          <About />
        </section>
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>
        <section id="timeline" className="scroll-mt-20">
          <Timeline />
        </section>
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>
        <section id="portfolio" className="scroll-mt-20">
          <Portfolio />
        </section>
        <section id="myapps" className="scroll-mt-20">
          <MyApps />
        </section>
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </article>
    </>
  );
};

export default Home;

"use client";

import AOS from "aos";
import 'aos/dist/aos.css';

import { MutableRefObject, useEffect, useRef, useState } from "react";

import AboutSection from "@/components/main/AboutSection";
import IntroSection from "@/components/main/IntroSection";
import MainNav from "@/components/main/MainNav";
import Footer from "@/components/main/Footer";
import { title } from "process";
import SkillSection from "@/components/main/SkillSection";
import ProjectSection from "@/components/main/ProjectSection";
import PostSection from "@/components/main/PostSection";

interface NavProps {
  title: string,
  ref: MutableRefObject<HTMLDivElement>
}

export default function Home() {
  const introRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);
  const [navLists, setNavLists] = useState<NavProps[]>([]);

  useEffect(() => {
    AOS.init();

    setNavLists([
      {
        title: "Intro",
        ref: introRef
      },
      {
        title: "About",
        ref: aboutRef
      },
      {
        title: "Skills",
        ref: skillRef
      },
      {
        title: "Projects",
        ref: projectRef
      },
      {
        title: "Posts",
        ref: postRef
      },
    ])
  }, [])

  return (
    <main className="flex flex-col">
      <MainNav menuList={navLists}/>
      <IntroSection ref={introRef}/>
      <AboutSection ref={aboutRef}/>
      <SkillSection ref={skillRef}/>
      <ProjectSection ref={projectRef}/>
      <PostSection ref={postRef}/>
      <Footer/>
    </main>
  );
}

"use client";

import AOS from "aos";
import { useEffect, useRef } from "react";

import AboutSection from "@/components/main/AboutSection";
import IntroSection from "@/components/main/IntroSection";
import MainNav from "@/components/main/MainNav";


export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <main className="flex flex-col">
      <MainNav/>
      <IntroSection ref={ref}/>
      <AboutSection/>
      <AboutSection/>
      <AboutSection/>
      <AboutSection/>
    </main>
  );
}

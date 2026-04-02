import AboutSection from "@/components/main/AboutSection";
import IntroSection from "@/components/main/IntroSection";
import MainNav from "@/components/main/MainNav";

export default function Home() {
  return (
    <main className="flex flex-col">
      <MainNav/>
      <IntroSection/>
      <AboutSection/>
      <AboutSection/>
      <AboutSection/>
      <AboutSection/>
    </main>
  );
}

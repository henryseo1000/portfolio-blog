import IntroSection from "@/components/main/IntroSection";
import MainNav from "@/components/main/MainNav";

export default function Home() {
  return (
    <main className="flex flex-col">
      <MainNav/>
      <IntroSection/>
      <IntroSection/>
      <IntroSection/>
      <IntroSection/>
    </main>
  );
}

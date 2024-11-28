import Header from "@/components/header";
import MainSection from "@/components/main";
import Projects from "@/components/projects";
import Separator from "@/components/separator";
import TechStack from "@/components/techstack";

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen w-full text-primary-foreground px-4 lg:px-20">
      <Header />

      <main className="flex flex-col py-4">
        <MainSection />
        <Separator />
        <TechStack />
        <Separator />
        <Projects />
        <Separator />
        <Header />
      </main>
    </div>
  );
};

export default HomePage;

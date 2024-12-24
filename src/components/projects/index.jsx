import ProjectCard from "./ProjectCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAllProjectsService } from "@/services";
import { useEffect, useState } from "react";

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllProjectsService();
      if (result?.success) {
        setAllProjects(result?.data);
      } else {
        setAllProjects([]);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1 className="text-5xl font-bold border-b-2 border-green-700 pb-1 w-fit mb-4">
        Projects
      </h1>
      <div className="mx-auto">
        <Tabs defaultValue="all">
          <TabsList className="bg-black text-white mx-auto w-full mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="web">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProjects
                .filter((item) => item.category === "web")
                .map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="mobile">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProjects
                .filter((item) => item.category === "mobile")
                .map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Projects;

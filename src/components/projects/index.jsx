import ProjectCard from "./ProjectCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAllCategoryService, fetchAllProjectsService } from "@/services";
import { useEffect, useState } from "react";

const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAllProjectsService();
      const categoryResult = await fetchAllCategoryService();
      if (result?.success && categoryResult?.success) {
        setAllProjects(result?.data);
        setAllCategories(categoryResult?.data);
      } else {
        setAllProjects([]);
        setAllCategories([]);
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
            {allCategories &&
              allCategories.length > 0 &&
              allCategories.map((category) => (
                <TabsTrigger value={category?.alias} key={category?._id}>
                  {category?.name}
                </TabsTrigger>
              ))}
          </TabsList>
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </TabsContent>
          {allCategories &&
            allCategories.length > 0 &&
            allCategories.map((category) => (
              <TabsContent value={category?.alias} key={category?._id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allProjects
                    .filter((item) => item.category === category?.alias)
                    .map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
              </TabsContent>
            ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Projects;

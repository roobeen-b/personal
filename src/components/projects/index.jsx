import ProjectCard from "./ProjectCard";
import mernEcom from "../../assets/mernEcom.jpeg";
import liveDocs from "../../assets/liveDocs.jpeg";
import countryDetails from "../../assets/countryDetails.jpeg";
import patientApp from "../../assets/pms.jpeg";
import reactCoding from "../../assets/reactCoding.jpeg";
import productListWithCart from "../../assets/productListWithCart.jpeg";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const projects = [
  {
    id: 1,
    title: "MERN Ecommerce Site",
    description: "MERN Ecommerce Site",
    liveHref: "https://mern-ecom-frontend-l1ue.onrender.com",
    codeHref: "https://github.com/roobeen-b/mern-ecom-frontend",
    thumbnail: mernEcom,
    category: "web",
  },
  {
    id: 2,
    title: "Patient Appointment Management System",
    description: "Patient Appointment Management System",
    liveHref: "https://patient-management-system-six.vercel.app/",
    codeHref: "https://github.com/roobeen-b/patient-management-system",
    thumbnail: patientApp,
    category: "web",
  },
  {
    id: 3,
    title: "Live Docs",
    description: "Live Docs",
    liveHref: "https://live-docs-psi-gray.vercel.app/",
    codeHref: "https://github.com/roobeen-b/live-docs",
    thumbnail: liveDocs,
    category: "web",
  },
  {
    id: 4,
    title: "Country Details",
    description: "Country Details",
    liveHref: "https://countries-detail.vercel.app/",
    codeHref: "https://github.com/roobeen-b/countries-detail",
    thumbnail: countryDetails,
    category: "web",
  },
  {
    id: 5,
    title: "E-Store",
    description: "An e-commerce mobile application",
    liveHref: "",
    codeHref: "https://github.com/roobeen-b/E-Store",
    thumbnail: "https://placehold.co/600x400",
    category: "mobile",
  },
  {
    id: 6,
    title: "Marksheet scanner",
    description: "A Marksheet scanning mobile application",
    liveHref: "",
    codeHref: "https://github.com/roobeen-b/marksheet_scanner",
    thumbnail: "https://placehold.co/600x400",
    category: "mobile",
  },
  {
    id: 7,
    title: "React Coding Problems",
    description: "Some of the frontend (React) coding problems",
    liveHref: "https://react-coding-problems-rouge.vercel.app/",
    codeHref: "https://github.com/roobeen-b/react-coding-problems",
    thumbnail: reactCoding,
    category: "web",
  },
  {
    id: 8,
    title: "Product List With Card",
    description: "Product List With Cart",
    liveHref: "https://product-list-with-cart-mu-lemon.vercel.app/",
    codeHref: "https://github.com/roobeen-b/product-list-with-cart",
    thumbnail: productListWithCart,
    category: "web",
  },
];

const Projects = () => {
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
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="web">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter((item) => item.category === "web")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="mobile">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter((item) => item.category === "mobile")
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Projects;

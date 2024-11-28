import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    title: "MERN Ecommerce Site",
    description: "MERN Ecommerce Site",
    href: "https://mern-ecom-frontend-l1ue.onrender.com",
    thumbnail: "https://placehold.co/600x400",
  },
  {
    id: 2,
    title: "Patient Appointment Management System",
    description: "Patient Appointment Management System",
    href: "https://patient-management-system-six.vercel.app/",
    thumbnail: "https://placehold.co/600x400",
  },
  {
    id: 3,
    title: "Live Docs",
    description: "Live Docs",
    href: "https://rubinbaidhya.com.np/",
    thumbnail: "https://placehold.co/600x400",
  },
];

const Projects = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold border-b-2 border-green-700 pb-1 w-fit mb-4">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

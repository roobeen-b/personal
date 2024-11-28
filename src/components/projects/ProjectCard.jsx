/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProjectCard = ({ project }) => {
  return (
    <Card
      className="bg-gray-950 border-0 text-white cursor-pointer"
      onClick={() => {
        window.open(project.href, "_blank");
      }}
    >
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <img src={project.thumbnail} alt={project.title} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

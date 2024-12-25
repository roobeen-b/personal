/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Button from "../common/Button";

const ProjectCard = ({ project }) => {
  return (
    <Card className="bg-gray-950 border-0 text-white flex flex-col justify-between hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-36">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-contain"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {project.liveHref !== "" && (
          <Button
            className="text-sm"
            onButtonClick={() => {
              window.open(project.liveHref, "_blank");
            }}
          >
            View Site
          </Button>
        )}
        <Button
          className="text-sm"
          onButtonClick={() => {
            window.open(project.codeHref, "_blank");
          }}
        >
          View Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;

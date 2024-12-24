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
import { Edit, Trash2 } from "lucide-react";

const AdminProjectCard = ({ project, handleEdit, handleDelete }) => {
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
        <Button
          className="text-sm border-none"
          onButtonClick={() => handleEdit(project)}
          title="Edit"
        >
          <Edit className="text-blue-800" />
        </Button>
        <Button
          className="text-sm border-none"
          onButtonClick={() => handleDelete(project?._id)}
          title="Delete"
        >
          <Trash2 className="text-red-500" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProjectCard;

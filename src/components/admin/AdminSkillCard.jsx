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
import * as RiIcons from "react-icons/ri";

const AdminSkillCard = ({ skill, handleDelete, handleEdit }) => {
  const IconComponent = RiIcons[skill.iconName];

  return (
    <Card className="bg-white shadow-md border-0 flex flex-col justify-between hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle className="text-foreground">{skill.name}</CardTitle>
        <CardDescription className="text-gray-500">
          {skill.iconName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="">{IconComponent && <IconComponent size={50} />}</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="text-sm border-none"
          onButtonClick={() => handleEdit(skill)}
          title="Edit"
        >
          <Edit className="text-blue-500" />
        </Button>
        <Button
          className="text-sm border-none"
          onButtonClick={() => handleDelete(skill?._id)}
          title="Delete"
        >
          <Trash2 className="text-red-500" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminSkillCard;

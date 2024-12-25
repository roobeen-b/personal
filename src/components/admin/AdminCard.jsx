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

const AdminCard = ({ item, handleDelete, handleEdit, children }) => {
  return (
    <Card className="bg-white shadow-md border-0 flex flex-col justify-between hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle className="text-foreground">
          {item.name || item.title}
        </CardTitle>
        <CardDescription className="text-gray-500">
          {item.iconName || item.description || item.alias}
        </CardDescription>
      </CardHeader>
      <CardContent>{children && children}</CardContent>
      <CardFooter className="flex justify-between">
        <Button
          className="text-sm border-none"
          onButtonClick={() => handleEdit(item)}
          title="Edit"
        >
          <Edit className="text-blue-500" />
        </Button>
        <Button
          className="text-sm border-none"
          onButtonClick={() => handleDelete(item?._id)}
          title="Delete"
        >
          <Trash2 className="text-red-500" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminCard;

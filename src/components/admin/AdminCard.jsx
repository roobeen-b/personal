/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Button from "../common/Button";
import { Edit, Trash2 } from "lucide-react";

const AdminCard = ({ item, handleDelete, handleEdit, cardFor }) => {
  return (
    <Card className="bg-white shadow-md border-0 flex flex-col justify-start hover:scale-105 transition-transform">
      <CardHeader>
        <>
          <div className="flex justify-between">
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
          </div>
          <CardTitle className="text-foreground flex justify-between">
            {item.name || item.title || item.position}
            <div className="text-sm text-gray-500">
              {item.company ? (
                <div>
                  {item?.startDate?.split("T")[0]} {" to "}{" "}
                  {item?.endDate === null
                    ? "Present"
                    : item?.endDate?.split("T")[0]}
                </div>
              ) : (
                ""
              )}
            </div>
          </CardTitle>
          <CardDescription className="text-gray-500">
            <div>
              {item.iconName || item.description || item.alias || item.company}
            </div>
          </CardDescription>
        </>
      </CardHeader>
      <CardContent>
        {cardFor === "project" ? (
          <div className="h-36">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          </div>
        ) : cardFor === "experience" ? (
          <>
            {item?.worksDone !== "" && (
              <div className="flex flex-col">
                Works Done:
                <ol className="list-decimal list-inside">
                  {item?.worksDone?.split(". ").map(
                    (work, index) =>
                      work.trim() && (
                        <li key={index} className="text-sm text-gray-500">
                          {work.trim()}
                        </li>
                      )
                  )}
                </ol>
              </div>
            )}
          </>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default AdminCard;

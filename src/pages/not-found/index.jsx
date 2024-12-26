import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold mb-4">Oops! Page Not Found</h1>
      <Button onClick={() => navigate("/")}>Return to HomePage</Button>
    </div>
  );
};

export default NotFoundPage;

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

const AdminHeader = ({ setOpen }) => {
  const navigate = useNavigate();

  const { resetCredentials } = useContext(AuthContext);

  function handleUserLogout() {
    resetCredentials();
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <header className="flex justify-between items-center py-4 px-4 md:px-6 bg-background border-b">
      <div>
        <Button className="lg:hidden" onClick={() => setOpen(true)}>
          <Menu />
        </Button>
      </div>
      <div>
        <Button
          className="flex flex-1 shadow rounded-sm"
          onClick={handleUserLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import AdminDashboard from "./pages/admin/dashboard";
import AdminLogin from "./pages/admin/auth/login";
import AdminRegister from "./pages/admin/auth/register";
import { Toaster } from "./components/ui/toaster";
import CheckAuth from "./components/common/CheckAuth";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import AdminLayout from "./pages/admin/layout";
import AdminProjects from "./pages/admin/projects";
import AdminSkills from "./pages/admin/skills";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="font-firaSans h-screen w-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <CheckAuth authenticated={auth?.authenticated}>
              <AdminLogin />
            </CheckAuth>
          }
        />
        <Route
          path="/register"
          element={
            <CheckAuth authenticated={auth?.authenticated}>
              <AdminRegister />
            </CheckAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <CheckAuth authenticated={auth?.authenticated}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

/* eslint-disable react/prop-types */
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { registerService } from "@/services";
import { checkAuthService, loginService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const location = useLocation();
  const [auth, setAuth] = useState({
    authenticated: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  async function handleRegisterUser(formData) {
    const res = await registerService(formData);
    if (res?.success) {
      toast({
        title: res?.message,
      });
    } else {
      toast({
        title: res?.message,
        variant: "destructive",
      });
    }
  }

  async function handleLoginUser(formData) {
    const data = await loginService(formData);

    if (data?.success) {
      sessionStorage.setItem("accessToken", JSON.stringify(data?.token));
      setAuth({
        authenticated: true,
        user: data?.user,
      });
      toast({
        title: data?.message,
      });
    } else {
      setAuth({
        authenticated: false,
        user: null,
      });
      toast({
        title: data?.message,
        variant: "destructive",
      });
    }
  }

  //check auth user
  async function checkAuthUser() {
    if (location.pathname === "/") {
      setLoading(false);
      return;
    }
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticated: true,
          user: data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticated: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticated: false,
          user: null,
        });
        setLoading(false);
        toast({
          title: error?.response?.data?.message,
          variant: "destructive",
        });
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticated: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}

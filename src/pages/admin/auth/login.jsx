import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password must not be empty",
  }),
});

const AdminLogin = () => {
  const navigate = useNavigate();

  const { handleLoginUser } = useContext(AuthContext);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    await handleLoginUser(values);
  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 shadow-lg p-6 w-96 min-h-24 bg-white"
        >
          <h1>Login</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
          {import.meta.env.VITE_ENVIRONMENT === "development" && (
            <span
              className="ml-4 text-sm font-medium cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AdminLogin;

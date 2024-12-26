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
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must not be empty",
  }),
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password must not be empty",
  }),
});

const AdminRegister = () => {
  const { handleRegisterUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    await handleRegisterUser(values);
  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 shadow-lg p-6 w-96 min-h-24 bg-white"
        >
          <h1>Register</h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit">Register</Button>
          <span
            className="ml-4 text-sm font-medium cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </form>
      </Form>
    </div>
  );
};

export default AdminRegister;

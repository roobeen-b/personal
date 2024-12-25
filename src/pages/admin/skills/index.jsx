import AdminSkillCard from "@/components/admin/AdminSkillCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  addNewSkillService,
  deleteSkillService,
  editSkillService,
  fetchAllSkillsService,
} from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Title must not be empty",
  }),
  iconName: z.string().min(1, {
    message: "Icon Name must not be empty",
  }),
});

const AdminSkills = () => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      iconName: "",
    },
  });

  const fetchData = async () => {
    const result = await fetchAllSkillsService();
    if (result?.success) {
      setSkills(result?.data);
    } else {
      setSkills([]);
    }
  };

  async function onSubmit(values) {
    try {
      const res =
        currentEditedId === null
          ? await addNewSkillService(values)
          : await editSkillService({
              formData: values,
              id: currentEditedId,
            });

      if (res?.success) {
        fetchData();
        setOpen(false);
        form.reset();
        toast({
          title: res?.message,
        });
      } else {
        toast({
          title: res?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error?.message,
        variant: "destructive",
      });
    }
  }

  async function handleEdit(skill) {
    setCurrentEditedId(skill?._id);
    form.reset({
      name: skill?.name,
      iconName: skill?.iconName,
    });
    setOpen(true);
  }

  async function handleDelete(id) {
    const res = await deleteSkillService(id);

    if (res?.success) {
      fetchData();
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

  function handleModalClose() {
    form.reset({
      name: "",
      iconName: "",
    });
    setCurrentEditedId(null);
    setOpen(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">All Skills</h1>
        <Button onClick={() => setOpen(true)}>Add New Skill</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {skills && skills.length > 0 ? (
          skills?.map((skill) => (
            <AdminSkillCard
              key={skill?._id}
              skill={skill}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div>No Projects Available.</div>
        )}
      </div>
      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentEditedId === null ? "Add New" : "Edit"} Skill
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Skill Name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="iconName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Skill Icon Name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">
                    {currentEditedId === null ? "Add" : "Edit"}
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSkills;

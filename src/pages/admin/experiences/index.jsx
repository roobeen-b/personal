import AdminCard from "@/components/admin/AdminCard";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  addNewExperienceService,
  deleteExperienceService,
  editExperienceService,
  fetchAllExperienceService,
} from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  position: z.string().min(1, {
    message: "Position must not be empty",
  }),
  company: z.string().min(1, {
    message: "Company must not be empty",
  }),
  worksDone: z.string().optional(),
  startDate: z.string().min(1, {
    message: "Please select a date",
  }),
  endDate: z.string().optional(),
});

const AdminExperiencePage = () => {
  const [open, setOpen] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [allExperiences, setAllExperiences] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      company: "",
      worksDone: "",
      startDate: "",
      endDate: "",
    },
  });

  const fetchData = async () => {
    const result = await fetchAllExperienceService();
    if (result?.success) {
      setAllExperiences(result?.data);
    } else {
      setAllExperiences([]);
    }
  };

  async function onSubmit(values) {
    try {
      const res =
        currentEditedId === null
          ? await addNewExperienceService(values)
          : await editExperienceService({
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

  async function handleEdit(experience) {
    setCurrentEditedId(experience?._id);
    form.reset({
      position: experience?.position,
      company: experience?.company,
      worksDone: experience?.worksDone,
      startDate: experience?.startDate.split("T")[0],
      endDate:
        experience?.endDate === "" ? "" : experience?.endDate.split("T")[0],
    });
    setOpen(true);
  }

  async function handleDelete(id) {
    const res = await deleteExperienceService(id);

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
      position: "",
      company: "",
      worksDone: "",
      startDate: "",
      endDate: "",
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
        <h1 className="text-lg font-bold">All Experiences</h1>
        <Button onClick={() => setOpen(true)}>Add New Experience</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
        {allExperiences && allExperiences.length > 0 ? (
          allExperiences?.map((experience) => (
            <AdminCard
              key={experience?._id}
              item={experience}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              cardFor="experience"
            />
          ))
        ) : (
          <div>No Experiences Available.</div>
        )}
      </div>

      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>
              {currentEditedId === null ? "Add New" : "Edit"} Experience
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Position/Role <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Position/Role" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Company" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="worksDone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Works Done</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Works Done" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Start Date <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Start Date"
                              type="date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="End Date"
                              type="date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    title={
                      currentEditedId === null
                        ? "Add new experience"
                        : "Edit experience"
                    }
                  >
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

export default AdminExperiencePage;

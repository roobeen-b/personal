import AdminProjectCard from "@/components/admin/AdminProjectCard";
import ProjectImageUpload from "@/components/common/ProjectImageUpload";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  addNewProjectService,
  deleteProjectService,
  editProjectService,
  fetchAllProjectsService,
} from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must not be empty",
  }),
  description: z.string().min(1, {
    message: "Description must not be empty",
  }),
  liveHref: z.string().optional(),
  codeHref: z.string().min(10, {
    message: "Code link is required",
  }),
  category: z.string(),
});

const AdminProjects = () => {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [allProjects, setAllProjects] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      liveHref: "",
      codeHref: "",
      category: "web",
    },
  });

  const fetchData = async () => {
    const result = await fetchAllProjectsService();
    if (result?.success) {
      setAllProjects(result?.data);
    } else {
      setAllProjects([]);
    }
  };

  async function onSubmit(values) {
    try {
      const res =
        currentEditedId === null
          ? await addNewProjectService({
              ...values,
              thumbnail: uploadedImageUrl,
            })
          : await editProjectService({
              formData: { ...values, thumbnail: uploadedImageUrl },
              id: currentEditedId,
            });

      if (res?.success) {
        fetchData();
        setOpen(false);
        setImageFile(null);
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

  async function handleEdit(project) {
    setCurrentEditedId(project?._id);
    form.reset({
      title: project?.title,
      description: project?.description,
      liveHref: project?.liveHref,
      codeHref: project?.codeHref,
      category: project?.category,
    });
    setOpen(true);
  }

  async function handleDelete(id) {
    const res = await deleteProjectService(id);

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
      title: "",
      description: "",
      liveHref: "",
      codeHref: "",
      category: "web",
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
        <h1 className="text-lg font-bold">All Projects</h1>
        <Button onClick={() => setOpen(true)}>Add New Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
        {allProjects && allProjects.length > 0 ? (
          allProjects?.map((project) => (
            <AdminProjectCard
              key={project?._id}
              project={project}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div>No Projects Available.</div>
        )}
      </div>

      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent className="h-[90%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentEditedId === null ? "Add New" : "Edit"} Project
            </DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <ProjectImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    imageLoadingState={imageLoadingState}
                    setImageLoadingState={setImageLoadingState}
                    setUploadedImageUrl={setUploadedImageUrl}
                    isEditMode={currentEditedId !== null}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Title <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Project Title" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Project Description{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Project Description"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="liveHref"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preview/Site Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Preview/Site Link" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="codeHref"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Code Link <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Code Link" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Category <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="web" />
                              </FormControl>
                              <FormLabel className="font-normal">Web</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="mobile" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Mobile
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={currentEditedId === null && imageFile === null}
                    title={
                      currentEditedId === null && imageFile === null
                        ? "Please choose a project thumbnail first."
                        : `${
                            currentEditedId === null ? "Add new" : "Edit"
                          } project`
                    }
                    className={
                      currentEditedId === null && imageFile === null
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
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

export default AdminProjects;

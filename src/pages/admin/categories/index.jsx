import AdminCategoryCard from "@/components/admin/AdminCategoryCard";
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
  addNewCategoryService,
  deleteCategoryService,
  editCategoryService,
  fetchAllCategoryService,
} from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must not be empty",
  }),
  alias: z.string().min(1, {
    message: "Alias must not be empty",
  }),
});

const AdminCategories = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      alias: "",
    },
  });

  const fetchData = async () => {
    const result = await fetchAllCategoryService();
    if (result?.success) {
      setCategories(result?.data);
    } else {
      setCategories([]);
    }
  };

  async function onSubmit(values) {
    try {
      const res =
        currentEditedId === null
          ? await addNewCategoryService(values)
          : await editCategoryService({
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

  async function handleEdit(category) {
    setCurrentEditedId(category?._id);
    form.reset({
      name: category?.name,
      alias: category?.iconName,
    });
    setOpen(true);
  }

  async function handleDelete(id) {
    const res = await deleteCategoryService(id);

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
      alias: "",
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
        <h1 className="text-lg font-bold">All Categories</h1>
        <Button onClick={() => setOpen(true)}>Add New Category</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {categories && categories.length > 0 ? (
          categories?.map((category) => (
            <AdminCategoryCard
              key={category?._id}
              category={category}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div>No Categories Available.</div>
        )}
      </div>
      <Dialog open={open} onOpenChange={handleModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentEditedId === null ? "Add New" : "Edit"} Category
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
                          <Input placeholder="Category Name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="alias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alias</FormLabel>
                        <FormControl>
                          <Input placeholder="Category Alias" {...field} />
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

export default AdminCategories;

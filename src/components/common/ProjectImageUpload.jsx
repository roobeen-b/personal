/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { imageUploadService } from "@/services";

const ProjectImageUpload = ({
  imageFile,
  setImageFile,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) => {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleImageRemove() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("thumbnail", imageFile);
      const res = await imageUploadService(data);
      if (res?.success) {
        setUploadedImageUrl(res.result?.url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile != null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mb-2">
      <Label className="mb-2 block">
        Upload Project Thumbnail <span className="text-red-600">*</span>
      </Label>
      <div
        className="border border-dashed rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center cursor-pointer h-32 ${
              isEditMode ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <Input
              type="file"
              id="image-upload"
              ref={inputRef}
              className="hidden"
              onChange={handleImageFileChange}
              disabled={isEditMode}
            />
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-200" />
        ) : (
          <div className="flex items-center justify-center">
            <div>
              <FileIcon className="w-6 text-primary mr-2 h-6" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleImageRemove}
            >
              <XIcon className="w-4 h-4" />
              <p className="sr-only">Remove Image</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectImageUpload;

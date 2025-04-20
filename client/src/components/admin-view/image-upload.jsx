import React, {useState, useEffect, useRef } from "react";
import { UploadCloud, FileIcon, XIcon } from "lucide-react";
import Button from "@components/ui/Button.jsx";
import Label from "@components/ui/Label.jsx";
import axios from 'axios';
import { Skeleton } from "../ui/skeleton";


function Productimage({
   imageFile,
   setImageFile ,
    uploadedImageUrl,
    setuploadedImageurl,
    setimageLoading,
     imageLoading,
     isEditMode
  }) {
  const inputRef = useRef(null);
  
   console.log(isEditMode)


  // const [uploadedImageUrl, setUploadedImageUrl] = useState(""); 
  const handleImageFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) 
        inputRef.current.value = "";
  };

       async function UploadCloudinary(){
        setimageLoading(true)
         const data = new FormData();
         data.append('my_file',imageFile)
         const response = await axios.post('http://localhost:5000/api/admin/products/upload-image',data)
   
          console.log(response);
   
         if(response?.data?.success){
          setuploadedImageurl(response.data.result.url);
           setimageLoading(false);
         }
        }


useEffect(()=>{
    if(imageFile!=null) UploadCloudinary()
},[imageFile])

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-60" : ""}
        border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition`}
      >
        {/* Hidden file input */}
        <input
        id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label 
          htmlFor ="image-upload"
          className={`${isEditMode? 'cursor-not-alloed' :''} flex flex-col items-center justify-center h-32 text-center`}>
            <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-gray-500 text-sm">
              Click or drag image here to upload
            </span>
          </Label>
        ) : (
          imageLoading?
          <Skeleton className=" h-10 bg-gray-100"/>:
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-blue-500 mr-2" />
              <p className="text-sm">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Productimage;

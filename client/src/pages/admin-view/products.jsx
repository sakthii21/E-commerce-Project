import Form from '@/components/common/form';
import Button from '@/components/ui/Button';
import Productimage from '@/components/admin-view/image-upload';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import React, { Fragment, useState } from 'react';

const initialFormData = {
  image: null,
  title: '',
  Description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};

function Adminproducts() {
  const [openProduct, setOpenProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageurl, setuploadedImageurl] = useState('');
   const [imageLoading,setimageLoading] = useState(false);

  function onSubmit() {
    console.log('Form submitted', { formData, imageFile });
    // Later: Upload to Cloudinary
  }

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProduct(true)}>Add New Product</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Product cards go here */}
      </div>

      <Sheet open={openProduct} onOpenChange={setOpenProduct}>
        <SheetContent
          side="right"
          className="bg-white w-full max-w-md h-full overflow-auto px-4"
        >
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          {/* Image Upload */}
          <div className="mt-4">
            <Productimage
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageurl={uploadedImageurl}
              setuploadedImageurl={setuploadedImageurl}
              setimageLoading ={setimageLoading}
            />
          </div>

          {/* Form section */}
          <div className="mt-4 w-full max-w-sm mx-auto">
            <Form
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Adminproducts;

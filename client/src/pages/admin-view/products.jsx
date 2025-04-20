import Form from '@/components/common/form';
import Button from '@/components/ui/Button';
import Productimage from '@/components/admin-view/image-upload';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addNewProduct, Getproducts}  from '@/store/admin/products-slice';
import { toast } from 'sonner';
import AdminProductTile from '@/components/admin-view/project-tile';

const initialFormData = {
  image: null,
  title: '',
  description: '',
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
const [CurrentEditedId,setCurrentEditedId] = useState(null);


 const {productList} = useSelector(state=>state.adminProducts)

const dispatch = useDispatch();

  function onSubmit(event) {
       event.preventDefault();
      dispatch(
        addNewProduct({
          ...formData,
          image:uploadedImageurl,
      })).then((data)=>{
        console.log(data);
        if(data?.payload?.success){
          dispatch(Getproducts())
          setOpenProduct(false)
          setImageFile(null);
          setFormData(initialFormData)
          toast.success('Product Added successfully');
        }
      })
  }
 useEffect(()=>{
  dispatch(Getproducts())
 },[dispatch])

    console.log(productList,"ProductList");
    // Later: Upload to Cloudinary
  

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProduct(true)}>Add New Product</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Product cards go here */}
        {
         productList && productList.length> 0 ?
         productList.map((productItem) =>(
           <AdminProductTile setFormData={setFormData} setOpenProduct={setOpenProduct} setCurrentEditedId={setCurrentEditedId} key={productItem.id} product={productItem}/>
          ))
           :null
        }
        
      </div>

      <Sheet open={openProduct} onOpenChange={setOpenProduct}>
        <SheetContent
          side="right"
          className="bg-white w-full max-w-md h-full overflow-auto px-4"
         
        >
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription>
    Fill in the product details and upload an image to add a new item to your store.
  </SheetDescription>
          </SheetHeader>

          {/* Image Upload */}
          <div className="mt-4">
            <Productimage
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageurl={uploadedImageurl}
              setuploadedImageurl={setuploadedImageurl}
              setimageLoading ={setimageLoading}
              imageLoading = {imageLoading}
              CurrentEditedId={CurrentEditedId}
              isEditMode ={CurrentEditedId!==null}
            />
          </div>

          {/* Form section */}
          <div className="mt-4 w-full max-w-sm mx-auto">
            <Form
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              ButtonText="Add"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default Adminproducts;

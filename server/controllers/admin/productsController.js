const { imageupload } = require("../../helpers/cloudinary");
const productsModel = require("../../models/productsModel");

const handleImageUpload = async(req,res)=>{
    try{
       const b64 = Buffer.from(req.file.buffer).toString('base64');
       const url = "data:" + req.file.mimetype + ";base64," + b64;
       const result = await imageupload(url);

       res.json({
        success:true,
        result
       })

    }catch(error){
          console.log(error);
          res.json({
            message:false,
            message:'Error occured',
          })
    };
    
};

//add new product 
const Addproducts = async(req,res)=>{
  try{
    const{ image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    } = req.body
    const newproduct = new productsModel({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock
    })
    await newproduct.save();
    res.status(200).json({
      success:true,
      data : newproduct,
      message:"Product Added Successfully"
      
    })


  }catch(e){
    res.status(400).json({
    success:false,
    message:"Error Occured"
    })
  }
}

//fetch products
const Getproducts = async(req,res)=>{
  try{
    const listOfProducts = await productsModel.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
    
  }catch(e){
    res.status(400).json({
    success:false,
    message:"Error Occured"
    })
  }
}

const Updateproducts = async(req,res)=>{
  try{ 
      const{id} = req.params;
      const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock
      } = req.body;
   
       const findProduct = await productsModel.findById(id);
       if(!findProduct){
           return res.status(400).json({
              success:false,
              message:"Product not Found"
           })
       }
       findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });


  }catch(e){
    res.status(400).json({
    success:false,
    message:"Error Occured"
    })
  }
}


const Deleteproducts = async(req,res)=>{
  try{
        const{id} = req.params;
        const product = await productsModel.findByIdAndDelete(id);
        if(!product){
          res.status(400).json({
             success:false,
             message:"Product not Found"
          })
        }
        res.status(200).json({
          success:true,
          message:"Product Deleted Successfully"
        })
  }catch(e){
    res.status(400).json({
    success:false,
    message:"Error Occured"
    })
  }
}





module.exports ={handleImageUpload,Addproducts,Getproducts,Deleteproducts,Updateproducts}
const express = require('express');
const{handleImageUpload,Addproducts,Updateproducts,Getproducts,Deleteproducts} = require('../../controllers/admin/productsController');


const {upload}= require('../../helpers/cloudinary')

const router = express.Router()

router.post('/upload-image',upload.single('my_file'),handleImageUpload);
router.post("/add", Addproducts);
router.put("/update/:id", Updateproducts);
router.delete("/delete/:id", Deleteproducts);
router.get("/get", Getproducts);

module.exports= router;
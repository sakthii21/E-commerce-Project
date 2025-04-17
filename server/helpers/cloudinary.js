const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name:'dlqwqare1',
    api_key:'193337869974483',
    api_secret:'fxoXAMYMbUWblNU1lOvnDHHjEKw'
});

const storage = multer.memoryStorage();

async function imageupload(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type:"auto",

    });
    return result;
}
const upload = multer([storage]);

module.exports ={upload,imageupload};
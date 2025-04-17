const express = require('express')
const {register} = require('../controllers/auth-controller');
const {login,logoutuser,authMiddleware} = require('../controllers/auth-controller');

const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.post("/logout",logoutuser);
router.get('/check-auth',authMiddleware,(req,res)=>{
     const user = req.user;
     res.status(200).json({
        success:true,
        message:"Authenticated user!",
        user,
     });
});

module.exports=router;
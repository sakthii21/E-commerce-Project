const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema')



//register


const register = async(req,res)=>{
      const{userName,email,password}=req.body;

      try{
        const checkuser = await User.findOne({email});
        if(checkuser)
            return res.json({
           success:false,
           message:"user Already exists with the same eamil! Please try again"
        })
            const hashpassword =await bcrypt.hash(password,12);
        const newuser = new User({
            userName,email,password:hashpassword
        })
        await newuser.save()
        res.status(200).json({
            success:true,
            message:"Registration successfull"
        })
      }catch(e){
        console.log(e);
        res.status(500).json({
            success:true,
            message:"some error occured",
        });
      }
};

//login
const login = async(req,res)=>{
    const{email,password}=req.body;

    try{
          const  checkuser = await User.findOne({email});
          if((!checkuser)) return res.json({
            success:false,
            message:"User doesn't exists Please register"
          })
          const checkpassword = await bcrypt.compare(password,checkuser.password)
          if(!checkpassword) return res.json({
            success:false,
            message:"Invalid password"
          });

          const token = jwt.sign({
            id:checkuser._id,
            role:checkuser.role,
            email:checkuser.email
          },
          'CLIENT_SECRET_KEY',
          {expiresIn:"60m"}
        );

          res.cookie('token',token,{ httpOnly:true, secure:false}).json({
            success:true,
            message:'LoggedIn successfully',
            user:{
                email:checkuser.email,
                role:checkuser.role,
                id:checkuser._id
            }
          });


    }catch(e){
      console.log(e);
      res.status(500).json({
          success:true,
          message:"some error occured",
      });
    }
};

const logoutuser =(req,res)=>{
  res.clearCookie('token').json({
    success:tru,
    message:"Logged out successfully!",
  });
}
const authMiddleware = async(req,res,next)=>{
     const token = req.cookies.token;
     if(!token) return res.status(401).json({
      success:false,
      message:"Unauthorized user!"
     });
     try{
         const decoded = jwt.verify(token,'CLIENT_SECRET_KEY');
         req.user=decoded;
         next();
     }catch(error){
      res.status(401).json({
         success:false,
         message:"Unauthorized user!",
      });
     }
};

module.exports={register,login,logoutuser,authMiddleware}
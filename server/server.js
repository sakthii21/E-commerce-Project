const express = require('express')
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser');
const cors=require('cors');
const authRouter = require('./routes/auth-routes')
const adminProductroutes = require('./routes/admin/productRoutes')


mongoose.connect('mongodb+srv://sakthinirmala2107:sakthinirmala2025@cluster2.g5tyivy.mongodb.net/')
.then(()=>console.log("MongoDB connected"))
.catch((error)=>console.log(error));


const app=express();
const PORT = process.env.PORT||5000;

app.use(
    cors({
        origin:'http://localhost:5173',
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials:true
    })
);

app.use(cookieparser());
app.use(express.json());


app.use('/api/auth',authRouter);
app.use('/api/admin/products', adminProductroutes);

app.listen(PORT,()=>console.log(`Server is now running on port ${PORT}`));


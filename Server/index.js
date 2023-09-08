const express=require("express");
const app=express();

const {connect}=require("./config/database")

require("dotenv").config();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload=require("express-fileupload");

const PORT=process.env.PORT || 4000;
 



//connection with db
connect();

//connection with cloudinary
cloudinaryConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
// req comes from frontend must be entertained
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
 )
 app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
 }))

//moute route

const userRoutes=require("./routes/User");

const profileRoutes=require("./routes/Profile");

const paymentRoutes=require("./routes/Payment");

const courseRoutes=require("./routes/Course");

const contactUsRoute = require("./routes/Contact");


app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'Your server is up and runnig',
    });
});

//active the server
app.listen(PORT,()=>{
    console.log(`App is running at PORT ${PORT}`);
});

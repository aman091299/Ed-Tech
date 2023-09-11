const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt =require("bcrypt");
const crypto=require("crypto");
//resetPasswordToken or forget password
//token expire in 5 minute
exports.resetPasswordToken=async (req,res)=>{
    try {
   
        //get email from body
        const {email}=req.body;
        //email validation
        if(!email){
            res.status(401).json({
                success:false,
                message:"enter the valid email "
            })
        }
        //check user for this email exist
        const user=await User.findOne({email})
        if(!user){
            res.status(401).json({
                success:false,
                message:'Account does not exist '
            })
          }

        //generate token 
        //crypto.randomBytes(20).toString("hex");
        const token =crypto.randomUUID();
        console.log(token)
        //update user by adding token and expiration time
        const updateDetails=await User.findOneAndUpdate({email},
            {
                token:token,
                resetPasswordExpires:Date.now() + 5*60*1000,
            } ,
            { new:true },
            );
   //create url
   const url = `http://studynotion-frontend-7yx8ge3n3-aman091299.vercel.app/update-password/${token}`;
  //send mail containint the url
  console.log("url",url)

  await mailSender(email,
    "Password reset Link",
    `Your Link for email verification is ${url}  . Please click this url to reset your password.`)
  //return response
  console.log("password reset")
  return res.json({
    success:true,
    message:"Email send successfully ,please check email and change password",
  });

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reseting your password and for sending link',  
        })
    }
}


//resetPassword
exports.resetPassword =async (req,res)=>{
  try {
      //fetch data
      const {password,confirmPassword,token}=req.body;
      //validation kro
      if(!password || !confirmPassword || !token){
         return res.json({
              success:false,
              message:'please enter all fields',
          });
      }
       if(password != confirmPassword){
              return res.json({
                  success:false,
                  message:'Password not matching'
              });
          }
         
          //get userdetails from db using token
          const userDetails = await User.findOne({ token: token });
        
          console.log(userDetails);
            //if no entry - invalid token
          if (!userDetails) {
            return res.json({
              success: false,
              message: "Token is Invalid",
            });
          }
        //token time check
        //token is expire
        if(Date.now() > userDetails.resetPasswordExpires ){
          return res.json({
            success:false,
            message:'Token is expire,please regenerate your token'
          })
    }
      
     
    
     //hash password->for security purpose
     const hashedPassword=await bcrypt.hash(password,10);
   
       await User.findOneAndUpdate({token},
         {password:hashedPassword} ,
         {new:true},
       );
      //return response
      return res.status(200).json({
          success:true,
          message:'password reset successfully',
      })
  } catch (error) {
      console.log(error);
      return res.json({
        success:false,
        message:'something went wrong in the updating and reset the password',
        error:error,
      })

  }

}

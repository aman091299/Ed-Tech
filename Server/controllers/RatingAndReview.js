const User=require("../models/User");
const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
const mongoose=require("mongoose")
//create rating and review
exports.createRating=async (req,res)=>{
 try {
    //fetch data
    console.log("hey review")
    const  userId= req.user.id;
    //fetch data from req.body
    const {rating,review,courseId}=req.body;
   
    //validation
    if(!rating && !review ){
        return res.status(400).json({
            success:false,
            message:"rating and review both not given",
        })
    }
    
    console.log("rating",rating);
    console.log("review",review)

     //check if user is enrolled in the course or not
    //   $elemMatch:{$eq:userId}} ?
 
     const courseDetials=await Course.findOne({_id:courseId,
                                         studentsEnrolled:{$elemMatch:{$eq:userId}},
            
                            });
            console.log("courseDetials",courseDetials)
    if(!courseDetials){
        return res.json({
            success:false,
            message:"Student is not enrolled in the course"
        })
    }
    
    //check if user allready review in course
    const  allreadyReviewed=await RatingAndReview.findOne({
                                                   user:userId, 
                                                   course:courseId   
    });
    console.log('allreadyReviewed',allreadyReviewed);
                                                    
    if(allreadyReviewed){
        return res.status(400).json({
            success:false,
            message:"User is allready review the course"
        })
    }
    //create rating and review
       const ratingReview= await RatingAndReview.create({
            user:userId,
            rating,
            review,
            course:courseId
        });
        console.log("rating ",ratingReview)
     //update rating and review in course
      const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,{
                    $push:{
                        ratingAndReviews:ratingReview._id,
                    },
                    },{new:true});
      console.log(updatedCourseDetails);
     //return response
   return res.status(200).json({
    success:true,
    message:'Rating and Review created Sucessfully',
    ratingReview
   })

 } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'something went in creating rating and review'
    })
    
 }
  
}
//getAverageRating for a course
exports.getAverageRating=async (req,res)=>{
    try {
        //get courseId
        const courseId=req.body.courseId;
        //calculate avg rating
         //filter the course of specific courseId
         //pass the remaining document  to group
         //and calculate avg of rating
         //return the average rating of a course to averageRating
        const result=await RatingAndReview.aggregate([
            {
              $match:{
                course:new mongoose.Types.ObjectId(courseId)
              }  
            },{
                $group:{
                       _id:null,
                       averageRating:{$avg:'$rating'}
                },
            } ,
            { 
                $project: { _id: 0 } 
             },
            
        ])
        console.log("why result.length > 0 why not if(!result)",result)
        //return  avg rating  and id null to remove id use project
        if(result.length > 0){
            console.log("yha result me aggregate kya dega",result)
            return res.status(200).json({
                success:true,
                message:'avg rating are :',
                averageRating:result[0].averageRating,
            })
       
        }
        //if no review/rating
        return res.status.json({
            status:true,
            message:"Average Rating is 0,no rating given till now ",
            averageRating:0,
        })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get all rating and review
exports.getAllRating=async (req,res)=>{
    try {
       
       const allRatingAndReview= await RatingAndReview.find({}).sort({rating:"desc"})
                                                   .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image",
                                                   })
                                                   .populate({
                                                    path:"course",
                                                    select:"courseName",
                                                   })
                                                 .exec();
     res.status(200).json({
        success:true,
        data:allRatingAndReview
     })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong in getting all review and rating',
            error:error.message,
        })
        
    }
}
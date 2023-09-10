const Profile=require("../models/Profile");
const User=require("../models/User")
const {uploadImageToCloudinary}=require("../utils/imageUploader");
const Course=require("../models/Course")
const {convertSecondsToDuration}=require("../utils/secToDuration")
const CourseProgress=require("../models/CourseProgress")
require("dotenv").config();
//create profile
 exports.updateProfile= async(req,res)=>{
   try {
    //fetch data
    const {firstName,lastName,gender,dateOfBirth,about,contactNumber}=req.body;
    const id=req.user.id;

    //validation
    if(!firstName || !lastName ||!gender || !dateOfBirth || !about || !contactNumber){
        return res.status(400).json({
            success:false,
            message:'required all field'
        })
    }
    //user detail ->finding profile
    const  updatedUserDetails=await User.findById(id)
                                      .populate("additionalDetails");
    
             updatedUserDetails.firstName=firstName;
             updatedUserDetails.lastName=lastName;
                 updatedUserDetails.save();
    const profileId=updatedUserDetails.additionalDetails;

    //update profile
    const profileDetails=await Profile.findById(profileId);
   
    profileDetails.gender=gender;
    profileDetails.dateOfBirth=dateOfBirth;
    profileDetails.about=about;
    profileDetails.contactNumber=contactNumber;
  
        await profileDetails.save();

        console.log("userDetails",updatedUserDetails)
    //response
    return res.status(200).json({
        success:true,
        message:'Profile updated Successfully ',
        updatedUserDetails
    })
   } catch (error) {
     return res.status(500).json({
        success:false,
        message:"Something went wrong in updating profile",
        error:error.message,
     })
   }
}

//  delete Profile than  delete Account
//Explore,how can we job /task schedule this deletion operation
//what is cron jobs  ?

exports.deleteAccount= async (req,res)=>{
    try {
         //fetch data
    const id=req.user.id;
    //validation
    const user=await User.findById(id);
    if(!user){
        return res.status(404).json({
            status:false,
            message:'User not found'
        })
    }
    //delete Profile

    const profileId=user.additionalDetails;
    await Profile.findByIdAndDelete(profileId)
         //TODO: HW uneroll user form all enrolled course
       
     //delete account
    await User.findByIdAndDelete({_id:id});
     //response
     return res.status(200).json({
        status:true,
        user:user,
        message:'Account deleted successfully',
        
     })
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:"User cannot be deleted successfully",
            error:error.message,
        })
    }
   
}

//user all detail

exports.getAllUserDetails=async (req,res)=>{
    try {
        //get id
        const id =req.user.id;

   const userDetails=await User.find({_id:id}).populate("additionalDetails").exec();
   //validation                                 
   if(!userDetails){
    return res.status(400).json({
        status:false,
        message:'User does not exist'
    })
   }
  //response
   return res.status(200).json({
         success:true,
         message:'User Details fetched Successfully',
         userDetails
   })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong in fetching user details',
            error:error.message,
        })
    }
}

exports.updateDisplayPicture=async (req,res)=>{
    try {  
        
        console.log("req.files.displayPicture",req.files.displayPicture);
      
        const displayPicture=req.files.displayPicture;
        const userId = req.user.id;
        const image=await uploadImageToCloudinary(displayPicture,process.env.FOLDER_NAME,1000,
            1000);

             

   const userDetails=await User.findById(userId);
  
    const updatedProfile=await User.findByIdAndUpdate(userId,{
        image:image.secure_url
    },
    {new:true}
    );
   

    // const profile=updatedProfile.additionalDetails.



     return res.status(200).json({
        success:true,
        message:"Image updated Successfully",
        data:updatedProfile,
     })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//the courses at which user is enroll or buy
//user pe kitne courses hai
exports.getEnrolledCourses = async (req, res) => {
	try {
    console.log("hey get student enrolled")
	  const userId = req.user.id
	  let userDetails = await User.findOne({
		_id: userId,
	  })
		.populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()
  
	  userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}

		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})

		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }
	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }


exports.instructorDashboard=async (req,res)=>{
  try {
    console.log("hey insturctor Dashboard")

     const InstructorId=req.user.id
     console.log("id",InstructorId)
    const courseDetails =await Course.find({
      instructor
      :InstructorId});
      
      if(!courseDetails){
        return res.status(401).json({
          success:false,
          message:"Course is not found"

        })
      }
    console.log("courseDetails",courseDetails)
    const courseData=courseDetails.map((course)=>{
      console.log("length",course.studentsEnrolled.length)
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price
      //create an new object with the addditional fields
        const courseDataWithStats={
          _id:course._id,
          courseName:course.courseName,
          courseDescription:course.courseDescription,
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
        return courseDataWithStats
  })
   res.status(200).json({
    success:true,
     data:courseData,
   })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
    
  }
}
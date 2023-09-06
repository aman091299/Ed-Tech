const Section=require("../models/Section");
const Course=require("../models/Course");
const SubSection = require("../models/SubSection");



//section creation
exports.createSection=async (req,res)=>{
    try {
        //data fetch
        const {sectionName,courseId}=req.body;

        //data validation
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:'required all field'
            })
        }
        //if section exist already
        //  const oldSection=await Section.findOne({sectionName});

        //  if(oldSection){
        //     return   res.status(401).json({
        //         success:false,
        //         message:"section already exist"
        //     })
        //  }
        //create section
        const newSection=await Section.create({ sectionName });
       
        //update course with section Object Id
    const updatedCourseDetails=   await Course.findByIdAndUpdate(
        courseId,
            {
            $push:{
                courseContent:newSection._id,
            }
         },
         {new:true},
         ).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
         })
         .exec();
         console.log(updatedCourseDetails);
       return res.status(200).json({
        success:true,
        message:"Section created successfully",
        updatedCourseDetails
       })
//HW: use populate to replace sections/sub-sections both in the updatedCourseDetails 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong in section creation ',
            error:error.message
             
        })
    }
}

//updateSection

exports.updateSection=async (req,res)=>{
    try{
 //data fetch
 const {sectionName,sectionId,courseId}=req.body;
 //data validation
 if(!sectionName || !sectionId){
     return res.status(401).json({
         success:false,
         message:'required all field'
     })
 }

     //update sectionName
     const updateSection=await Section.findByIdAndUpdate(sectionId,{
        sectionName
       },{new:true}).populate("subSection").exec();
     
     
 const course=await Course.findById(courseId)
  .populate({
    path:"courseContent",
    populate:{
        path:"subSection",
    }
  })
  .exec();

 if(!course){
    return res.status(401).json({
        success:false,
        message:'required course'
    })

 }

   return res.status(200).json({
    success:true,
    message:"Section updated succefully",
   data:course
   })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'something went wrong in section updation ',
            error:error.message
             
        })
         
    }
}

//delete Section

exports.deleteSection=async (req,res)=>{
    try {
        //fetch data
        
        const {sectionId,courseId}=req.body;
        //check validation
        if(!sectionId || !courseId){
            return res.status(401).json({
                success:false,
                message:"required all field"
            })
        }
        //delete section
       // we need to delete the section id from course
         await Course.findByIdAndUpdate(courseId,{
               $pull :{
                courseContent:sectionId
               }
         })
         const section=await Section.findById(sectionId);
         if(!section){
            return res.status(401).json({
                message:"Invalid section ",
                success:false
            })
         }
         		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

        const deleteSection=await Section.findByIdAndDelete(sectionId,{new:true});

        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

        //response
        return res.status(200).json({
            success:true,
            message:"Section deleted succefully",
            data:course
           })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong in section updation ',
            error:error.message
        
    })
}
}
 const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const {uploadImageToCloudinary}=require("../utils/imageUploader")
//create subsection
exports.createSubSection=async (req,res)=>{
    try {
        console.log("hey create subsection")
        //data fetch
        const {sectionId,title,description}=req.body;
          


        //fetch file
        const file=req.files.video;
      
        //validation
        if(!title || !description || !file ||!sectionId){
            return res.status(400).json({
                success:false,
                message:'required all field'
            })
        }

        const response=await uploadImageToCloudinary(file,process.env.FOLDER_NAME);
         console.log(response.secure_url);
        //create a subsection
        const subSectionDetails=await SubSection.create({
            title,
            description,
            timeDuration:`${response.duration}`,
            videoUrl:response.secure_url
        })
        console.log(sectionId)
        //update section with this subsection objectId
        const updatedSection=await Section.findByIdAndUpdate(
          {_id:sectionId},{
            $push:{
                subSection:subSectionDetails._id
            }
        },{new:true}).populate("subSection").exec();
        console.log("subsection creation",updatedSection)
        //response
        return res.status(200).json({
            success:true,
            message:'Subsection created successfully',
           data: updatedSection
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"something went wrong while updating sub section"
        })
    }
}

//update subSection
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updateSection=await Section.findById(sectionId).populate("subSection");

      return res.json({
        success: true,
        message: "Section updated successfully",
        data:updateSection
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  //delete subSection
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      
      console.log("req body",req.body)
      //section se subsection ha diya
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      
      const subSection = await SubSection.findById(subSectionId)
          
      console.log(subSection)
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSectio not found" })
      }
      await SubSection.findByIdAndDelete(subSectionId)
  
      const updateSection=await Section.findById(sectionId).populate("subSection");

      return res.json({
        success: true,
        message: "SubSection deleted successfully",
         data:updateSection
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }

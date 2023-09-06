 const Category = require("../models/Category");


//create category api or handler function

exports.createCategory =async(req,res)=>{
    try {
        const {name,description}=req.body;
        if(!name || !description){
           return res.status(400).json({
               success:false,
               message:"enter name and description both"
            })
        }
       const course=null;
       const categoryDetails=await Category.findOne({name:name});
       if(categoryDetails){
        return res.status(401).json({
            sucess:false,
            message:"category already exist"
        })
       }
        const category=await Category.create({
            name,
            description,
            course,
        })
      
        return res.status(200).json({
            success:true,
            message:'category created successfully',
            category,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something went wrong in creating category"
        })
    }
}

    //get all categories
    exports.showAllCategories=async (req,res)=>{
        try{
             const allCategory=await Category.find({},{name:true,
                                             description:true})
                                             .populate({  
                                                path: "courses",
                                             populate: {
                                               path: "instructor",
                                           },})
                                             .exec()
                console.log("allcategory",allCategory)                        ;
               res.status(200).json({
                success:true,
                message:'all the category returned successfully ',
                 data:allCategory,

               }) 
        }
        catch(error){
                  res.status(500).json({
                    success:false,
                    message:error.message,
                  })
        }
    }

    //category page details handler
    //get course for specific categoryId
    exports.categoryPageDetails=async (req,res)=>{
        try {
            //get category id
            console.log("req",req.body)
            const {categoryId}=req.body;
            //get course for specific categoryId
            const selectedCategory=await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
              })
              .exec()
            //validation
               if(!selectedCategory){
                return res.status(404).json({
                    success:false,
                    message:'this category data not found',
                })
               }

     // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
            //category with different course
          const differentCategory=await Category.find({
                                                        _id:{$ne:categoryId},
                                                          })
                                                          .populate({
                                                            path: "courses",
                                                            match: { status: "Published" },
                                                          })
                                                          .exec()
      //console.log("Different COURSE", differentCategory)

      //find all category
      const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
      },
      })
      .exec()
            //category of top selling course ?
            const allCourses = allCategories.flatMap((category) => category.courses);

            const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)
           console.log("mostSellingCourses COURSE", mostSellingCourses)
            //return response
            return res.status(200).json({
                success:true,
                data:{
                    selectedCategory,
                    differentCategory,
                    mostSellingCourses
                }
            })
            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }

import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect} from 'react'
import { Form } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import {RxCross2} from 'react-icons/rx'
import IconBtn from '../../../../common/IconBtn'
import Upload from '../Upload'
import { setCourse } from '../../../../../slices/courseSlice'

const SubSectionModal = ({ 
     modalData,
    setModalData,
    add=false,
    view=false,
    edit=false
}) => {
  

    const {
        register, 
        handleSubmit, 
        setValue,
        formState: {errors},
        getValues,
    }=useForm();

    const dispatch=useDispatch();
    const [loading,setLoading]=useState(false);
    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
 
useEffect(()=>{
   if (view || edit ){
    setValue("lectureTitle",modalData.title);
    setValue("lectureDesc",modalData.description);
    setValue("lectureVideo",modalData.videoUrl);
   }
},[])

const  handleEditSubSection=async()=>{
    const currentValues=getValues();
     const formData=new FormData();
     formData.append("sectionId",modalData.sectionId);
     formData.append("subSectionId",modalData._id);
     
         //jo is sub section pe value ahi or jo hm form se bhej rhe hai
     if(currentValues.lectureTitle !== modalData.title){
          formData.append("title",currentValues.lectureTitle)
     }

     if(currentValues.lectureVideo !== modalData.videoUrl){
        formData.append("video",currentValues.lectureVideo)
   }

   if(currentValues.lectureDesc !== modalData.description){
    formData.append("description",currentValues.lectureDesc)
}

   setLoading(true);
     const result=await updateSubSection(formData,token);

     if(result){
           //yha pe course me updated section dal diya jisme ye vala subsection nhi hai
    const updatedCourseContent=course.courseContent.map((section)=>section._id == modalData.sectionId ? result :section);
    const updatedCourse={...course,courseContent :updatedCourseContent}
    dispatch(setCourse( updatedCourse));
       
     }
    setModalData(null);
    setLoading(false);

}

const isFormUpdated=()=>{
    const currentValues=getValues();
    console.log("the value of forms in subsection",currentValues)
    console.log("current lecture titile",currentValues.lectureTitle)
    if(currentValues.lectureTitle !== modalData.title ||
        currentValues.lectureDesc !== modalData.description||
        currentValues.lectureVideo !== modalData.videoUrl 
        )
        {

       return true;
        }
        return false;
}


const onSubmit=async(data)=>{
    //view
    if(view){
        return;
    }
    //Edit
    if(edit){
        console.log("edit")
        if(!isFormUpdated){
            toast.error("No changes made to the form")
        }
        else{
            //edit krdo store me(
            console.log("handle edit subsection")
            handleEditSubSection();
        }
        return ;
    }
    else{
         //create  subsection
    //Add
    const formData=new FormData();
    formData.append("sectionId",modalData);
    formData.append("title",data.lectureTitle);
    formData.append("description",data.lectureDesc);
    formData.append("video",data.lectureVideo);
    setLoading(true);
    //API call
    const result=await createSubSection(
        formData,token
    )

    if(result){
        //TODO : check for updation
           //yha pe course me updated section dal diya jisma ye vala subsection nhi hai
    const updatedCourseContent=course.courseContent.map((section)=>section._id == modalData ? result :section);
    console.log("updatedCourseContent",updatedCourseContent);
    const updatedCourse={...course,courseContent :updatedCourseContent}
    dispatch(setCourse( updatedCourse));
       
    }
    setModalData(null);
    setLoading(false);
    }
   
}

  return (
    <div>
        <div>
            <p>
          {view && "Viewing" }
          {add && "Adding "}
          {edit && "Editing"}
          Lecture  </p>
          <button onClick={()=>(!loading ?setModalData(null):{})}>
          <RxCross2/>
          </button>
          <div>
        <form onSubmit={handleSubmit(onSubmit)}>
             <Upload
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={view ? modalData.videoUrl:null}
                editData={edit ? modalData.videoUrl :null}
             />
             <div>
                <label>Lecture Title</label>
                <input 
                id="lectureTitle"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle",{required:true})}
                className='w-full text-richblack-900'
                />
                {
                    errors.lectureTitle && (
                        <span> Lecture Title is required</span>
                    )
                }
             </div>
             <div>
                <label>Lecture Description</label>
                <textarea 
                id='lectureDesc'
                placeholder="Enter Lecture Description"
                {...register("lectureDesc",{required:true})}
                className="w-full min-h-[130px] text-richblack-900"
                />
                {
                    errors.lectureDesc && (
                        <span>Lecture Description is required</span>
                    )
                }
             </div>
             {
                !view && (
                    <div>
                        <IconBtn 
                        text={loading ? "Loading..." :edit ? "Save Changes" :"Save" } >
                        </IconBtn>
                    </div>
                )
             }
            </form>
          </div>
        </div>
    </div>
  )
}

export default SubSectionModal
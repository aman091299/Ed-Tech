import React from 'react'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {AiOutlineClockCircle} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'
import {VscEdit} from 'react-icons/vsc'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { getAllCourse } from '../../../services/operations/courseAPI'
import {COURSE_STATUS}  from  "../../../utils/constants"
const Courses = () => {
  console.log("hey courses")
  
  // const {loading}=useSelector((state)=>state.profile)

    const [courses,setCourses]=useState([]);

     const dispatch=useDispatch();

     const GetAllCourse= async ()=>{
      try { 
      const response= await dispatch(getAllCourse());
      console.log("get all courses in usefffect",response)
       setCourses(response);

      } catch (error) {
        console.log(error);
        toast.error("could not get all the courses")
        
      }
     }


     useEffect(()=>{
      GetAllCourse();
     },[])
    console.log("value of courses",courses)

  return (
    !courses? (<div>Loading...</div>)
    :!courses.length ?(<div>No courses are found</div>)
    : <div className="flex flex-col bg-richblack-900 text-white gap-5">
        <h1 className="text-4xl font-bold ">My Course</h1>
        <div className="flex flex-col gap-3 border border-richblack-800 px-14 py-3">
        <div className=" flex font-inter  gap-[400px]">
        <div>
        <p> COURSES</p>
        </div>
       <div className="flex gap-20 border-1">
       <div><p>Duration</p></div>
        <p>Price</p>
        <p>Action</p>
       </div>
        </div>
      
        <div className="flex flex-col gap-16 ">
        {  
          courses.map((course,index)=>(
          <div key={index} className="flex flex-row ">
               <div  className="flex gap-14">
            <img src={course?.thumbnail}  alt="courseName" 
           height='20px' width='300px' />

              <div className="flex flex-col gap-2 w-fit">
               <div className="text-lg font-bold w-fit">{course?.courseName}{":"} </div>
               <div className="text-richblack-300">{course?.courseDescription}</div>
               <div>
    </div>
         
                <button className={`flex items-center justify-center mx-auto gap-3 rounded-full bg-richblack-800  px-3 ${COURSE_STATUS.DRAFT === "Draft" ? "text-yellow-300":"text-pink-300"}`}>
                  {course?.status?(course?.status):"status"}
                  {course?.status === "Draft"
                  ? <div className="bg-pink-300 rounded-full"><AiOutlineClockCircle/></div>
                     :<div className="bg-yellow-300 rounded-full"><AiOutlineCheckCircle/></div>
                  }
                </button>
               </div>
              </div>  
              <div className="flex gap-20">
              <div>{course?.totalDuration ?(course?.totalDuration):("Total Duration")}</div>  
              <div>{course?.price}</div>  
              <div className="flex flex-row gap-1">
                  <div>
                    <VscEdit/>
                  </div>
                  <div>
                    <RiDeleteBinLine/>
                  </div>
              </div>  
              </div>
            
         </div> 
     ))
                            
        }
        </div>
        </div>
        
    </div>
  )
}

export default Courses
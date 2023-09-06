import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { profileEndpoints,settingsEndpoints } from "../apis"
import { logout } from "./authAPI"


const { GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API,GET_ALL_INSTRUCTOR_DATA_API } = profileEndpoints
const {UPDATE_DISPLAY_PICTURE_API} = settingsEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
  
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      dispatch(setUser({ ...response.data.data, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    }
    toast.dismiss(toastId)
  
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    console.log(
      "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      response
    )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function updateDisplayPicture(formData,token){
  console.log(" updatdisplayPicture",formData)
  let result = []
  { 
  try {
    console.log("LOADING")
    const toastId = toast.loading("Loading...")

    console.log("before api call")
        const response=await apiConnector("PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        console.log("after api call")
         if(!response.data.success){
           toast.success(response.data.message);
         }
         console.log(response)
         result = response.data.data
  } catch (e) {
     console.error(e);
     toast.error("unable to upload the image");

  }
  toast.dismiss()
  return result;
}


}

export async function getInstructorData(token){
  console.log("token",token)
  const toastId=toast.loading("Loading")
  let result=[];
  try{
       const response=await apiConnector("GET",GET_ALL_INSTRUCTOR_DATA_API,null,{
        Authorization:`Bearer ${token}`,
       })
      console.log("GET_INSTRUCTOR_API_RESPONSE",response);
      if(!response?.data?.success){
        throw new Error(response.data.message)
      }
      result=response?.data?.data;
  }
  catch(error){
    console.log("Get_Instructor_api_error",error);
    toast.error("Could Not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}

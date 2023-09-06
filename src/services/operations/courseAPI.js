import { apiConnector } from '../apiconnector';
import {courseEndpoints} from '../apis'
import {toast} from 'react-hot-toast'


const {GET_ALL_COURSE_API
}=courseEndpoints


export const getAllCourse=()=>{
    return async(dispatch)=>{
    try {       
        // dispatch (setLoading(true));
          console.log("hey before api call")
             const response=await apiConnector('GET',GET_ALL_COURSE_API);
              console.log("response of all courses",response.data.data)
             if(!response.data.success){
                 throw new Error("all courses does not founded",response.data.message);
             }
             toast.success("All courses are founded successfully")
             return  response.data.data
        }
     catch (error) {
        console.log(error);
        toast.error("could not find all the course");
        
    }
    // dispatch(setLoading(false));
    console.log("hey after api call")
   
}

}
  
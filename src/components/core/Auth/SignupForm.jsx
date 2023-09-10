import { useState } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
const SignupForm = ({setIsLoggedIn}) => {
    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const[accountType,setAccountType]=useState("Student");
    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }
    function submitHandler(event){
        console.log("event",event)
        event.preventDefault();
       if(formData.password !== formData.confirmPassword){
        toast.error("Password does not match");
        return;
       }
     
    //    toast.success("Account Created")
       const accountData={
         ...formData
       }
       const signupData={
        ...accountData,
        accountType
       }
      console.log("printing final account data");
      console.log(signupData)
      dispatch(setSignupData(signupData));
      setIsLoggedIn(true);
       // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))
    }
  return (
    <div>
     <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max">
     <button 
        onClick={()=>{
            setAccountType("Student")
           }}
          className={`${accountType === "student" ? ("bg-richblack-900 text-richblack-5 "):"bg-transparent text-richblack-200"} py-2 px-8 rounded-full transition-all duration-200"`}>
                Student
            </button>
            <button onClick={()=>{ 
                setAccountType("Instructor")
                }}
                className={`${accountType === "instructor" ? ("bg-richblack-900 text-richblack-5 "):"bg-transparent text-richblack-200 "}py-2 px-5 rounded-full transition-all dura tion-200"`}>
                Instructor
            </button>
                </div>

                <form  onSubmit={submitHandler} >
                <div className="flex justify-between gap-x-4   mt-[20px] ">
                <label >
                <p className="text-[0.875rem]  text-richblack-5 mb-1 leading-[1.375rem]">
                First Name<sup className="text-pink-200">*</sup></p>
                <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] " />
                    </label>
                    <label 
                    >
                        <p  className="text-[0.875rem]  text-richblack-5 mb-1 leading-[1.375rem]">
                        Last Name<sup className="text-pink-200">*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
                        />
                    </label>
            </div>
            {/* email Add */}
            <div className=" mt-[20px]">
            <label >
                    <p className="text-[0.875rem]  text-richblack-5 mb-1 leading-[1.375rem]">Email Address<sup className="text-pink-200">*</sup></p>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address "
                        value={formData.email}
                        className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
                    />
            </label>
            </div>
             {/* createPassword and Confirm Password */}
             <div className="flex justify-between gap-x-4   mt-[20px]">
                <label className="relative ">
                    <p className="text-[0.875rem]  text-richblack-5 mb-1 leading-[1.375rem]">
                    Create Password<sup className="text-pink-200">*</sup></p>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                        className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)}
                     className="absolute right-3 top-[38px] cursor-pointer" >
                        {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                        (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>
                <label className="relative">
                    <p className="text-[0.875rem]  text-richblack-5 mb-1 leading-[1.375rem]">
                    Confirm Password<sup  className="text-pink-200">*</sup></p>
                    <input
                        required
                        type= {showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
                    />
                    <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                     className="absolute right-3 top-[38px] cursor-pointer">
                        {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) :

                         (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>
            </div>
            <button type='submit' className=" w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]  mt-6">
            Create Account
        </button>
           </form>
    </div>
  
  )
}

export default SignupForm
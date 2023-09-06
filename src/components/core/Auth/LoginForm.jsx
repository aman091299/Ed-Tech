import React from 'react'
import { useState } from 'react'
import {AiOutlineEye} from 'react-icons/ai'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { login } from '../../../services/operations/authAPI'
import { useDispatch } from 'react-redux'
const LoginForm = ({setIsLoggedIn}) => {
       console.log("hey log in")
    const [formData,setFormData]=useState({ email:"",password:""})
    const[showPassword,setShowPassword]=useState(false);
    const navigate=useNavigate();
   const dispatch=useDispatch();

    function changeHandler(event){
        //setup email data 
        setFormData(prevformData =>
              (
                {
                ...prevformData,
                [event.target.name]:event.target.value
              }
               
                )
        )
    } 

function submitHandler(event){
    event.preventDefault();
    setIsLoggedIn(true );
    console.log(formData)
   
    dispatch(login(formData.email,formData.password,navigate));

}

  return (
    <form  onSubmit={submitHandler}
    className="flex flex-col w-full gap-4 mt-6">
    <label>
    <p className="text-[0.875rem]  text-richblack-5 mb-1 leading-[1.375rem]">
                Email Address<sup className="text-pink-200">*</sup>
            </p>
            <input 
            type="email" 
            required
            placeholder="Enter email address" 
            value={formData.email} 
           onChange={changeHandler}
            name="email"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
             />
          </label>
          <label className="w-full relative">
            <p className="text-[0.875rem]  text-richblack-5 mb-1 leading-[1.375rem]">
                Password<sup className="text-pink-200">*</sup>
            </p>
            <input 
            type={showPassword ? ("text"):("password")} 
            placeholder="Enter Password" 
            name="password" 
            value={formData.password}
            onChange={changeHandler}
            required
             className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
             />
               <span onClick={()=>{
            setShowPassword((pre)=>!pre)
        }
               } 
        className="absolute right-3 top-[38px] cursor-pointer">
            {
                showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/> ) :

                (<AiOutlineEye   fontSize={24} fill='#AFB2BF'/>)
            }
        </span>
        <Link to="/forget-password">
            <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto ">
                Forget Password
            </p>
        </Link>

        </label>
        <button type='submit'   className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px]  mt-6"> 
            Sign In
        </button> 
        
    </form>
  )
}

export default LoginForm
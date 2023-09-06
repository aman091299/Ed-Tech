import React from 'react'
import { useEffect,useState } from 'react';
import {useForm} from "react-hook-form"
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from '../../data/countrycode.json'

//React hook used here
const ContactUsForm = () => {
    console.log("contactUsForm");
    const [loading,setLoading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();
  
    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
          const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);   
          
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
    <div className="flex flex-col gap-3 py-5">
    <div className="flex gap-5">
        {/*firstName*/}
        <div className="flex flex-col gap-3 ">
            <label htmlFor='firstname'>First Name</label>
            <input 
             type='text'
             name='firstname'
             id='firstname'
             className="text-richblack-300 bg-richblack-800 rounded-md p-3"
             placeholder="Enter first name"
             {...register("firstname", {required:true})}
            />
            {
                errors.firstname &&(
                    <span>
                        Please enter Your name
                    </span>
                )
            }
        </div>
         {/*lastName*/}
         <div className="flex flex-col gap-3 ">
            <label htmlFor='lastname'>Last Name</label>
            <input 
             type='text'
             name='lastname'
             id='lastname'
             placeholder="Enter last name"
             className="text-richblack-300 bg-richblack-800 rounded-md p-3"
             {...register("lastname")}
            />
          
        </div>
    </div>
     
        {/*email*/}
        <div className="flex flex-col gap-3 "> 
         <label htmlFor="email">Email Address</label>
         <input 
         type='email'
         name='email'
         id='email'
         placeholder='Enter email Address'
         className="text-richblack-300 bg-richblack-800 rounded-md p-3"
         {...register("email", {required:true})}
         />
         {
           errors.email && (
            <span>
                Please enter your email address
            </span>
           ) 
         }
        </div>

         {/*phoneNo*/}
         <div className='flex flex-col gap-2 '>
            <label htmlFor='phonenumber'>Phone Number</label>
            {/*dropdown*/}
            <div className=" flex  w-[80px] gap-3  ">
            <select
             name='dropdown'
             id='dropdown'
             className=" text-richblack-300 lg:w-[150px] p-3 bg-richblack-800 rounded-md"
             {...register("countrycode",{required:true})}
             >
          {
              CountryCode.map((element,index)=>{
                return (
                 
                    <option key={index} value={element.code} >
                       {element.code} -{element.country}
                    </option>  
                )
              })
          }
          </select>
          
          <div>
            <input type='number'
            name='phonenumber'
            id='phonenumber'
            placeholder='123345 67890'
            className='text-richblack-300 bg-richblack-800 rounded-md p-2 '
            {...register("phoneNo",{
                required:{value:true,message:"Please enter Phone Number"},
                maxLength:{value:10,message:"Invalid Phone Number"},
                minLength:{value:8,message:"Invalid Phone Number"}
            })}
            />
         
          </div>
          
            </div>
         </div>
         {
            errors.phoneNo && (
                <span>
                    {
                    errors.phoneNo.message
                    }
                </span>
            )

         }
         {/*message*/}
         <div className="flex flex-col gap-3 ">
         <label htmlFor='message'>Enter Message</label>
            <textarea
            name='message'
            id='message'
            cols='30'
            rows='7'
            placeholder='Enter Your message here'
            className="text-richblack-300 bg-richblack-800 rounded-md p-4"
            {...register("message", {required:true})}
            />
            {
                errors.message && (
                    <span>
                        Please Enter Your Message Here
                    </span>
                )
            }
         </div>
      
         <button type="submit" 
         className="bg-yellow-100 rounded-md text-center px-6 text-[16px] font-bold text-richblack-900 py-3 ">
          Send Message
          </button>
        
        
         
     </div>
    </form>
  )
}

export default ContactUsForm






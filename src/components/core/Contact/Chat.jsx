import React from 'react'
import {HiChatBubbleLeftRight} from 'react-icons/hi2'
import {FaEarthAmericas} from 'react-icons/fa6'
import {IoCall} from 'react-icons/io5'
const Chat = () => {
  return (
    <div className="w-fit h-fit flex flex-col gap-5 bg-richblack-800 rounded-md p-5">
        
           <div className='flex gap-2'>
          <HiChatBubbleLeftRight/>
          <div className='flex flex-col gap-1'>
          <h1 className="font-bold ">Chat on us</h1>
          <div className="text-richblack-200 text-sm">
          <p>Our friendly team is here to help.</p>
           <p >@mail address</p>
          </div>
        
          </div>
           </div>

           <div className='flex gap-2'>
          <FaEarthAmericas/>
          <div className='flex flex-col gap-1'>
          <h1  className="font-bold ">Visit us</h1>
          <div className="text-richblack-200 text-sm">
          <p >Come and say hello at our office HQ.</p>
           <p>Here is the location/ address</p>
          </div>
          </div>
          
           </div>

           
           <div className='flex gap-2'>
          <IoCall/>
          <div className='flex flex-col gap-1'>
          <h1  className="font-bold ">Call us</h1>
          <div className="text-richblack-200 text-sm">
          <p>Mon - Fri From 8am to 5pm.</p>
           <p >+123 456 7890</p>
          </div>
         
          </div>
           </div>
          
        
    </div>
  )
}

export default Chat
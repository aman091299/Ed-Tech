import React from 'react'
import {BiCommentEdit} from 'react-icons/bi'
import * as Icons from 'react-icons/vsc'
const IconBtn = ({

     text,
    onclick,
    children,
    disabled,
   iconName,
    outline=false,
    customClasses,
    type,
}) => {
  const Icon=Icons[iconName];
  console.log("iconbtn")
  return (
    <button 
    disabled={disabled}
    onClick={onclick}
    type={type}
    className={`flex items-center justify-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
    
    >
      {
        children ?
        ( <>
                <span  className={`${outline && "text-yellow-50"}`} >
                  {text}
                </span>
                {children}
            </> 
            )
        :
        (text) 
      }
      { 
        Icon &&(
          <div className="flex items-center justify-center mx-auto mt-1">
        <Icon/>
        </div>
        )
       
      }
     

      
    </button>
  )
}

export default IconBtn
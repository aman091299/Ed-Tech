import React from 'react'
import AnimalError from "../assets/404 Error with a cute animal-bro.svg"
//  place-center or place-item for text in center
const Error = () => {
  return (
    <div className='flex justify-center items-center text-3xl text-white'>
     <img src={AnimalError} className="h-[500px]"/>
    </div>
  )
}

export default Error
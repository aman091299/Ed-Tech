import React,{useState} from 'react'
import { useEffect } from 'react';
const RequirementField = ({name,label,register,errors,setValue,getValues}) => {
    const [requirement,setRequirement]=useState("");
    const [requirementList,setRequirementList]=useState([]);

    const handleAddRequirement=()=>{
          if(requirement){
           setRequirementList([...requirementList,requirement]);
           setRequirement("");
          }
    }
    const handleRemoveRequirement=(index)=>{
      
          const updatedRequirementList=[...requirementList];
          updatedRequirementList.splice(index,1);
          setRequirementList(updatedRequirementList);
     
  }

  useEffect(()=>{
   register(name,{required:true,
          validate:(value)=>value.length>0})
  },[])

  useEffect(()=>{
    setValue(name,requirementList);
  },[requirementList])
  return (
    <div>
     <div  className="text-white">
      <label htmlFor={name}>{label}<sup>*</sup></label>
      <input 
       id={name}
       value={requirement}
       onChange={(e)=>setRequirement(e.target.value)}
       className="w-full text-richblack-400"
      />
        {
        errors[name] &&(
            <span>{label} is required</span>
        )
      }
      <button
         type='button'
         onClick={handleAddRequirement}
         className="font-semibold text-yellow-50"
         >
        Add
      </button>
      {
        requirementList.length > 0 && (
            <ul>
                {
                    requirementList.map((requirement,index)=>(
                        <li key={index} className="flex items-center text-richblack-5">
                            <span>{requirement}</span>
                            <button type='button'
                              onClick={()=>handleRemoveRequirement(index)}             
                            className="text-xs text-pure-greys-300"
                            >
                                clear
                            </button>
                        </li>
                    ))
                }
            </ul>
        )
      }
     
    </div>
   
      </div>
  )
}

export default RequirementField
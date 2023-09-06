import React from 'react'
import {toast} from "react-hot-toast"
import { catalogData } from '../apis';
import { apiConnector } from '../apiconnector';

export const getCatalogPageData=async(categoryId)=>{
    console.log("category",categoryId)
    let result =[];
     const toastId=toast.loading("Loading...")
    try {
        const res=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,
         {categoryId:categoryId} 
        );
        console.log("res",res)
        if(!res?.data?.success){
            throw new Error("Could not fetch category page data ")
        }
        result=res?.data?.data;
    } catch (error) {
         console.log("catalog page Data api error",error);
         toast.error(error.message);
         result=error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
}

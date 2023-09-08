import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

//creating slice
const initialState={
    cart:localStorage.getItem("cart")?
    JSON.parse(localStorage.getItem("cart"))
    :[],
    totalItems:localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
    total:localStorage.getItem("total")?JSON.parse(localStorage.getItem("total")):0,
}
const cartSlice=createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalItems(state,value){
            state.totalItems=value.payload;
        },
        
            setTotal(state,value){
               state.total=value.payload;
            },
        
        //add to cart 
        addToCart:(state,action)=>{
             const course =action.payload
            
             const index=state.cart.findIndex((item)=>item._id === course._id)
              
             if(index >= 0){
                toast.error("course already in cart");
                return;
             }
             //course is adding to the cart
             state.cart.push(course)
             //update the total quantity and price
             state.totalItems++;
             state.total +=course.price
             //update to localStorage
             localStorage.setItem("cart",JSON.stringify(state.cart))
             localStorage.setItem("total",JSON.stringify(state.total))
             localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
             //show toast
             toast.success("course added to cart")
        },
        //remove from cart
        removeFromCart :(state,action)=>{
            const courseId=action.payload

            //return the index of the first element that satisfy the condition
            const index=state.cart.findIndex((item)=>item._id === courseId)

            if(index >= 0){
                //if the course is found in the cart,remove it
                state.totalItems--;


                state.total -= state.cart[index].price
                    state.cart.splice(index,1)
                    //Update to local storage
                    localStorage.setItem("cart",JSON.stringify(state.cart))
            }
        },
        //resetcart
        resetCart:(state,value)=>{
            state.cart=[];
            state.totalItems=0;
            state.total=0;
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("total",JSON.stringify(state.total));
        },
    },
    
});
export const {setTotalItems,setTotal,addToCart, removeFromCart,resetCart} =cartSlice.actions;
    export default cartSlice.reducer;
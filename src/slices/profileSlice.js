import { createSlice } from "@reduxjs/toolkit";


//creating slice for profile
const initialState={
 //if user is not instructor show cart
   user:localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null,
   loading:false,

}
const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload;
         console.log("user",state.user)
        },
        setLoading(state,value){
            
            state.loading=value.payload;
            console.log("Loading in profile slice",state.loading)
        }

    },
    
});
export const {setUser,setLoading} =profileSlice.actions;
    export default profileSlice.reducer;
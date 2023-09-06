import { createSlice } from "@reduxjs/toolkit";


//creating slice
const initialState={
    //getting the token from location
    token:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading:false,
    signupData:null,
};
const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken(state,value){
            state.token=value.payload;
            

        },
  
    setLoading(state,value){
        state.loading=value.payload;
    },
    setSignupData(state,value){
        state.signupData=value.payload;
    },
},
});
export const {setSignupData,setLoading,setToken} =authSlice.actions;
    export default authSlice.reducer;
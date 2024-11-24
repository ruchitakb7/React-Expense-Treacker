import { createSlice } from "@reduxjs/toolkit";


   const initailval=localStorage.getItem('token');
   const initailId=localStorage.getItem('userId');

   const initialState={
    token:initailval||null,
    userId:initailId||null,
    isLogin:!!initailval
   }

   const AuthSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){

            const tokenId = action.payload.idToken;
            const userId=action.payload.userId
            localStorage.setItem('token',tokenId)
            localStorage.setItem('userId',userId)
             
            state.token=tokenId;
            state.userId=userId;
            state.isLogin=true

        },
        logout(state){

            localStorage.removeItem('token')
            localStorage.removeItem('userId')

            state.token=null;
            state.userId=null;
            state.isLogin=false

        }
    }
   })

   export const {login,logout} =AuthSlice.actions;
   export default AuthSlice.reducer


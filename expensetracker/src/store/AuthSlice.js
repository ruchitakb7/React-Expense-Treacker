import { createSlice } from "@reduxjs/toolkit";

   const initialval=localStorage.getItem('token');
   const initialId=localStorage.getItem('userId');

   const initialState={
    token:initialval||null,
    userId:initialId||null,
    isLogin:!!initialval
   }

   const AuthSlice= createSlice({
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


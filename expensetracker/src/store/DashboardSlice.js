import { createSlice } from "@reduxjs/toolkit";

const initialState={
    activeSection:'expenses'
}

const DashboardSlice=createSlice({
    name:'dashboard',
    initialState,
    reducers:{
        handleSectionChange(state,action){
           
            state.activeSection=action.payload
        },
        handleClose(state){
            state.activeSection='expenses'
        }

    }
})

export const {handleSectionChange,handleClose} =DashboardSlice.actions
export default DashboardSlice.reducer
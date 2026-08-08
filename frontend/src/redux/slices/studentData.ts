import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name:"student",
    initialState:{
        studentData:null
    },
    reducers:{
        setstudentData:(state,action)=>{
            state.studentData = action.payload
        }
    }
})


export const {setstudentData} = studentSlice.actions
export default studentSlice.reducer

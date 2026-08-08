import { createSlice } from "@reduxjs/toolkit";

const facultySlice = createSlice({
    name:"faculty",
    initialState:{
        facultyData:null
    },
    reducers:{
        setFacultyData:(state,action)=>{
            state.facultyData = action.payload
        }
    }
})


export const {setFacultyData} = facultySlice.actions
export default facultySlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const hodSlice = createSlice({
    name:"hod",
    initialState:{
        hodData:null
    },
    reducers:{
        setHodData:(state,action)=>{
            state.hodData = action.payload
        }
    }
})


export const {setHodData} = hodSlice.actions
export default hodSlice.reducer

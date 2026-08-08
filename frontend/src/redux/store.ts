import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userdata"
import studentReducer from "./slices/studentData"
import hodReducer from "./slices/hod"
import facultyReducer from "./slices/faculty"

export const store  = configureStore({
    reducer:{
        "user":userReducer,
        "student":studentReducer,
        "hod":hodReducer,
        "faculty":facultyReducer
    }

})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

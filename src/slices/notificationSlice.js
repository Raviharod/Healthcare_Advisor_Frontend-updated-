import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name:"notification",
    initialState:{
        notificationMsg:"Welcome to Our Platform😊",
        errorMsg:"No Error Right Now🧑‍💻",
        isActive:true
    },
    reducers:{
        setNotificationMsg(state,action){
            state.notificationMsg = action.payload;
            state.isActive = true
        },
        setErrorMsg(state, action){
            state.errorMsg = action.payload;
        },
        setIsActive(state,action){
            state.isActive = false;
        }
    }
})

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
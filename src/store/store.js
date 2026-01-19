import {configureStore} from "@reduxjs/toolkit";
import doctorReducer from "../slices/doctorSlice";
import notificationReducer from "../slices/notificationSlice";
import userActionReducer from "../slices/userActionsSlice";


const store = configureStore({
  reducer:{
    doctor: doctorReducer,
    notification:notificationReducer,
    userAction:userActionReducer,
  }
});

export default store;
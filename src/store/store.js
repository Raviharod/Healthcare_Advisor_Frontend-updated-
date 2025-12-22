import {configureStore} from "@reduxjs/toolkit";
import doctorReducer from "../slices/doctorSlice";
import notificationReducer from "../slices/notificationSlice";


const store = configureStore({
  reducer:{
    doctor: doctorReducer,
    notification:notificationReducer
  }
});

export default store;
import { createSlice } from "@reduxjs/toolkit";

const doctorSlice = createSlice({
  name:"doctor",
  initialState:{
    doctors:[],
    doctorSocketInfo:{
      name:"chotu",
      socketId: null,
      isOnline: false
    },
    invitation: {
      isPending: false,
      isInvitationAccepted:false,
      invitationData: null,
      isInvitationRejected:false,
    },
    isLogin:false
  },
  reducers:{
    setOnlineDoctors(state, action){
      state.doctors = action.payload;
    },
    setDoctorSocketInfo(state, action){
      state.doctorSocketInfo = action.payload;
    },
    setInvitationPending(state, action){
      state.invitation.isPending = true;
      state.invitation.invitationData = action.payload;
    },
    setInvitationAccepted(state, action){
      state.invitation.isInvitationAccepted = true;
    },
    setInvitationRejected(state, action){
      state.invitation.isInvitationRejected = true;
    },
    clearInvitation(state){
      state.invitation.isPending = false;
      state.invitation.isInvitationAccepted = true;
      state.invitation.isInvitationRejected = false;
    },
    setRoomId(state, action){
      state.invitation.roomId = action.payload;
      state.invitation.isPending = false;
    },
    setIsLogin(state, action){
      state.isLogin = action.payload;
    }
  }
});


export const doctorActions = doctorSlice.actions;
export default doctorSlice.reducer;
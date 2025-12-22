import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../videocall/VideoCall";
import { doctorActions } from "../../slices/doctorSlice";
import { FaVideo, FaTimes } from "react-icons/fa";

function InvitationNotification( {invitation}, onClose) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAccept = () => {

    // Send acceptance to patient
    socket.emit("video-invitation-accepted", {
      patientSocketId: invitation.invitationData.patientSocketId,
      doctorName: invitation.invitationData.doctorName || "Doctor",
      doctorSocketId: invitation.invitationData.doctorSocketId || socket.id,
    });
    socket.emit("start-video-call", {
      patientSocketId: invitation.invitationData.patientSocketId,
      doctorName: invitation.invitationData.doctorName || "Doctor",
      doctorSocketId: invitation.invitationData.doctorSocketId || socket.id,
    });
    
    // Update Redux state
    // dispatch(doctorActions.setRoomId(roomId));
    dispatch(doctorActions.clearInvitation());
    

    // Navigate to video call page
    navigate("/enterVideo");
  };

  const handleReject = () => {
    // Send rejection to patient
    console.log(invitation);
    socket.emit("video-invitation-rejected", {
      patientSocketId: invitation.invitationData.patientSocketId,
      doctorName: invitation.invitationData.doctorName || "Doctor"
    });

    // Clear invitation state
    // dispatch(doctorActions.setInvitationRejected(true));
    dispatch(doctorActions.clearInvitation());
  };

  return (
    <>
    <div className="h-auto w-full p-3 rounded-lg  fixed z-50  justify-center flex flex-col items-center">
      <div className="bg-white rounded-lg p-4 w-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaVideo className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Video Consultation Invitation
          </h3>
        </div>
        <button
          onClick={handleReject}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes size={24} />
        </button>
      </div>

      <div className="mb-6">
        <p className="text-gray-700 text-lg">
          <span className="font-semibold text-blue-600">
            {invitation.invitationData.patientName}
          </span>{" "}
          wants to start a video consultation with you.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleReject}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
        >
          <FaVideo />
          Accept & Join
        </button>
      </div>
      </div>
      </div>
    </>
  )
}

export default InvitationNotification;


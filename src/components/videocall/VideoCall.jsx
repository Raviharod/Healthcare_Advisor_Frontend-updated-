import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import "./videocall.css";
import { doctorActions } from "../../slices/doctorSlice";
import { useDispatch, useSelector } from "react-redux";
// import patient from "../../../../backend/src/models/patient";
import VideoUi from "../../Pages/VideoCallUi/VideoUi";

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(VITE_SOCKET_URL);

const VideoCall = () => {
  const dispatch = useDispatch();

  const invitation = useSelector((state) => state.doctor.invitation);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const localStreamRef = useRef(null); // Store the stream reference
  const remoteSocketIdRef = useRef(null); // keep track of the other peer socket

  const servers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  // ----------- SETUP LOCAL STREAM + PEER CONNECTION -------------
  const setupConnection = async () => {
    console.log("setupconnection on doctor side");
    
    try {
      // Get user media if we don't have a stream yet
      if (!localStreamRef.current) {
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log("Got user media stream");
      }

      // Set video element srcObject if it's available
      if (localVideoRef.current && localStreamRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
        console.log("Set local video srcObject");
      }

      // Create peer connection if it doesn't exist
      if (!peerConnection.current) {
        peerConnection.current = new RTCPeerConnection(servers);

        // Add local tracks
        localStreamRef.current.getTracks().forEach((track) =>
          peerConnection.current.addTrack(track, localStreamRef.current)
        );

        // Handle remote stream
        peerConnection.current.ontrack = (event) => {
          console.log("Received remote track");
          if (remoteVideoRef.current) {
            console.log("streaming remote video");
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        // Handle ICE candidates
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            if (!remoteSocketIdRef.current) {
              console.warn("Missing remote socket id, skipping ICE send");
              return;
            }
            socket.emit("ice-candidate", {
              candidate: event.candidate,
              targetSocketId: remoteSocketIdRef.current,
            });
          }
        };
      }
    } catch (error) {
      console.error("Error in setupConnection:", error);
      alert("Failed to access camera/microphone: " + error.message);
    }
  };

  // Setup connection when video element is available and invitation is accepted
  useEffect(() => {
    if (invitation.isInvitationAccepted) {
      // Use setTimeout to ensure the video element is rendered and ref is set
      const timer = setTimeout(() => {
        if (localVideoRef.current) {
          console.log("Video element is ready, setting up connection");
          setupConnection();
        } else {
          console.warn("Video element ref not available yet");
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [invitation.isInvitationAccepted]);

  useEffect(() => {
    socket.on("video-invitation-accepted", (data) => {
      console.log("Invitation accepted", data);
      dispatch(doctorActions.setInvitationAccepted(true));
    });

    socket.on("video-invitation-rejected", (data) => {
      console.log("Invitation rejected", data);
      console.log(invitation);
      dispatch(doctorActions.setInvitationAccepted(false));
      dispatch(doctorActions.setInvitationRejected(true));
    });
  }, [invitation.isInvitationAccepted, invitation.isInvitationRejected]);

  // ----------- SOCKET EVENTS -------------
  useEffect(() => {
    socket.on("start-video-call", async () => {
      console.log("Starting video call...sending offer to doctor");
      // Patient side: we already know the doctor's socket id from invitation
      if (invitation?.invitationData?.doctorSocketId) {
        remoteSocketIdRef.current = invitation.invitationData.doctorSocketId;
      }
      await setupConnection();
      
      if (!peerConnection.current) {
        console.error("Peer connection not ready after setupConnection");
        return;
      }
      
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      console.log("Offer sent to doctor");
      socket.emit("offer", { offer, invitationData: invitation.invitationData });
    });

    socket.on("offer", async (data) => {
      console.log("Offer received from the patient to doctor:", data);
      // Doctor learns patient's socket id from offer payload
      if (data?.patientSocketId) {
        remoteSocketIdRef.current = data.patientSocketId;
      }
      await setupConnection(); // ensure peer connection exists
      
      console.log("after setupconnection");
      if (!peerConnection.current) {
        console.error("Peer connection not ready");
        return;
      }

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );

      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);

      socket.emit("answer", { answer, doctorSocketId:data.doctorSocketId, patientSocketId:data.patientSocketId });
    });

    socket.on("answer", async (data) => {
      console.log("Answer received");
      // Patient learns doctor's socket id from answer payload
      if (data?.doctorSocketId) {
        remoteSocketIdRef.current = data.doctorSocketId;
      }
      if (!peerConnection.current) return;

      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    });

    socket.on("ice-candidate", async (data) => {
      // If we somehow missed the remote id earlier, capture it from senderId
      if (!remoteSocketIdRef.current && data?.senderId) {
        remoteSocketIdRef.current = data.senderId;
      }
      if (!peerConnection.current) {
        console.warn("Peer connection not ready yet for ICE candidate");
        await setupConnection();
      }

      try {
        await peerConnection.current.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
        console.log("ICE candidate added");
      } catch (err) {
        console.error("Error adding ICE candidate", err);
      }
    });

    return () => {
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("start-video-call");
    };
  }, [invitation.isInvitationAccepted]);

  // Cleanup: Stop all tracks when component unmounts or invitation is cleared
  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
    };
  }, []);

  return (
    <div className="video-call-container">
      {!invitation.isInvitationAccepted ? (
        <div className="join-room">
          <h1>Waiting for invitation to be accepted...</h1>
          <button onClick={() => dispatch(doctorActions.clearInvitation())}>
            Cancel
          </button>
        </div>
      ) : invitation.isInvitationRejected ? (
        <div className="join-room">
          <h1>Invitation rejected by {invitation.invitationData.doctorName}</h1>
          <button onClick={() => dispatch(doctorActions.clearInvitation())}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="video-area">
          {/* <video ref={localVideoRef} autoPlay muted className="local-video" />
          <video ref={remoteVideoRef} autoPlay muted className="remote-video" /> */}
          <VideoUi localRef = {localVideoRef} remoteRef = {remoteVideoRef}></VideoUi>
        </div>
      )}
    </div>
  );
};

export default VideoCall;

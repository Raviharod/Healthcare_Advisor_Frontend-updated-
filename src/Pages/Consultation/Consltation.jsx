import React, { useState } from "react";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { doctorActions } from "../../slices/doctorSlice";

import VideoUi from "../VideoCallUi/VideoUi";

import {
  FaPhoneAlt,
  FaVideo,
  FaUserMd,
  FaChild,
  FaHeart,
  FaSpa,
  FaBrain,
  FaFemale,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { socket } from "../../components/videocall/VideoCall";

const VITE_FETCH_DOCTORS = import.meta.env.VITE_FETCH_DOCTORS;
const VITE_FETCH_PATIENT_INFO = import.meta.env.VITE_FETCH_PATIENT_INFO;

const specialistTypes = [
  { label: "General Physician", icon: <FaUserMd /> },
  { label: "Child Specialist", icon: <FaChild /> },
  { label: "Heart Specialist", icon: <FaHeart /> },
  { label: "Skin Specialist", icon: <FaSpa /> },
  { label: "Mental Health", icon: <FaBrain /> },
  { label: "Women's Health", icon: <FaFemale /> },
];

function Consltation() {
  const [selectedType, setSelectedType] = useState("General Physician");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("All");
  const [fee, setFee] = useState("All");
  const [doctors, setDoctors] = useState([]);
  const [patientInfo, setPatientInfo] = useState(null);
  // const [onlineUsers, setOnlineusers] = useState([]);
  const navigate = useNavigate();
  const doctorSoketInfo = useSelector((state) => state.doctor.doctorSocketInfo);
  const dispatch = useDispatch();
  const onlineDoctors = useSelector((state)=>state.doctor.doctors);
  const invitation = useSelector((state)=>state.doctor.invitation);


  useEffect(()=>{
    async function fetchDoctors() {
      const res = await fetch(VITE_FETCH_DOCTORS, {
        credentials: "include",
      });
      const result = await res.json();

      if (res.status == 401) {
        alert("User unathaurizez! please login to move further");
        return navigate("/login");
      }
      setDoctors(result.doctors);
      console.log(result.doctors);
    }
    fetchDoctors();
  }, [onlineDoctors]);

  useEffect(() => {

    // Fetch patient info
    async function fetchPatientInfo() {
      const res = await fetch(VITE_FETCH_PATIENT_INFO, {
        credentials: "include",
      });
      const result = await res.json();
      if (res.status === 200) {
        setPatientInfo(result.user);
      }
    }
    fetchPatientInfo();

     return () => {
          socket.off("current-onlineUsers");
          socket.off("video-invitation-accepted");
          socket.off("video-invitation-rejected");
        };
  }, []);

  const handleSocketInfoForVideo = (name, socketId, isOnline) => {
    if (!isOnline) {
      alert("Doctor is not online. Please try again later.");
      return;
    }

    if (!patientInfo) {
      alert("Please login to start a video consultation.");
      navigate("/login");
      return;
    }

    console.log("reached to set doctor info")
    // Set doctor info in Redux
    dispatch(doctorActions.setDoctorSocketInfo({
      name: name,
      socketId: socketId,
      isOnline: isOnline
    }));

    // Set invitation as pending
    dispatch(doctorActions.setInvitationPending({
      doctorName: name,
      doctorSocketId: socketId
    }));

    // Send invitation to doctor via socket
    const invitationPayload = {
      doctorSocketId: socketId,
      doctorName: name,
      patientName: patientInfo.name,
      patientSocketId: socket.id,
      patientId: patientInfo.id
    };
    
    console.log("📤 Patient sending invitation:", invitationPayload);
    console.log("Patient socket ID:", socket.id);
    console.log("Target doctor socket ID:", socketId);
    
    socket.emit("invitation", invitationPayload);

    // Navigate to video call page (will show "Inviting..." state)
    navigate("/enterVideo");
  }

  // Set up socket listeners for invitation responses (only once)
  useEffect(() => {
    if (!patientInfo) return;

    const handleInvitationAccepted = (data) => {
      dispatch(doctorActions.setRoomId(data.roomId));
      // Navigation will happen automatically when roomId is set
    };

    const handleInvitationRejected = (data) => {
      dispatch(doctorActions.clearInvitation());
      alert(`Dr. ${data.doctorName} has declined the video consultation request.`);
      navigate("/consultation");
    };

    socket.on("video-invitation-accepted", handleInvitationAccepted);
    socket.on("video-invitation-rejected", handleInvitationRejected);

    return () => {
      socket.off("video-invitation-accepted", handleInvitationAccepted);
      socket.off("video-invitation-rejected", handleInvitationRejected);
    };
  }, [patientInfo, dispatch, navigate]);

  return (
    <div className="bg-[#f0f6ff] min-h-screen pb-8">
      {/* <div className="h-50 w-3xl bg-amber-200 p-2">
        {onlineUsers.map((user)=>{
          return <li>{user.name}: {user.socketId}</li>
        })}
      </div> */}
      {doctors ? (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mt-8 px-4">
          {/* Left: Specialists List */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Specialists</h2>
            <div className="w-full flex flex-wrap gap-4 mb-8 whitespace-nowrap">
              <div className=" flex flex-wrap gap-4">
                {specialistTypes.map((type) => (
                  <button
                    key={type.label}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold shadow-sm transition ${
                      selectedType === type.label
                        ? "bg-[#1976D2] text-white"
                        : "bg-[#64B5F6] text-white hover:bg-[#2196F3]"
                    }`}
                    onClick={() => setSelectedType(type.label)}
                  >
                    {type.icon}
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Doctor Cards */}
            <div className="w-full flex flex-col gap-6">
              {doctors
                .filter(
                  (doc) =>
                    selectedType === "General Physician" ||
                    doc._doc.specialization === selectedType
                )
                .map((doc, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow flex flex-col md:flex-row items-center md:items-stretch overflow-y-hidden"
                  >
                    <img
                      src={doc._doc.imgUrl}
                      alt={doc._doc.name}
                      className="w-full md:w-48 h-48 object-cover"
                    />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {doc._doc.name}
                        </h3>
                        <p className="text-gray-700 font-medium">
                          {doc._doc.specialization}, Experience-{doc._doc.experience}{" "}
                          years
                        </p>
                        {doc.isOnline ? <span><b className="text-blue-600">Online</b></span> : <span><b className="text-red-500">Offline</b></span>}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span
                          className={`px-4 py-1 rounded-full font-semibold ${
                            doc._doc.consultationFees === 0
                              ? "bg-[#2b7fff] text-white"
                              : "bg-[#2b7fff] text-white"
                          }`}
                        >
                          Consultation Charges ${doc._doc.consultationFees}
                        </span>
                        <div className="flex gap-4">
                          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition">
                            <FaPhoneAlt /> Call Now
                          </button>
                          <Link
                            onClick={() => handleSocketInfoForVideo(doc._doc.name, doc.socketId, doc.isOnline)}
                            to="/enterVideo"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                          >
                            <FaVideo /> Video Consult
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}

       {/* <VideoUi></VideoUi> */}
    </div>
  );
}

export default Consltation;

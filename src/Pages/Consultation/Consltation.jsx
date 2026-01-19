import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "motion/react"

import { doctorActions } from "../../slices/doctorSlice";
import { notificationActions } from "../../slices/notificationSlice";
import { userActionSliceActions } from "../../slices/userActionsSlice";


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
import { FaSearch } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { LuMessageSquareMore } from "react-icons/lu";

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
  const [doctors, setDoctors] = useState([]);
  const [patientInfo, setPatientInfo] = useState(null);
  // const [onlineUsers, setOnlineusers] = useState([]);
  const navigate = useNavigate();
  const doctorSoketInfo = useSelector((state) => state.doctor.doctorSocketInfo);
  const dispatch = useDispatch();
  const onlineDoctors = useSelector((state) => state.doctor.doctors);
  const invitation = useSelector((state) => state.doctor.invitation);
  const userAction = useSelector((state) => state.userAction.sideBtnSelected)


  useEffect(() => {
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

  const handleSocketInfoForVideo = (name, socketId, isOnline, imgUrl) => {
    if (!isOnline) {
      dispatch(notificationActions.setNotificationMsg("Doctor is not online. Please try again later."));
      return;
    }

    if (!patientInfo) {
      dispatch(notificationActions.setNotificationMsg("Please login to start a video consultation."));
      navigate("/login");
      return;
    }

    console.log("reached to set doctor info");

    // Set doctor info in Redux
    dispatch(doctorActions.setDoctorSocketInfo({
      name: name,
      socketId: socketId,
      isOnline: isOnline,
      imgUrl
    }));

    // Set invitation as pending
    dispatch(doctorActions.setInvitationPending({
      doctorName: name,
      doctorSocketId: socketId,
      patientName: patientInfo.name,
      patientSocketId: socket.id,
      patientId: patientInfo.id
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
    <>
      <div className="bg-[#e2e4e4] h-screen w-full flex overflow-hidden">

        {/* --- SIDEBAR (Fixed Left) --- */}
        {/* Added flex-shrink-0 to prevent sidebar from collapsing */}
        <motion.div
          animate={{
            x: [-150, 1]
          }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="w-64 lg:w-52 h-full bg-white flex-shrink-0 overflow-y-auto hidden md:block">
          {/* Placeholder for sidebar content */}
          <div className="p-4">
            <h2 className="font-bold text-xl mb-4">Menu</h2>
            <ul className="flex flex-col gap-2">
              <Link className={userAction == "search" ? "flex p-2 items-center gap-2 text-md bg-amber-300 rounded-2xl" : "flex p-2 items-center gap-2 text-md"} onClick={() => dispatch(userActionSliceActions.setSideBtnSelected("search"))}>
                <span className="text-xl" ><FaSearch /> </span>Search Doctors</Link>
              <Link className={userAction == "consultations" ? "flex p-2 items-center gap-2 text-md bg-amber-300 rounded-2xl" : "flex p-2 items-center gap-2 text-md"} onClick={() => dispatch(userActionSliceActions.setSideBtnSelected("consultations"))}>
                <span className="text-xl"><FaUserDoctor /></span> Consultations</Link>

              <Link className={userAction == "message" ? "flex p-2 items-center gap-2 text-md bg-amber-300 rounded-2xl" : "flex p-2 items-center gap-2 text-md"}
                onClick={() => dispatch(userActionSliceActions.setSideBtnSelected("message"))}>
                <span className="text-xl"><LuMessageSquareMore /></span> Messages</Link>

            </ul>
          </div>
        </motion.div>

        {/* --- MAIN CONTENT (Right Side) --- */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">

          {/* Scrollable Container */}
          <div className="flex-1 overflow-y-auto scroll-smooth">

            {doctors ? (
              <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* --- STICKY CATEGORY HEADER --- */}
                {/* Using z-20 and top-0 to stick to the top of the scrollable container */}
                <div className="sticky top-0 backdrop-blur-sm p-4  shadow-sm">
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex md:flex-row flex-col">
                    {userAction == "search" && <motion.input
                      animate={{
                        width: "50%"
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      type="text" placeholder="Search Doctors" className="p-2 border-2 w- text-sm rounded-2xl mr-3"/>}
                    <motion.h2
                      className="text-xl md:text-2xl font-bold text-gray-800 hidden md:block">Connect With Available Doctors</motion.h2>

</div>
                    <div className="flex overflow-auto gap-4 pb-2 ">
                      {specialistTypes.map((type) => (
                        <button
                          key={type.label}
                          className={`flex-shrink-0 flex text-sm md:text-[16px] items-center gap-2 px-6 py-2 rounded-full font-semibold shadow-sm transition ${selectedType === type.label
                            ? "bg-[#065084] text-white"
                            : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                          onClick={() => setSelectedType(type.label)}
                        >
                          {type.icon}
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* --- SCROLLABLE DOCTOR LIST --- */}
                <div className="w-full h-auto flex flex-wrap gap-6 pb-20 p-4">
                  {doctors
                    .filter(
                      (doc) =>
                        selectedType === "General Physician" ||
                        doc._doc.specialization === selectedType
                    )
                    .map((doc, idx) => (
                      <div
                        key={idx}
                        className="bg-white w-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center md:items-stretch p-4 border border-gray-100"
                      >
                        <img
                          src={doc._doc.imgUrl}
                          alt={doc._doc.name}
                          className="w-full md:w-38 h-54 md:h-auto object-cover rounded-xl"
                        />
                        <div className="flex-1 p-4 md:pl-8 flex flex-col justify-between w-full">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                  {doc._doc.name}
                                </h3>
                                <p className="text-[#065084] font-medium mt-1">
                                  {doc._doc.specialization}
                                </p>
                              </div>
                              {/* Heart icon placeholder or status could go here */}
                            </div>

                            <p className="text-gray-500 text-sm mt-2">
                              Experience: {doc._doc.experience} years
                            </p>

                            <div className="mt-2">
                              {doc.isOnline ? (
                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold">
                                  Offline
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col justify-between mt-2 gap-2">
                            <div>
                              <span className="text-lg font-bold text-gray-900">
                                ${doc._doc.consultationFees} <span className="text-sm text-gray-400 font-normal">/ session</span>
                              </span>
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-2 rounded-lg transition">
                                <FaPhoneAlt size={14} />
                              </button>
                              <Link
                                onClick={() =>
                                  handleSocketInfoForVideo(
                                    doc._doc.name,
                                    doc.socketId,
                                    doc.isOnline,
                                    doc._doc.imgUrl
                                  )
                                }
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#3F9AAE] hover:bg-[#2d7a8c] text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition"
                              >
                                <FaVideo /> Consult
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-xl text-gray-500">Loading Specialists...</h1>
              </div>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

export default Consltation;

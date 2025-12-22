import { useState } from "react";
import { useEffect } from "react";
import { MdOutlineHealthAndSafety } from "react-icons/md";//CR
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../videocall/VideoCall";
import { doctorActions } from "../../slices/doctorSlice";
import InvitationNotification from "../InvitationNotification/InvitationNotification";
import HeaderBox from "./HeaderBox";
import Notification from "../notification/Notification";
import { notificationActions } from "../../slices/notificationSlice";

//accessing env apis
const VITE_FETCH_LOGIN_DETAILS = import.meta.env.VITE_FETCH_LOGIN_DETAILS;
const VITE_USER_LOGOUT = import.meta.env.VITE_USER_LOGOUT;


function Header() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invitation = useSelector((state) => state.doctor.invitation);
  const notificationActive = useSelector(state=>state.notification.isActive);

  // Fetch user login details
  useEffect(() => {
    const fetchLogingDetails = async () => {
      const res = await fetch(VITE_FETCH_LOGIN_DETAILS, {
        credentials: "include",
      });
      const result = await res.json();
      if (res.status == 200) {
        setIsLogin(true);
        setUser(result.user);
        socket.emit("onlineUser", result.user);
      }
      if (res.status == 400) {
        setIsLogin(false);
        setUser(null);
      }
    };
    fetchLogingDetails();
  }, [notificationActive]);

  // Register socket listener for video invitations (only for doctors)
  // This is separate from the fetch to avoid race conditions
  useEffect(() => {
    if (!user || user.role !== "doctor") {
      // Clean up listener if user is not a doctor or not logged in
      socket.off("video-invitation-received");
      return;
    }

    console.log("Setting up video invitation listener for doctor:", user.name);
    console.log("Socket connected:", socket.connected, "Socket ID:", socket.id);

    // Register the listener with a named function for proper cleanup
    const handleVideoInvitation = (data) => {
      console.log("🎉 Invitation received on doctor side:", data);
      // console.log("Current socket ID:", socket.id);
      dispatch(doctorActions.setInvitationPending({
        ...data,
        doctorName: user.name,
        doctorSocketId: socket.id
      }));
    };

    const handleOnlineUsers = (users) => {
      console.log("new doctor online", users);
      dispatch(doctorActions.setOnlineDoctors(users));
    };

    // Set up connection handler to log when socket connects
    const handleConnect = () => {
      console.log("Socket connected in Header, ID:", socket.id);
    };

    // Set up listeners
    socket.on("connect", handleConnect);
    socket.on("video-invitation-received", handleVideoInvitation);
    socket.on("onlineUsers", handleOnlineUsers);

    // If already connected, log it
    if (socket.connected) {
      console.log("Socket already connected, ID:", socket.id);
    }

    // Cleanup: Always remove the listener when component unmounts or user changes
    return () => {
      socket.off("connect", handleConnect);
      socket.off("video-invitation-received", handleVideoInvitation);
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [user, dispatch]);

  const handleLogout = async () => {
    const res = await fetch(VITE_USER_LOGOUT, {
      method: "post",
      credentials: "include"
    });
    const result = await res.json();
    if (res.status == 200) {
      setIsLogin(false);
      dispatch(notificationActions.setNotificationMsg("User Logout Successfully!"))
      navigate("/login");
    }
    if (res.status == 500) {
      alert(result.message);
      navigate("/home")
    }
  }

  // const handleCloseInvitation = () => {
  //   dispatch(doctorActions.clearInvitation());
  // };

  const getdetails = () => {
    console.log("login details ,", user)
    console.log("invitation details ,", invitation);
  }

  return (
    <>
      {invitation.isPending && user?.role === "doctor" && (
        <InvitationNotification invitation={invitation} onClose={() => dispatch(doctorActions.clearInvitation())} />
      )}
      {notificationActive &&  <Notification></Notification>}
      <header className="flex justify-between items-center p-5 text-black">
        <div className="flex justify-between items-center gap-2">
          {/* logo */}
          <div className="text-4xl text-black">
            <MdOutlineHealthAndSafety />
          </div>
          <div className="font-bold text-3xl text-[#2b7fff]">
            Healthcare Advisory
          </div>
        </div>
        <div className="justify-between items-center gap-6 hidden md:flex">
          <div className="flex items-center gap-4">
            <span className="bg-white shadow-2xl p-3 rounded-full"><FaPhone /></span>
            <div>
              <p className="text-md">Phone Number</p>
              <p className="font-bold text-[#2b8aff]">+91 7828624659</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-white shadow-2xl p-3 rounded-full"><MdEmail />
            </span>
            <div>
              <p className="text-md">Email Access</p>
              <p className="font-bold text-[#2b8aff] italic">raviharod7828@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <ul className="flex gap-3">
            <li className="text-2xl hover:cursor-pointer">
              <a href="https://www.instagram.com/ravi_harod__/?hl=en"><FaInstagram /></a>
            </li>
            <li className="text-2xl hover:cursor-pointer">
              <a href=""><FaFacebook /></a>
            </li>
            <li className="text-2xl hover:cursor-pointer">
              <a href=""><FaSquareXTwitter /></a>
            </li>
          </ul>
        </div>
      </header>
      <header className="w-full flex justify-center">
        <HeaderBox isLogin={isLogin} handleLogout={handleLogout} user={user}></HeaderBox>
      </header>
    </>
  );
}

export default Header;

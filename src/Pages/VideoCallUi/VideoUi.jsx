import {
  FaMicrophoneSlash,
  FaVideoSlash,
  FaPhoneSlash,
  FaPaperPlane,
} from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";

const doctor = {
  name: "Dr. A Sharma – Cardiologist",
  avatar: "/images/doc-avatar.jpg",
  online: true,
};

const patient = {
  avatar: "/images/patient-avatar.jpg",
};

const chatMessages = [
  {
    sender: "doctor",
    text: "Hello, how are you feeling today? I am sharing some notes below.",
    type: "text",
  },
  {
    sender: "patient",
    text: "I've been experiencing chest pain and shortness of breath.",
    type: "text",
  },
  {
    sender: "doctor",
    text: (
      <>
        <span className="font-bold text-green-900">Rx: Aspirin 81mg</span>
        <br />
        Take one tablet daily. Please monitor your symptoms and schedule a
        follow-up if they persist.
      </>
    ),
    type: "prescription",
  },
];

function VideoUi({ localRef, remoteRef }) {
  const [chatSectionEnabled, setChatSectionEnabled] = useState(true);
  const invitation = useSelector((state)=>state.doctor.invitation)


  const handleChatSection = ()=>{
    chatSectionEnabled ? setChatSectionEnabled(false) : setChatSectionEnabled(true);
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 p-4 h-[calc(100vh-32px)]">
        {/* Video Section */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col relative overflow-hidden">
          {/* Doctor Info */}
          <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
            <img
              src={doctor.avatar}
              alt="Doctor"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
            />
            <div>
              <div className="font-semibold text-gray-900">{invitation.invitationData.doctorName}</div>
              <div className="flex items-center gap-1 text-green-600 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                Online
              </div>
            </div>
          </div>
          {/* Video Area */}
          <div className="flex-1 flex items-center justify-center relative">
            <video className="w-full object-contain" ref={remoteRef} autoPlay muted></video>

            {/* Patient Small Video */}
            <div className="absolute bottom-8 right-8">
              {/* Container controls the size */}
              <div
                className="relative rounded-lg border shadow-lg overflow-hidden bg-black"
                style={{ width: "220px", height: "150px" }}   // <– hard width & height
              >
                <video
                  ref={localRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover block"  // <– video always fills box
                />
              </div>
            </div>
            {/* Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-4 shadow">
                <FaMicrophoneSlash size={22} />
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full p-4 shadow">
                <FaVideoSlash size={22} />
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow">
                <FaPhoneSlash size={22} />
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow" onClick={handleChatSection}>
                <FiFileText size={22} />
              </button>
            </div>
          </div>
          {/* Footer Note */}
          <div className="text-center text-xs text-gray-500 py-2">
            This video consultation is private and secure. Please seek emergency
            care for urgent situations.
            <br />
            <a href="#" className="text-blue-600 underline mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-600 underline mx-2">
              Terms of Use
            </a>
          </div>
        </div>
        {/* Chat & Notes Section */}
        {chatSectionEnabled && (<div className="w-full md:w-[400px] bg-white rounded-2xl shadow-lg flex flex-col h-full">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Chat & Notes</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
            {chatMessages.map((msg, idx) =>
              msg.sender === "doctor" ? (
                <div key={idx} className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={doctor.avatar}
                      alt="Doctor"
                      className="w-7 h-7 rounded-full object-cover border"
                    />
                    <span className="font-semibold text-gray-800 text-sm">
                      Dr. A Sharma
                      {msg.type === "prescription" && (
                        <span className="ml-1 text-xs text-gray-500">
                          (Prescription Note)
                        </span>
                      )}
                    </span>
                  </div>
                  <div
                    className={`rounded-lg px-4 py-2 mt-1 ${msg.type === "prescription"
                      ? "bg-green-100 border border-green-300 text-green-900"
                      : "bg-blue-50 border border-blue-100 text-gray-800"
                      } text-sm`}
                  >
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800 text-sm">
                      You
                    </span>
                    <img
                      src={patient.avatar}
                      alt="You"
                      className="w-7 h-7 rounded-full object-cover border"
                    />
                  </div>
                  <div className="rounded-lg px-4 py-2 mt-1 bg-blue-600 text-white border border-blue-700 text-sm">
                    {msg.text}
                  </div>
                </div>
              )
            )}
          </div>
          {/* Chat Input */}
          <div className="border-t px-6 py-4 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none"
              placeholder="Type your message..."
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow">
              <FaPaperPlane size={18} />
            </button>
          </div>
        </div>)}
        
      </div>
    </div>
  );
}

export default VideoUi;

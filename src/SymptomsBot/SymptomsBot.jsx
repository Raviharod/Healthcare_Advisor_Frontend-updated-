import React, { useState, useRef, useEffect } from "react";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import { BsCapsule, BsHeartPulse } from "react-icons/bs";
import ChatBubble from "./components/ChatBubble";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import TypingIndicator from "./components/TypingIndicator";
import ResultCard from "./components/ResultCard";
import VoiceRecorderIndicator from "./components/VoiceRecorderIndicator";

const VITE_SEND_PATIENT_VOICE_DATA = import.meta.env.VITE_SEND_PATIENT_VOICE_DATA;
const VITE_SEND_PATIENT_TEXT_DATA = import.meta.env.VITE_SEND_PATIENT_TEXT_DATA;

const BOT_AVATAR = (
  <span className="bg-blue-100 p-2 rounded-full border border-blue-300">
    <MdOutlineHealthAndSafety className="text-3xl text-blue-500" />
  </span>
);

const USER_AVATAR = (
  <span className="bg-green-100 p-2 rounded-full border border-green-300">
    <FaUserMd className="text-2xl text-green-500" />
  </span>
);

const initialMessages = [
  {
    id: 1,
    sender: "bot",
    text: "“Hello! 👋 I’m your virtual healthcare assistant. Tell me what’s been bothering you today, and I’ll help you understand your symptoms and suggest possible next steps.”",
    time: "09:00",
    icon: <BsHeartPulse className="text-blue-400 text-xl mr-2 animate-pulse" />,
  },
];

// Map step to relevant quick replies

function SymptomsBot() {
  const [messages, setMessages] = useState(initialMessages);
  const [newReply, setNewReply] = useState("");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [fetched, setFetched] = useState(false);
  const chatEndRef = useRef(null);

  //voice states
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);


  // useEffect(() => {
  //   chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages, typing]);

   //audio message to get assistant
   const handleAudioMessage = async ()=>{
    console.log("reached to the handle voice message");
    if (!audioBlob) return alert("Please record first!");

    const formData = new FormData();
    formData.append("file", audioBlob, "voice.mp3");

    const res = await fetch(VITE_SEND_PATIENT_VOICE_DATA, {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    console.log("API Response:", data);
   }


  //voice message handling
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setAudioBlob(blob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    // console.log(URL.createObjectURL(audioBlob))
    handleAudioMessage();
  };


  //patient data handling
  const sendPatientData = async () => {
    // Extract relevant data from messages
    const patientData = {
      // age: messages.find(m => m.text && m.sender === "user" && stepQuickReplies[1].some(q => q.label === m.text))?.text,
      // gender: messages.find(m => m.text && m.sender === "user" && stepQuickReplies[2].some(q => q.label === m.text))?.text,
      // fever: messages.find(m => m.text && m.sender === "user" && stepQuickReplies[3].some(q => q.label === m.text))?.text,
      // duration: messages.find(m => m.text && m.sender === "user" && stepQuickReplies[4].some(q => q.label === m.text))?.text,
      // Add more fields as needed
      data: input,
    };

    // Send to backend API
    try {
      const res = await fetch(VITE_SEND_PATIENT_TEXT_DATA, {
        method: "POST",
         credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      });
      const result = await res.json();
      // Handle response as needed
      if (res.status == 401) {
        console.log(result);
      }
      if (res.status == 200) {
        // console.log("success",result.message.content)
        setTyping(false);
        setFetched(true);
        const mainRes = result.message.content.split("</think>");
        setNewReply(mainRes[1]);
      }
      // console.log(result);
    } catch (err) {
      console.error("Error sending patient data:", err);
    }
  };
  // Simulate bot typing and response
  const botRespond = () => {
    // setTyping(true);
    console.log("reached to the bot respond");
    const botReply = {
      id: messages.length + 1,
      sender: "bot",
      text: newReply,
      time: "09:01",
      icon: <BsCapsule className="text-blue-400 text-xl mr-2 animate-bounce" />,
    };
    console.log("this is bot msg", botReply);
    setMessages((prev) => [...prev, botReply]);
  };

  if (fetched) {
    console.log("reached to the nadling seting up bot msg");
    setFetched(false);
    botRespond();
  }

  // console.log(messages);
  // setTyping(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      time: "09:00",
    };

    setInput("");
    setTyping(true);
    sendPatientData();
    setMessages((prev) => [...prev, userMsg]);
  };

  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-green-50 to-white">
      {/* Header */}
      <ChatHeader></ChatHeader>
      {/* Main Chat Window */}
      <main className=" flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl flex flex-col gap-2 px-2 py-6 overflow-y-auto h-[60vh] bg-white/70 rounded-2xl shadow-lg border border-blue-100 mt-6 mb-2 p-4">
          {messages.map((msg) =>
            msg.type === "results" ? (
              <div key={msg.id} className="flex justify-center my-4">
                {/* Results Card */}
                <ResultCard data={msg.data}></ResultCard>
              </div>
            ) : (
              //  chat bubble component
              <ChatBubble
                key={msg.id}
                sender={msg.sender}
                icon={msg.icon}
                text={msg.text}
                time={msg.time}
                BOT_AVATAR={BOT_AVATAR}
                USER_AVATAR={USER_AVATAR}
              ></ChatBubble>
            )
          )}
          {typing && (
            <TypingIndicator BOT_AVATAR={BOT_AVATAR}></TypingIndicator>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Input Section */}
      <div className="w-full max-w-2xl mx-auto px-2 pb-8">
        <ChatInput
          input={input}
          setInput={setInput}
          typing={typing}
          handleSend={handleSend}
          isRecording = {isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          // quickReplies={stepQuickReplies[step]}
          // handleQuickReply={handleQuickReply}
        />
      </div>
      <div>
      {isRecording && <VoiceRecorderIndicator />}
      </div>
    </div>
  );
}

export default SymptomsBot;

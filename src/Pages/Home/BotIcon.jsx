import { useState } from "react";
import { TbMessageCircleHeart } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function ChatBotIcon() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Bot Icon Button */}
      <Link to="/symptomBot"
        onClick={() => setOpen(!open)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
      >
       <TbMessageCircleHeart size={28}/>
      </Link>

      {/* Example: Popup if bot is open */}
      {/* {open && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white shadow-2xl rounded-lg p-4 border border-gray-200">
          <h2 className="font-semibold text-lg text-gray-800">HealthBot</h2>
          <p className="text-sm text-gray-500">Hi 👋, I’m here to help you!</p>
          {/* You can place your chat UI here */}
        </div>
      // )} */}
    // </div>
  );
}

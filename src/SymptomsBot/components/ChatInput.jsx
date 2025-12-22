import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FaStopCircle } from "react-icons/fa";


export default function ChatInput({
  input,
  setInput,
  typing,
  handleSend,
  isRecording,
  startRecording,
  stopRecording
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center">
      <div className="flex-1 flex items-center bg-white border border-blue-200 rounded-xl px-4 py-2 shadow">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-gray-800 text-base"
          placeholder="Type your response…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={typing}
        />
        {!isRecording ? (
          <button
            className="text-blue-500 hover:text-blue-700 text-xl mx-2 hover:cursor-pointer"
            title="Voice Input"
            onClick={startRecording}
          >
            <FaMicrophone />
          </button>
        ) : (
          <button
          className="text-blue-500 hover:text-blue-700 text-xl mx-2 hover:cursor-pointer"
          title="Voice Input"
          onClick={stopRecording}
        >
          <FaStopCircle />
        </button>
        )}

        <button
          className="text-blue-500 hover:text-blue-700 text-2xl hover:cursor-pointer"
          onClick={handleSend}
          disabled={typing}
          title="Send"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
}

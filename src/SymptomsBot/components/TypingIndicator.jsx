export default function TypingIndicator({ BOT_AVATAR }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      {BOT_AVATAR}
      <div className="bg-blue-100 border border-blue-200 px-5 py-3 rounded-2xl shadow flex items-center">
        <span className="text-blue-500 font-medium animate-pulse">
          HealthBot is typing
        </span>
        <span className="ml-2 flex gap-1">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-blue-200 rounded-full animate-bounce delay-300"></span>
        </span>
      </div>
    </div>
  );
}
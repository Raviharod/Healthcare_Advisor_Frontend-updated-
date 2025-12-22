export default function ChatHeader({key, sender, icon, text, time, BOT_AVATAR, USER_AVATAR }) {
  return (
    <>
      <div
        key={key}
        className={`flex ${
          sender === "bot" ? "justify-start" : "justify-end"
        } items-end`}
      >
        {sender === "bot" && BOT_AVATAR}
        <div
          className={`max-w-[70%] px-5 py-3 rounded-2xl shadow ${
            sender === "bot"
              ? "bg-blue-100 text-gray-800 border border-blue-200"
              : "bg-green-100 text-gray-900 border border-green-200"
          } flex flex-col`}
        >
          <div className="flex items-center gap-1">
            {icon}
            <span className="ms-1">{text}</span>
          </div>
          <span className="text-xs text-gray-400 mt-1 self-end">
            {time}
          </span>
        </div>
        {sender === "user" && USER_AVATAR}
      </div>
    </>
  );
}

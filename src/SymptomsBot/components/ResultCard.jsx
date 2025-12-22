import { BsHeartPulse, BsCapsule } from "react-icons/bs";
import { FaUserMd, FaFilePdf, FaRedo } from "react-icons/fa";

export default function ResultsCard({ data }) {
  return (
    <div className="bg-white border border-blue-200 rounded-2xl shadow-xl p-6 w-full max-w-md">
      <div className="mb-4">
        <span className="text-lg font-bold text-blue-600 flex items-center gap-2">
          <BsHeartPulse className="text-blue-400 text-xl" />
          Possible Conditions
        </span>
        <ul className="mt-2 space-y-1 text-gray-700">
          {data.conditions.map((c, i) => (
            <li key={i} className="flex justify-between">
              <span>{c.name}</span>
              <span className="font-semibold text-blue-500">{c.percent}%</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <span className="text-lg font-bold text-blue-600 flex items-center gap-2">
          <BsCapsule className="text-blue-400 text-xl" />
          Urgency Level
        </span>
        <span className={`ml-2 px-3 py-1 rounded-full font-semibold text-white ${
          data.urgency === "Urgent"
            ? "bg-red-500"
            : data.urgency === "Moderate"
            ? "bg-yellow-500"
            : "bg-green-500"
        }`}>
          {data.urgency}
        </span>
      </div>
      <div className="mb-4">
        <span className="text-lg font-bold text-blue-600 flex items-center gap-2">
          <FaUserMd className="text-blue-400 text-xl" />
          Next Steps
        </span>
        <div className="mt-1 text-gray-700">{data.nextSteps}</div>
      </div>
      <div className="flex gap-3 mt-4">
        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition">
          <FaUserMd /> Consult Doctor Now
        </button>
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition">
          <FaFilePdf /> Save Report as PDF
        </button>
        <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow transition">
          <FaRedo /> Restart
        </button>
      </div>
    </div>
  );
}
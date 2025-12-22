
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const VoiceRecorderIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-10 absolute top-[50%] left-[50%]">
      {/* Glowing Mic Icon */}
      <motion.div
        className="relative flex items-center justify-center w-24 h-24 rounded-full bg-green-500 shadow-lg"
        animate={{
          boxShadow: [
            "0 0 10px rgba(239,68,68,0.6)",
            "0 0 25px rgba(239,68,68,0.8)",
            "0 0 40px rgba(239,68,68,0.6)",
          ],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Mic size={40} color="white" />
      </motion.div>

      {/* Animated Equalizer Bars */}
      <div className="flex space-x-1 mt-3">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 bg-green-400 rounded"
            animate={{
              height: ["0.5rem", "2rem", "1rem"],
            }}
            transition={{
              duration: 0.6 + i * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Recording Text */}
      <motion.p
        className="text-green-700 font-semibold tracking-wide uppercase"
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Recording...
      </motion.p>
    </div>
  );
};

export default VoiceRecorderIndicator;

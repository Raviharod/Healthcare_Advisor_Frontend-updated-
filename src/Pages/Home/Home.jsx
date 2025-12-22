import ChatBotIcon from "./BotIcon";
import CatogoriesContainer from "./healthCatogories/CatogoriesContainer";
import ProfessionalsContainer from "./professionals/ProfessionalsContainer";
import { CiMedicalCross } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-auto flex flex-col justify-center items-center px-10 mt-10 gap-10 relative">
        <div className="w-full h-auto flex justify-center">
          <img className="h-auto w-[100%] relative top-[-70px]" src="/images/doctorHomeImage.png" alt="" />
        </div>

        <div className="w-[45%] absolute top-3 right-25">
          <h1 className="text-xl md:text-5xl font-bold text-white">
            Your AI-powered Health Companion for Rural India
          </h1>
          <p className="text-lg font-bold text-[#2b7fff] mt-4">
            Accessible, Affordable, and Reliable Healthcare at Your Fingertips.
          </p>
          <div className="flex justify-start items-center gap-4 mt-6 text-white">
            <motion.button whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }} className="p-3 bg-[#2b7fff] rounded-2xl font-medium hover:cursor-pointer" onClick={()=>navigate("/symptomBot")}>Check Symptoms</motion.button>
            <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
             className="p-3 bg-[#2b7fff] rounded-2xl font-medium hover:cursor-pointer" onClick={()=>navigate("/consultation")}>Consult Doctors</motion.button>
          </div>
        </div>
        <div className="flex gap-5 absolute bottom-29 right-100 text-white">
          <div className="h-auto w-34 flex flex-col justify-center items-center">
            <span className="bg-white text-xl text-black p-4 rounded-full mb-2.5"><CiMedicalCross /></span>
            <h3 className="font-bold">24*7 Emergency Services</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="h-auto w-34 flex flex-col justify-center items-center">
            <span className="bg-white text-black text-xl p-4 rounded-full mb-2.5"><FaUserDoctor /></span>
            <h3 className="font-bold">Skilled Medical professionals</h3>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>

      </div>

      {/* bot */}
      <ChatBotIcon />
      <CatogoriesContainer></CatogoriesContainer>
      <ProfessionalsContainer></ProfessionalsContainer>
    </>
  );
}

export default Home;

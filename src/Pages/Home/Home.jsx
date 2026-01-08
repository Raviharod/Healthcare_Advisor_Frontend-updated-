import ChatBotIcon from "./BotIcon";
import CatogoriesContainer from "./healthCatogories/CatogoriesContainer";
import ProfessionalsContainer from "./professionals/ProfessionalsContainer";
import { FaPlay } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-h-[600px] bg-gradient-to-br relative overflow-hidden px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Section - Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F828C] leading-tight">
                Premium Treatments for a Healthy Lifestyle
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Seamlessly advance scalable healthcare architectures with future-ready growth strategies. 
                Efficiently implement low-risk, high-return process enhancements tailored for mission-critical 
                healthcare procedures, especially in rural and underserved communities.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/consultation")}
                className="flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-[#065084] text-white rounded-xl font-medium hover:shadow-lg transition-shadow text-sm sm:text-base"
              >
                Try Free Consultation
                <span className="bg-white/20 rounded-full p-2">
                  <FaPlay className="text-xs" />
                </span>
              </motion.button>
            </div>

            {/* Right Section - Doctor Image with Overlays */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                {/* Doctor Image */}
                <div className="relative">
                  <img 
                    className="w-[80%] h-auto max-w-md mx-auto lg:max-w-full rounded-2xl" 
                    src="/images/doctorHomeImage.png" 
                    alt="Doctor" 
                  />
                </div>

                {/* Search Bar Overlay */}
                <div className="absolute bottom-8 left-0 right-0 lg:left-[-20%] lg:right-auto  bg-white rounded-xl shadow-xl p-4 max-w-[280px] mx-auto lg:mx-0">
                  <div className="flex items-center gap-3">
                    <BsSearch className="text-gray-600 text-xl" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Search the Medical</p>
                      <p className="text-xs text-gray-500">With Health Care Option</p>
                    </div>
                  </div>
                </div>

                {/* Doctors Online Indicator */}
                <div className="absolute top-4 right-4 lg:top-8 lg:right-8 bg-green-50 border-2 border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-semibold text-green-700">2500+ Doctors Online</span>
                </div>

                {/* Decorative Background Shapes */}
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-[-30px] left-[-30px] w-48 h-48 bg-blue-300/20 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-3 sm:mt-4 lg:mt-5 pt-8 border-t border-gray-300/50 rounded-2xl bg-[#a8c8d5] p-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">4500+</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Happy Patients</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">200</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Hospital Room</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">500+</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Award Win</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">20+</h3>
                <p className="text-sm sm:text-base text-gray-600 font-medium">Ambulance</p>
              </div>
            </div>
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

import { FaLaptopMedical } from "react-icons/fa";
import { motion } from "motion/react";

function ProfessionalsBox({ professional }) {
    // console.log("here are the ",professional)
    return (
        <>
            <div
                className="h-auto w-100 bg-gradient-to-b from-[white] to-[#f0f6ff] rounded-2xl p-2">
                <motion.div whileHover={{ scale: 1.1 }} className="w-60 md:w-80 h-90 mb-3">
                    <img className="w-full h-full object-cover rounded-2xl" src={professional.image} alt="" />
                </motion.div>
                <h2 className="text-sm md:text-xl font-bold text-blue-400">{professional.name}</h2>
                <h3 className="text-sm italic font-bold">{professional.
                    experience} of Experience</h3>
                <p>{professional.details}</p>
            </div>
        </>
    )
}

export default ProfessionalsBox;
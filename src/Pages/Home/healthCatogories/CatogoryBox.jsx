import { FaLaptopMedical } from "react-icons/fa";
import { motion } from "motion/react"

function HealthBox({catogory, icon, details}){
    return (
        <>
        <motion.div 
        whileHover={{scale:1.1}}
        className="h-auto w-50 bg-gradient-to-b from-[white] to-[#e9f1ff] rounded-2xl">
            <div className="w-50 h-auto flex gap-3 p-2 items-center">
                <span className="bg-blue-400 p-2 rounded-full text-xl"><FaLaptopMedical /></span>
                <h2 className="text-xl font-bold">{catogory}</h2>
            </div>
            <div className="flex p-2 text-5xl">
            <i class={icon}></i>
            </div>
            <div className="flex p-2 flex-col justify-start">
                <p className="text-sm">{details}</p>
                <button className="p-0.5 text-[#2b7fff]">explore now</button>
            </div>
        </motion.div>
        </>
    )
}

export default HealthBox;


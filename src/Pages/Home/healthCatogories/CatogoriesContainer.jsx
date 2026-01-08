import axios from "axios";

import HealthHead from "./HealthHead";
import HealthBox from "./CatogoryBox";
import { useEffect, useState } from "react";
import {motion} from "framer-motion";

const VITE_CATOGORIES_CONT_HEALT_SOLUTIONS = import.meta.env.VITE_CATOGORIES_CONT_HEALT_SOLUTIONS;


function CatogoriesContainer(){

    const [healthCatogories, setHealthCatogories] = useState([]);
    
    useEffect(()=>{
       const response = axios.get(VITE_CATOGORIES_CONT_HEALT_SOLUTIONS)
       .then((res)=>{
        console.log(res.data.solutions)
        setHealthCatogories(res.data.solutions);
       })
       .catch((err)=>{
        console.log(err);
       })
    }, [])

    const duplicateCatogories = [...healthCatogories, ...healthCatogories]

    return (
        <>
        <div className="w-full overflow-hidden h-auto flex flex-col gap-2.5 ps-9 pr-9 pb-6  items-center justify-center mb-5">
          <HealthHead></HealthHead>
          <motion.div
          animate={{
            x: ['0%', '-50%']
          }}
          transition={{
            ease:"linear",
            duration: 20,
            repeat: Infinity,
          }}
           className="w-full h-auto flex justify-center items-center gap-4">
            {
              duplicateCatogories.map((sol, index)=>{
                return  <HealthBox key={index} catogory={sol.catogory} icon={sol.iconClass} details={sol.detail}></HealthBox>
              })
            }
          </motion.div>
        </div>
        </>
    )
}

export default CatogoriesContainer;
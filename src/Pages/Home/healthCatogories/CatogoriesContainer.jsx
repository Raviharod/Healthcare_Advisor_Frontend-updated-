import axios from "axios";

import HealthHead from "./HealthHead";
import HealthBox from "./CatogoryBox";
import { useEffect, useState } from "react";

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

    return (
        <>
        <div className="w-full h-auto flex flex-col gap-2.5 ps-9 pr-9 pb-6">
          <HealthHead></HealthHead>
          <div className="w-full h-auto flex justify-center items-center gap-4 flex-wrap">
            {
              healthCatogories.map(sol=>{
                return  <HealthBox key={sol.catogory} catogory={sol.catogory} icon={sol.iconClass} details={sol.detail}></HealthBox>
              })
            }
          </div>
        </div>
        </>
    )
}

export default CatogoriesContainer;
import { useEffect, useState } from "react";
import ProfessionalsHead from "./ProfessionalsHead";
import axios from "axios";
import ProfessionalsBox from "./ProfessionalsBox";
import { motion } from "framer-motion";


const VITE_FETCH_PROFESSIONALS_DATA = import.meta.env.VITE_FETCH_PROFESSIONALS_DATA;

function ProfessionalsContainer() {
    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);

    const duplicateProfessionals = [...professionals, ...professionals];
    useEffect(() => {
        setLoading(true);
        // console.log("Fetching professionals data...");
        axios.get(VITE_FETCH_PROFESSIONALS_DATA)
            .then((result) => {
                // console.log("Professionals from API:", result.data.professionals);

                if (result.data && result.data.professionals) {
                    setProfessionals(result.data.professionals);
                    // console.log("Professionals:", professionals);
                } else {
                    console.error("Unexpected response structure:", result.data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching professionals:", err);
                if (err.response) {
                    console.error("Response error:", err.response.data);
                    console.error("Response status:", err.response.status);
                } else if (err.request) {
                    console.error("Request made but no response received:", err.request);
                }
                setLoading(false);
            })
    }, [])


    return (
        <>
            <div className="w-full overflow-hidden h-auto flex flex-col justify-center items-center mt-3 p-2 mb-5">
                <ProfessionalsHead></ProfessionalsHead>
                <motion.div
                    animate={{
                        x: ['0%', '-100%']
                    }}
                    transition={{
                        ease: "linear",
                        duration: 15, // Adjust speed here (higher = slower)
                        repeat: Infinity,
                    }}
                    className="w-full h-auto flex items-center justify-center gap-4">
                    {loading && <p>Loading professionals...</p>}
                    {!loading && professionals.length === 0 && <p>No professionals found</p>}
                    {!loading && professionals.length !== 0 && duplicateProfessionals.map((professional, index) => {
                        return <ProfessionalsBox key={index}  professional={professional}></ProfessionalsBox>
                    })}
                </motion.div>
            </div>
        </>
    )
}

export default ProfessionalsContainer;
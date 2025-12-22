import { useEffect, useState } from "react";
import ProfessionalsHead from "./professionalsHead";
import axios from "axios";
import ProfessionalsBox from "./ProfessionalsBox";


const VITE_FETCH_PROFESSIONALS_DATA = import.meta.env.VITE_FETCH_PROFESSIONALS_DATA;

function ProfessionalsContainer() {
    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        console.log("Fetching professionals data...");
        axios.get(VITE_FETCH_PROFESSIONALS_DATA)
            .then((result) => {
                console.log("Professionals from API:", result.data.professionals);

                if (result.data && result.data.professionals) {
                    setProfessionals(result.data.professionals);
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
            <div className="w-full h-auto flex flex-col justify-center items-center mt-3 p-2 mb-5">
            <ProfessionalsHead></ProfessionalsHead>
            <div className="w-full h-auto flex flex-wrap items-center justify-center gap-4">
                {loading && <p>Loading professionals...</p>}
                {!loading && professionals.length === 0 && <p>No professionals found</p>}
                {!loading && professionals.length !== 0 && professionals.map(professional=>{
                    return <ProfessionalsBox key={professional.name} professional={professional}></ProfessionalsBox>
                })}
            </div>
            </div>
        </>
    )
}

export default ProfessionalsContainer;
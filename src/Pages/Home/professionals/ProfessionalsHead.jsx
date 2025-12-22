import ProfessionalsBox from "./ProfessionalsBox";

function ProfessionalsHead(){
    return (
        <>
        <div className="h-auto flex flex-col justify-center w-full items-center">
            <div className=" flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold">We Are Best Professionals</h1>
                <h1 className="text-3xl font-bold">In <span className="text-[#2b7fff]">Medical Sector</span>
                </h1>
            </div>
            <div className="w-full h-auto flex justify-center">
                <img className="w-[70%] rounded-2xl" src="images/professionals.png" alt="" />
            </div>
            <div className="w-[90%] flex flex-col mt-5">
                <div className=" flex flex-col justify-start">
                <h1 className="text-3xl font-bold">Our Best Doctors</h1>
                <h1 className="text-3xl font-bold">In <span className="text-[#2b7fff]">Industry</span>
                </h1>
                </div>
                <div className="w-full h-auto flex mt-3 justify-center gap-5">
                   
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfessionalsHead;
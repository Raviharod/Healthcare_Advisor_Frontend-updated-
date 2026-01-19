function HealthHead(){
    return (
        <>
        <div className="w-full h-auto flex justify-between items-center gap-2">
            <div className="p-2">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">Extra Ordinary</h1>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#005461]">Health Solution</h1>
            </div>
            {/* <div className="w-[30%] h-auto p-2 bg-blue-100 rounded-2xl">
                <p className="text-lg font-bold">
                Our platform provides a wide range of medical specialists—from general physicians to cardiologists, dermatologists, pediatricians, and more.
                </p>
            </div> */}
            <div>
                <button className="p-2 rounded bg-[#005461] text-white">Consult Doctor Now</button>
            </div>
        </div>
        </>
    )
}

export default HealthHead;
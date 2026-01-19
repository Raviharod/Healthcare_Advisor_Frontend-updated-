import { Link } from "react-router-dom"
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { TbLogin } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { motion } from "motion/react"

import { useState } from "react";


function HeaderBox({ isLogin, handleLogout, user }) {

    const [tab, setTab] = useState("home");
    const [menu, setMenu] = useState(false);

    return (
        <>
            <div className="w-full h-auto p-4 bg-white flex justify-between pl-6 pr-6 items-center z-10 shadow">
                <div className="flex items-center">
                    <div className="text-4xl text-black">
                        <MdOutlineHealthAndSafety />
                    </div>
                    <div className="text-md font-bold md:text-3xl text-green-800">
                        Healthcare Advisory
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="mr-4">
                        <ul className="md:flex items-center gap-6 hidden text-black">
                            <Link className={tab == "home" ? "pl-4 pr-4 p-2 bg-[#3674B5] rounded-4xl shadow-2xl" : ""} to="/" onClick={() => setTab("home")}>Home</Link>
                            {isLogin && <Link className={tab == "consult" ? "pl-4 pr-4 p-2 bg-[#3674B5] rounded-4xl  shadow-2xl" : ""} onClick={() => setTab("consult")} to="/consultation">Consult Doctor</Link>}
                            <Link to="/products" className={tab == "products" ? "pl-4 pr-4 p-2 bg-[#3674B5] rounded-4xl shadow-2xl" : ""} onClick={() => setTab("products")}>Products</Link>
                            <Link className={tab == "contact" ? "pl-4 pr-4 p-2 bg-[#3674B5] rounded-4xl  shadow-2xl" : ""} onClick={() => setTab("contact")}>Contact</Link>
                        </ul>

                        <div className="md:hidden text-3xl" onClick={() => setMenu(curr => {
                            if (curr) return setMenu(false);
                            return setMenu(true);
                        })}>&#8801;</div>
                    </div>
                    {isLogin ? (
                        <div className="flex items-center">
                            <button className="hidden lg:flex p-2 bg-[#065084] rounded hover:cursor-pointer mr-1 text-green-100 font-bold" onClick={handleLogout}>
                                Logout
                            </button>
                            {/* <button className="lg:hidden p-2 bg-[#065084] rounded hover:cursor-pointer mr-1 text-green-100 font-bold" onClick={handleLogout}>
                                <IoMdLogOut />
                            </button> */}
                            <button className="lg:hidden p-2 pl-3 pr-3 text-sm font-bold bg-[#065084] rounded-full hover:cursor-pointer text-white">
                                {user?.name[0]}
                            </button>
                            <button className="hidden lg:flex p-2 bg-[#065084] rounded hover:cursor-pointer text-white">
                                Hi {user?.name}
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Link
                                to="/login"
                                className="hidden lg:flex p-2 bg-[#032968] rounded hover:cursor-pointer text-white"
                            >
                                Login/Signup
                            </Link>
                            {/* <Link
                                to="/login"
                                className="p-2 lg:hidden bg-[#032968] rounded hover:cursor-pointer text-white"
                            >
                                <TbLogin />
                            </Link> */}
                        </div>
                    )}
                </div>

            </div>
            {menu && <motion.div
               animate={{x:[100,-1] }}
               transition={{duration:0.8,  type: "spring", bounce: 0.3}}
             className="h-[100vh] w-30 absolute top-1 right-0 bg-[#065084] z-30 rounded p-2">
                <div className="flex justify-between text-white">
                    <h3 className="font-bold">menu</h3>
                    <button onClick={()=>setMenu(false)}><ImCross />
                    </button>
                </div>
                <ul className="text-white mt-3.5 flex flex-col gap-2">
                    <Link to="/" className="p-2 bg-[#4a7695] rounded-xl">Home</Link>
                    {isLogin && <Link to="/consultation" className="p-2 bg-[#4a7695] rounded-xl">Consult Doctor</Link>}
                    <Link className="p-2 bg-[#4a7695] rounded-xl">About us</Link>
                    <Link className="p-2 bg-[#4a7695] rounded-xl">Contact</Link>
                    <Link className="p-2 bg-[#4a7695] rounded-xl">Language</Link>
                    {isLogin ? <button onClick={handleLogout} className="p-2 bg-[#4a7695] rounded-xl">Logout</button> :<Link to="/login" className="p-2 bg-[#4a7695] rounded-xl">Login</Link>}
                </ul>
            </motion.div>}
            
        </>
    )
}


export default HeaderBox;
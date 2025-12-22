import { Link } from "react-router-dom"
import { MdOutlineHealthAndSafety } from "react-icons/md";


function HeaderBox({isLogin, handleLogout, user}) {

    return (
        <>
            <div className="w-[80%] h-auto p-4 bg-blue-500 rounded-2xl flex justify-between pl-6 pr-6 items-center z-10">
                <div>
                    {/* nav options */}
                    <ul className="md:flex justify-between items-center gap-6 hidden text-white">
                        <Link to="/">Home</Link>
                        {isLogin && <Link to="/consultation">Consult Doctor</Link>}
                        <li>About us</li>
                        <li>Contact</li>
                        <li>Language</li>
                    </ul>
                    <div className="md:hidden text-3xl">&#8801;</div>
                </div>
                <div>
                    {isLogin ? (
                        <div>
                            <button className="p-2 bg-[#032968] rounded hover:cursor-pointer mr-1 text-red-700 font-bold" onClick={handleLogout}>
                                Logout
                            </button>
                            <button className="p-2 bg-[#032968] rounded hover:cursor-pointer text-white">
                                Hi {user.name}
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="p-2 bg-[#032968] rounded hover:cursor-pointer text-white"
                        >
                            Login/Signup
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}


export default HeaderBox;
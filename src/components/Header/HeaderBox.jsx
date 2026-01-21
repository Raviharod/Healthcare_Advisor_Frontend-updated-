

import { Link } from "react-router-dom";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion"; // Updated import
import { useState } from "react";

// 1. Extracted Nav Links for cleaner code and easier updates
const NAV_LINKS = [
  { name: "Home", path: "/", id: "home" },
  { name: "Products", path: "/products", id: "products" },
  { name: "Contact", path: "/", id: "contact" },
];

function HeaderBox({ isLogin, handleLogout, user }) {
  const [tab, setTab] = useState("home");
  const [menu, setMenu] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const toggleMenu = () => setMenu((prev) => !prev);

  // Active Link Styling
  const activeClass = "px-4 py-2 bg-[#3674B5] text-white rounded-full shadow-lg transition-all";
  const idleClass = "px-4 py-2 hover:text-[#3674B5] transition-colors";

  return (
    <nav className="relative w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setTab("home")}>
            <MdOutlineHealthAndSafety className="text-4xl text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-xl md:text-2xl font-bold text-green-800 tracking-tight">
              Healthcare <span className="text-blue-600">Advisory</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex items-center gap-2 font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className={tab === link.id ? activeClass : idleClass}
                    onClick={() => setTab(link.id)}
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
              {isLogin && (
                <Link
                  to="/consultation"
                  className={tab === "consult" ? activeClass : idleClass}
                  onClick={() => setTab("consult")}
                >
                  Consult Doctor
                </Link>
              )}
            </ul>

            {/* USER ACTIONS (Desktop) */}
            <div className="ml-4 flex items-center gap-3">
              {isLogin ? (
                <>
                  <button 
                    onClick={handleLogout}
                    className="hidden lg:block text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                  <motion.div
                    onHoverStart={() => setIsHover(true)}
                    onHoverEnd={() => setIsHover(false)}
                    layout
                    className="flex items-center bg-[#065084] rounded-full text-white h-10 cursor-pointer overflow-hidden shadow-md"
                  >
                    <div className="w-10 h-10 flex items-center justify-center font-bold bg-blue-700 flex-shrink-0">
                      {user?.name?.slice(0,2) == "Dr" ? user?.name?.[4].toUpperCase():user?.name[0]}
                    </div>
                    <AnimatePresence>
                      {isHover && (
                        <motion.span
                        //   initial={{ opacity: 0, width: 0 }}
                        //   animate={{ opacity: 1, width: "auto" }}
                          exit={{ width: 0 }}
                          className="px-3 whitespace-nowrap font-medium text-sm"
                        >
                          {user?.name?.slice(4)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </>
              ) : (
                <Link to="/login" className="px-6 py-2 bg-[#032968] text-white rounded-lg hover:bg-blue-800 transition-all">
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="md:hidden text-3xl text-gray-700 focus:outline-none" 
            onClick={toggleMenu}
          >
            &#8801;
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {menu && (
          <>
            {/* Backdrop for closing menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 bg-[#065084] z-50 shadow-2xl p-6"
            >
              <div className="flex justify-between items-center text-white mb-8">
                <h3 className="text-xl font-bold uppercase tracking-widest">Menu</h3>
                <button onClick={toggleMenu} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ImCross size={18} />
                </button>
              </div>

              <ul className="flex flex-col gap-4 text-white">
                {NAV_LINKS.map(link => (
                  <Link key={link.id} to={link.path} onClick={toggleMenu} className="p-3 hover:bg-white/10 rounded-lg transition-colors border-b border-white/10">
                    {link.name}
                  </Link>
                ))}
                {isLogin && (
                  <Link to="/consultation" onClick={toggleMenu} className="p-3 hover:bg-white/10 rounded-lg transition-colors border-b border-white/10">
                    Consult Doctor
                  </Link>
                )}
                {isLogin ? (
                  <button onClick={() => { handleLogout(); toggleMenu(); }} className="p-3 mt-4 bg-red-500/80 rounded-lg font-bold">
                    Logout
                  </button>
                ) : (
                  <Link to="/login" onClick={toggleMenu} className="p-3 mt-4 bg-green-600 rounded-lg text-center font-bold">
                    Login
                  </Link>
                )}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default HeaderBox;
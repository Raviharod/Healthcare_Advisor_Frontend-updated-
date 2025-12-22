import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import BotIcon from "../../Pages/Home/BotIcon"

function Footer() {
  return (
    <footer className="w-full bg-[#022967] border-t mt-auto ">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Logo & Description */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl text-white">
              <MdOutlineHealthAndSafety />
            </span>
            <span className="text-xl md:text-2xl font-bold text-white">
              Rural Healthcare AI
            </span>
          </div>
          <span className="white text-sm text-white">
            Your trusted health companion.
          </span>
        </div>
        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="text-white hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/features" className="text-white hover:underline">
                Features
              </a>
            </li>
            <li>
              <a href="/privacy" className="text-white hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-white hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
        {/* Contact */}
        <div className="flex-1 text-white">
          <h3 className="font-semibold mb-2">Contact</h3>
          <ul className="space-y-1">
            <li className="">support@rhai.com</li>
            <li className="">Helpline: +91-123-456-7890</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-green-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <span className="text-white text-sm mb-2 md:mb-0">
            © 2024 Rural Healthcare AI Advisor. All rights reserved.
          </span>
          <div className="flex gap-4 text-white">
            <a href="#" className=" text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className=" text-xl">
              <FaTwitter />
            </a>
            <a href="#" className=" text-xl">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <BotIcon></BotIcon>
    </footer>
  );
}

export default Footer;

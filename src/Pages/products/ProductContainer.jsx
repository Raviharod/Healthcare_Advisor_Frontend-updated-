import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { notificationActions } from "../../slices/notificationSlice";
import {
  FaPrescriptionBottleAlt,
  FaCapsules,
  FaLeaf,
  FaHeartbeat,
  FaUserMd,
} from "react-icons/fa";
import { IoIosCart } from "react-icons/io";

import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const sidebarItems = [
  { name: "Prescription", icon: <FaPrescriptionBottleAlt /> },
  { name: "OTC Medicines", icon: <FaCapsules /> },
  { name: "Supplements", icon: <FaLeaf /> },
  { name: "Wellness", icon: <FaHeartbeat /> },
  { name: "Personal Care", icon: <FaUserMd /> },
];

const VITE_GET_PRODUCTS = import.meta.env.VITE_GET_PRODUCTS;

const ProductContainer = () => {

  const [products, setProducts] = useState([]);
  const cartQuantity = useSelector((state)=>state.userAction.cartQuantity)
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios(VITE_GET_PRODUCTS);
        setProducts(response.data.products);
        // console.log(response.data.products);
        // dispatch(notificationActions.setNotificationMsg(response.data.message));
      } catch (err) {
        dispatch(notificationActions.setNotificationMsg("error getting products"))
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex w-64 bg-white shadow-sm p-6 flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-blue-600">Catalog</h2>

        {sidebarItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center gap-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition"
          >
            {item.icon}
            {item.name}
          </button>
        ))}

        <div className="mt-6 border-t pt-4 text-sm text-gray-500">
          Support
          <p className="mt-2 text-blue-600 cursor-pointer">
            Live Pharmacist
          </p>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Prescription Medications
          </h1>

          <div className="flex gap-2 mt-3 md:mt-0">
            <Link to="/addProduct" className="p-2 border border-black rounded-lg text-sm">Add Item</Link>
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>Brand: All</option>
            </select>
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>Price: $0 - $100</option>
            </select>
            <Link to="/myCart" className="text-3xl relative">
            <span className="absolute bottom-6 left-6 text-sm font-bold text-red-400">{cartQuantity}</span>
            <IoIosCart /> 
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default ProductContainer;

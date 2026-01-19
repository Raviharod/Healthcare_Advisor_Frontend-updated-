import { motion } from "framer-motion";
import { notificationActions } from "../../slices/notificationSlice";
import { userActionSliceActions } from "../../slices/userActionsSlice";
import { useDispatch } from "react-redux";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const VITE_ADD_TO_CART = import.meta.env.VITE_ADD_TO_CART;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
   async function handleAddToCart(productId){
    const productData = {productId};
    let response;
    try{
      response = await axios.post(VITE_ADD_TO_CART, productData, {
        withCredentials:true,
      });
      // console.log("response", response)
      dispatch(userActionSliceActions.setCartQuantity(response.data.cartProductQuanity));
      dispatch(notificationActions.setNotificationMsg("Product added to Cart"));
    }catch(err){
      // console.log("error adding product", err.response.data.message)
      if(err.response.status==401){
        return dispatch(notificationActions.setNotificationMsg("user is not authorized! please login to continue"));
      }
      dispatch(notificationActions.setNotificationMsg("Error adding product to cart!🥲"));
    }
   }
  
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg p-4 relative"
    >
      {/* Recommended Badge */}
      {product.recommended && (
        <span className="absolute top-3 left-3 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
          AI RECOMMENDED
        </span>
      )}

      {/* Wishlist */}
      <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
        <FaHeart />
      </button>

      {/* Image */}
      <div className="h-40 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Category */}
      <p className="text-xs text-blue-600 font-semibold mt-3">
        {product.category}
      </p>

      {/* Title */}
      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
        {product.name}
      </h3>
      <p className="text-sm">{product.description}</p>

      {/* Rating */}
      <div className="flex items-center gap-1 text-sm mt-1">
        <FaStar className="text-yellow-400" />
        <span className="font-medium">{product.rating}</span>
        <span className="text-gray-400 text-xs">
          ({0 || product.reviews} reviews)
        </span>
      </div>

      {/* Price + Add */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-blue-600 font-bold text-lg">
          ${product.price}
        </p>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 hover:cursor-pointer"
          onClick={()=>handleAddToCart(product._id)}
        >
          <FaShoppingCart />
          Add
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

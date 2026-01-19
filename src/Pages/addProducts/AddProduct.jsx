import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios"
import { useDispatch } from "react-redux";
import { notificationActions } from "../../slices/notificationSlice";
import { FiUploadCloud, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const VITE_ADD_PRODUCT = import.meta.env.VITE_ADD_PRODUCT;

const AddProduct = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [catogory, setCatogory] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleList = async ()=>{
     const formData = new FormData()
     formData.append("name", name);
     formData.append("description", description);
     formData.append("catogory", catogory);
     formData.append("price", price);
     formData.append("file", file)

     try{
      const res = await axios.post(VITE_ADD_PRODUCT, formData, {
        headers:{"Content-Type": "multipart/form-data",}
      })
       dispatch(notificationActions.setNotificationMsg(res.data.message));
       navigate("/products")
     }catch(err){
      dispatch(notificationActions.setNotificationMsg("error adding product"));
     }
  }

    
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4fffc] to-[#f8fafc] p-4 md:p-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Add New Product
          </h1>
          <p className="text-sm text-gray-500">
            List your healthcare items
          </p>
        </div>

        <Link to="/products" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <FiArrowLeft />
          Back to Inventory
        </Link>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8"
      >
        {/* Media Upload */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 mb-2">
            MEDIA
          </p>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="border-2 border-dashed border-teal-200 rounded-xl p-8 text-center cursor-pointer"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <FiUploadCloud size={22} />
              </div>

              <h3 className="font-semibold text-gray-700">
                Upload Product Image
              </h3>

              <p className="text-sm text-gray-500">
                Drag and drop or click to browse JPG, PNG up to 10MB
              </p>

              <input type="file" onChange={(e)=>setFile(e.target.files[0])} className="mt-2 bg-teal-400 hover:bg-teal-500 text-white px-5 py-2 rounded-full text-sm" placeholder="Select File"/>
            </div>
          </motion.div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Product Name */}
          <div>
            <label className="text-xs font-semibold text-gray-500">
              PRODUCT NAME
            </label>
            <input
              type="text"
              onChange={(e)=>setName(e.target.value)}
              placeholder="e.g. Digital Pulse Oximeter"
              className="mt-1 w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-xs font-semibold text-gray-500">
              PRICE ($)
            </label>
            <input
              type="number"
              placeholder="$ 0.00"
              onChange={(e)=>setPrice(e.target.value)}
              className="mt-1 w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>
        </div>

        {/* Category */}
        <div className="mt-5">
          <label className="text-xs font-semibold text-gray-500">
            CATEGORY
          </label>
          <select className="mt-1 w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-teal-300"
          onChange={(e)=>setCatogory(e.target.value)}>
            <option>Select a category</option>
            <option>Diagnostic & Monitoring Devices</option>
            <option>Wellness</option>
            <option>Personal Care</option>
            <option>Supplements</option>
            <option>Baby & Mother Care</option>
            <option>Prescription Medicines</option>
          </select>
        </div>

        {/* Description */}
        <div className="mt-5">
          <label className="text-xs font-semibold text-gray-500">
            PRODUCT DESCRIPTION
          </label>
          <textarea
            rows="4"
            placeholder="Describe the product benefits, medical specifications, and usage instructions..."
            onChange={(e)=>setDescription(e.target.value)}
            className="mt-1 w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-300 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <motion.button
          onClick={handleList}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-teal-400 to-emerald-400 text-white py-3 rounded-full font-semibold shadow-md"
          >
            List Product
          </motion.button>

          <button className="text-sm text-gray-500 hover:text-gray-700">
            Save as Draft
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddProduct;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


const VITE_USER_SIGNUP = import.meta.env.VITE_USER_SIGNUP;
// Define the component as the default export
export default function App() {
  return <Signup />;
}

// Custom Message/Toast component replacement for alert()
const MessageBanner = ({ message, type }) => {
  if (!message) return null;
  const baseClasses = "p-3 rounded-xl font-medium shadow-lg transition-all duration-300 mb-4";
  const typeClasses = type === 'success' 
    ? "bg-green-100 text-green-700 border-l-4 border-green-500" 
    : "bg-red-100 text-red-700 border-l-4 border-red-500";

  return (
    <div className={`${baseClasses} ${typeClasses}`} role="alert">
      {message}
    </div>
  );
};


function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("patient");
  const [submissionMessage, setSubmissionMessage] = useState({ message: '', type: '' });
  const [isRegistered, setIsRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setSubmissionMessage({ message: '', type: '' });

    // 1. Construct FormData
    const formData = new FormData();
    const file = data.photo[0];

    // Append all form fields
    formData.append('userType', userType);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);

    if (userType === 'doctor') {
      formData.append('contact', data.contact);
      formData.append("consultationFees", data.consultationFees);
      formData.append('specialization', data.specialization);
      formData.append('experience', data.experience);
      formData.append('location', data.location);
    }
    
    // Append the file
    if (file) {
      // 'photo' is the expected field name on the backend (e.g., for Multer)
      formData.append('photo', file); 
    }


    // 2. Make the fetch request (Corrected)
    try {
      // NOTE: Replace with your actual backend URL
      const res = await fetch(VITE_USER_SIGNUP, {
        method: "POST",
        // CRITICAL FIX: DO NOT set Content-Type header. 
        // The browser handles it automatically for FormData.
        body: formData, // Pass the FormData object directly as the body
      });
      
      const result = await res.json();

      if (res.ok) { // Status 200-299
        setSubmissionMessage({ message: "Signup successful! Please login.", type: 'success' });
        // Instead of window.location.href, we update state to show a "Login" screen
        setIsRegistered(true); 
        reset(); // Clear the form
      } else { // Handle 4xx or 5xx errors
        setSubmissionMessage({ message: result.message || "Signup failed due to server error.", type: 'error' });
      }

    } catch (err) {
      console.error("Network or Fetch Error:", err);
      setSubmissionMessage({ message: "Network error. Please try again later.", type: 'error' });
    }
  };

   const handleGoLogin = ()=>{
    navigate("/login");
   }

  const password = watch("password");

  if (isRegistered) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600">
            <div className="bg-white p-10 flex flex-col items-center justify-center rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Registration Complete!</h1>
                <p className="text-gray-700 mb-6">You have successfully signed up. You can now proceed to login.</p>
                <button
                    onClick={handleGoLogin}
                    className="p-3 bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold rounded-lg shadow hover:scale-105 transition-transform w-full hover:cursor-pointer"
                >
                    Go to Login
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10">
      <h1 className="mb-8 text-4xl font-bold text-blue-500 drop-shadow">
        Register Your Account
      </h1>
      <form
        className="bg-white p-8 flex flex-col gap-6 rounded-2xl shadow-xl w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className="text-2xl font-bold mb-2 text-blue-600 text-center">
          Signup
        </h2>
        
        {/* Custom Message Banner */}
        <MessageBanner message={submissionMessage.message} type={submissionMessage.type} />

        {/* User Type */}
        <div className="flex flex-col gap-2">
          <select
            className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 border-gray-300`}
            onChange={(e) => setUserType(e.target.value)}
            value={userType}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>

        {/* Username */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Min 3 characters" },
            })}
            placeholder="Username"
            className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
              errors.username ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* DOCTOR FIELDS (CONDITIONAL) */}
        {userType === "doctor" && (
          <div className="flex flex-col gap-5 border p-4 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700">Doctor Details</h3>
            
            {/* Contact */}
            <div className="flex flex-col gap-2">
              <input
                type="tel" // Use tel type for contact numbers
                {...register("contact", {
                  required: "Contact is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Contact must be 10 digits",
                  },
                })}
                placeholder="Contact Number (e.g. 1234567890)"
                className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
                  errors.contact ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.contact && (
                <span className="text-red-500 text-sm">
                  {errors.contact.message}
                </span>
              )}
            </div>

            {/* Consultation fees */}
            <div className="flex flex-col gap-2">
              <input
                type="number" 
                {...register("consultationFees")}
                placeholder="consultationFees (e.g $100)"
                className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
                  errors.consultationFees ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.consultationFees && (
                <span className="text-red-500 text-sm">
                  {errors.consultationFees.message}
                </span>
              )}
            </div>

            {/* Specialization */}
            <div className="flex flex-col gap-2">
              <select
                type="text"
                {...register("specialization", {
                  required: "Specialization is required",
                })}
                placeholder="Specialization (e.g., Cardiology)"
                className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
                  errors.specialization ? "border-red-400" : "border-gray-300"
                }`}
              >
                <option value="General Physician">General Physician</option>
                <option value="Child Specialist">Child Specialist</option>
                <option value="Heart Specialist">Heart Specialist</option>
                <option value="Skin Specialist">Skin Specialist</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Women's Health">Women's Health</option>
              </select>
              {errors.specialization && (
                <span className="text-red-500 text-sm">
                  {errors.specialization.message}
                </span>
              )}
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-2">
              <input
                type="number"
                {...register("experience", {
                  required: "Experience is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Must be 0 or more" },
                })}
                placeholder="Experience in years"
                className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
                  errors.experience ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.experience && (
                <span className="text-red-500 text-sm">
                  {errors.experience.message}
                </span>
              )}
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <input
                type="text"
                {...register("location", {
                  required: "Location is required",
                  minLength: { value: 3, message: "Min 3 characters" },
                })}
                placeholder="Location (City, Country)"
                className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
                  errors.location ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.location && (
                <span className="text-red-500 text-sm">
                  {errors.location.message}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Photo Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Profile Photo (ID proof/Certificate)</label>
          <input
            type="file"
            {...register("photo", {
              required: "Photo is required",
            })}
            className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
              errors.photo ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.photo && (
            <span className="text-red-500 text-sm">
              {errors.photo.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
            placeholder="Password"
            className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
              errors.password ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>
        
        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm Password"
            className={`border-2 w-full rounded-lg p-3 focus:outline-none focus:border-green-400 ${
              errors.confirmPassword ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          className="p-3 bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold rounded-lg shadow hover:scale-105 transition-transform"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}

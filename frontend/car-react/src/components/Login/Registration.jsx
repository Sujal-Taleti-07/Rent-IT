// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from 'react-hot-toast';
// import axios from "axios";

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     mobile: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const navigate = useNavigate();

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (!formData.username) {
//       newErrors.username = "Name is required.";
//       isValid = false;
//     }

//     if (!formData.email) {
//       newErrors.email = "Email is required.";
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address.";
//       isValid = false;
//     }

//     if (!formData.mobile) {
//       newErrors.mobile = "Mobile number is required.";
//       isValid = false;
//     } else if (formData.mobile.length !== 10 || !/^\d{10}$/.test(formData.mobile)) {
//       newErrors.mobile = "Mobile number must be exactly 10 digits.";
//       isValid = false;
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required.";
//       isValid = false;
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters.";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       const response = await axios.post("http://localhost:4001/user/register", formData);
//       console.log("Response:", response.data);

//       if (response.data) {
//         toast.success("Registration successful!");
//         navigate("/login"); // Redirect to login page after successful registration
//       }

//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//       toast.error("Registration failed: " + (error.response?.data?.message || error.message));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-indigo-600">
//       <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-lg animate-fadeIn">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
//           Create Your Account
//         </h2>
//         <form onSubmit={handleRegister}>
//           <div className="mb-4">
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={formData.username}
//               onChange={(e) =>
//                 setFormData({ ...formData, username: e.target.value })
//               }
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                 errors.username
//                   ? "border-red-500 focus:ring-red-400"
//                   : "focus:ring-green-500"
//               } dark:bg-gray-700 dark:text-white`}
//               placeholder="Enter your Username"
//             />
//             {errors.username && (
//               <p className="text-sm text-red-500 mt-1">{errors.username}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                 errors.email
//                   ? "border-red-500 focus:ring-red-400"
//                   : "focus:ring-green-500"
//               } dark:bg-gray-700 dark:text-white`}
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-sm text-red-500 mt-1">{errors.email}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="mobile"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
//             >
//               Mobile Number
//             </label>
//             <input
//               type="text"
//               id="mobile"
//               maxLength={10}
//               value={formData.mobile}
//               onChange={(e) =>
//                 setFormData({ ...formData, mobile: e.target.value })
//               }
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                 errors.mobile
//                   ? "border-red-500 focus:ring-red-400"
//                   : "focus:ring-green-500"
//               } dark:bg-gray-700 dark:text-white`}
//               placeholder="Enter your mobile number"
//             />
//             {errors.mobile && (
//               <p className="text-sm text-red-500 mt-1">{errors.mobile}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
//                 errors.password
//                   ? "border-red-500 focus:ring-red-400"
//                   : "focus:ring-green-500"
//               } dark:bg-gray-700 dark:text-white`}
//               placeholder="Enter your password"
//             />
//             {errors.password && (
//               <p className="text-sm text-red-500 mt-1">{errors.password}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-2 px-4 text-white rounded-md transition-all duration-300 ${
//               isSubmitting
//                 ? "bg-green-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             }`}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-blue-600 hover:text-blue-700 font-medium"
//           >
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Registration;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import register from "../../assets/registration.gif"

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Name is required.";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required.";
      isValid = false;
    } else if (formData.mobile.length !== 10 || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:4001/user/register", formData);
      console.log("Response:", response.data);

      if (response.data) {
        toast.success("Registration successful!");
        navigate("/login"); // Redirect to login page after successful registration
      }

    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Registration failed: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex w-1/2 max-w-2xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* <div className="w-1/2 hidden lg:flex items-center justify-center bg-gray-700">
          <img src="https://cdn.dribbble.com/users/1239720/screenshots/3506944/car_mg.gif" alt="register" className="w-screen" />
        </div> */}
        <div className="w-full p-8">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-6">Create an Account</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-xl font-bold text-gray-300">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your username"
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-xl font-bold text-gray-300">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-xl font-bold text-gray-300">Mobile Number</label>
              <input
                type="text"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your mobile number"
              />
              {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-xl font-bold text-gray-300">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-3 border rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full p-3 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="text-gray-400 text-sm text-center mt-4">
            Already have an account? <a href="/login" className="text-yellow-400">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;

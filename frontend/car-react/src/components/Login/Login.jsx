import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginPic from "../../assets/VdgG.gif"
import { useAuth } from '../../context/AuthProvider';
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
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

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:4001/user/login", formData);
      const from = location.state?.from || '/';

      if (response.data) {
        toast.success("Login successful!");
        localStorage.setItem("isLoggedIn", true);
        login(response.data.user, response.data.token, response.data.role);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Incorrect email or password")
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex w-11/12 max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Left section with image */}
        <div className="w-1/2 hidden md:block bg-white dark:bg-gray-800">
          <img
            src={loginPic}
            alt="Car"
            className="object-fill h-full w-full"
          />
        </div>

        {/* Right section with form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Login your Account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-2xl font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-500"
                } dark:bg-gray-700 dark:text-white`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-2xl font-medium text-gray-700 dark:text-gray-200 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-500"
                } dark:bg-gray-700 dark:text-white`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white rounded-md transition-all duration-300 ${
                isSubmitting
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
            New member?{" "}
            <a
              href="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Review from "./Review";
import Loading from "./Loading";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const CarDetails = () => {
  const { id } = useParams();
  const {role} = useAuth();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isAdmin, setIsAdmin] = useState(false);  // State to track if the user is an admin

  useEffect(() => {
    // Fetch vehicle details
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4001/cars/${id}`);
        setVehicle(res.data);
      } catch (err) {
        console.error("Error fetching vehicle:", err);
      }finally{
        setLoading(false);
      }
    };

    // Fetch reviews
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/cars/${id}/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    // Check if the user is an admin (example check)
    const userRole = localStorage.getItem("userRole"); // Assuming user role is stored in localStorage
    if (userRole === "admin") {
      setIsAdmin(true);
    }

    fetchVehicle();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    // Apply theme class to the document
    const rootElement = document.documentElement;
    if (theme === "dark") {
      rootElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      rootElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const handleEdit = () => {
    navigate(`/update/${id}`); // Redirect to the update page
  };

  if(loading) return <Loading />;

  if (!vehicle) return <p>Loading vehicle details...</p>;

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen flex flex-col">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="container mx-auto p-6">
        <h1 className="text-center text-5xl font-bold mb-4 text-blue-500 dark:text-yellow-400">CAR DETAILS:</h1>
        <br />
        <br />
        <div className="flex gap-6">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-1/2 h-96 object-fill rounded-lg"
          />
          <div className="w-1/2">
            <h2 className="text-4xl font-bold mb-4">{vehicle.name}</h2>
            <p className="text-lg mb-2">Model: {vehicle.model}</p>
            <p className="text-lg mb-2">Type: {vehicle.type}</p>
            <p className="text-lg mb-2">Price: ₹{vehicle.price}</p>
            <p className="text-lg mb-2">Seat: {vehicle.seat} Seater</p>
            <button
              onClick={() => navigate(`/bookings/${id}`)}
              className="mt-4 px-6 py-2 font-bold bg-blue-600 text-white dark:bg-yellow-400 dark:text-black rounded-lg hover:bg-slate-200 hover:text-blue-700 dark:hover:bg-gray-800 dark:hover:text-yellow-500"
            >
              Book Now
            </button>

            {/* Edit button, only visible to admin */}
            {role === "admin" && (
              <button
                onClick={handleEdit}
                className="mt-4 ml-4 px-6 py-2 font-bold bg-blue-600 text-white dark:bg-yellow-400 dark:text-black rounded-lg hover:bg-slate-200 hover:text-blue-700 dark:hover:bg-gray-800 dark:hover:text-yellow-500"
              >
                Edit Vehicle Details
              </button>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <Review reviews={reviews} vehId={id} onNewReview={handleNewReview} theme={theme} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarDetails;

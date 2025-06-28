import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Fetch vehicle details for editing
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/cars/${id}`);
        setVehicle(res.data);
      } catch (err) {
        console.error("Error fetching vehicle details:", err);
      }
    };

    fetchVehicle();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prevVehicle) => ({
      ...prevVehicle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true);


    try {
      const response = await axios.put(
        `http://localhost:4001/cars/update/${id}`,
        vehicle,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Add token here
          },
        }
      );
  
      console.log('Update response:', response.data); 
      toast.success("Updation Done Successfully"); 
      navigate(`/cars/${id}`); 
    } catch (err) {
      if (err.response) {
        console.error("Error response from backend:", err.response.data);
      } else {
        console.error("Error updating car details:", err.message);
      }
      setLoading(false);
    }
  };
  

  if (!vehicle) return <p>Loading vehicle details...</p>;

  // Define common input styles for light and dark theme
  const inputClass = theme === "dark" 
    ? "w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
    : "w-full p-3 border border-gray-300 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500";

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen flex flex-col">
      {loading && <Loading />}
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="container mx-auto p-6">
        <h1 className="text-center text-4xl font-bold mb-4 text-blue-500 dark:text-yellow-400">EDIT CAR DETAILS:</h1>
        <br />
        <div className="flex gap-6">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-1/2 h-96 object-fill rounded-lg"
          />
          <div className="w-1/2">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2">Car Name</label>
                <input
                  type="text"
                  name="name"
                  value={vehicle.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2">Car Type</label>
                  <select
                    name="type"
                    value={vehicle.type}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  >
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Scooty">Scooty</option>
                  <option value="Electric Vehicle (EV)">Electric Vehicle (EV)</option>
                  <option value="Mini Van">Mini Van</option>
                  <option value="Bus">Bus</option>
                  </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={vehicle.price}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2">Seat Capacity</label>
                <input
                  type="number"
                  name="seat"
                  value={vehicle.seat}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-2">Car Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={vehicle.image}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-6 py-2 font-bold bg-blue-600 text-white dark:bg-yellow-400 dark:text-black rounded-lg hover:bg-slate-200 hover:text-blue-700 dark:hover:bg-gray-800 dark:hover:text-yellow-500"
              >
                Update Details
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateCar;

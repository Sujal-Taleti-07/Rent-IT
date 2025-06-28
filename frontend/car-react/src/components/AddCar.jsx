import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Loading from "./Loading";
import toast from "react-hot-toast";

const AddCar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState({
    name: "",
    model: "",
    veh_num: "",
    type: "Car",
    seat: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    try {
      await axios.post("http://localhost:4001/cars/add", car, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Attach token if required
        },
      });
      toast.success("Vehicle added successfully");
      navigate("/cars");
    } catch (error) {
      console.error("Error adding car:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to add car");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      {loading && <Loading />}
      <Navbar theme={theme} setTheme={setTheme} />

      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-10">
        <h2 className="text-3xl text-blue-500 dark:text-yellow-400 font-bold mb-6 text-center">Add a New Vehicle</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-medium mb-1">Car Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Car Name"
              value={car.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Model</label>
            <input
              type="text"
              name="model"
              placeholder="Enter Model"
              value={car.model}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Vehicle Number</label>
            <input
              type="text"
              name="veh_num"
              placeholder="Enter Vehicle Number"
              value={car.veh_num}
              onChange={handleChange}
              required
              maxLength={10}
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium mb-1">Type</label>
              <select
                name="type"
                value={car.type}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Scooty">Scooty</option>
                <option value="Electric Vehicle (EV)">Electric Vehicle (EV)</option>
                <option value="Mini Van">Mini Van</option>
                <option value="Bus">Bus</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium mb-1">Seats</label>
              <input
                type="number"
                name="seat"
                placeholder="Enter Seats"
                value={car.seat}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              value={car.price}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-1">Car Image (URL)</label>
            <input
              type="url"
              name="image"
              placeholder="Enter Image URL"
              value={car.image}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-700"
            />
          </div>

          {car.image && (
            <div className="flex justify-center">
              <img
                src={car.image}
                alt="Car Preview"
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 dark:bg-yellow-400  dark:text-black bg-blue-600 text-white hover:bg-slate-200 hover:text-blue-700 dark:hover:bg-black dark:hover:text-yellow-500 rounded-lg text-lg font-semibold transition"
          >
            Add Vehicle
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AddCar;

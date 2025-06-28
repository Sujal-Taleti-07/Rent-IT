import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteVehicleModal from "./DeleteVehicleModal";
import Loading from "./Loading";
import toast from "react-hot-toast";

const Cars = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    AOS.init({ offset: 120, duration: 1000, easing: "ease-in-out", delay: 100 });
  }, []);

  useEffect(() => {
    const getVehicles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4001/cars");
        setVehicles(res.data);
        setFilteredVehicles(res.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }finally{
        setLoading(false);
      }
    };
    getVehicles();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredVehicles(
      vehicles.filter(
        (car) =>
          car.name.toLowerCase().includes(searchValue) ||
          car.model.toLowerCase().includes(searchValue) ||
          car.type.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleDeleteClick = (car) => {
    setSelectedVehicle(car);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedVehicle || !selectedVehicle._id) {
      toast.error("Invalid vehicle selection.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:4001/cars/delete/${selectedVehicle._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state to remove deleted vehicle
      const updatedVehicles = vehicles.filter((car) => car._id !== selectedVehicle._id);
      setVehicles(updatedVehicles);
      setFilteredVehicles(updatedVehicles);

      toast.success("Vehicle Deleted Successfully!");
      setModalOpen(false);
    } catch (error) {
      console.error("Error deleting car:", error);
      toast.error(error.response?.data?.message || "Error deleting vehicle");
    }
  };

  if(loading) return <Loading />;

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
      <Navbar theme={theme} setTheme={setTheme} />

      <div className="container mx-auto p-6 flex justify-center items-center gap-4">
        <input
          type="text"
          placeholder="Search cars by name, model, or type..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/2 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        {role === "admin" && (
          <button
            onClick={() => navigate("/add")}
            className="px-6 py-2 bg-blue-600 text-white dark:bg-yellow-400 dark:text-black font-bold rounded-full hover:bg-slate-200 hover:text-blue-700 dark:hover:bg-gray-800 dark:hover:text-yellow-500 transition duration-300"
          >
            Add Car
          </button>
        )}
      </div>

      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-down">
          Our Collections
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div key={vehicle._id} className="bg-neutral-200 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src={vehicle.image} alt={vehicle.name} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Model: {vehicle.model}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Type: {vehicle.type}</p>
                <p className="text-lg font-bold text-blue-500 dark:text-primary"> ₹{vehicle.price} /day</p>
                
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/cars/${vehicle._id}`)}
                    className="flex-1 bg-blue-600 text-white dark:bg-yellow-400 dark:text-black font-bold py-2 rounded-md hover:bg-white hover:text-blue-700 dark:hover:bg-black dark:hover:text-yellow-500 transition-colors duration-300"
                  >
                    Book Now
                  </button>

                  {role === "admin" && (
                    <button
                      onClick={() => handleDeleteClick(vehicle)}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-white hover:text-red-500 transition duration-300"
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteVehicleModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onDelete={handleDelete}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Cars;

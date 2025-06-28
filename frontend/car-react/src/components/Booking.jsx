import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Loading from "./Loading";
import axios from "axios";
import toast from "react-hot-toast";
import handlePayment from "./Payment"; // Import Payment Function

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [tripType, setTripType] = useState("single");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [loading, setLoading] = useState(true);

  const driverCharge = 500;
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4001/cars/${id}`);
        setVehicle(res.data);
      } catch (err) {
        console.error("Error fetching vehicle:", err);
        toast.error("Error fetching vehicle");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const calculateTotalCost = () => {
    if (!startDate || !endDate || !vehicle) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days <= 0) return 0;

    let cost = days * vehicle.price;
    if (tripType === "round") {
      cost *= 2;
      setWithDriver(true);
    }
    return cost + (withDriver ? days * driverCharge : 0);
  };

  useEffect(() => {
    setTotalCost(calculateTotalCost());
  }, [startDate, endDate, withDriver, vehicle, tripType]);

  const handleBooking = async () => {
    if (!startDate || !endDate || !pickupLocation || !dropLocation || !pickupTime) {
      toast.error("Please fill in all required fields!");
      return;
    }
  
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      toast.error("Start date cannot be later than end date.");
      return;
    }
  
    const cost = calculateTotalCost();
    setTotalCost(cost);
  
    const bookingData = {
      vehicleId: id,
      vehicleName: vehicle.name,
      vehicleModel: vehicle.model,
      vehicleNumber: vehicle.veh_num,
      vehicleImg: vehicle.image,
      startDate,
      endDate,
      totalCost: cost,
      withDriver,
      tripType,
      pickupLocation,
      dropLocation,
      pickupTime,
      dropTime,
    };
  
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to book a vehicle!");
      navigate("/login");
      return;
    }
  
    // 🔹 Start Payment and Create Booking After Successful Payment
    handlePayment(totalCost, bookingData, async () => {
      try {
        const response = await axios.post(`http://localhost:4001/bookings`, bookingData, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        toast.success("Booking Done Successfully!");
        setBookingConfirmed(true);
      } catch (err) {
        console.error("Error saving booking:", err);
        toast.error("Booking failed. Please try again.");
      }
    });
  };
  

  if (loading) {
    return <Loading />;
  }

  if (!vehicle) return <p>Loading booking details...</p>;

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
      <Navbar theme={theme} setTheme={setTheme} />

      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-4xl dark:text-yellow-400 text-blue-500 font-bold text-center mb-8">
          Book {vehicle.name}
        </h1>
        {!bookingConfirmed ? (
          <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-4">
            <p className="text-2xl font-semibold">Price per day: ₹{vehicle.price}</p>
          
              {(vehicle.type === "Bike" || vehicle.type === "Scooty" || vehicle.type === "Bus" || vehicle.type === "Mini Van") && (
                        <div className="space-y-4">
                          <div className="flex space-x-4 mb-4">
                            <div>
                              <input
                                type="radio"
                                name="tripType"
                                value="single"
                                checked={tripType === "single"}
                                onChange={() => setTripType("single")}
                                className="mr-2"
                              />
                              <label className="text-lg font-serif">Single Trip</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                name="tripType"
                                value="round"
                                checked={tripType === "round"}
                                onChange={() => setTripType("round")}
                                className="mr-2"
                              />
                              <label className="text-lg font-serif">Round Trip</label>
                            </div>
                          </div>
                        </div>
                      )}
          
                      <div className="space-y-4">
                        <div className="flex space-x-4">
                          <div className="w-1/2">
                            <label className="block text-lg">Start Date:</label>
                            <input
                              type="date"
                              value={startDate}
                              min={today}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                          </div>
          
                          <div className="w-1/2">
                            <label className="block text-lg">End Date:</label>
                            <input
                              type="date"
                              value={endDate}
                              min={startDate || today}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500"
                            />
                          </div>
                        </div>
          
                        <div>
                          <label className="block text-lg">Pickup Location:</label>
                          <input
                            type="text"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg"
                          />
                        </div>
          
                        <div>
                          <label className="block text-lg">Drop Location:</label>
                          <input
                            type="text"
                            value={dropLocation}
                            onChange={(e) => setDropLocation(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg"
                          />
                        </div>
          
                        <div className="flex space-x-4">
                          <div className="w-full">
                            <label className="block text-lg">Pickup Time:</label>
                            <input
                              type="time"
                              value={pickupTime}
                              onChange={(e) => setPickupTime(e.target.value)}
                              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg"
                            />
                          </div>
                        </div>
          
                        {(vehicle.type === "Car" || vehicle.type === "Electric Vehicle (EV)") && (
                          <div>
                            <input
                              type="checkbox"
                              checked={withDriver}
                              onChange={() => setWithDriver(!withDriver)}
                              className="mr-2"
                            />
                            <label>Add Driver (₹{driverCharge} per day)</label>
                          </div>
                        )}
          
                        <p className="mt-4 text-xl font-semibold text-center">
                          Total Cost: ₹{totalCost > 0 ? totalCost : 0}
                        </p>
                      </div>
          
                      <button
                        onClick={handleBooking}
                        className="w-full py-3 mt-6 font-bold bg-blue-600 text-white dark:bg-yellow-400 dark:text-black rounded-lg hover:bg-white hover:text-blue-700 dark:hover:bg-black dark:hover:text-yellow-500"
                      >
                        Confirm Booking
                      </button>
                    </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
            <p>Total Cost: ₹{totalCost}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/bookings")}
                className="w-full px-4 py-2 font-bold bg-blue-600 text-white dark:bg-yellow-400 dark:text-black rounded-lg hover:bg-white hover:text-blue-700 dark:hover:bg-black dark:hover:text-yellow-500"
              >
                View All Bookings
              </button>

            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Booking;

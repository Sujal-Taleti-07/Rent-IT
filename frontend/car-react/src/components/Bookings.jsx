import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar/Navbar";  
import Footer from "../components/Footer/Footer";  
import BookingDetails from "./BookingDetails";
import Loading from "./Loading";

const Bookings = () => {
  const [bookings, setBookings] = useState([]); 
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
     localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in!");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:4001/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && Array.isArray(response.data.data)) {
          setBookings(response.data.data);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        toast.error("Failed to load bookings");
        setBookings([]);
      }finally{
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

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

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  if(loading) return <Loading />;
  
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col">
      {/* Navbar at the top */}
      <Navbar theme={theme} setTheme={setTheme} />

      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-500 dark:text-yellow-500">Booking History</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-lg">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4"
              >
                <div>
                  <h2 className="text-2xl font-bold text-blue-500 dark:text-yellow-400">{booking.vehicleName}</h2>
                  <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                  <p><strong>Total Cost:</strong> ₹{booking.totalCost}</p><br /><br />
                  <button
                    onClick={() => handleViewDetails(booking)}
                    className="bg-blue-600 text-white dark:bg-yellow-500 dark:text-black font-bold px-4 py-2 rounded-lg hover:bg-slate-200 hover:text-blue-700 dark:hover:bg-gray-700 dark:hover:text-yellow-500"
                  >
                    View Booking
                  </button>
                </div>
                <img
                  src={booking.vehicleImg || "https://via.placeholder.com/100"} 
                  alt="Vehicle"
                  className="w-32 h-24 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showDetails && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setShowDetails(false)}
        />
      )}

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Bookings;

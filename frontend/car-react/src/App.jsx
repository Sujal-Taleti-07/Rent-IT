import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute";

// Component imports
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Registration from "./components/Login/Registration";
import Cars from "./components/Cars";
import Booking from "./components/Booking";
import Bookings from "./components/Bookings";
import CarDetails from "./components/CarDetails";
import AddCar from "./components/AddCar";
import UpdateCar from "./components/UpdateCar";
import BookingDetails from "./components/BookingDetails";

const App = () => {
  // Dark mode state management
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
        <>
        <Routes>
          <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
          
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/add" element={<AddCar />} />
          <Route path="/update/:id" element={<UpdateCar />} />
          <Route path="/bookings/:id" element={<Booking />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
        <Toaster />
        </>
        
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Component imports
import Navbar from "./Navbar/Navbar";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Services from "./Services/Services";
import CarList from "./CarList/CarList";
import Testimonial from "./Testimonial/Testimonial";
import Footer from "./Footer/Footer";
import Loading from "./Loading";

const Home = ({ theme, setTheme }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
    const timer = setTimeout(() => {
      setLoading(false);  // After 2 seconds, set loading to false
    }, 2000);  // Adjust the time to simulate loading delay

    return () => clearTimeout(timer);  // Cleanup the timer if component unmounts
  }, []);

  const navigate = useNavigate();

  if (loading) return <Loading />;  // Show loading component until loading state is false

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero theme={theme} />
      <About />
      <Services />
      <CarList />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;

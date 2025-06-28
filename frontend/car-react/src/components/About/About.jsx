import React from "react";
import CarPng from "../../assets/about.png";

const About = () => {
  return (
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[700px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-3 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide text-xl font-serif">
              <b>Rent IT</b> is the leading marketplace for car sharing in emerging markets,with over 20,000 cars on its technology-driven platform across India. Rent IT empowers host entrepreneurs to safely and easily share their cars to earn additional passive income. Guests in the Rent IT community enjoy a diverse, affordable selection of cars to unlock memorable driving experiences with friends and family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
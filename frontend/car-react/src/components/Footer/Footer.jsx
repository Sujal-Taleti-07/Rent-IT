import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-dark mt-14 rounded-t-3xl">
      <section className="container">
        <div className="grid md:grid-cols-2 py-5 items-center">
          {/* Left Side - Company Details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-blue-700 dark:text-yellow-400 text-xl font-bold mb-3 font-serif">Rent IT</h1>
            <p className="text-l mb-2">&copy; {new Date().getFullYear()} Rent IT. All rights reserved.</p>
            <p className="text-m max-w-lg">
              Thank you for visiting! We truly appreciate your time and interest. If you have any questions or need assistance, we're here to help. Safe travels and see you again soon.
            </p>
          </div>
          
          {/* Right Side - Contact & Social Media */}
          <div className="py-8 px-4 flex flex-col items-start text-right">
            <div className="flex items-end gap-3 mb-3">
              <FaLocationArrow />
              <p>Mumbai, Maharashtra</p>
            </div>
            <div className="flex items-end gap-3 mb-3">
              <FaMobileAlt />
              <p>+91 999999999</p>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <p className="text-m font-bold">Let's Keep In Touch</p>
              <a href="#">
                <FaInstagram className="text-3xl hover:text-blue-500 dark:hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl hover:text-blue-500 dark:hover:text-primary duration-300" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl hover:text-blue-500 dark:hover:text-primary duration-300" />
              </a>
            </div>
            <p className="text-m mt-3 font-bold">Designed with ❤️ by Rent IT Team</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;

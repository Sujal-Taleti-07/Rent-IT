import React, { useEffect, useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ResponsiveMenu from "./ResponsiveMenu.jsx";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider.jsx";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/",
  },
  {
    id: 2,
    name: "CARS",
    link: "/cars",
  },
  {
    id: 3,
    name: "BOOKING",
    link: "/bookings",
  },
];

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("isLoggedIn"))
  );
  const navigate = useNavigate();

  const { user, logout } = useAuth()

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };


  const handleLogout = () => {
    // localStorage.removeItem("token"); // Remove the token
    localStorage.removeItem("isLoggedIn"); // Optional: Remove logged-in flag
    
    logout();
    toast.success("Logged out successfully!");
    setIsLoggedIn(false); 
    navigate("/login"); // Redirect to login page
  };
  

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.className = storedTheme;
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-gray-950 dark:text-white dark:shadow-gray-700 duration-300">
      <div className="container py-1 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-size[large] font-bold font-serif text-blue-700 dark:bg-black dark:text-primary"> 
              <a href="/"> Rent IT</a>
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    className="text-lg font-medium hover:text-blue-600 dark:hover:text-primary py-2 hover:border-b-2 hover:border-blue-500 dark:hover:border-primary transition-colors duration-500"
                  >
                    {name}
                  </a>
                </li>
              ))}
              {isLoggedIn ? (
                <li>
                  <a
                    onClick={handleLogout}
                    className="text-lg font-medium hover:text-blue-600 dark:hover:text-primary py-2 hover:border-b-2 hover:border-blue-500 dark:hover:border-primary transition-colors duration-500 cursor-pointer"
                  >
                    LOGOUT
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    onClick={() => navigate("/login")}
                    className="text-lg font-medium hover:text-blue-600 dark:hover:text-primary py-2 hover:border-b-2 hover:border-blue-500 dark:hover:border-primary transition-colors duration-500 cursor-pointer"
                  >
                    LOGIN
                  </a>
                </li>
              )}
              <li>
                {theme === "dark" ? (
                  <BiSolidSun
                    onClick={toggleTheme}
                    className="text-2xl cursor-pointer"
                  />
                ) : (
                  <BiSolidMoon
                    onClick={toggleTheme}
                    className="text-2xl cursor-pointer"
                  />
                )}
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            {theme === "dark" ? (
              <BiSolidSun onClick={toggleTheme} className="text-2xl" />
            ) : (
              <BiSolidMoon onClick={toggleTheme} className="text-2xl" />
            )}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar;


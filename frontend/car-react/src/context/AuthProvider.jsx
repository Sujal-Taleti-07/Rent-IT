import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  // Check token expiration on app load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedRole = localStorage.getItem("userRole");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    // If token exists, check if it has expired
    if (savedToken && savedUser) {
      const currentTime = new Date().getTime();

      if (currentTime > tokenExpiration) {
        // Token expired, logout user
        logout();
      } else {
        try {
          const parsedUser = JSON.parse(savedUser);
          setToken(savedToken);
          setUser(parsedUser);
          setRole(savedRole ? JSON.parse(savedRole) : parsedUser?.role);
        } catch (err) {
          console.error("Error parsing user data from localStorage:", err);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
        }
      }
    }
  }, []);

  const login = (user, token) => {
    const userRole = user?.role || "user"; // Ensure role is taken from user object
    const expiration = new Date().getTime() + 3600 * 1000; // 1 hour from now

    // Store token, expiration, and role properly in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", JSON.stringify(userRole));
    localStorage.setItem("tokenExpiration", expiration);

    setUser(user);
    setToken(token);
    setRole(userRole);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("tokenExpiration");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

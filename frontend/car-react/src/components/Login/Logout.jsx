// import React, { useContext } from "react";
// import { AuthContext } from "../../context/AuthProvider";
// import { useNavigate } from "react-router-dom";

// const Logout = () => {
//   const { logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");  // Redirect user to the login page
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };

// export default Logout;





import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";  // To decode the JWT token

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Function to check if the token is expired
  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return true;  // If no token exists, consider it expired.

    const decodedToken = jwt_decode(token);  // Decode token
    const expirationTime = decodedToken.exp * 1000;  // Convert expiration time to milliseconds
    const currentTime = Date.now();  // Get current time

    return currentTime > expirationTime;  // Return true if expired
  };

  // Automatically log out the user if the token is expired
  useEffect(() => {
    if (isTokenExpired()) {
      handleLogout(); // Automatically log out if token is expired
    }
  }, []);  // Empty dependency array so it runs once on mount

  // Function to handle the logout logic
  const handleLogout = () => {
    logout();  // Call the logout function from context
    localStorage.removeItem("token");  // Remove token from localStorage
    // localStorage.removeItem("tokenExpiration");  // Remove expiration time from localStorage
    navigate("/login");  // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;

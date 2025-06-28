import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
 
        // <App />

        
      <BrowserRouter>
      <AuthProvider>
        {/* <Toaster position="top-right" reverseOrder={false} /> */}
        <App />
      </AuthProvider>
      </BrowserRouter>
   

)



// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import AuthProvider from "./context/AuthProvider";
// import './index.css'

// ReactDOM.render(
//   <BrowserRouter>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );


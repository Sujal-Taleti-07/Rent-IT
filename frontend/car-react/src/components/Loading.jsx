import React from "react";
import loadingGif from "../assets/loading-unscreen.gif";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
      <img src={loadingGif} alt="Loading..." className="w-100 h-100" />
    </div>
  );
};

export default Loading;

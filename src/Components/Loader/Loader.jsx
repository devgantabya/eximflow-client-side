import React from "react";
import loadingIcon from "../../assets/export-import-icon.jpg";
const Loader = () => {
  return (
    <div className="flex justify-center items-center ">
      <img
        src={loadingIcon}
        alt="Loading..."
        className="h-20 w-20 animate-spin-slow"
      />
      <style>
        {`
          @keyframes spin360 {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin360 1s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Loader;

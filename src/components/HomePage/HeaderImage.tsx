import React, { useEffect, useState } from "react";
import Image from "next/image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Himage from "../../../public/assets/homePagePhoto.png";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
const HeaderImage = ({ isDarkMode }) => {
  const breadTypes = ["بربری", "سنگک", "تافتون", "لواش", "محلی", "فانتزی"];
  const [currentBreadType, setCurrentBreadType] = useState(breadTypes[0]);
  const [fading, setFading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token presence to boolean
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentBreadType((prev) => {
          const currentIndex = breadTypes.indexOf(prev);
          const nextIndex = (currentIndex + 1) % breadTypes.length;
          return breadTypes[nextIndex];
        });
        setFading(false);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, [breadTypes]);

  // Handle input click
  const handleInputClick = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
    }
  };

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-120">
      <Image
        src={isDarkMode ? "/assets/darkHomePagePhoto.png" : "/assets/homePagePhoto.png"}
        alt="Background"
        fill
      />

      <div className="absolute inset-0 flex flex-col justify-end items-start text-white pb-18">
        {/* Content Container */}
        <div className="w-full max-w-md px-4 mx-auto ml-4 md:ml-8 lg:ml-12">
          {/* Bread Type Text */}
          <div className="text-left mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold flex items-center justify-end">
              <span
                className={`transition-opacity duration-500 ${
                  fading ? "opacity-0" : "opacity-100"
                } text-3xl md:text-4xl lg:text-5xl text-[#F18825] font-extrabold`}
              >
                {currentBreadType}
              </span>
              <span className="text-[#555050] dark:text-neutral-50 ml-2">سفارش انواع نان</span>
            </h2>
          </div>

          {/* Address Input */}
          {!isLoggedIn && (
  <div className="relative flex items-center bg-[#B7B3AC] bg-opacity-90 rounded-lg p-2 shadow-lg">
    <input
      type="text"
      className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-700 text-right"
      placeholder="آدرس خود را انتخاب کنید"
      dir="rtl"
      onClick={handleInputClick} // Trigger login check only when not logged in
    />
    <LocationOnIcon className="text-[#F18825] ml-2" />
  </div>
)}
        </div>
      </div>

      {/* Login Popup */}
      {/* Login Popup */}
{showLoginPopup && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      
      {/* Close Button (X on the right) */}
      <button 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setShowLoginPopup(false)}
      >
        ✖
      </button>

      {/* Popup Title */}
      <h2 className="text-lg  text-center mb-4 mt-4">لطفاً ابتدا وارد حساب کاربری خود شوید<ErrorOutlineOutlinedIcon className="text-red-500"/></h2>

     

    </div>
  </div>
)}
    </div>
  );
};

export default HeaderImage;
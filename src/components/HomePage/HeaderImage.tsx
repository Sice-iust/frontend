import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Himage from '../../../public/assets/homePagePhoto.png';

const HeaderImage = ({ isDarkMode }) => {
  const breadTypes = ["بربری", "سنگک", "تافتون", "لواش", "محلی", "فانتزی"];  
  const [currentBreadType, setCurrentBreadType] = useState(breadTypes[0]); 
  const [fading, setFading] = useState(false);  

  useEffect(() => {  
    const interval = setInterval(() => {  
      setFading(true);
      setTimeout(() => {  
        setCurrentBreadType(prev => {  
          const currentIndex = breadTypes.indexOf(prev); 
          const nextIndex = (currentIndex + 1) % breadTypes.length;   
          return breadTypes[nextIndex];
        });  
        setFading(false); 
      }, 500); // Faster fade transition
    }, 2000);  
    
    return () => clearInterval(interval);  
  }, [breadTypes]); 

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-120">
      <Image 
        src={isDarkMode ? `/assets/darkHomePagePhoto.png`:`/assets/homePagePhoto.png`} 
        alt="Background" 
        fill
      />
      
 <div className="absolute inset-0 flex flex-col justify-end items-start text-white  pb-18">
  {/* Content Container - Aligned with input */}
  <div className="w-full max-w-md px-4 mx-auto ml-4 md:ml-8 lg:ml-12">
    {/* Bread Type Text - Single Line */}
    <div className="text-left mb-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold flex items-center justify-end">
        <span className={`transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'} text-3xl md:text-4xl lg:text-5xl text-[#F18825] font-extrabold`}>
          {currentBreadType}
        </span>        <span className="text-[#555050] ml-2">سفارش انواع نان</span>

      </h2>
    </div>
    
    {/* Address Input */}
    <div className="relative flex items-center bg-[#B7B3AC] bg-opacity-90 rounded-lg p-2 shadow-lg">
      <input 
        type="text" 
        className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-700 text-right"
        placeholder="آدرس خود را انتخاب کنید"
        dir="rtl"
      />      <LocationOnIcon className="text-[#F18825] ml-2" />

    </div>
  </div>
</div>
</div>
  );
};

export default HeaderImage;
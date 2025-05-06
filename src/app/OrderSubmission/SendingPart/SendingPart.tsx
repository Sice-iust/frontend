import React, { useState,useEffect } from "react"; 
import axios from "axios";
import { convertDateInPersian } from "../../../utils/Coversionutils";
import { convertPrice } from "../../../utils/Coversionutils";
import { convertTimeToPersian } from "../../../utils/Coversionutils";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import { useTheme } from "../../theme";
import Tab from "./SelectTab";


const SendingPart: React.FC = () => {  
  

  const { isDarkMode, toggleDarkMode } = useTheme();


  
  return ( 
    <>
      
    <div className={`sm:rounded-xl    ${isDarkMode ? "bg-[#191919]" : "bg-white"}  sm:shadow-md sm:p-4 sm:mb-10 sm:w-full sm:h-screen sm:mt-0 sm:overflow-hidden sm:mx-auto sm:block hidden   
                sm:w-[90%] sm:mx-7  
                md:w-[70%] md:mx-7  
                lg:w-[70%] lg:mx-0 
                xl:mx-7 xl:mt-10 xl:w-[70%]`}>  
      <Tab/> 
 
    
    </div> 
    </> 
  );  
};  

export default SendingPart;  
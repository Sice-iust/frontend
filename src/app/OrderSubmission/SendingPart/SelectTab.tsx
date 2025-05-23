'use client'
import React, { useState } from "react";  
import Reserve from "./Reservation";
import TimeChoosing from "./TimeChoosing";


const Tab: React.FC= () => {  

  const [selectedTab, setSelectedTab] = useState(1); 
  
  

  return (  
    <>
    <div className="container mx-auto mt-5 relative w-full">  
      <div className="flex bg-gray-300 rounded-2xl 
                      overflow-hidden w-full mx-5
                      md:w-full md:mx-auto lg:w-[25%]  absolute end-0">    
        <div   
          className={`flex-1 text-center py-2 cursor-pointer 
                      relative border border-gray-300 
                      ${  selectedTab === 0 ? 'bg-white shadow-md rounded-l-2xl' 
                          : 'bg-transparent'  
                      }`
                    }  
                  onClick={() => setSelectedTab(0)}   
        >  
          <span className="font-vazir text-black font-bold text-xs 
                           sm:text-sm
                           md:text-md">رزرو ماهانه</span>  
          <div className={`absolute bottom-0 left-0 right-0 
                           h-1 bg-[#F18825] rounded-2xl 
            ${selectedTab === 0 ? '' : 'hidden'}`}>
          </div>  
        </div>  

        <div   
          className={`flex-1 text-center py-2 cursor-pointer 
                      relative border border-gray-300  
                      ${  selectedTab === 1 ? 'bg-white shadow-md rounded-r-2xl' 
                          : 'bg-transparent'  
                       }`
                    }  
                  onClick={() => setSelectedTab(1)}  
        >  
          <span className="font-vazir text-black font-bold text-xs 
                           sm:text-sm 
                           md:text-md">تحویل فوری</span>  
          <div className={`absolute bottom-0 left-0 right-0 
                           h-1 bg-[#F18825] rounded-2xl 
            ${selectedTab === 1 ? '' : 'hidden'}`}>
          </div>  
        </div>  
      </div> 
    </div>  
    <div className="box-contetnt bg-white w-full min-h-40 rounded-2xl mt-10">
      {selectedTab === 0 && <Reserve />}
      {selectedTab === 1 && <TimeChoosing />}
    </div> 
    </>
  );  
};  

export default Tab;  
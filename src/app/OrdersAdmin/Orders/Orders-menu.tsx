'use client'
import React, { useState } from "react";  
import Current_orders from "./Current_Orders";
import Completed_orders from "./Completed_orders";
import { useOrderContext } from '../../../context/Adminordercontext'


const Tab: React.FC= () => {  

  const {selectedTab,setSelectedTab}=useOrderContext()

  
  

  return (  
    <>
    <div className="container mx-auto mt-5 relative w-full">  
      <div className="flex bg-gray-300 dark:bg-[#2B2828] rounded-2xl 
                      overflow-hidden  mx-5
                      md:w-full md:mx-auto lg:w-[40%]  absolute end-0">    
        <div   
          className={`flex-1 text-center py-2 cursor-pointer 
                      relative border border-gray-300 dark:border-[#1C1B1B]  
                      ${  selectedTab === 0 ? 'bg-white dark:bg-[#1C1B1B]   shadow-md rounded-l-2xl' 
                          : 'bg-transparent'  
                      }`
                    }  
                  onClick={() => setSelectedTab(0)}   
        >  
          <span className="font-vazir text-black dark:text-white font-bold text-xs 
                           sm:text-sm
                           md:text-md">تحویل شده</span>  
          <div className={`absolute bottom-0 left-0 right-0 
                           h-1 bg-[#F18825] rounded-2xl 
            ${selectedTab === 0 ? '' : 'hidden'}`}>
          </div>  
        </div>  

        <div   
          className={`flex-1 text-center py-2 cursor-pointer 
                      relative border border-gray-300  dark:border-[#1C1B1B]  
                      ${  selectedTab === 1 ? 'bg-white dark:bg-[#1C1B1B] shadow-md rounded-r-2xl' 
                          : 'bg-transparent'  
                       }`
                    }  
                  onClick={() => setSelectedTab(1)}  
        >  
          <span className="font-vazir text-black dark:text-white font-bold text-xs 
                           sm:text-sm 
                           md:text-md">در حال آماده سازی </span>  
          <div className={`absolute bottom-0 left-0 right-0 
                           h-1 bg-[#F18825] rounded-2xl 
            ${selectedTab === 1 ? '' : 'hidden'}`}>
          </div>  
        </div>  
      </div> 
    </div>  
    <div className="box-contetnt bg-white dark:bg-[#191919] w-full min-h-40 rounded-2xl mt-10">
      {selectedTab === 0 && <Completed_orders />}
      {selectedTab === 1 && <Current_orders />}
    </div> 
    </>
  );  
};  

export default Tab;  
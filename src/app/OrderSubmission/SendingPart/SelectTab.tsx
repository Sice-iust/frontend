import React, { useState } from "react";  



const Tab: React.FC= () => {  

  const [selectedTab, setSelectedTab] = useState(0); 
  
  

  return (  

    <div className="container mx-auto mt-5 relative">  
      <div className="flex bg-gray-300 rounded-2xl 
                      overflow-hidden w-full mx-5
                      md:w-full mx-auto lg:w-[60%] absolute end-0">    
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
                           md:text-base">رزرو ماهانه</span>  
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
                           md:text-base">تحویل فوری</span>  
          <div className={`absolute bottom-0 left-0 right-0 
                           h-1 bg-[#F18825] rounded-2xl 
            ${selectedTab === 1 ? '' : 'hidden'}`}>
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Tab;  
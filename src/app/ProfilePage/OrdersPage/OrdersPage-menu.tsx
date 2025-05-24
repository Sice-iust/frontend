import React, { useState } from "react";  
import FinalOrders from "./OrderCards";
import CurrentOrders from './CurrentOrder';
interface Ordersnum {  
  currentOrdersCount: string;    
  finalOrdersCount: string;  
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
}  

const Menu: React.FC<Ordersnum> = ({ currentOrdersCount, finalOrdersCount, selectedTab, setSelectedTab  }) => {  

  // const [selectedTab, setSelectedTab] = useState(0); 
  
  

  return (  
    <div className="container mx-auto mt-10 ">  
      <div className="flex bg-gray-300 rounded-2xl 
                      overflow-hidden w-full
                      md:w-full mx-auto lg:w-[60%]">    
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
                           md:text-base">سفارش های نهایی&zwnj;({(finalOrdersCount)})</span>  
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
                           md:text-base">سفارش های جاری&zwnj;({(currentOrdersCount)})</span>  
          <div className={`absolute bottom-0 left-0 right-0 
                           h-1 bg-[#F18825] rounded-2xl    overflow-y-scroll
            ${selectedTab === 1 ? '' : 'hidden'}`}>
          </div>  
        </div>  
      </div>  
     
    </div>  
  );  
};  

export default Menu;  
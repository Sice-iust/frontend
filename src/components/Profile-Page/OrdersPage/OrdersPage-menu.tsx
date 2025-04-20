import React, { useState } from "react";  

interface Ordersnum {  
  currentOrdersCount: number;    
  finalOrdersCount: number;  
}  

const Menu: React.FC<Ordersnum> = ({ currentOrdersCount, finalOrdersCount }) => {  

  const [selectedTab, setSelectedTab] = useState(0); 
  
  const convertToPersianNumbers = (num: string | number): string => {  
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
    return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
  };  

  return (  
    <div className="container mx-auto mt-10">  
      <div className="flex bg-gray-300 rounded-2xl 
                      overflow-hidden w-full mx-5
                      md:w-1/2 mx-auto">    
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
                           md:text-base">سفارش های جاری ({convertToPersianNumbers(currentOrdersCount)})</span>  
          <div className={`absolute bottom-0 left-0 right-0 
                           h-1 bg-orange-500 rounded-2xl 
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
                           md:text-base">سفارش های نهایی ({convertToPersianNumbers(finalOrdersCount)})</span>  
          <div className={`absolute bottom-0 left-0 right-0 
                           h-1 bg-orange-500 rounded-2xl 
            ${selectedTab === 1 ? '' : 'hidden'}`}>
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Menu;  
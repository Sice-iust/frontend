import { useState, useEffect } from "react";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import { useOrderContext } from '../../../context/Adminordercontext';

interface OrderSearchBoxProps {
  orders: string[];
  placeholder?: string;
  onSelect?: (orderNumber: string) => void;
}

const OrderSearchBox = ({ orders, placeholder = "شماره سفارش", onSelect }: OrderSearchBoxProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  
  const {
    setSelectedOrderscurrent,
    setSelectedOrderspast,
    selectedOrderscurrent,
    selectedOrderspast,
    filterOrders,
    selectedTab,
  } = useOrderContext();

  const filteredOrders = orders.filter((order) =>
    order.replace(/\s/g, "").includes(searchTerm.replace(/\s/g, ""))
  );

  
  useEffect(() => {
    if (selectedTab === 1) {
      filterOrders();
    } else if (selectedTab === 0) {
      filterOrders();
    }
  }, [selectedOrderscurrent, selectedOrderspast, selectedTab]);

  const handleOrderToggle = (order: string) => {
    if (selectedTab === 1) {
      setSelectedOrderscurrent((prev) =>
        prev.includes(order) ? prev.filter((o) => o !== order) : [...prev, order]
      );
    } else {
      setSelectedOrderspast((prev) =>
        prev.includes(order) ? prev.filter((o) => o !== order) : [...prev, order]
      );
    }

    if (onSelect) {
      onSelect(order);
    }
  };

  return (
    <div className="relative w-full max-w-md pr-4 pl-4  pt-1 " dir="rtl">
      <label className=" mr-3 block text-black dark:text-white font-light mb-3">شماره سفارش</label>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-[90%] mr-3 p-3 bg-[#d9d9d9] dark:bg-[#383535]  rounded-3xl text-xs border 
                border-gray-300  dark:border-[#383535] dark:text-[#B2A9A9]
                  focus:outline-none focus:ring-2 focus:ring-[#d9d9d9] dark:focus:ring-[#383535] text-right"
        dir="rtl"
      />

      <div className="mt-3 max-h-30 overflow-auto rounded-lg">
        {(searchTerm ? filteredOrders : orders).map((order) => (
          <div key={order} className="flex items-center p-2 text-right">
            <label className="flex items-center cursor-pointer relative mr-2">
              <input
                type="checkbox"
                checked={selectedTab === 1 ? selectedOrderscurrent.includes(order) : selectedOrderspast.includes(order)}
                onChange={() => handleOrderToggle(order)}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border  
                         border-[#d9d9d9] dark:border-[#B2A9A9]  checked:bg-[#F18825] checked:border-[#F18825]"
              />
              <span className="absolute text-white  opacity-0 peer-checked:opacity-100 top-1/2 left-1/2  
                                transform -translate-x-1/2 -translate-y-1/2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3.5 w-3.5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  stroke="currentColor" 
                  strokeWidth="1"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0  
                       011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </label>
            <span className="flex-1 cursor-pointer text-[#434242] dark:text-[#B2A9A9] mr-3">
              {convertToPersianNumbers(order)}
            </span>
          </div>
        ))}
      </div>
      <div className="border-b border-[#c7c5c5] w-[95%] mr-2 ml-2 mb-2 mt-2"></div>
    </div>
  );
};

export default OrderSearchBox;
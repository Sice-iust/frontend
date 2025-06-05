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

  // ✅ Correctly using context
  const {
    setSelectedOrderscurrent,
    setSelectedOrderspast,
    selectedOrderscurrent,
    selectedOrderspast,
    getFilteredCurrentOrders,
    selectedTab,
  } = useOrderContext();

  const filteredOrders = orders.filter((order) =>
    order.replace(/\s/g, "").includes(searchTerm.replace(/\s/g, ""))
  );

  // ✅ Run filtering AFTER state updates based on selectedTab
  useEffect(() => {
    if (selectedTab === 1) {
      getFilteredCurrentOrders(selectedOrderscurrent.map(Number));
    } else if (selectedTab === 0) {
      getFilteredCurrentOrders(selectedOrderspast.map(Number));
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
    <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-md" dir="rtl">
      <label className="block text-black font-light mb-3">شماره سفارش</label>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-[90%] mr-3 p-3 bg-[#d9d9d9] rounded-3xl text-xs border border-gray-300  
                  focus:outline-none focus:ring-2 focus:ring-[#d9d9d9] text-right"
        dir="rtl"
      />

      <div className="mt-3 max-h-40 overflow-auto rounded-lg">
        {(searchTerm ? filteredOrders : orders).map((order) => (
          <div key={order} className="flex items-center p-2 text-right">
            <label className="flex items-center cursor-pointer relative mr-2">
              <input
                type="checkbox"
                checked={selectedTab === 1 ? selectedOrderscurrent.includes(order) : selectedOrderspast.includes(order)}
                onChange={() => handleOrderToggle(order)}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border  
                         border-[#d9d9d9] checked:bg-[#F18825] checked:border-[#F18825]"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2  
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
            <span className="flex-1 cursor-pointer text-[#434242] mr-3">
              {convertToPersianNumbers(order)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSearchBox;
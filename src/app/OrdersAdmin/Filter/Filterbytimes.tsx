import { useState, useEffect } from "react";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import { useOrderContext } from '../../../context/Adminordercontext';

const generateTimeSlots = (startHour: number, endHour: number) => {
  const slots: string[] = [];
  for (let i = startHour; i < endHour; i += 2) {
    slots.push(`${i}-${i + 2}`);
  }
  return slots;
};

const timeSlots = generateTimeSlots(8, 22);

const Ordersslotbox = () => {
  const {
    setSelectedTimeSlotscurrent,
    setselectedtimeslotspast,
    selectedTimeSlotscurrent,
    selectedTimeSlotspast,
    filterOrders,
    selectedTab,
  } = useOrderContext();

  useEffect(() => {
    filterOrders();
  }, [selectedTimeSlotscurrent, selectedTimeSlotspast, selectedTab]);

  const handleSlotToggle = (slot: string) => {
    if (selectedTab === 1) {
      setSelectedTimeSlotscurrent((prev) =>
        prev.includes(slot) ? prev.filter((o) => o !== slot) : [...prev, slot]
      );
    } else {
      setselectedtimeslotspast((prev) =>
        prev.includes(slot) ? prev.filter((o) => o !== slot) : [...prev, slot]
      );
    }
  };

  return (
    <div className="relative w-full max-w-md pr-4 pl-4 pb-1 " dir="rtl">
      <label className="mr-3 block text-black dark:text-white font-light mb-2">بازه زمانی  </label>

      <div className="mt-3 max-h-30 overflow-auto rounded-lg ">
        {timeSlots.map((slot) => (
          <div key={slot} className="flex items-center p-2 text-right">
            <label className="flex items-center cursor-pointer relative mr-2">
              <input
                type="checkbox"
                checked={selectedTab === 1 ? selectedTimeSlotscurrent.includes(slot) : selectedTimeSlotspast.includes(slot)}
                onChange={() => handleSlotToggle(slot)}
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border  
                         border-[#d9d9d9] dark:border-[#B2A9A9] checked:bg-[#F18825] checked:border-[#F18825]"
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
            <span className="flex-1 cursor-pointer text-[#434242] dark:text-[#B2A9A9] mr-3">
              {convertToPersianNumbers(slot)}
            </span>
          </div>
        ))}
      </div>
      <div className="border-b border-[#c7c5c5] w-[95%] mr-2 ml-2  mt-2"></div>
    </div>
  );
};

export default Ordersslotbox;
import { useEffect} from "react";
import { useOrderContext } from '../../../context/Adminordercontext';

const OrderSwitch = () => {
  const { setIsEnabledarchieve, setIsEnabledcancel, filterOrders, IsEnabledarchieve, IsEnabledcancel,selectedTab,selectedOrderspast,selectedTimeSlotspast } = useOrderContext();

  const handleToggleArchieve = () => {
    setIsEnabledarchieve(prev => {
      const newState = !prev; 
      console.log("here", newState); 

      return newState;
    });
  };

  const handleToggleCancel = () => {
    setIsEnabledcancel(prev => {
    const newState = !prev; 
    console.log("here", newState); 
    return newState;
  });
  };

  useEffect(() => {
  filterOrders();
}, [IsEnabledarchieve, IsEnabledcancel, selectedTab, selectedOrderspast, selectedTimeSlotspast]);

  return (
    <>
      <div className="relative w-full max-w-md p-4 flex flex-row-reverse items-center justify-between">
        <label className="mr-3 text-black dark:text-white font-light">سفارش‌های آرشیو شده</label>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={IsEnabledarchieve}
            onChange={handleToggleArchieve}
          />
          <div className="ml-4 relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-[#383535]
                          peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 
                          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                          peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                          after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                          peer-checked:bg-[#F18825] dark:peer-checked:bg-[#F18825]"></div>
        </label>
      </div>

      <div className="relative w-full max-w-md pb-4 pr-4 pl-4 flex flex-row-reverse items-center justify-between">
        <label className="mr-3 text-black dark:text-white font-light">سفارش‌های لغو شده</label>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={IsEnabledcancel}
            onChange={handleToggleCancel}
          />
          <div className="ml-4 relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-[#383535] 
                          peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 
                          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                          peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                          after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                          after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                          peer-checked:bg-[#F18825] dark:peer-checked:bg-[#F18825]"></div>
        </label>
      </div>
    </>
  );
};

export default OrderSwitch;
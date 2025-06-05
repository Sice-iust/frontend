import { useState } from "react";

const OrderSwitch = () => {
  const [isEnabledcancel, setIsEnabledcancel] = useState(false);
  const [IsEnabledarchieve, setIsEnabledarchieve] = useState(false);

  const handleTogglecancel = () => {
    setIsEnabledcancel((prev) => !prev);
  };

   const handleToggleArchieve = () => {
    setIsEnabledarchieve((prev) => !prev);
  };

  return (
    <>
    <div className="relative w-full max-w-md p-4 flex flex-row-reverse items-center justify-between">
      <label className="mr-3 text-black font-light"> سفارش‌های آرشیو شده</label>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={IsEnabledarchieve}
          onChange={handleToggleArchieve}
        />
        <div className=" ml-4 relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
                        peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 
                        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                        peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 
                        after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                        peer-checked:bg-[#F18825] dark:peer-checked:bg-[#F18825]"></div>
      </label>
      
    </div>
    <div className="relative w-full max-w-md p-4 flex flex-row-reverse items-center justify-between">
      <label className="mr-3 text-black font-light"> سفارش‌های لغو شده</label>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isEnabledcancel}
          onChange={handleTogglecancel}
        />
        <div className=" ml-4 relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
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
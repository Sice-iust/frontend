import React, { useState } from "react";

const DiscountCodeForm: React.FC = () => {

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (code.trim() === "") {
      setError("!کد وارد شده نامعتبر است ");
    } else {
      setError(""); 
    }
  };

  return (
    <>
    <div className="flex flex-col space-y-3">
        <span className="text-sm font-vazir font-medium text-right
                        break-words whitespace-wrap mx-8
                        sm:w-auto sm:text-base">کد تخفیف دارید؟</span>
        <div className="flex mx-7">
            <button
            onClick={handleSubmit}
            className="bg-[#F18825] mr-2 rounded-2xl text-white px-4 h-10 flex items-center justify-center cursor-pointer"
            >
            ثبت کد
            </button>
            <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="کد خود را وارد کنید"
            className="bg-[#D9D9D9] text-[#383535]  text-base placeholder:text-xs border border-gray-300 
                       rounded-2xl p-2 h-10 text-right w-64 
                       focus:outline-none focus:text-md focus:ring focus:ring-[#EDEDED]"
            /> 
        </div>
    </div>
    {error && <p className="text-red-500 text-sm mt-2 text-right mx-9">{error}</p>}
    </>
  );
};

export default DiscountCodeForm;
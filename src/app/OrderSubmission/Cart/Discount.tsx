import React, { useState } from "react";

const DiscountCodeForm: React.FC = () => {
  const [code, setCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [walletBalance] = useState(125000);
  const [recipientType, setRecipientType] = useState("self");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (code.trim() === "") {
      setError("!کد وارد شده نامعتبر است ");
    } else if (paymentMethod === "") {
      setError("!لطفاً روش پرداخت را انتخاب کنید");
    } else if (recipientType === "other" && recipientName.trim() === "") {
      setError("!نام گیرنده را وارد کنید");
    } else if (recipientType === "other" && recipientPhone.trim() === "") {
      setError("!شماره گیرنده را وارد کنید");
    } else {
      setError("");
      const finalRecipient =
        recipientType === "self"
          ? "خودم"
          : { name: recipientName, phone: recipientPhone };
      console.log({ code, paymentMethod, recipient: finalRecipient });
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 mx-7">

       

        {/* روش پرداخت */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-vazir text-right dark:text-white">روش پرداخت</label>
          <div className="flex space-x-4 justify-end">
            <div
              onClick={() => setPaymentMethod("wallet")}
              className={`cursor-pointer px-4 py-2 rounded-2xl border ${
                paymentMethod === "wallet"
                  ? "border-[#F18825] bg-[#F18825] text-white"
                  : "border-gray-300 bg-[#D9D9D9] text-[#383535]"
              }`}
            >
              پرداخت از کیف پول
            </div>
            <div
              onClick={() => setPaymentMethod("online")}
              className={`cursor-pointer px-4 py-2 rounded-2xl border ${
                paymentMethod === "online"
                  ? "border-[#F18825] bg-[#F18825] text-white"
                  : "border-gray-300 bg-[#D9D9D9] text-[#383535]"
              }`}
            >
              پرداخت آنلاین
            </div>
          </div>
          {paymentMethod === "wallet" && (
            <p className="text-sm text-right text-green-600 font-vazir">
              موجودی کیف پول: {walletBalance.toLocaleString()} تومان
            </p>
          )}
        </div>

       {/* انتخاب گیرنده با دو چک‌باکس سفارشی که فقط یکی فعال می‌شود */}
<div className="flex flex-col space-y-2">
  <label className="text-sm font-vazir text-right dark:text-white">گیرنده</label>
  <div className="flex flex-col space-y-3 items-end">

    {/* گزینه: گیرنده خودم هستم */}
    <div className="inline-flex items-center space-x-2">
      <span className="text-sm font-vazir dark:text-white">گیرنده خودم هستم</span>
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          checked={recipientType === "self"}
          onChange={() => setRecipientType("self")}
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#F18825] checked:border-[#F18825]"
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>
    </div>

    {/* گزینه: گیرنده فرد دیگری است */}
    <div className="inline-flex items-center space-x-2">
      <span className="text-sm font-vazir dark:text-white">گیرنده فرد دیگری است</span>
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          checked={recipientType === "other"}
          onChange={() => setRecipientType("other")}
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#F18825] checked:border-[#F18825]"
        />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </label>
    </div>
  </div>
</div>

{recipientType === "other" && (
  <div className="flex flex-col space-y-2">
    <label className="text-sm font-vazir text-right dark:text-white">مشخصات گیرنده</label>
    <div className="flex flex-row space-x-4 justify-end">
      <input
        type="text"
        placeholder="نام گیرنده"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        className="w-1/2 px-3 py-2 rounded-md border border-gray-300 text-right font-vazir focus:outline-none focus:ring-2 focus:ring-[#F18825]"
      />
      <input
        type="text"
        placeholder="شماره گیرنده"
        value={recipientPhone}
        onChange={(e) => setRecipientPhone(e.target.value)}
        className="w-1/2 px-3 py-2 rounded-md border border-gray-300 text-right font-vazir focus:outline-none focus:ring-2 focus:ring-[#F18825]"
      />
    </div>
  </div>
)}

        {/* پیام خطا */}
        {error && <p className="text-red-500 text-sm mt-2 text-right">{error}</p>}

      
      </div>
    </>
  );
};

export default DiscountCodeForm;
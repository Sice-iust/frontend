'use client'
import React , { useState } from "react";
import Invoice from "../../ProfilePage/OrdersPage/Invoice/invoice-detail";
import { useCart } from "../../../context/Receiptcontext";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import LoadingBox from "../../../components/Loading/LoadingBox";
import Discount from "./Discount"
import { convertPrice } from "../../../utils/Coversionutils";
import handlePayment from './handlePyament';
import { useADDRESS } from '../../../context/GetAddress';


const Cart: React.FC = () => {
    const { cartItems, loading ,totalDiscount, totalActualPrice , shipping_fee ,totalActualPricewithshipp,selectedSlotId } = useCart();
    const sortedCartItems = cartItems.sort((a, b) => a.product.id - b.product.id); 

    const [detail, setDetail] = useState("");
    const { data = [] } = useADDRESS();  
    const selected = data?.find((add) => add.isChosen === true);

     const [code, setCode] = useState("");
      const [paymentMethod, setPaymentMethod] = useState("wallet");
      const [walletBalance] = useState(125000);
      const [recipientType, setRecipientType] = useState("self");
      const [reciver, setRecipientName] = useState("");
      const [reciver_phone, setRecipientPhone] = useState("");
      const [error, setError] = useState("");
      
      const handleSubmit = () => {
        if (code.trim() === "") {
          setError("!کد وارد شده نامعتبر است ");
        } else if (paymentMethod === "") {
          setError("!لطفاً روش پرداخت را انتخاب کنید");
        } else if (recipientType === "other" && reciver.trim() === "") {
          setError("!نام گیرنده را وارد کنید");
        } else if (recipientType === "other" && reciver_phone.trim() === "") {
          setError("!شماره گیرنده را وارد کنید");
        } else {
          setError("");
          const finalRecipient =
            recipientType === "self"
              ? "خودم"
              : { name: reciver, phone: reciver_phone };
          console.log({ code, paymentMethod, recipient: finalRecipient });
        }
      };
    

    if (loading) {
        return (
            <div className="relative">
                <div className={`box-content ml-10 mt-10 mb-10 min-h-140 w-100 rounded-2xl bg-white dark:bg-[#383535] `}>
                    <h2 className="text-[25px] text-center pt-5 pb-2 font-vazir font-bold">
                        سبد خرید {cartItems.length > 0 ? `(${convertToPersianNumbers(cartItems.length)})` : ""}
                    </h2>
                </div>

                <div className={`absolute top-10 mb-10 left-10 right-0 bottom-0 rounded-2xl flex items-center 
                                 justify-center bg-white dark:bg-[#191919] bg-opacity-70`}>
                    <LoadingBox />
                </div>
            </div>
        );
    }
   
    return (
        <div className="bg-[#f5f5f5] dark:bg-[#383535]"> 
            <div className="box-content ml-10 mt-10 mb-10 min-h-140 w-100 rounded-2xl bg-white dark:bg-[#191919]">  
                <h2 className="text-[25px] text-center text-black dark:text-white pt-5 pb-2 font-vazir font-bold">  
                    سبد خرید {cartItems.length > 0 ? `(${convertToPersianNumbers(cartItems.length)})` : ""}
                </h2> 
                <div className="mx-5">
                    {cartItems.length > 0 ? (
                    <Invoice 
                            orderId={1}
                            payment={String(totalActualPrice)}
                            // profit={String(totalDiscount)}
                            shippingfee={String(shipping_fee)}
                            Product={sortedCartItems.map(item => ({
                                id: item.product.id,
                                name: item.product.name,
                                price: String(item.product.price*(1-item.product.discount/100)),
                                photo: item.product.photo || "default-image-url",
                                quantity: item.quantity,
                            }))} discount={""}                />
                    ) : null}  
                    <div className="border-t pt-4 mx-3 dark:border-[#383535]"></div>
                </div> 

                <div className="flex flex-col space-y-4 mx-7">

       

        

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
        value={reciver}
        onChange={(e) => setRecipientName(e.target.value)}
        className="w-1/2 px-3 py-2 rounded-md border border-gray-300 text-right font-vazir focus:outline-none focus:ring-2 focus:ring-[#F18825]"
      />
      <input
        type="text"
        placeholder="شماره گیرنده"
        value={reciver_phone}
        onChange={(e) => setRecipientPhone(e.target.value)}
        className="w-1/2 px-3 py-2 rounded-md border border-gray-300 text-right font-vazir focus:outline-none focus:ring-2 focus:ring-[#F18825]"
      />
    </div>
  </div>
)}

        {/* پیام خطا */}
        {error && <p className="text-red-500 text-sm mt-2 text-right">{error}</p>}

      
      </div>
    

                
                <div className="flex flex-row-reverse py-2 justify-between mx-8 mt-2">  
                    <span className="text-lg font-vazir text-right text-black dark:text-white font-bold "> قابل پرداخت </span>
                    <span className="flex flex-row-reverse">
                    <span className="text-lg text-gray-600 dark:text-white font-semibold">{
                        convertPrice(String(totalActualPricewithshipp))}</span>    
                    <span className="text-[14px] font-vazir font-medium text-right mr-2 text-gray-600 dark:text-[#B2A7A7]">تومان</span>    
                    </span>
                </div>       

                {totalDiscount? totalDiscount >0 && (
                    <div className="flex flex-row-reverse py-2 justify-between mx-8">  
                        <span className="text-[14px] font-vazir font-medium text-right text-green-600 
                                          "
                            >سود شما از این خرید
                        </span>
                        <span className="flex flex-row-reverse">
                            <span className="text-green-600 font-semibold">
                                {convertPrice(String(totalDiscount))}
                            </span>    
                            <span className="text-[14px] font-vazir font-medium text-right mr-2 text-green-600">
                                    تومان
                            </span>    
                        </span>
                    </div>                            
                    ) : null
                }

                <div className="flex flex-col space-y-3 mx-8 items-center">

                    <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="توضیحات سفارش ..."
                    className="bg-[#D9D9D9] dark:bg-[#383535] text-[#383535] dark:text-[#B0ABAB] text-base placeholder:text-xs border border-gray-300 dark:border-[#383535]
                                rounded-xl w-full py-2 px-4 h-30 mb-4
                                focus:outline-none focus:text-md focus:ring focus:ring-[#EDEDED] dark:focus:ring-[#383535]
                                text-right placeholder:text-right flex items-center"
                    dir="rtl"
                    />

                   <button
                        onClick={() => handlePayment({
                            location_id: Number(selected?.id),
                            deliver_time: Number(selectedSlotId),
                            description: detail, 
                            total_price: totalActualPricewithshipp,
                            profit: totalDiscount || 0,
                            total_payment: totalActualPricewithshipp,
                            discount_text: "",
                            payment_status: "unpaid",
                            reciver: reciver||"",
                            reciver_phone: reciver_phone ||  ""                       })}
                        className={`mr-2 mb-4 rounded-2xl px-4 h-10 flex items-center justify-center w-[70%] 
                                  ${cartItems.length === 0 || shipping_fee === -1 || !selected ? "bg-gray-300 text-white cursor-not-allowed" : 
                                    'bg-[#F18825] text-white dark:text-black transition cursor-pointer'}`}

                        disabled={!cartItems || cartItems.length === 0 || shipping_fee === -1 || !selected}
                    >
                        ثبت و پرداخت
                    </button>
                </div>



            </div>  

        </div>
    );
};

export default Cart; 
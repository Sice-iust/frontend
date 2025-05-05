'use client'
import React , { useState } from "react";
import Invoice from "../../ProfilePage/OrdersPage/Invoice/invoice-detail";
import { useCart } from "../../../context/Receiptcontext";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import LoadingBox from "../../../components/Loading/LoadingBox";
import Discount from "../Cart/Discount"
import { convertPrice } from "../../../utils/Coversionutils";

const Cart: React.FC = () => {
    const { cartItems, loading ,totalDiscount, totalActualPrice , shipping_fee } = useCart();
    const sortedCartItems = cartItems.sort((a, b) => a.product.id - b.product.id); 

    const [detail, setDetail] = useState("");

    if (loading) {
        return (
            <div className="relative">
                <div className={`box-content ml-10 mt-10 mb-10 min-h-140 w-100 rounded-2xl bg-white `}>
                    <h2 className="text-[25px] text-center pt-5 pb-2 font-vazir font-bold">
                        سبد خرید {cartItems.length > 0 ? `(${convertToPersianNumbers(cartItems.length)})` : ""}
                    </h2>
                </div>

                <div className={`absolute top-0 left-10 right-0 bottom-0 rounded-2xl flex items-center justify-center bg-white bg-opacity-70`}>
                    <LoadingBox />
                </div>
            </div>
        );
    }
   
    return (
        <div className="bg-[#f5f5f5]"> 
            <div className="box-content ml-10 mt-10 mb-10 min-h-140 w-100 rounded-2xl bg-white">  
                <h2 className="text-[25px] text-center text-black pt-5 pb-2 font-vazir font-bold">  
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
                                price: item.product.price,
                                photo: item.product.photo || "default-image-url",
                                quantity: item.quantity,
                            }))} discount={""}                />
                    ) : null}  
                    <div className="border-t pt-4 mx-3"></div>
                </div> 

                <Discount/>

                
                <div className="flex flex-row-reverse py-2 justify-between mx-8 mt-2">  
                    <span className="text-lg font-vazir text-right text-black font-bold "> قابل پرداخت </span>
                    <span className="flex flex-row-reverse">
                    <span className="text-lg text-gray-600 font-semibold">{
                        convertPrice(String(totalActualPrice))}</span>    
                    <span className="text-[14px] font-vazir font-medium text-right mr-2 text-gray-600">تومان</span>    
                    </span>
                </div>       

                {totalDiscount? totalDiscount >0 && (
                    <div className="flex flex-row-reverse py-2 justify-between mx-8">  
                        <span className="text-[14px] font-vazir font-medium text-right text-green-600 font-semibold "
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
                    <input
                        type="text"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder="  ...توضیحات سفارش"
                        className="bg-[#D9D9D9] text-[#383535]  text-base placeholder:text-xs border border-gray-300 
                                rounded-xl p-2 h-30 text-right  mb-4 w-[100%] py-2
                                focus:outline-none focus:text-md focus:ring focus:ring-[#EDEDED]"
                    /> 

                    <button
                        className="bg-[#F18825] mr-2 mb-4 rounded-2xl text-white px-4 h-10 flex items-center 
                                   justify-center w-[70%]  cursor-pointer">
                        ثبت و پرداخت
                    </button>
                </div>



            </div>  

        </div>
    );
};

export default Cart; 
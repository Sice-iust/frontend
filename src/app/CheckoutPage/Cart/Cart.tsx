'use client'
import React from "react";
import Invoice from "../../ProfilePage/OrdersPage/Invoice/invoice-detail";
import { useCart } from "../../../context/Receiptcontext";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import LoadingBox from "../../../components/Loading/LoadingBox";

const Cart: React.FC = () => {
    const { cartItems, loading , totalActualPrice } = useCart();
    const sortedCartItems = cartItems.sort((a, b) => a.product.id - b.product.id); 

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
                        shippingfee="0"
                        Product={sortedCartItems.map(item => ({
                            id: item.product.id,
                            name: item.product.name,
                            price: item.product.price,
                            photo: item.product.photo || "default-image-url",
                            quantity: item.quantity,
                        }))} discount={""}                />
            ) : null}
            </div> 
            </div>

        </div>
    );
};

export default Cart;
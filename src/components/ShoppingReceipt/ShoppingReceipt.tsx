import React from "react";
import { CgNotes } from "react-icons/cg";
import emptyReceipt from "../../../public/assets/emptyReceipt.png";
import Image from 'next/image';
import { useCart } from "../../context/Receiptcontext";
import LoadingBox from "../../components/Loading/LoadingBox";
import { convertToPersianNumbers } from '../../utils/Coversionutils';
import Link from "next/link";

const Receipt: React.FC = () => {
    const {
        cartItems,
        counts,
        totalDiscount,
        totalActualPrice,
        loading,
        incrementQuantity,
        decrementQuantity,
        removeItem,
    } = useCart();
    const sortedCartItems = cartItems.sort((a, b) => a.product.id - b.product.id);

    if (loading) {
        return (
            <div className="relative">
                <div className={`box-content
                     ml-10 mt-10 mb-10 min-h-140 w-100 rounded-2xl 
                     dark:bg-[#191919] dark:border-white bg-white`}>
                    <h2 className="text-[25px] text-center pt-5 pb-2 font-vazir font-bold">
                        سبد خرید {cartItems.length > 0 ? `(${convertToPersianNumbers(cartItems.length)})` : ""}
                    </h2>
                </div>

                <div className={`absolute top-0 left-10 right-0 bottom-0 rounded-2xl
                     flex items-center justify-center
                      dark:"bg-[#191919] dark:border-white bg-white bg-opacity-70`}>
                    <LoadingBox />
                </div>
            </div>
        );
    }

    if (!cartItems) {
        return <div className="text-center pt-10">مشکلی پیش آمد. لطفا تست مجدد کنید.</div>;
    }

    return (
        <div className={`dark:bg-[#383535] bg-[#f5f5f5]`}>
            <div className={`box-content ml-10 mt-10 mb-10 min-h-140 w-100 rounded-2xl
                dark:bg-[#191919] dark:border-white bg-white`}>
                <h2 className={`text-[25px] text-center dark:text-[#ffffff] text-black pt-5 pb-2 font-vazir font-bold`}>
                    سبد خرید {cartItems.length > 0 ? `(${convertToPersianNumbers(cartItems.length)})` : ""}
                </h2>
                {cartItems.length === 0 ? (
                    <div className="flex flex-col justify-center items-center mt-10">
                        <Image src={emptyReceipt} alt="emptyReceipt" className="w-70 h-70 " />
                        <span className={`font-vazir dark:text-[#ffffff] text-black text-lg font-semibold mt-2`}>
                            !سبد خرید شما خالی است
                        </span>
                    </div>
                ) : (
                    <div className={`${cartItems.length > 2 ? "overflow-y-scroll max-h-60" : ""}`}>
                        {sortedCartItems.map(item => (
                            <div key={item.id} className='flex flex-row-reverse 
                            items-center justify-between w-full 
                            place-self-end mr-1 mt-4 pr-1'>
                                <button
                                    className={`dark:bg-[#191919] bg-white cursor-pointer
                                         text-red-400 font-semibold text-3xl w-8 h-8 flex 
                                         items-center justify-center rounded-full transition-transform 
                                         duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-102`}
                                    onClick={() => removeItem(item.product.id)}
                                    aria-label={`Remove ${item.product.name}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                        <path d="M5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z" />
                                    </svg>
                                </button>
                                <div className="box-content ml-5 w-82 h-25 border border-gray-400 rounded-lg flex flex-col">
                                    <span className={`text-[18px] text-right mr-3 mt-2 font-vazir
                                         font-semibold dark:text-[#ffffff] text-black`}>
                                        {item.product.name}
                                    </span>
                                    <div className="flex justify-between items-center mr-6 mt-2 space-x-2">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className={`dark:bg-black bg-white ml-5 border-3 
                                                    ${item.quantity >= item.product.stock ? "border-gray-300 text-gray-300 cursor-not-allowed" :
                                                        "border-green-500 text-green-500 cursor-pointer"}
                                                          font-semibold text-3xl w-8 h-8 flex items-center justify-center 
                                                          rounded-full transition-transform duration-200 
                                                          ${item.quantity >= item.product.stock ?
                                                        "cursor-not-allowed hover:bg-white" :
                                                        "hover:bg-green-500 hover:text-white hover:scale-110"}`}
                                                onClick={() => incrementQuantity(item.product.id)}
                                                disabled={item.quantity >= item.product.stock}
                                                aria-label={`Increase quantity of ${item.product.name}`}
                                            >
                                                +
                                            </button>
                                            <span className={`text-lg dark:text-[#ffffff] text-black font-semibold`}>
                                                {convertToPersianNumbers(item.quantity)}
                                            </span>
                                            {item.quantity === 1 ? (
                                                <button
                                                    className={`dark:bg-black bg-white cursor-pointer border-3 border-gray-300 text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110`}
                                                    onClick={() => removeItem(item.product.id)}
                                                    aria-label={`Remove ${item.product.name}`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M3 6h18" />
                                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                        <path d="M10 11v6" />
                                                        <path d="M14 11v6" />
                                                        <path d="M5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z" />
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button
                                                    className={`dark:bg-black bg-white cursor-pointer 
                                                        border-3 border-red-500 text-red-500 font-semibold 
                                                        text-3xl w-8 h-8 flex items-center justify-center
                                                         rounded-full transition-transform duration-200
                                                          hover:bg-red-500 hover:text-white hover:scale-110`}
                                                    onClick={() => decrementQuantity(item.product.id)}
                                                    aria-label={`Decrease quantity of ${item.product.name}`}
                                                >
                                                    <span className="text-xl">-</span>
                                                </button>
                                            )}
                                        </div>
                                        <span className={`dark:text-white text-black text-[15px] text-right font-vazir font-medium`}>
                                            قیمت: {convertToPersianNumbers(Number(item.product.price * (1 - item.product.discount / 100)).toLocaleString())} تومان
                                        </span>
                                    </div>
                                    {item.product.discount > 0 && (
                                        <div className="flex flex-row-reverse mr-6">
                                            <div className="bg-[#F18825] text-lg w-9 h-5 text-white text-[14px] pl-1.5 rounded-md">
                                                %{convertToPersianNumbers(item.product.discount)}
                                            </div>
                                            <div className="mr-2 text-gray-500 line-through">{convertToPersianNumbers(Number(item.product.price)).toLocaleString()}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {cartItems.length > 0 && (
                    <>
                        <div className="flex flex-row-reverse space-x-reverse space-x-2 mt-7 mr-3">
                            <CgNotes color="#F18825" className="w-6 h-5" />
                            <h2 className={`text-[17px] dark:text-white text-black font-vazir font-semibold text-right`}>خلاصه سفارش</h2>
                        </div>
                        <div className="p-5 flex flex-col pt-2">
                            {sortedCartItems.map(item => (
                                <div key={item.product.id} className="flex flex-row-reverse py-2 justify-between">
                                    <span className={`text-s dark:text-white text-black font-vazir
                                         font-medium text-right  mr-6`}>
                                        {item.product.name}
                                    </span>
                                    <span className="flex flex-row-reverse">
                                        <span className={`ml-1 dark:text-gray-400 text-gray-500`}>
                                            × {convertToPersianNumbers(item.quantity)}
                                        </span>
                                        <span className={`dark:text-white text-black`}>
                                            {convertToPersianNumbers(Number(item.product.price * (1 - item.product.discount / 100)).toLocaleString())}
                                        </span>
                                        <span className={`text-s font-vazir font-medium text-right mr-2 dark:text-gray-400 text-gray-500`}>تومان</span>
                                    </span>
                                </div>
                            ))}
                            {totalDiscount > 0 && (
                                <>
                                    <div className="flex flex-row-reverse py-2 justify-between ">
                                        <span className="text-[14px] font-vazir text-right text-green-600 font-semibold mr-6 ">سود شما از این خرید</span>
                                        <span className="flex flex-row-reverse">
                                            <span className="text-green-600 font-semibold">{convertToPersianNumbers(totalDiscount.toLocaleString())}</span>
                                            <span className="text-[14px] font-vazir font-medium text-right mr-2 text-green-600">تومان</span>
                                        </span>
                                    </div>
                                </>
                            )
                            }
                            <div className="flex flex-row-reverse py-2 border-t mt-6 justify-between dark:border-white">
                                <span className={`font-vazir dark:text-white text-black font-semibold mr-6`}>جمع کل</span>
                                <div className="flex flex-row-reverse ">
                                    <span className={`font-bold dark:text-white text-black font-2xl`}>{convertToPersianNumbers(totalActualPrice.toLocaleString())}</span>
                                    <span className={`text-[14px] font-vazir font-medium text-right mr-2 dark:text-gray-400 text-gray-600`}>تومان</span>
                                </div>
                            </div>
                        </div>
                        <button className="ml-20 mb-7 w-55 bg-[#F18825] text-white dark:text-black font-medium font-vazir font-2xl py-2 rounded-xl shadow-md hover:bg-orange-400 transition duration-300 hover:scale-110">
                            <Link href={"/OrderSubmission"}><h1> ثبت و ادامه</h1></Link>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Receipt;  
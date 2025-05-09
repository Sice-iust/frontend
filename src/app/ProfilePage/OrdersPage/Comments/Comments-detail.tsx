import Image from 'next/image';
import React, { useState } from 'react';  
import { Item } from './comments-popup';
import { MdStar } from 'react-icons/md';
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

interface CommentsProps {  
    orderId: number;
    payment: string;
    shippingfee: string;
    discount: string;
    Product: Item[];
    total_price: string;
}

const Comments: React.FC<CommentsProps> = ({ orderId, payment, shippingfee, discount, Product, total_price }) => {
    const [stars, setstars] = useState<{ [key: number]: number }>({});
    const [selected, setSelected] = useState<{ [key: number]: "like" | "dislike" | null }>({});
    const [reviews, setReviews] = useState<{ [key: number]: string }>({});

    const handleReviewChange = (productId: number, value: string) => {
        setReviews((prevReviews) => ({
            ...prevReviews,
            [productId]: value, // Store review for each product
        }));
    };
    

    const handleSelect = (productId: number, type: "like" | "dislike") => {
        setSelected((prevoffer) => ({
            ...prevoffer,
            [productId]: prevoffer[productId] === type ? null : type,
        }));
    };

    const handleStarClick = (productId: number, index: number) => {
        setstars((prevstars) => ({
            ...prevstars,
            [productId]:  index + 1, 
        }));
    };

    return (
        <div className="mt-0  rounded-lg">
            <div className="space-y-4">
                {Product.map((item,index) => (
                    <>
                    <div key={item.id}  className={`flex flex-row-reverse items-center`}>
                        <Image 
                            src={item.photo} 
                            alt={item.name} 
                            width={96} 
                            height={96} 
                            className="rounded-lg w-[15%]  border "
                        />
                        <div className="flex flex-col">
                            <p className="font-vazir text-md font-medium text-black md:text-base mb-2">
                                {item.name} 
                            </p>
                            <div className="flex items-center w-full mt-1  mb-0 sm:justify-between">   
                                <p 
                                    className={`font-vazir flex items-center justify-center px-2 py-1 border 
                                                border-gray-400 rounded-full text-xs font-medium 
                                                cursor-pointer mr-2 mt-1 
                                                ${selected[item.id] === "dislike" ? "bg-red-500  border-red-500" 
                                                    : "text-black"}`}
                                    onClick={() => handleSelect(item.id,"dislike")}
                                    >
                                    پیشنهاد نمیکنم
                                    <span className="text-xl"><BiDislike className='text-xs ml-0.5'/></span>
                                </p>
                                <p 
                                    className={`font-vazir flex items-center justify-center px-2 py-1 border 
                                                border-gray-400 rounded-full text-xs font-medium  
                                                cursor-pointer mt-1
                                                ${selected[item.id] === "like" ? "bg-green-500  border-green-500" 
                                                    : "text-black"}`}
                                    onClick={() => handleSelect(item.id,"like")}
                                    >
                                    پیشنهاد میکنم
                                    <span className="text-xl"><BiLike className='text-xs ml-0.5'/></span>
                                </p>

                                <p className="font-vazir text-xs text-gray-500 mt-1 ml-3 md:text-sm hidden sm:block ">
                                    {"  خرید این کالا را به دیگران    "}
                                </p>    
                            </div>
                            <div className="flex items-center w-full mr-3 justify-between mt-3 mb-2.5"> 
                                <div className="flex space-x-1.5">
                                    {[...Array(5)].map((_, index) => (
                                        <MdStar  
                                            key={`star-${item.id}-${index}`}
                                            className={`w-6 h-6 cursor-pointer transition-colors duration-200 md:w-7 md:h-7  
                                                ${index < (stars[item.id] || 0) ? 'text-[#f9a825]' : 'text-gray-400'
                                            }`}
                                            onClick={() => handleStarClick(item.id, index)}
                                        />
                                    ))}
                                </div>
                                <p className="font-vazir text-xs text-gray-500 mt-1 ml-2 hidden md:text-sm sm:flex">
                                    {"به این کالا چه امتیازی میدهید؟"}
                                </p>
                                <p className="font-vazir text-xs text-gray-500 mt-1 ml-2 mr-1 flex md:text-sm sm:hidden">
                                    {"  امتیاز دهید     "}
                                </p>
                            </div>
                            
                            </div>
                            </div>
                            <>
                            <div className={`flex  items-center w-full justify-between ${index !== Product.length - 1 ? 'border-b' : ''} pb-4 ` }>  
                            
                            <button className="font-vazir bg-[#F18825] text-white rounded-2xl min-h-12 px-4 py-2  cursor-pointer min-w-[102px]
                              transition duration-300  mt-0 font-bold
                              text-xs sm:text-sm md:text-md lg:text-base"
                              >  
                              
                            {" ثبت نظر"}  
                            </button>  

                            <input 
                                type="text" 
                                value={reviews[item.id] || ""} 
                                onChange={(e) => handleReviewChange(item.id, e.target.value)}
                                className="border border-[#D9D9D9] bg-[#D9D9D9] rounded-2xl px-3 py-2 w-[75%] ml-auto  text-right 
                                           font-vazir text-xs min-h-12  text-[#504E4E] focus:border-[#D9D9D9] 
                                           focus:outline-none focus:text-[#504E4E]" 
                                placeholder="تجربه خود را به اشتراک بگذارید..."
                                dir="rtl"
                            />
                            </div>
                            </>
                            </>

                        
                    
                ))}
            </div>
        </div>
    );
};

export default Comments;
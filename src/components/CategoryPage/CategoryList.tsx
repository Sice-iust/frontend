import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import Receipt from '../ShoppingReceipt/ShoppingReceipt';  
import Image from 'next/image';  
import emptyReceipt from "../../assets/emptyReceipt.png";  
import { FaStar } from "react-icons/fa";  

export default function CategoryList({ category }) {  
 
    const [catNumber, setCategoryNumber] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem('category') || category;
        }
        return category;
    });

    useEffect(() => {
        if (typeof window !== "undefined" && category) {
            localStorage.setItem('category', category);
            setCategoryNumber(category);
        }
    }, [category]); 
    const [isOpen, setOpen] = useState(false);   
    const [data, setData] = useState(null);  
    const [userdata, setuserData] = useState({});  
    const [dataLength, setDataLength] = useState(0);  
    const [quantities, setQuantities] = useState({});  
    const convertToPersianNumbers = (num: string | number): string => {  
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
    }; 
    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    }; 
    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const response = await axios.get("https://nanziback.liara.run/product/category/", {  
                    params: { category: catNumber },  
                });  
                setData(response.data);  
                setDataLength(response.data.length);  
            } catch (error) {  
                console.error("Error fetching data:", error.response ? error.response.data : error.message);  
            }  
        };  

        if (catNumber) {  
            fetchData();  
        }  
    }, [catNumber]);  


    const handleAdd = async (itemId) => {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`https://nanziback.liara.run/user/cart/quantity/${itemId}/`, {  
            headers: { Authorization: `Bearer ${token}`},  
        });  
        setuserData((prev) => ({ ...prev, [itemId]: response.data[0].cart_item || 0 }));          
        console.log("user data : ",userdata);
        try {
            
            await axios.post(`https://nanziback.liara.run/user/cart/creat/${itemId}/`, {
              quantity: 1
            }, {
              headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", }
            });
            alert("Item added to cart!");
          } catch (error) {
            if (error.response?.data?.error === "You already have this product in your cart") {
              await axios.put(`https://nanziback.liara.run/user/cart/modify/${itemId}/?update=${"add"}`, {
              }, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", }
              });
              alert("Cart updated!");
            } else {
              console.error(error.response?.data);
            }
          }
    };

    const incrementQuantity = async (id: number) => {  
        const token = localStorage.getItem('token'); 
        await axios.put(`https://nanziback.liara.run/user/cart/modify/${id}/?update=${"add"}`, {
          }, {
            headers: { Authorization: `Bearer ${token}`, }
          });
          alert("Cart updated!");
    };  
    const removeItem = async (id: number) => {    
        await axios.delete(`https://nanziback.liara.run/user/cart/modify/${id}/`, {  
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" }  
        });  
        alert("Cart updated!");  
    }; 
    const decrementQuantity = async (id: number) => {  
        await axios.put(`https://nanziback.liara.run/user/cart/modify/${id}/?update=${"delete"}`, {
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json", }
          });
          alert("Cart updated!");
    };  

    return (  
        <div className="flex flex-row-reverse flex-wrap box-content m-10 ml-8 w-full h-auto rounded-2xl gap-6 ">  
            {dataLength > 0 ? (  
                data.map(item => (  
                    <div key={item.id} onClick={handleOpenModal} className="flex flex-col box-content border rounded-2xl bg-white w-79 h-77  cursor-pointer hover:scale-105 transition duration-300 ">  
                        <div className="flex flex-row">  
                            <div className="mt-1 box-content place-items-start rounded-2xl bg-[#d9d9d9] w-auto h-7 ml-1 mt-1">  
                                <span className="flex flex-row text-xl font-vazir ml-3 mb-1">  
                                    {convertToPersianNumbers(item.average_rate)}  
                                    <FaStar className="m-1 mr-3" color="orange" />  
                                </span>  
                            </div>  
                            <div className="flex flex-row justify-center items-center">  
                                <div className="relative w-40 h-50 mb-3 ml-5 mt-1">  
                                    <Image  
                                        className="rounded-2xl"  
                                        src={item.photo_url}  
                                        alt="productImg"  
                                        layout="fill"  
                                    />  
                                </div>  
                            </div>  
                        </div>  
                        <div className="font-vazir text-lg font-semibold text-right mr-5">{item.name}</div>  
                        <div className="flex flex-row-reverse">  
                            <div className='flex flex-col'>  
                                <div className="font-vazir text-lg text-right mr-5 mt-2">  
                                    {convertToPersianNumbers(Math.round(parseFloat(item.discounted_price)).toLocaleString())} :قیمت  
                                </div>  
                                {item.discount > 0 && (  
                                    <div className="flex flex-row-reverse mr-6">  
                                        <div className="bg-[#F18825] text-lg w-9 h-5 text-white text-[14px] pl-1.5 rounded-md">  
                                            %{convertToPersianNumbers(item.discount)}  
                                        </div>  
                                        <div className="mr-2 text-gray-500 line-through">  
                                            {convertToPersianNumbers(Math.round(parseFloat(item.price)).toLocaleString())}  
                                        </div>  
                                    </div>  
                                )}  
                            </div>  
                            { userdata[item.id] === undefined || userdata[item.id] === 0 ? (  
                                <button  
                                    className={` ${item.stock_1==0 ? "bg-gray-300 cursor-not-allowed" : "bg-[#F18825] hover:bg-orange-400 transition duration-300 hover:scale-110"} rounded-xl w-23 h-9 text-white text-lg font-vazir font-md mr-24 mt-2`}  
                                    onClick={() => handleAdd(item.id)}  
                                    disabled={ item.stock_1==0}  
                                >  
                                    افزودن  
                                </button>  
                            ) : (  
                                <div className="flex mr-19 mt-2 space-x-2">  
                                    <button  
                                        className={`bg-white ml-5 border-3 ${userdata[item.id] >= item.stock_1 ? "border-gray-300 text-gray-300 cursor-not-allowed" : "border-green-500 text-green-500 cursor-pointer"} font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 ${userdata[item.id] >= item.stock_1 ? "cursor-not-allowed hover:bg-white" : "hover:bg-green-500 hover:text-white hover:scale-110"}`}                                        
                                        onClick={() => incrementQuantity(item.id)}  
                                        disabled={userdata[item.id] >= item.stock_1}  
                                    >  
                                        +  
                                    </button>  
                                    <span className="text-lg font-semibold">{convertToPersianNumbers(userdata[item.id] || 0) || 0}</span>  
                                    {userdata[item.id] === 1 ? (  
                                        <button  
                                            className="bg-white cursor-pointer border-3 border-gray-300 text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110"  
                                            onClick={() => {  
                                                const newQuantities = { ...userdata };    
                                                delete newQuantities[item.id];   
                                                setQuantities(newQuantities);  
                                                removeItem(item.id);
                                            }}  
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
                                            className="bg-white cursor-pointer border-3 border-red-500 text-red-500 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-red-500 hover:text-white hover:scale-110"  
                                            onClick={() => decrementQuantity(item.id)}  
                                            disabled={userdata[item.id] <= 1}  
                                        >  
                                            <span className="text-xl">-</span>  
                                        </button>  
                                    )}  
                                </div>  
                            )}  
                        </div>  
                    </div>  
                ))  
            ) : (  
                <div>No items found</div>  
            )}  
        </div>  
    );  
}  
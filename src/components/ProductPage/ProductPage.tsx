import React, { useState,useEffect } from "react";  
import { Dialog, DialogActions, DialogContent, DialogTitle, Button ,IconButton} from "@mui/material";  
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';  
import Image from 'next/image'; 
import { FaStar } from "react-icons/fa";  

export default function ProductPage({ open, onClose, itemid }) {  
    const [isFinished, setIsFinished] = useState(false);  
    const [data, setData] = useState(null); 

    const convertToPersianNumbers = (num: string | number): string => {  
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
    }; 

    useEffect(() => {  
        const fetchData = async () => {  
            try {  
                const response = await axios.get(`https://nanziback.liara.run/product/${itemid}/`, {   
                    headers: {  
                        'Content-Type': 'application/json', 
                    },  
                });  
                console.log("item id : ",itemid);
                console.log("Response Data:", response.data);   
                setData(response.data);  
            } catch (err) {  
                console.error("Error fetching data:", err);  
            } 
        };  
    
        if (itemid) {  
            fetchData();  
        }  
    }, [itemid]);  
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
        <Dialog 
            open={open} 
            onClose={onClose} 
            sx={{  
                '& .MuiPaper-root': {  
                    borderRadius: '12px',
                    minWidth: '900px',
                },  
                '& .MuiDialogContent-root': {
                    paddingBottom: 0,
                    overflowY: 'hidden',
                },
          
                '& .MuiDialogActions-root': {
                    padding: '16px',
                },
            }}  
        >  
        <div className="flex flex-row-reverse m-1"> 
            <IconButton  
                onClick={onClose}  
                className="text-black-500"
            >  
                <ArrowForwardIosIcon/>  
            </IconButton>  
            <span className="font-vazir text-gray-700 text-md text-lg mt-2">بازگشت</span>
        </div> 
        <hr className="border-t border-gray-700" /> 
        {data ? (
            <>
            <div className="flex flex-row-reverse">
                <Image
                    className="rounded-2xl mt-5 mb-10 mr-7 ml-4"
                    src={data.photo_url}
                    alt="productImg"
                    width={300}
                    height={200}
                />
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between w-full">  
                        <div className="mt-6 box-content rounded-2xl bg-[#d9d9d9] w-auto h-7 ml-10 mt-1">  
                            <span className="flex flex-row text-xl font-vazir ml-3 mb-1">  
                                {convertToPersianNumbers(data.average_rate)}  
                                <FaStar className="m-1 mr-3" color="orange" />  
                            </span>   
                        </div>  
                        <span className="font-vazir font-bold text-2xl mt-6">{data.name}</span>  
                    </div>  
                    <div className="mt-7 ml-10 font-vazir text-lg font-medium text-right text-justify">{data.description}</div>
                    <div className={`box-contetnt rounded-2xl bg-${data.color}-300 border-1 p-2 mt-7 ml-10 font-vazir text-lg font-semibold text-right text-justify`}>{data.box_color}</div>
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
            </div>
            </>
        ) : (
            <p>Loading...</p> 
        )}
        
        </Dialog>  
    );  
}  
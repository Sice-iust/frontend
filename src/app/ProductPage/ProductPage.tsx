import React, { useState,useEffect } from "react";  
import { Dialog, DialogActions, DialogContent, DialogTitle, Button ,IconButton} from "@mui/material";  
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';  
import Image from 'next/image'; 
import { FaStar } from "react-icons/fa"; 
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoPerson } from "react-icons/io5";
import moment from 'moment-jalaali';  
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { useTheme } from '../theme';
import { useCart } from "../../context/Receiptcontext";

export default function ProductPage({ open, onClose, itemid }) { 
    const { userquantity, incrementQuantity, decrementQuantity, removeItem , handleAdd,fetchDatauser} = useCart(); 
    const [isFinished, setIsFinished] = useState(false);  
    const [data, setData] = useState(null); 
    const [comments, setComments] = useState([]); 
    const { isDarkMode, toggleDarkMode } = useTheme(); 


    const convertToPersianNumbers = (num: string | number): string => {  
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
    }; 

    const convertToPersianDate = (dateString: string): string[] => {  
        moment.loadPersian({ dialect: 'persian-modern' });  
        const date = dateString;   
        if (date) {  
            const day = convertToPersianNumbers(moment(date).locale('fa').format('jD'));  
            const month = moment(date).locale('fa').format('jMMMM');  
            const year = convertToPersianNumbers(moment(date).locale('fa').format('jYYYY'));  
            return [day, month, year];  
        } else {  
            return ["Invalid date format", "", ""];  
        }  
    };  
    useEffect(() => { 
        
        fetchDatauser(itemid);
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

    

    useEffect(() => {  
        const fetchcomments = async () => {  
            try {  
                const response = await axios.get(`https://nanziback.liara.run/product/comments/${itemid}/`, {   
                    headers: { "Content-Type": "application/json", }
                }); 
                setComments(response.data) ;
                console.log("Response Data:", response.data);  
                console.log("comments: ",comments) ;
            } catch (err) {  
                console.error("Error fetching data:", err);  
            } 
        };  
    
        if (itemid) {  
            fetchcomments();  
        }  
    }, [itemid]); 

    
    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div 
                className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10 cursor-pointer hover:transition-transform hover:duration-200 hover:bg-gray-600 rounded-full hover:scale-110 " 
                onClick={onClick}
            >
                <ArrowForwardIosIcon className="text-gray-400 w-5 h-5" />
            </div>
        );
    };
    
    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div 
                className=" absolute top-1/2 transform -translate-y-1/2 left-2 z-10 cursor-pointer hover:transition-transform hover:duration-200 hover:bg-gray-600 rounded-full hover:scale-110" 
                onClick={onClick}
            >
                <ArrowBackIosIcon className="text-gray-400 w-5 h-5" />
            </div>
        );
    };
          
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '30px', 
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        nextArrow: <CustomNextArrow />, 
        prevArrow: <CustomPrevArrow />, 
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '40px', 
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: '30px',
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            },
        ]
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
        <div className={` ${isDarkMode ? "bg-[#191919]" : "bg-white"}`} >
        <div className="flex flex-row-reverse m-1"> 
            <IconButton  
                onClick={onClose}  
                className="text-black-500"
            >  
                <ArrowForwardIosIcon className={` ${isDarkMode ? "text-[#B2A7A7]" : "text-gray-600"}`}/>  
            </IconButton>  
            <span className={`font-vazir ${isDarkMode ? "text-[#B2A7A7]" : "text-gray-700"} text-md text-lg mt-2`}>بازگشت</span>
        </div> 
        <hr className={`border-t ${isDarkMode ? "border-[#ffffff]" : "border-gray-700"}`} /> 
        {data ? (
            <>
            <div className="flex flex-col">
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
                            <span className={`font-vazir font-bold text-2xl mt-6 ${isDarkMode ? "text-[#ffffff]" : "text-black"}`}>{data.name}</span>  
                        </div>  
                        <div className={`mt-7 ml-10 font-vazir text-lg font-medium text-right text-justify ${isDarkMode ? "text-[#BAB2B2]" : "text-gray-700"}`}>{data.description}</div>
                        <div className={`box-content rounded-2xl bg-${data.color}-400 border-1 p-2 mt-7 ml-10 font-vazir text-lg text-right text-justify ${isDarkMode ? "text-[#ffffff] border-white font-medium" : "text-black font-semibold "}`}>{data.box_color}</div>
                        <div className="flex flex-row-reverse mt-9 justify-between">  
                                <div className='flex flex-col'>  
                                    <div className={`font-vazir text-lg text-right text-xl ${isDarkMode ? "text-[#ffffff] font-medium" : "text-black font-semibold "}`}>  
                                        {convertToPersianNumbers(Math.round(parseFloat(data.discounted_price)).toLocaleString())} :قیمت  
                                    </div>  
                                    {data.discount > 0 && (  
                                        <div className="flex flex-row-reverse mr-5">  
                                            <div className="bg-[#F18825] text-lg w-9 h-5 text-white text-[14px] pl-1.5 rounded-md">  
                                                %{convertToPersianNumbers(data.discount)}  
                                            </div>  
                                            <div className="mr-2 text-gray-500 line-through text-lg">  
                                                {convertToPersianNumbers(Math.round(Number(data.price)).toLocaleString())}  
                                            </div>  
                                        </div>  
                                    )}  
                                </div>  
                                { userquantity === null || userquantity === 0 ? (  
                                    <button  
                                        className={` ${data.stock==0 ||  userquantity >= data.stock? "bg-gray-300 cursor-not-allowed" : "bg-[#F18825] hover:bg-orange-400 transition duration-300 hover:scale-110"} rounded-xl w-30 h-12 text-white text-2xl font-vazir font-md mr-24 ml-10 mb-5`}  
                                        onClick={() => handleAdd(data.id)}  
                                        disabled={ data.stock==0}  
                                    >  
                                        افزودن  
                                    </button>  
                                ) : (  
                                    <div className="flex mr-19 space-x-2 ml-5 mb-5">  
                                        <button  
                                            className={`${isDarkMode ? "bg-black" : "bg-white"} ml-5 border-3 ${userquantity >= data.stock ? "border-gray-300 text-gray-300 cursor-not-allowed" : "border-green-500 text-green-500 cursor-pointer"} font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 ${userquantity >= data.stock ? "cursor-not-allowed hover:bg-white" : "hover:bg-green-500 hover:text-white hover:scale-110"}`}                                        
                                            onClick={() => incrementQuantity(data.id)}  
                                            disabled={userquantity >= data.stock}  
                                        >  
                                            +  
                                        </button>  
                                        <span className="text-lg font-semibold">{convertToPersianNumbers(userquantity || 0) || 0}</span>  
                                        {userquantity === 1 ? (  
                                            <button  
                                                className={`${isDarkMode ? "bg-black" : "bg-white"} cursor-pointer border-3 border-gray-300 text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110`} 
                                                onClick={() => {  
                                                    removeItem(data.id);
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
                                                className={`${isDarkMode ? "bg-black" : "bg-white"} cursor-pointer border-3 border-red-500 text-red-500 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-red-500 hover:text-white hover:scale-110`}  
                                                onClick={() => decrementQuantity(data.id)}  
                                                disabled={userquantity <= 1}  
                                            >  
                                                <span className="text-xl">-</span>  
                                            </button>  
                                        )}  
                                    </div>  
                                )}  
                            </div>                   
                    </div> 

                </div>

            {comments.length > 0 ? ( 
            <>
                <hr className={`border-t mb-10 ${isDarkMode ? "border-[#ffffff]" : "border-gray-700"}`} /> 
                <div className="flex justify-end">  
                    <span className={`font-vazir font-bold text-2xl mr-10 ${isDarkMode ? "text-[#ffffff]" : "text-black"}`}>نظرات کاربران</span>  
                </div>   
                <Slider {...settings} className="mt-10 mr-5 ml-5 mb-15 ">  
                    {comments.map((comment, index) => (  
                        <div key={index} className={`min-h-40 w-27 rounded-2xl ${isDarkMode ? "bg-black border-white" : "bg-white"} border-1 p-2 flex flex-col`}>
                            <div className="flex flex-row-reverse justify-between">
                                <div className="flex flex-row-reverse">
                                    <IoPerson className={`w-4 h-6 ml-1 mr-1 ${isDarkMode ? "text-[#ffffff]" : "text-black"}`}/> 
                                    <span className={`font-vazir font-semibild text-lg ${isDarkMode ? "text-[#ffffff]" : "text-black"}`}>{comment.user_name}</span>
                                </div>
                                <div className=" box-content rounded-2xl bg-[#d9d9d9] w-auto h-6 ml-1">  
                                <span className="flex flex-row text-lg font-vazir ml-3 mb-1">  
                                    {convertToPersianNumbers(comment.rating)}  
                                    <FaStar className="m-1 mr-3" color="orange" />  
                                </span>   
                                </div> 
                            </div>
                            <div className="flex flex-row-reverse justify-between">
                                <div className={`flex flex-row-reverse mr-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"} font-vazir text-sm gap-1 mt-2`}>
                                    <span>{convertToPersianDate(comment.posted_at)[0]}</span>
                                    <span>{convertToPersianDate(comment.posted_at)[1]}</span>
                                    <span>{convertToPersianDate(comment.posted_at)[2]}</span>
                                </div>
                                <div className={`box-contetnt rounded-4xl h-7 border-1 w-26 ml-1 mt-1 ${comment.suggested >2 ? "bg-green-300" : "bg-red-400"}`}>
                                {comment.suggested >2 ? (
                                        <div className="flex flex-row-reverse p-1">
                                            <BiLike className="w-3 h-4 ml-1 mr-1"/>
                                            <span className="font-vazir text-xs font-md">پیشنهاد می‌کنم</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row-reverse p-1">
                                            <BiDislike className="w-3 h-5 ml-1"/>
                                            <span className="font-vazir text-xs ">پیشنهاد نمی‌کنم</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={`box-content w-full min-h-20 rounded-2xl mt-5 ${isDarkMode ? "border-white" : "border-black"} border-1 text-right overflow-hidden break-words`}>
                                <span className={`font-vazir ${isDarkMode ? "text-[#ffffff]" : "text-black"} text-lg p-3`}>{comment.comment}</span>
                            </div> 
                        </div>  
                    ))}  
                </Slider> 
                </>
            ) : (  
                <div></div>  
            )}   
            </div>
            </>
        ) : (
            <p>Loading...</p> 
        )} 
        </div>    
        </Dialog>  
    );  
}  
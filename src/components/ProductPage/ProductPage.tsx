import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
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
import { useCart } from "../../context/Receiptcontext";
import { RiUserFill } from "react-icons/ri";
import { convertToPersianNumbers } from '../../utils/Coversionutils';
import LoadingBox from "../../components/Loading/LoadingBox";

interface DataType {
    photo_url: string;
    discounted_price: string;
    color: string;
    average_rate: string;
    name: string;
    description: string;
    stock: number;
    id: number;
    price: string;
    discount: number;
    box_color: string;

}

interface CommentType {
    user_name: string;
    rating: number;
    posted_at: string;
    suggested: number;
    comment: string;
}

export default function ProductPage({ open, onClose, itemid }) {
    const { userquantity, incrementQuantity, decrementQuantity, removeItem, handleAdd, fetchDatauser } = useCart();
    const [data, setData] = useState<DataType | null>(null);
    const [comments, setComments] = useState<CommentType[]>([]);

    console.log("quantity", userquantity[itemid])

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

        fetchDatauser();
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://nanziback.liara.run/product/${itemid}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("item id : ", itemid);
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
                setComments(response.data);
                console.log("Response Data: comment", response.data);
                console.log("comments: ", comments);
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
        centerPadding: '70px',
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
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 bg-black opacity-50 transition-opacity" aria-hidden="true"></div>

            <div className="flex items-center justify-center min-h-full text-center lg:p-4">
                <div className={`relative transform overflow-hidden  text-left bg-white dark:bg-[#191919]
                        shadow-xl transition-all min-h-screen w-full 
                        md:my-8 sm:w-full  md:max-w-[85%] lg:max-w-[65%] sm:min-h-[420px] lg:rounded-lg`}>

                    <div className="pb-4 text-right">

                        <div className={`bg-white dark:bg-[#191919]`} >
                            <div className="flex flex-row-reverse m-1">
                                <IconButton
                                    onClick={onClose}
                                    className="text-black-500 "
                                >
                                    <ArrowForwardIosIcon className={`dark:text-[#B2A7A7] text-gray-600 `}
                                    />
                                </IconButton>
                                <span className={`font-vazir dark:text-[#B2A7A7] text-gray-700 mt-2 sm:text-md text-lg `}>بازگشت</span>
                            </div>
                            <hr className={`border-t dark:border-[#ffffff] border-gray-700`} />
                            {data ? (
                                <>
                                    <div className="flex flex-col">
                                        <div className=" mr-[20px] ml-auto  flex-row-reverse sm:flex">
                                            <Image
                                                className="rounded-2xl mt-5 mb-10 ml-6 mr-5 w-[20%] h-[35%] hidden sm:flex"
                                                src={data.photo_url}
                                                alt="productImg"
                                                width={300}
                                                height={200}
                                            />
                                            {/* phone */}
                                            <div className="flex justify-center items-center sm:hidden">
                                                <Image
                                                    className="rounded-2xl mt-5 mb-0 w-[25%] h-[15%]"
                                                    src={data.photo_url}
                                                    alt="productImg"
                                                    width={300}
                                                    height={200}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex flex-row justify-between items-center w-full">
                                                    <div className={`dark:bg-[#383535] bg-[#d9d9d9] mt-0 box-content rounded-2xl w-auto h-7 ml-4 sm:mt-6 sm:ml-10`}>
                                                        <span className={`dark:text-white text-black flex flex-row mt-0.5 text-base font-vazir ml-3 mb-1 lg:text-xl lg:mt-0`}>
                                                            {convertToPersianNumbers(data.average_rate)}
                                                            <FaStar className="m-1 mr-3" color="orange" />
                                                        </span>
                                                    </div>
                                                    <span className={`font-vazir font-semibold 
                                text-md mt-0 sm:font-bold 
                                sm:text-base lg:text-2xl sm:mt-6 dark:text-white text-black`}>{data.name}</span>
                                                </div>
                                                <div className={`mt-2 ml-4 font-vazir text-sm font-medium text-right sm:text-lg lg:mt-7 sm:ml-10
                                        dark:text-[#BAB2B2] text-gray-700`}>
                                                    {data.description}
                                                </div>
                                                <div className={` box-content rounded-2xl bg-${data.color}-400 border-1 p-2 mt-3 ml-4 font-vazir sm:ml-10
                                         text-xs sm:text-base lg:text-lg lg:mt-7 dark:text-white dark:border-white dark:font-medium 
                                         text-black font-semibold text-right `}>{data.box_color}</div>
                                                <div className="flex flex-row-reverse mt-2 justify-between lg:mt-9">
                                                    <div className='flex flex-col'>
                                                        <div className={`font-vazir text-right text-base sm:text-xl 
                                        dark:text-[#ffffff] dark:font-medium text-black font-semibold `}>
                                                            {convertToPersianNumbers(Math.round(parseFloat(data.discounted_price)).toLocaleString())} :قیمت
                                                        </div>
                                                        {data.discount > 0 && (
                                                            <div className="flex flex-row-reverse lg:mr-5">
                                                                <div className="bg-[#F18825] text-xs w-8 h-5 text-white lg:text-[14px] sm:w-9
                                                            rounded-md flex items-center justify-center leading-[20px]">
                                                                    %{convertToPersianNumbers(data.discount)}
                                                                </div>


                                                                <div className="mr-2 text-gray-500 line-through  text-sm sm:text-lg">
                                                                    {convertToPersianNumbers(Math.round(Number(data.price)).toLocaleString())}

                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {userquantity[itemid] === undefined || userquantity[itemid] === 0 ? (
                                                        <button
                                                            className={` ${data.stock == 0 || userquantity[itemid] >= data.stock ? "bg-gray-300 cursor-not-allowed" :
                                                                "bg-[#F18825] hover:bg-orange-400 transition duration-300 hover:scale-110"} 
                                            rounded-xl w-20 h-10  mt-2 text-white text-sm font-vazir font-md mr-24 ml-4 mb-5 
                                            sm:ml-10 lg:text-2xl lg:w-30 lg:h-12 lg:mt-0 `}
                                                            onClick={() => handleAdd(data.id)}
                                                            disabled={data.stock == 0}
                                                        >
                                                            افزودن
                                                        </button>
                                                    ) : (
                                                        <div className="flex mr-19 space-x-2 ml-4 mt-1 mb-5 sm:ml-5 sm:mt-0">
                                                            <button
                                                                className={`dark:bg-black bg-white}  border-3 
                                                     ${userquantity[itemid] >= data.stock ? "border-gray-300 text-gray-300 cursor-not-allowed" :
                                                                        "border-green-500 text-green-500 cursor-pointer"} font-semibold text-3xl w-8 h-8 
                                                    flex items-center justify-center rounded-full transition-transform duration-200 sm:ml-5
                                                    ${userquantity[itemid] >= data.stock ? "cursor-not-allowed hover:bg-white" :
                                                                        "hover:bg-green-500 hover:text-white hover:scale-110"}`}
                                                                onClick={() => incrementQuantity(data.id)}
                                                                disabled={userquantity[itemid] >= data.stock}
                                                            >
                                                                +
                                                            </button>
                                                            <span className={`dark:text-white text-black text-lg font-semibold`}>{convertToPersianNumbers(userquantity[itemid] || 0) || 0}</span>
                                                            {userquantity[itemid] === 1 ? (
                                                                <button
                                                                    className={`dark:bg-black bg-white cursor-pointer border-3 border-gray-300 
                                                text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full 
                                                transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110`}
                                                                    onClick={() => {
                                                                        removeItem(data.id);
                                                                    }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                                                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                                        strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M3 6h18" />
                                                                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                        <path d="M10 11v6" />
                                                                        <path d="M14 11v6" />
                                                                        <path d="M5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z" />
                                                                    </svg>
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className={`dark:bg-black bg-white cursor-pointer border-3 
                                                            border-red-500 text-red-500 font-semibold text-3xl w-8 h-8 flex 
                                                            items-center justify-center rounded-full transition-transform \
                                                            duration-200 hover:bg-red-500 hover:text-white hover:scale-110`}
                                                                    onClick={() => decrementQuantity(data.id)}
                                                                    disabled={userquantity[itemid] <= 1}
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
                                                <hr className={`border-t mb-5 dark:border-[#ffffff] border-gray-700 lg:mb-10`} />
                                                <div className="flex justify-end">
                                                    <span className={`font-vazir font-bold text-base sm:text-2xl mr-5 dark:text-[#ffffff] text-black
                                       md:mr-10`}>نظرات کاربران</span>
                                                </div>
                                                <div className="hidden md:block">
                                                    <Slider {...settings} className="mt-10 mr-5 ml-5 mb-15">
                                                        {comments.map((comment, index) => (
                                                            <div className="mx-10" key={index}>
                                                                <div className={`min-h-40 w-60 rounded-2xl 
                                                                    dark:bg-black bg-[#f1f1f1] p-2 flex flex-col `} >
                                                                    <div className="flex flex-row-reverse justify-between">
                                                                        <div className="flex flex-row-reverse">
                                                                            <IoPerson className={`w-4 h-6 ml-1 mr-1 dark:text-[#ffffff] text-black`} />
                                                                            <span className={`font-vazir font-semibild text-lg dark:text-[#ffffff] text-black`}>{comment.user_name}</span>
                                                                        </div>
                                                                        <div className={`dark:bg-[#383535] bg-[#d9d9d9] box-content rounded-2xl  w-auto h-6 ml-1`}>
                                                                            <span className={`dark:text-white text-black flex flex-row text-lg font-vazir ml-3 mb-1`}>
                                                                            {convertToPersianNumbers(comment.rating? comment.rating : 0)}
                                                                            <FaStar className="m-1 mr-3" color="orange" />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-row-reverse justify-between">
                                                                        <div className={`flex flex-row-reverse mr-1 dark:text-gray-300 text-gray-600 font-vazir text-sm gap-1 mt-2`}>
                                                                            <span>{convertToPersianDate(comment.posted_at)[0]}</span>
                                                                            <span>{convertToPersianDate(comment.posted_at)[1]}</span>
                                                                            <span>{convertToPersianDate(comment.posted_at)[2]}</span>
                                                                        </div>
                                                                        <div className={`box-contetnt rounded-4xl h-7 border-1 w-26 ml-1 mt-1 ${comment.suggested > 2 ? "bg-green-500" : "bg-red-500"}`}>
                                                                            {comment.suggested > 2 ? (
                                                                                <div className="flex flex-row-reverse p-1">
                                                                                    <BiLike className="w-3 h-4 ml-1 mr-1" />
                                                                                    <span className="font-vazir text-xs font-md">پیشنهاد می‌کنم</span>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex flex-row-reverse p-1">
                                                                                    <BiDislike className="w-3 h-5 ml-1" />
                                                                                    <span className="font-vazir text-xs ">پیشنهاد نمی‌کنم</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className={`box-content w-full
                                                                         min-h-20 rounded-2xl mt-5
                                                                          dark:bg-[#383535] bg-white
                                                                            text-right overflow-hidden break-words `}>
                                                                        <span className={`font-vazir dark:text-[#ffffff] text-black text-medium p-3 mr-2`}>{comment.comment}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Slider>
                                                </div>
                                                {/* phone */}
                                                {comments.map((comment, index) => (
                                                    <div key={index} className={` w-auto p-3 flex flex-col bg-white  
                        border-b last:border-b-0 md:hidden`}>

                                                        <div className="flex justify-between mr-2">

                                                            <div className=" box-content rounded-2xl bg-white border w-auto h-5 ml-2">
                                                                <span className="flex flex-row text-sm font-vazir ml-2 mb-1">
                                                                    {convertToPersianNumbers(comment.rating? comment.rating : 0)}
                                                                    <FaStar className="m-0.5 mr-2 ml-1" color="orange" />
                                                                </span>
                                                            </div>


                                                            <div className="flex ml-auto font-vazir font-medium text-md">
                                                                {comment.user_name}
                                                                <RiUserFill className="text-md ml-1 mt-0.5" />
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-row-reverse justify-between items-center mr-2">
                                                            <div className="flex flex-row-reverse text-sm font-vazir text-gray-600 mt-2">
                                                                <span>{convertToPersianDate(comment.posted_at)[0]}</span>
                                                                <span>{convertToPersianDate(comment.posted_at)[1]}</span>
                                                                <span>{convertToPersianDate(comment.posted_at)[2]}</span>
                                                            </div>


                                                            <div className={`box-content rounded-4xl h-5 border w-25 ml-1 mt-1 py-0.25 px-0.25
                                        ${comment.suggested > 2 ? "bg-green-500" : "bg-red-500"}`}>
                                                                {comment.suggested > 2 ? (
                                                                    <div className="flex flex-row-reverse ">
                                                                        <BiLike className="w-3 h-4 ml-1 mr-1" />
                                                                        <span className="font-vazir text-xs  ">پیشنهاد می‌کنم</span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex flex-row-reverse">
                                                                        <BiDislike className="w-3 h-5 ml-1 mr-1" />
                                                                        <span className="font-vazir text-xs">پیشنهاد نمی‌کنم</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="mt-0 p-2 rounded-xl  text-righ text-gray-800 mr-1 ">
                                                            <span className=" font-vazir text-sm font-medium ">{comment.comment}</span>
                                                        </div>

                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <div></div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="fixed inset-0 z-10 overflow-y-auto">
                                    <div className="fixed inset-0 bg-black opacity-50 transition-opacity" aria-hidden="true"></div>
                                    <div className="flex items-center justify-center min-h-full text-center lg:p-4">
                                        <div className={`relative transform overflow-hidden  text-left dark:bg-[#191919] bg-white
                        shadow-xl transition-all min-h-screen w-full 
                        md:my-8 sm:w-full  md:max-w-[85%] lg:max-w-[65%] sm:min-h-[420px] lg:rounded-lg`}>
                                            <div className="pb-4 text-right">
                                                <div className={` dark:bg-[#191919] bg-white`} >
                                                    <div className={`absolute top-0 left-10 right-0 bottom-0 rounded-2xl flex items-center justify-center 
                                            dark:bg-[#191919] dark:border-white bg-white bg-opacity-70`}>
                                                        <LoadingBox />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div >
                    </div>
                </div>
            </div>
        </div>

    );
}  
import React, { useState,useEffect } from "react"; 
import { CgNotes } from "react-icons/cg";
import emptyReceipt from "../../assets/emptyReceipt.png";
import Image from 'next/image';

const Receipt: React.FC = () => {  


    const convertToPersianNumbers = (num: string | number): string => {  
        const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];  
        return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);  
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


    const [data, setData] = useState(null);
    const [dataLength,setDataLength]=useState(0);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {  
        setLoading(true); 
        try {  
            const response = await axios.get("https://nanziback.liara.run/user/cart/", {  
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },  
            });  
            setData(response.data);  
            console.log(`Data from server:`, response.data); 
        } catch (error) {  
            console.error("Error fetching data:", error);  
            setData(null); 
        } finally {  
            setLoading(false); 
        }  
    };  

    useEffect(() => {  
        fetchData();  
    }, []);  

    if (loading) {  
        return <div className="text-center pt-10">...در حال بارگذاری</div>; 
    }  
    if (!data || !data.cart_items) {  
        return <div className="text-center pt-10">مشکلی پیش آمد. لطفا تست مجدد کنید.</div>; 
    }  

    return (  
        <div className="box-content ml-10 mt-10 mb-10 min-h-140 w-100 rounded-2xl bg-white shadow-[5px_7px_5px_rgba(0,0,0,0.25)]">  
            <h2 className="text-[25px] text-center pt-5 pb-2 font-vazir font-bold">  
                سبد خرید {data.counts > 0 ? `(${convertToPersianNumbers(data.counts)})` : ""}  
            </h2>  
            {data.cart_items.length === 0 ? ( 
                <div className="flex flex-col justify-center items-center mt-10">  
                    <Image src={emptyReceipt} alt="emptyReceipt" className="w-70 h-70 "/>  
                    <span className="font-vazir text-lg font-semibold mt-2">!سبد خرید شما خالی است</span>
                </div> 
            ) : (  
                <div className={`${data.counts > 2 ? "overflow-y-scroll max-h-60" : ""}`}>  
                    {data.cart_items.map(item => (  
                        <div key={item.id} className="flex flex-row-reverse items-center justify-between w-full place-self-end mr-1 mt-4 pr-1">  
                            <button  
                                className="bg-white cursor-pointer text-red-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-102"  
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
                                <span className="text-[18px] text-right mr-3 mt-2 font-vazir font-semibold">  
                                    {item.product.name}  
                                </span>  
                                <div className="flex justify-between items-center mr-6 mt-2 flex items-center space-x-2">  
                                    <div className="flex items-center space-x-2">  
                                        <button  
                                            className={`bg-white ml-5 border-3 ${item.quantity >= item.product.stock ? "border-gray-300 text-gray-300 cursor-not-allowed" : "border-green-500 text-green-500 cursor-pointer"} font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 ${item.quantity >= item.product.stock ? "cursor-not-allowed hover:bg-white" : "hover:bg-green-500 hover:text-white hover:scale-110"}`}  
                                            onClick={() => incrementQuantity(item.product.id)}  
                                            disabled={item.quantity >= item.product.stock}  
                                            aria-label={`Increase quantity of ${item.product.name}`}  
                                        >  
                                            +  
                                        </button>  
                                        <span className="text-lg font-semibold">{convertToPersianNumbers(item.quantity)}</span>  
                                        {item.quantity === 1 ? (  
                                            <button  
                                                className="bg-white cursor-pointer border-3 border-gray-300 text-gray-400 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-gray-300 hover:text-gray-500 hover:scale-110"  
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
                                                className="bg-white cursor-pointer border-3 border-red-500 text-red-500 font-semibold text-3xl w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-200 hover:bg-red-500 hover:text-white hover:scale-110"  
                                                onClick={() => decrementQuantity(item.product.id)}  
                                                aria-label={`Decrease quantity of ${item.product.name}`}  
                                            >  
                                                <span className="text-xl">-</span>  
                                            </button>  
                                        )}  
                                    </div>  
                                    <span className="text-[15px] text-right font-vazir font-medium">  
                                        قیمت: {convertToPersianNumbers(Number(item.product.price).toLocaleString())} تومان  
                                    </span>  
                                </div>  
                                {item.product.discount > 0 && (  
                                    <div className="flex flex-row-reverse mr-6">  
                                        <div className="bg-[#F18825] text-lg w-9 h-5 text-white text-[14px] pl-1.5 rounded-md">  
                                            %{convertToPersianNumbers(item.product.discount)}  
                                        </div>  
                                        <div className="mr-2 text-gray-500 line-through">{convertToPersianNumbers(item.price.toLocaleString())}</div>  
                                    </div>  
                                )}  
                            </div>  
                        </div>  
                    ))}  
                </div>  
            )}  
            {data.cart_items.length > 0 && (  
                <>  
                    <div className="flex flex-row-reverse space-x-reverse space-x-2 mt-7 mr-3">  
                        <CgNotes color="#F18825" className="w-6 h-5" />  
                        <h2 className="text-[17px] font-vazir font-semibold text-right">خلاصه سفارش</h2>  
                    </div>  
                    <div className="p-5 flex flex-col pt-2">  
                        {data.cart_items.map(item => (  
                            <div key={item.product.id} className="flex flex-row-reverse py-2 justify-between">  
                                <span className="text-[17px] font-vazir font-medium text-right  mr-6">{item.product.name}</span>
                                <span className="flex flex-row-reverse">
                                <span className="ml-1 text-gray-500">× {convertToPersianNumbers(item.quantity)}</span>  
                                <span>{convertToPersianNumbers(Number(item.product.price).toLocaleString())}</span>  
                                <span className="text-[14px] font-vazir font-medium text-right mr-2 text-gray-600">تومان</span>  
                                </span>  
                            </div>  
                        ))}  
                        {data.total_discount >0 && (
                            <>
                            <div className="flex flex-row-reverse py-2 justify-between ">  
                                <span className="text-[14px] font-vazir font-medium text-right mr-2 text-green-600 font-semibold mr-6 ">سود شما از این خرید</span>
                                <span className="flex flex-row-reverse">
                                <span className="text-green-600 font-semibold">{convertToPersianNumbers(data.total_discount.toLocaleString())}</span>    
                                <span className="text-[14px] font-vazir font-medium text-right mr-2 text-green-600">تومان</span>    
                                </span>
                            </div>                            
                            </>
                        )
                        }
                        <div className="flex flex-row-reverse py-2 border-t mt-6 ">  
                            <span className="font-vazir font-semibold ml-50 mr-6">جمع کل</span>  
                            <span className="font-bold font-2xl">{convertToPersianNumbers(data.total_actual_price.toLocaleString())}</span>  
                            <span className="text-[14px] font-vazir font-medium text-right mr-2 text-gray-600">تومان</span>  
                        </div>  
                    </div>   
            <button className="ml-20 mb-7 w-55 bg-[#F18825] text-white font-medium font-vazir font-2xl py-2 rounded-xl shadow-md hover:bg-orange-400 transition duration-300 hover:scale-110">  
                ثبت و ادامه  
            </button> 
            </>  
            )}  
        </div>  
        
    );  
};  

export default Receipt;  
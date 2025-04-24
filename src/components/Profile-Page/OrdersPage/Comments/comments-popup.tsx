import React, {useEffect,useState} from 'react';  
import { RxCross1 } from "react-icons/rx";
import Comments from "./Comments-detail";

interface CommentsPopupProps {  
    isOpen: boolean;  
    onClose: () => void;  
    orderId: number;
    total_price_after : string;
}  

export interface Item { 
    id : number;
    name:string;
    price:string; 
    photo: string; 
    quantity: number; 
    
}  

const CommentsPopup: React.FC<CommentsPopupProps> = ({ isOpen, onClose, orderId ,total_price_after }) => {
    
    const [ProductData, setProductData] = useState<any>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {  
        if (isOpen) {  
            const fetchProductData = async () => {  
                try {  
                    const response = await fetch(`https://nanziback.liara.run/user/order/invoice/${orderId}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                      });
                    if (!response.ok) {  
                        throw new Error('Failed to fetch invoice data');  
                    }  
                    const data = await response.json();  
                    setProductData(data);  
                } catch (err) {  
                    setError(err.message);  
                } finally {  
                    setLoading(false);  
                }  
                console.log(error);
            };  

            fetchProductData();  
        }  
    }, [isOpen, orderId]); 

    
    // console.log(total_price_after)
    // console.log("price:",total_price_after);
     

    if (!isOpen) return null;  
    


    return (  
        <div className="fixed inset-0 z-10 overflow-y-auto ">  
            <div className="fixed inset-0 bg-black opacity-50 transition-opacity  " aria-hidden="true"></div>  
                <div className="flex items-center justify-center min-h-full  text-center lg:p-4">  
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl 
                                    transition-all min-h-screen w-full 
                                    sm:my-8 sm:w-full sm:max-w-lg sm:h-auto">  
                        <div className="bg-white px-1 pt-5 pb-4 text-right md:px-6"> 
                            <RxCross1 className="cursor-pointer ml-auto" onClick={onClose}  />

                            <div className="bg-white  font-vazir  pb-4  overflow-y-auto lg:p-4 lg:mt-0">  
                                <h2 className="text-2xl font-bold font-vazir mb-1.5 mt-4 lg:mt-0">ثبت نظر</h2>  
                                {ProductData ? (
                                <Comments orderId={orderId} 
                                payment={ProductData.payment} 
                                shippingfee={ProductData.shipping_fee} 
                                discount={ProductData.discount} 
                                total_price={total_price_after}
                                Product={ProductData.items.map(item => ({
                                    id: item.product.id,
                                    name: item.product.name,
                                    price: item.product.price,
                                    photo: item.product.photo,
                                    quantity: item.quantity,
                                }))} />) : (null)}
                            </div>  
                        </div>  
                    </div>  
                </div>  
        </div>  
    );  
};  

export default CommentsPopup;  
import React, {useEffect,useState} from 'react';  
import { RxCross1 } from "react-icons/rx";
import Invoice from "../../ProfilePage/OrdersPage/Invoice/invoice-detail";

interface InvoicePopupProps {  
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

const InvoicePopup: React.FC<InvoicePopupProps> = ({ isOpen, onClose, orderId ,total_price_after }) => {
    
    const [invoiceData, setInvoiceData] = useState<any>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {  
        if (isOpen) {  
            const fetchInvoiceData = async () => {  
                try {  
                    const response = await fetch(`https://nanziback.liara.run/nanzi/admin/order/invoice/${orderId}/`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                      });
                    if (!response.ok) {  
                        throw new Error('Failed to fetch this data');  
                    }  
                    const data = await response.json();  
                    console.log("invoice",data)
                    setInvoiceData(data); 
                    console.log(data) 
                } catch (err) {  
                    setError(err.message);  
                } finally {  
                    setLoading(false);  
                }  
                console.log(error);
            };  

            fetchInvoiceData();  
        }  
    }, [isOpen, orderId]); 

     const calculateTotalPrice = () => {
        if (!invoiceData) return "0";
        
        const payment = parseFloat(invoiceData.payment) || 0;
        const discount = parseFloat(invoiceData.discount) || 0;
        const shippingFee = parseFloat(invoiceData.shipping_fee) || 0;
        
        return (payment - discount + shippingFee).toFixed(2);
    };

    
    // console.log(total_price_after)
    // console.log("price:",total_price_after);
     

    if (!isOpen) return null; 
    // if(loading) return null; 
    


    return (  
        <div className="fixed inset-0 z-10 overflow-y-auto ">  
            <div className="fixed inset-0 bg-black opacity-50 transition-opacity  " aria-hidden="true"></div>  
                <div className="flex items-center justify-center min-h-full  text-center lg:p-4">  
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left 
                                    shadow-xl transition-all min-h-screen lg:min-h-auto w-full
                                    sm:my-8 sm:w-full sm:max-w-lg sm:h-auto">  
                        <div className="bg-white dark:bg-[#191919] px-2 pt-5 pb-4 text-right md:px-6"> 
                            <RxCross1 className="cursor-pointer ml-auto dark:text-[#B2A9A9]" onClick={onClose}  />

                            <div className="bg-white dark:bg-[#191919] font-vazir  pb-4  overflow-y-auto lg:p-4 lg:mt-0">  
                                <h2 className="text-2xl font-bold font-vazir mb-1.5 mt-4 lg:mt-0 text-black dark:text-white">فاکتور سفارش</h2>  
                                {invoiceData && invoiceData.items ? (
                                <Invoice orderId={orderId} 
                                payment={invoiceData.payment} 
                                shippingfee={String(invoiceData.shipping_fee)} 
                                discount={invoiceData.discount} 
                                total_price={String(Number(calculateTotalPrice()))}
                                Product={invoiceData.items.map(item => ({
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

export default InvoicePopup;  
import React , {useState} from "react"; 
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import { FaPhone } from 'react-icons/fa';
import { TbFileDescription } from "react-icons/tb";
import { TbShoppingCartX } from "react-icons/tb";
import { TbDownload } from "react-icons/tb";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import vazirBase64 from "./VazirBase64";
import { MdOutlineCancel } from "react-icons/md";
import InvoicePopup from "../../ProfilePage/OrdersPage/Invoice/Orders-invoice-popup";

interface OrderCardProps {  
    orderkey: number;
    id: string;  
    Reciever: string;
    phone: string;
    total_price: string;  
    delivery_day: string;  
    delivery_clock: string;  
    distination: string;  
    Description: string;
    iscancled?: boolean;
    isarchived?: boolean;
    iscompleted : boolean;
    admin_reason : string | null;
}  

const OrderCard: React.FC<OrderCardProps> = ({  
    orderkey,
    id,  
    Reciever,
    phone,
    total_price,  
    delivery_day,  
    delivery_clock,  
    distination, 
    Description, 
    iscancled = false,
    isarchived = false,
    iscompleted=false,
    admin_reason,
}) => {  
    


        const handleDownloadPDF = () => {
            const doc = new jsPDF();
            doc.addFileToVFS("Vazir.ttf", vazirBase64);
            doc.addFont("Vazir.ttf", "Vazir", "normal");
            doc.setFont("Vazir", "normal");

            doc.setFontSize(20);
            doc.text("نانزی", 105, 15, { align: "center" });

            doc.setFontSize(14);
            doc.text(`فاکتور سفارش`, 105, 25, { align: "center" });

            doc.setFontSize(12);
            doc.text(`شماره سفارش: ${id}`, 105, 32, { align: "center" });

            const currentDate = new Date().toLocaleDateString("fa-IR");
            doc.text(`تاریخ: ${currentDate}`, 105, 38, { align: "center" });

            autoTable(doc, {
            startY: 50,
            head: [[
        String.fromCharCode(...'مقدار'.split('').map(c => c.charCodeAt(0))),
        String.fromCharCode(...'جزئیات'.split('').map(c => c.charCodeAt(0)))
        ]],

            body: [
                [id, "شماره سفارش"],
                [Reciever, "گیرنده"],
                [phone, "شماره تماس"],
                [`${total_price} تومان`, "مبلغ کل"],
                [delivery_day, "تاریخ تحویل"],
                [delivery_clock, "ساعت تحویل"],
                [distination, "آدرس"],
                [Description, "توضیحات"],
            ],
            styles: {
                font: "Vazir", 
                halign: "right",
                fontSize: 11,
            },
            headStyles: {
                font: "Vazir",  
                fontStyle: "bold",
                fillColor: [41, 128, 185],
                textColor: 255,
            },
            columnStyles: {
                0: { cellWidth: 80 },
                1: { cellWidth: 80 }
            },
            margin: { horizontal: 25 },
        });


            // Footer
            doc.setFontSize(10);

            doc.save(`order_${id}.pdf`);
        };

        const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

        const handleInvoiceOpen = () => setIsInvoiceOpen(true); 
        const handleInvoiceClose = () => setIsInvoiceOpen(false); 
    

    return (  
        <>
        <div className={`mx-auto dark:bg-[#191919] bg-white rounded-2xl shadow-md 
                        p-4 mt-4 mb-2 border dark:border-white border-gray-300 w-full xl:w-[98%] 
                        text-right `}>
            <div className="flex justify-between items-center">
                <div className="relative group">
                    <TbShoppingCartX className={`text-red-700 ml-8 cursor-pointer ${iscompleted ? 'hidden' : ''} `} />
                    <span className={`absolute left-0 top-full mt-1 w-auto p-1 text-xs 
                                    text-white bg-red-400 rounded opacity-0 transition-opacity duration-300 
                                    group-hover:opacity-100 whitespace-nowrap ${iscompleted ? 'hidden' : ''} `}>
                        لغو سفارش
                    </span>
                </div>
                <div className="relative group ml-4 mb-1">
                    <TbDownload className={`text-green-600 cursor-pointer text-lg ${iscompleted ? 'hidden' : ''}`} 
                                            onClick={handleDownloadPDF}/>
                    <span className={`absolute left-0 top-full mt-1 w-auto p-1 text-xs 
                                    text-white bg-green-500 rounded opacity-0 transition-opacity duration-300 
                                    group-hover:opacity-100 whitespace-nowrap ${iscompleted ? 'hidden' : ''}`}>
                         دانلود فاکتور
                    </span>
                </div>

                <span className={`flex font-vazir dark:text-white text-[#191919] font-bold ml-auto text-sm 
                                sm:text-lg md:text-lg items-center`}>
                                    {isarchived && (
                        <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 
                                       text-xs px-2 py-1 rounded-full mr-2">
                            آرشیو
                        </span>
                    )}
                    {iscancled && (
                        <span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 
                                       text-xs px-2 py-1 rounded-full mr-2">
                            لغو شده
                        </span>
                    )}
                    سفارش &zwnj;{id}
                    <RiCheckboxCircleFill className={`${
                        iscancled ? 'text-red-600' : 
                        isarchived ? 'text-gray-600' : 'text-green-600'
                        } rounded ml-1 text-lg relative sm:text-xl md:text-2xl`} />
                                            
                    
                </span>
                
            </div>
            
            <div className="flex flex-wrap items-center mb-1">  
                <div className="flex items-center mt-3">  
                    <span className={`dark:text-white text-[#191919] font-vazir text-xs lg:ml-8
                                     sm:text-lg md:text-base`}>تومان</span>  
                    <span className={`dark:text-white text-[#191919] font-vazir ml-1 font-bold text-sm 
                                     sm:text-lg md:text-base`}>{total_price}</span>  
                </div>  
                
                <div className="flex flex-wrap items-center mt-3 space-x-1 sm:space-x-2 md:space-x-4 ml-auto mr-2"> 
                    <span className='flex text-[#877F7F] font-normal font-vazir text-xs 
                            sm:text-sm md:text-sm'>
                        {phone}
                        <FaPhone className='ml-1 text-xs sm:text-base md:text-sm rotate-90'/>
                    </span>  
                    <span className='flex text-[#877F7F] font-normal font-vazir text-xs 
                            sm:text-sm md:text-sm'>
                        {Reciever}
                        <IoMdPerson className='ml-1 text-xs sm:text-base md:text-base'/>
                    </span>   
                    <span className='flex text-[#877F7F] font-normal font-vazir text-xs 
                            sm:text-sm md:text-sm'>
                        {delivery_clock}
                        <FaRegClock className='ml-1 text-xs sm:text-base md:text-base'/>
                    </span>  
                    <span className='flex text-[#877F7F] font-normal font-vazir text-xs 
                            sm:text-sm md:text-sm'>
                        {delivery_day}
                        <LuCalendar className='ml-1 text-xs sm:text-base md:text-base'/>
                    </span>  
                </div>
            </div>  

            <div className="flex mt-1">
                <div className="flex space-x-4 mr-auto items-center h-[60px]"> 
                    <button className="font-vazir bg-[#F18825] text-white rounded-md px-4 py-1 cursor-pointer
                                    transition duration-300 lg:ml-7 text-xs 
                                    sm:text-sm md:text-md lg:text-base h-[36px]" onClick={handleInvoiceOpen}>
                        {"فاکتور سفارش"}
                    </button>
                    <button className={`font-vazir rounded-md px-4 py-1 cursor-pointer 
                                    transition duration-300 text-xs sm:text-sm md:text-md lg:text-base h-[36px]
                                    ${iscancled || isarchived ? 'hidden' : iscompleted ? 
                                    'bg-gray-200 text-gray-700' : 'bg-[#34A853] text-white'}`}>
                        {iscompleted ? "آرشیو سفارش" : "تحویل به پیک"}
                    </button>
                </div>

                <div className="flex flex-col text-right mr-2 min-w-[200px] justify-center"> 
                    <div className="flex items-start w-full">
                        <span className="text-[#877F7F] font-normal font-vazir 
                                         text-xs sm:text-sm md:text-sm text-right w-full">
                            {distination}
                        </span>
                        <IoLocationSharp className="text-[#877F7F] text-xs sm:text-base 
                                                    md:text-base ml-1 flex-shrink-0" />
                    </div>
                    {Description && (<div className="flex items-start w-full mt-2">
                        <span className="text-[#877F7F] font-normal font-vazir text-xs 
                                         sm:text-sm md:text-sm text-right w-full">
                            {Description}
                        </span>
                        <TbFileDescription className="text-[#877F7F] text-xs sm:text-base 
                                                      md:text-base ml-1 flex-shrink-0" />
                    </div>)}
                    {iscancled && admin_reason &&(<div className="flex items-start w-full mt-2 ">
                        <span className="text-red-700 font-normal font-vazir text-xs 
                                         sm:text-sm md:text-sm text-right w-full">
                            {admin_reason}
                        </span>
                        <MdOutlineCancel  className="text-red-700 text-xs sm:text-base 
                                                      md:text-base ml-1 flex-shrink-0" />
                    </div>)}
                </div>
            </div>
        </div>  

         <InvoicePopup isOpen={isInvoiceOpen} onClose={handleInvoiceClose} orderId={orderkey} total_price_after={total_price} />  
        </>
    );  
};  

export default OrderCard;
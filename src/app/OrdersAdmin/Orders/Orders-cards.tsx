import React , {useState , useEffect} from "react"; 
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
import InvoicePopup from "./Invoice-popup";
import fetchInvoiceData from "./Invoice-popup";
import { convertToPersianNumbers } from "../../../utils/Coversionutils";
import DeliveryPopup from './Delivery-popup';
import Archivepopup from './Archive-popup';
import Cancelepopup from './Cancel-popup'


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
    status : number;
    isCurrent:boolean;
    removeOrder: (orderId: number , isCurrent:boolean) => void;
    statusupdate: (orderId: number , isCurrent:boolean) => void;
    archiveupdate: (orderId: number) => void;
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
    status,
    iscancled = false,
    isarchived = false,
    iscompleted=false,
    admin_reason,
    isCurrent,
    removeOrder,
    statusupdate,
    archiveupdate,
}) => {  


    const [invoiceData, setInvoiceData] = useState<any>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {  
        
        const fetchInvoiceData = async () => {  
            try {  
                const response = await fetch(`https://nanziback.liara.run/nanzi/admin/order/invoice/${id}/`, {
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
            
    }, []); 



        
    
    const calculateTotalPrice = () => {
        if (!invoiceData) return "0";
        
        const payment = parseFloat(invoiceData.payment) || 0;
        const discount = parseFloat(invoiceData.discount) || 0;
        const shippingFee = parseFloat(invoiceData.shipping_fee) || 0;
        
        return (payment - discount + shippingFee).toFixed(2);
    };

    const formatCurrency = (amount: string | number) => {
        return `${amount} `;
    };

        

    
    const handleDownloadPDF = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            compress: true
        });

        
        doc.addFileToVFS("Vazir.ttf", vazirBase64);
        doc.addFont("Vazir.ttf", "Vazir", "normal");
        doc.setFont("Vazir");

       
        const primaryColor: [number, number, number] = [41, 128, 185]; 
        const borderColor: [number, number, number] = [0, 0, 0];
        const headerTextColor: [number, number, number] = [255, 255, 255];
        const cellTextColor: [number, number, number] = [0, 0, 0];

        
        doc.setFillColor(255, 255, 255); 
        doc.rect(0, 0, 210, 30, 'F'); 
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(20);
        doc.text("نانزی", 105, 15, { align: "center" });
        
        doc.setFontSize(10);
        doc.text("فاکتور سفارش", 105, 22, { align: "center" });
        doc.text(`شماره فاکتور: ${convertToPersianNumbers(id)}`, 105, 27, { align: "center" });

        autoTable(doc, {
        startY: 35,
        body: [
            [
                { 
                    content: `شماره سفارش: ${convertToPersianNumbers(id)}`, 
                    styles: { halign: 'right' as const } 
                }
            ],
            [
                { 
                    content: `گیرنده: ${Reciever}`, 
                    styles: { halign: 'right' as const } 
                }
            ],
            [
                { 
                    content: `شماره تماس: ${convertToPersianNumbers(phone)}`, 
                    styles: { halign: 'right' as const } 
                }
            ],
            [
                { 
                    content: `تاریخ تحویل: ${convertToPersianNumbers(delivery_day)} ساعت ${convertToPersianNumbers(delivery_clock)}`, 
                    styles: { halign: 'right' as const } 
                }
            ],
            [
                { 
                    content: `آدرس: ${distination}`, 
                    styles: { halign: 'right' as const } 
                }
            ],
            ...(Description ? [
                [
                    { 
                        content: `توضیحات: ${Description}`, 
                        styles: { halign: 'right' as const } 
                    }
                ]
            ] : [])
            ].filter(Boolean), 
            styles: {
                font: "Vazir",
                fontSize: 10,
                textColor: cellTextColor,
                cellPadding: 5,
                lineColor: borderColor,
                lineWidth: 0.2,
                halign: 'right'
            },
            headStyles: {
                fillColor: primaryColor,
                textColor: headerTextColor,
                fontStyle: 'bold',
                halign: 'right'
            },
            margin: { left: 15, right: 15 },
            theme: 'grid',
        });

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 10,
            body: invoiceData.items.map(item => [
                { 
                    content: `${formatCurrency(convertToPersianNumbers(parseFloat(item.product.price).toLocaleString("fa-IR")))}`, 
                    styles: { halign: 'center' as const }
                },
                { 
                    content: convertToPersianNumbers(item.quantity.toString()), 
                    styles: { halign: 'center' as const }
                },
                { 
                    content: item.product.name, 
                    styles: { halign: 'right' as const }
                }
            ]),
            columnStyles: {
                0: { 
                    cellWidth: 80,  
                    minCellHeight: 10
                },
                1: { 
                    cellWidth: 20,  
                    minCellHeight: 10
                },
                2: { 
                    cellWidth: 80,  
                    minCellHeight: 10,
                    //cellPadding: { right: 10 }  
                }
            },
            styles: {
                font: "Vazir",
                fontSize: 10,
                textColor: cellTextColor,
                cellPadding: 5,
                lineColor: borderColor,
                lineWidth: 0.3,
                overflow: 'linebreak'  
            },
            margin: { left: 15, right: 15 },
            tableWidth: 'wrap',  
            theme: 'grid',
            didDrawCell: (data) => {
                if (data.section === 'body') {
                    doc.setDrawColor(200, 200, 200);
                    doc.setLineWidth(0.1);
                    doc.line(
                        data.cell.x,
                        data.cell.y + data.cell.height,
                        data.cell.x + data.cell.width,
                        data.cell.y + data.cell.height
                    );
                }
            }
        });

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 10,
            body: [
                [
                { content: formatCurrency(convertToPersianNumbers(parseFloat(invoiceData.payment).toLocaleString("fa-IR"))), styles: { halign: 'center' } },
                    { content: "مبلغ کل", styles: { halign: 'center' } }
                ],
                [
                    { content:formatCurrency(convertToPersianNumbers(parseFloat(invoiceData.shipping_fee).toLocaleString("fa-IR"))) , styles: { halign: 'center' } },
                    { content: "هزینه ارسال", styles: { halign: 'center' } }
                ],
                [
                    { content: formatCurrency(convertToPersianNumbers(parseFloat(invoiceData.discount).toLocaleString("fa-IR"))) , styles: { halign: 'center' } },
                    { content: "تخفیف", styles: { halign: 'center' } }
                ],
                [
                    { 
                        content:formatCurrency(convertToPersianNumbers(parseFloat(calculateTotalPrice()).toLocaleString("fa-IR"))) , 
                    },
                    { content: "مبلغ قابل پرداخت", styles: { halign: 'center' } }
                ],
            ],
            columnStyles: {
                0: { cellWidth: 60, halign: 'center' },
                1: { cellWidth: 60, halign: 'center' }
            },
            styles: {
                font: "Vazir",
                fontSize: 10,
                textColor: cellTextColor,
                cellPadding: 5,
                lineColor: borderColor,
                lineWidth: 0.2,
                halign: 'center'
            },
            headStyles: {
                fillColor: primaryColor,
                textColor: headerTextColor,
                fontStyle: 'bold',
                halign: 'center'
            },
            margin: { 
                left: (210 - 120) / 2, 
                right: (210 - 120) / 2
            }, 
            tableWidth: 'wrap', 
            theme: 'grid',
        });

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text("با تشکر از اعتماد شما", 105, (doc as any).lastAutoTable.finalY + 15, {
            align: "center"
        });

        doc.setDrawColor(...borderColor);
        doc.setLineWidth(0.5);
        doc.rect(5, 5, 200, 287);

        doc.save(`Order_${id}.pdf`);
    };

    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

    const handleInvoiceOpen = () => setIsInvoiceOpen(true); 
    const handleInvoiceClose = () => setIsInvoiceOpen(false); 

    const [isdeliveryOpen, setIsdeliveryopen] = useState(false);

    const handledeliveryopen = () => setIsdeliveryopen(true); 
    const handledeliveryclose = () => setIsdeliveryopen(false); 

    const[isarchiveopen,setIsarchiveopen] =useState(false);

    const handlearchiveopen = () => setIsarchiveopen(true); 
    const handlearchiveclose = () => setIsarchiveopen(false); 

    const[iscancelopen,setIscancelopen] =useState(false);

    const handlecancelopen = () => setIscancelopen(true); 
    const handlecancelclose = () => setIscancelopen(false); 
    

    return (  
        <>
        <div className={`mx-auto dark:bg-[#191919] bg-white rounded-2xl shadow-md 
                        p-4 mt-4 mb-2 border dark:border-white border-gray-300 w-full xl:w-[98%] 
                        text-right `}>
            <div className="flex justify-between items-center">
                <div className="relative group">
                    <TbShoppingCartX className={`text-red-700 ml-8 cursor-pointer ${iscompleted ? 'hidden' : ''} `} 
                                        onClick={handlecancelopen}/>
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
                        {convertToPersianNumbers(delivery_clock)}
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
                 <button 
                    className={`font-vazir rounded-md px-4 py-1 cursor-pointer  
                                transition duration-300 text-xs sm:text-sm md:text-md lg:text-base h-[36px]  
                                ${iscancled || isarchived ? 'hidden' : iscompleted ? 
                                status === 2 ? 'bg-[#34A853] text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white' 
                                : 'bg-[#34A853] text-white'}`}  
                    onClick={iscompleted ? (status === 2 ? handledeliveryopen : handlearchiveopen) : handledeliveryopen}

                    >
                    {iscompleted ? (status === 2 ? "تحویل به مشتری" : "آرشیو سفارش") : "تحویل به پیک"}
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
         <DeliveryPopup 
            isOpen={isdeliveryOpen} 
            onClose={handledeliveryclose} 
            orderId={orderkey} 
            status={status === 1 ? 2 : status === 2 ? 4 : status} 
            removeorder={() => removeOrder(orderkey,isCurrent)} 
            statusupdate={() => statusupdate(orderkey,isCurrent)} 
            />
        <Archivepopup isOpen={isarchiveopen} onClose={handlearchiveclose} orderId={orderkey} archiveupdate={()=>archiveupdate(orderkey)}/>
        <Cancelepopup 
            isOpen={iscancelopen} 
            onClose={handlecancelclose} 
            orderId={orderkey} 
            removeorder={() => removeOrder(orderkey,isCurrent)} 
        />


        </>
    );  
};  

export default OrderCard;
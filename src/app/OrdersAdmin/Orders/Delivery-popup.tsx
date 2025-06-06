import React, { useState } from 'react';
import { convertToPersianNumbers } from '../../../utils/Coversionutils';
import { RxCross1 } from "react-icons/rx";

interface DeliveryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  status:number;
  removeorder: () => void;
  statusupdate: () => void;
}

const DeliveryPopup: React.FC<DeliveryPopupProps> = ({ isOpen, onClose, orderId, status,removeorder,statusupdate }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hidePopup, setHidePopup] = useState(false); 

  const handleConfirm = async () => {
    try {
      const response = await fetch(`https://nanziback.liara.run/nanzi/status/change/${orderId}?status=${status}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

       

      setSuccessMessage(status === 4 ? "سفارش با موفقیت به مشتری تحویل داده شد" : "سفارش با موفقیت به پیک تحویل داده شد");
      setHidePopup(true); 

      if(status==4)
      {
        if(response.status==200)
        {
          statusupdate();
        }
      }
      else
      {
        if(response.status==200)
        {
          setTimeout(() => {
            removeorder(); 
          }, 3000);
        }
      }
     

      setTimeout(() => {
        setSuccessMessage(null);
        setHidePopup(false); 
        onClose(); 
      }, 3000);

    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <>
      {successMessage && (
        <div className="p-4 mb-4 text-sm rounded-xl bg-emerald-50 border border-[#34A853] fixed top-4 left-1/2 transform -translate-x-1/2 w-auto z-50 shadow-md">
          <h3 className="text-[#34A853] font-normal">
            <span className="font-semibold mr-1"></span>{status === 4 ? "فرآیند تحویل به مشتری با موفقیت انجام شد" : "فرآیند تحویل به پیک با موفقیت انجام شد"}
          </h3>
        </div>
      )}

      {!hidePopup && isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 bg-black opacity-50 transition-opacity" aria-hidden="true"></div>
          <div className="flex items-center justify-center min-h-full text-center lg:p-4">
            <div className="relative transform overflow-hidden rounded-lg text-left transition-all min-h-screen lg:min-h-auto w-full sm:my-8 sm:w-full sm:max-w-lg sm:h-auto">
              <div className="bg-white dark:bg-[#191919] p-6 rounded-md shadow-lg w-80 text-center">
                <RxCross1 className="cursor-pointer ml-auto dark:text-[#B2A9A9]" onClick={onClose} />
                <h2 className="text-lg font-semibold mb-4 dark:text-white">{status === 4 ? "تایید تحویل به مشتری" : "تایید تحویل به پیک"}</h2>
                <p className="text-gray-700 mb-6 dark:text-white">
                  آیا سفارش <strong>{convertToPersianNumbers(orderId)}</strong> را {status === 4 ? "به مشتری" : "به پیک"} تحویل می‌دهید؟
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleConfirm}
                    className="bg-[#34A853] text-white px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer"
                  >
                    تایید
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition cursor-pointer dark:text-white dark:bg-[#383535]"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeliveryPopup;
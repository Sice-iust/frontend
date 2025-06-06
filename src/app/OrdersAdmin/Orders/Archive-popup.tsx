import React, { useState } from 'react';
import { convertToPersianNumbers } from '../../../utils/Coversionutils';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import { arch } from 'os';

interface DeliveryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  archiveupdate: ()=>void;
}

const DeliveryPopup: React.FC<DeliveryPopupProps> = ({ isOpen, onClose, orderId, archiveupdate }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hidePopup, setHidePopup] = useState(false);

    

const handleConfirm = async () => {
    try {
        const response = await axios.post("https://nanziback.liara.run/nanzi/admin/archive/", {
            order_id: orderId, 
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        setSuccessMessage("سفارش با موفقیت آرشیو شد!");
        setHidePopup(true);
        archiveupdate();

        setTimeout(() => {
            setSuccessMessage(null);
            setHidePopup(false);
            onClose();
        }, 3000);

    } catch (error) {
        console.error("Error processing order:", error);
    }
};

  return (
    <>
      {successMessage && (
        <div className="p-4 mb-4 text-sm rounded-xl bg-green-50 border border-green-400 fixed top-4 
                        left-1/2 transform -translate-x-1/2 w-auto z-50 shadow-md">
          <h3 className="text-green-600 font-normal">
            <span className="font-semibold mr-1"></span> سفارش با موفقیت آرشیو شد
          </h3>
        </div>
      )}

      {!hidePopup && isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 bg-black  opacity-50 transition-opacity" aria-hidden="true"></div>
          <div className="flex items-center justify-center min-h-full text-center lg:p-4">
            <div className="relative transform overflow-hidden rounded-lg text-left transition-all min-h-screen lg:min-h-auto w-full sm:my-8 sm:w-full sm:max-w-lg sm:h-auto">
              <div className="bg-white dark:bg-[#191919] p-6 rounded-md shadow-lg w-80 text-center">
                <RxCross1 className="cursor-pointer ml-auto dark:text-[#B2A9A9]" onClick={onClose} />
                <h2 className="text-lg font-semibold mb-4 dark:text-white">آرشیو سفارش</h2>
                <p className="text-gray-700 mb-6 dark:text-white">
                  آیا سفارش <strong>{convertToPersianNumbers(orderId)}</strong> را می‌خواهید آرشیو کنید؟
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleConfirm}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 
                                transition cursor-pointer"
                  >
                    تایید
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 
                                transition cursor-pointer dark:text-white dark:bg-[#383535]"
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
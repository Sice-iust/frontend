import React, { useState } from 'react';
import { convertToPersianNumbers } from '../../../utils/Coversionutils';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';

interface CancelOrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  removeorder: () => void;
}

const CancelOrderPopup: React.FC<CancelOrderPopupProps> = ({ isOpen, onClose, orderId ,removeorder }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hidePopup, setHidePopup] = useState(false);
  const [cancelReason, setCancelReason] = useState(""); 

  const handleConfirm = async () => {
    try {
      if (!cancelReason.trim()) {
        alert("لطفاً دلیل لغو سفارش را وارد کنید.");
        return;
      }

      const response = await axios.post("https://nanziback.liara.run/nanzi/admin/cancle/", {
        order_id: orderId,
        reason: cancelReason, 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("سفارش با موفقیت لغو شد!");
      setTimeout(() => {
            removeorder(); 
          }, 3000);
      setHidePopup(true);

      setTimeout(() => {
        setSuccessMessage(null);
        setHidePopup(false);
        onClose();
      }, 3000);

    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return (
    <>
      {successMessage && (
        <div className="p-4 mb-4 text-sm rounded-xl bg-red-50 border border-red-400 fixed top-4 
                        left-1/2 transform -translate-x-1/2 w-auto z-50 shadow-md">
          <h3 className="text-red-600 font-normal">
            <span className="font-semibold mr-1"></span> سفارش با موفقیت لغو شد
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
                <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">لغو سفارش</h2>
                <p className="text-gray-700 dark:text-white mb-6">
                  آیا سفارش <strong>{convertToPersianNumbers(orderId)}</strong> را می‌خواهید لغو کنید؟
                </p>

                
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="...دلیل لغو سفارش را وارد کنید"
                  className="border border-gray-300 dark:text-[#B2A9A9] rounded-md p-2 w-full text-right text-sm"
                />

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={handleConfirm}
                    disabled={cancelReason.trim() === ""}
                    className={`px-4 py-2 rounded-md transition 
                             ${cancelReason.trim() === "" ? "bg-gray-300 dark:bg-[#2B2828]  text-white dark:text-[#B2A9A9] cursor-not-allowed" : 
                                "bg-red-600 text-white hover:bg-red-700"}`}
 

                  >
                    تأیید لغو
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-gray-200 text-gray-700 dark:text-white dark:bg-[#383535] px-4 py-2 rounded-md  transition cursor-pointer"
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

export default CancelOrderPopup;
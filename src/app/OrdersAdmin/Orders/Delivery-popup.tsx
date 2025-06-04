import React from 'react';

interface DeliveryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
}

const DeliveryPopup: React.FC<DeliveryPopupProps> = ({ isOpen, onClose, orderId }) => {
  
  const handleConfirm = async () => {
    try {
      const response = await fetch(`https://nanziback.liara.run/nanzi/status/change/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          status: 2
        })
      });

      if (!response.ok) {
        throw new Error('خطا در ارسال درخواست');
      }

      const data = await response.json();
      console.log("Order updated:", data);
      onClose();
      
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">تأیید تحویل به پیک</h2>
        <p className="text-gray-700 mb-6">آیا سفارش <strong>{orderId}</strong> را به پیک تحویل می‌دهید؟</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="bg-[#34A853] text-white px-4 py-2 rounded-md"
          >
            تأیید
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeliveryPopup;
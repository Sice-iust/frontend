import React, { useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";


interface PopupProps {
  onClose: () => void;
}

interface AddressData {
  mainAddress: string;
  plaque: string;
  floor: string;
  unit: string;
  addressTitle: string;
}

const AddItemModal: React.FC<PopupProps> = ({ onClose }) => {
  const [addressData, setAddressData] = useState<AddressData>({
    mainAddress: "",
    plaque: "",
    floor: "",
    unit: "",
    addressTitle: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Address data submitted:", addressData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div 
        className="fixed inset-0 bg-black opacity-50 transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl mx-4 relative z-10 border border-gray-200">
        <div className="flex flex-row-reverse p-4 border-b gap-1" >
          <FaChevronRight 
            className="cursor-pointer mt-1 h-5 w-5 hover:bg-gray-100" 
            onClick={onClose} 
          />
          <h1 className="text-xl font-bold">بازگشت</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6" dir="rtl">
          <div className="mb-4">
            <label htmlFor="mainAddress" className="block font-medium text-gray-700 mb-2">
              نشانی
            </label>
            <input
              type="text"
              id="mainAddress"
              name="mainAddress"
              value={addressData.mainAddress}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="plaque" className="block font-medium text-gray-700 mb-2">
                پلاک
              </label>
              <input
                type="text"
                id="plaque"
                name="plaque"
                value={addressData.plaque}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="floor" className="block font-medium text-gray-700 mb-2">
                طبقه
              </label>
              <input
                type="text"
                id="floor"
                name="floor"
                value={addressData.floor}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="unit" className="block font-medium text-gray-700 mb-2">
                واحد
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={addressData.unit}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="addressTitle" className="block font-medium text-gray-700 mb-2">
              عنوان آدرس
            </label>
            <input
              type="text"
              id="addressTitle"
              name="addressTitle"
              value={addressData.addressTitle}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#f18825] hover:bg-[#e07d1f] text-white py-3 rounded-lg text-lg font-semibold transition-colors"
          >
            به روز رسانی آدرس
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
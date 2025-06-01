import React, { useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { AiOutlineUpload } from "react-icons/ai";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
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
        <div className="flex flex-col items-center mb-2  mt-5">
            <div className="relative mb-4" onClick={handleImageClick}>
                <div className="w-30 h-30 border rounded-full overflow-hidden flex items-center justify-center">
                <Image
                    src={ profileImage || '/assets/default_profile.jpg'}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                />  
                </div>
                <button 
                className="absolute -bottom-2 -left-2 h-10 w-10 rounded-full bg-[#f18825] 
                            border-2 border-white flex items-center justify-center cursor-pointer
                            shadow-md hover:bg-orange-300 transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                }}
                >
                <input 
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
                <AiOutlineUpload className="h-6 w-6 text-white"/>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AddItemModal;
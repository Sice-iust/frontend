// components/CategoryModal.tsx
import React, { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload"; // Using Material UI icon
import { FaChevronRight } from "react-icons/fa";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-yellow-500");
  const [image, setImage] = useState<File | null>(null);

  const defaultImage = "/images/default-category.png"; // Default category image
  
  const colors = [
    "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500",
    "bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500"
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 " dir="rtl">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center">
          
          {/* Back Button */}
                  <div className="flex flex-row-reverse p-4 border-b gap-1">
                    <FaChevronRight
                      className="cursor-pointer mt-1 h-5 w-5 hover:bg-gray-100"
                      onClick={onClose}
                    />
                    <h1 className="text-xl font-bold">بازگشت</h1>
                  </div>
          {/* Category Image with Upload Button */}
          <div className="relative w-24 h-24 mt-3">
            <img src={image ? URL.createObjectURL(image) : defaultImage} alt="Category" className="w-full h-full rounded-lg border" />
            <label className="absolute bottom-1 right-1 bg-orange-500 text-white p-1 rounded-lg cursor-pointer">
              <UploadIcon fontSize="small" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {/* Category Name Input */}
          <label className="block text-gray-700 mt-3">نام دسته بندی</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          />

          {/* Color Picker Grid */}
          <label className="block text-gray-700 mt-3">رنگ دسته بندی</label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-10 h-10 rounded-full ${color} ${selectedColor === color ? "ring-2 ring-gray-800" : ""}`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          {/* Add Button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg w-full mt-4">
            افزودن
          </button>
        </div>
      </div>
    )
  );
};

export default CategoryModal;
import React, { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { FaChevronRight } from "react-icons/fa";
import { useCategory } from "../../../../context/AdminAddCategory";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ColorOption {
  name: string; 
  bgClass: string; 
}
const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const { addCategory } = useCategory();
const [selectedColor, setSelectedColor] = useState<ColorOption>({
    name: "زرد",
    bgClass: "bg-yellow-400"
  });  const [image, setImage] = useState<File | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

   const colors: ColorOption[] = [
    { name: "صورتی", bgClass: "bg-pink-400" },
    { name: "سبز", bgClass: "bg-green-400" },
    { name: "زرد", bgClass: "bg-yellow-400" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      alert("لطفا نام دسته بندی را وارد کنید");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append("category", categoryName);
      formData.append("box_color", selectedColor.name); // Send the color code
      if (image) {
        formData.append("photo", image);
      }

      const success = await addCategory(formData);
      if (success) {
        onClose();
        setCategoryName("");
        setImage(null);
      }
    } catch (error) {
      console.error("Error submitting category:", error);
      alert("خطا در افزودن دسته بندی");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50 " dir="rtl">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="flex items-center mb-6 border-b-1 pb-4">
             <button 
              onClick={onClose}
              className="text-black hover:text-gray-700">
              <FaChevronRight className="h-4 w-4" />
            </button>
            <h2 className="text-base font-bold text-black hover:text-gray-700 cursor-pointer" onClick={onClose}>بازگشت </h2>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-2">
                <img 
                  src={image ? URL.createObjectURL(image) : '/assets/categoryImage.png'} 
                  alt="Category" 
                  className="w-full h-full rounded-lg object-cover border-2 border-gray-200" 
                />
                <label className="absolute -bottom-2 -left-2 bg-[#F18825] text-white p-1 rounded-full cursor-pointer shadow-md">
                  <UploadIcon fontSize="small" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload} 
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="text-gray-700 font-medium whitespace-nowrap">نام دسته بندی</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-right focus:ring-2 focus:ring-[#F18825] focus:border-transparent  focus:outline-none"
                placeholder="نام دسته بندی را وارد کنید"
              />
            </div>

            <div className="space-y-2 flex text-nowrap gap-3">
              <label className="block text-gray-700 font-medium">رنگ دسته بندی</label>
              <div className="flex gap-5 pl-[calc(100%-192px)]"> {/* Adjust this value to match your input field width */}
                {colors.map((color) => (
                  <button
                    key={color.name}
                     className={`w-8 h-8 rounded-full ${color.bgClass} ${
                      selectedColor.name === color.name ? "ring-2 ring-[#F18825]" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}

                  />
                ))}
              </div>
            </div>

           <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-[#F18825] hover:bg-orange-500 text-white py-2 px-4 rounded-lg font-medium text-lg transition-colors mt-6 disabled:opacity-50"
        >افزودن
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CategoryModal;
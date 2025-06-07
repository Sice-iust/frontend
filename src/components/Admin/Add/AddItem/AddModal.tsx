import React, { useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import { AiOutlineUpload } from "react-icons/ai";
import { convertToPersianNumbers } from "../../../../utils/Coversionutils";
import { useAdminItem } from "../../../../context/AdminAddItem";
import { Add } from "@mui/icons-material";

interface PopupProps {
  onClose: () => void;
  categories: Array<string>;
}

interface ProductData {
  name: string;
  category: string;
}

interface ItemData {
  name: string;
  category: string;
  price: string;
  stock: number;
  number: number;
  description: string;
}

interface Errors {
  name?: string;
  category?: string;
  price?: string;
  stock?: string;
  number?: string;
  description?: string;
  image?: string;
}

const AddItemModal: React.FC<PopupProps> = ({ onClose, categories }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
  const { AddItem } = useAdminItem();
  const [ItemData, setItemData] = useState<ItemData>({
    name: "",
    category: "",
    price: "0",
    stock: 0,
    number: 0,
    description: "",
  });
  const [imageFile, setImageFile] = useState<File>(Object);
  const [errors, setErrors] = useState<Errors>({});
  const [filteredCategories, setFilteredCategories] = useState<string[]>(categories);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    category: "",
  });

  const validate = (): boolean => {
    const newErrors: Errors = {};
    
    if (!ItemData.name.trim()) newErrors.name = "پر کردن این بخش الزامی است";
    if (!ItemData.category) newErrors.category = "پر کردن این بخش الزامی است";
    if (!ItemData.price || ItemData.price === "0") newErrors.price = "پر کردن این بخش الزامی است";
    if (ItemData.stock <= 0) newErrors.stock = "تعداد باید بیشتر از صفر باشد";
    if (ItemData.number <= 0) newErrors.number = "تعداد باید بیشتر از صفر باشد";
    if (!ItemData.description.trim()) newErrors.description = "پر کردن این بخش الزامی است";
    if (!profileImage) newErrors.image = "افزودن تصویر الزامی است";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];  
    if (file) {  
      setProfileImage(URL.createObjectURL(file));
      setImageFile(file);
    }  
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({ ...prev, [name]: undefined }));

    if (name === "category") {
      const filtered = categories.filter((cat) => cat.includes(value));
      setFilteredCategories(filtered);
      setShowCategoryDropdown(true);
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    AddItem(
      imageFile,
      ItemData.name,
      ItemData.price,
      ItemData.stock,
      ItemData.number,
      selectedCategoryIndex + 1,
      ItemData.description
    );
    onClose();
  };
  const convertPersianToNumber = (persianNum: string) => {
    return persianNum.replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    );
  };

  const handleCategorySelect = (category: string, index: number) => {
    setItemData(prev => ({
      ...prev,
      category: category
    }));
    setSelectedCategoryIndex(index);
    setShowCategoryDropdown(false);
    setErrors(prev => ({ ...prev, category: undefined }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div
        className="fixed inset-0 bg-black opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="bg-white rounded-md shadow-lg w-full max-w-2xl mx-4 relative z-10 border border-gray-200">
        <div className="flex flex-row-reverse p-4 border-b gap-1">
          <FaChevronRight
            className="cursor-pointer mt-1 h-5 w-5 hover:bg-gray-100"
            onClick={onClose}
          />
          <h1 className="text-xl font-bold">بازگشت</h1>
        </div>
        <div className="flex flex-col items-center  mt-5">
          <div className="relative mb-4" onClick={handleImageClick}>
            <div className="w-30 h-30 border rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src={profileImage || '/assets/default_profile.jpg'}
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
          {errors.image && <p className="text-red-500 text-sm mb-2">{errors.image}</p>}

          <div className="grid grid-cols-2 gap-16 mb-2 mt-3" dir="rtl">
            <div>
              <h2 className="font-semibold mb-2">نام محصول</h2>
              <input
                type="text"
                name="name"
                value={ItemData.name}
                onChange={handleInputChange}
                className="w-full min-w-70 p-2 border border-gray-300 rounded"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="relative">
              <label className="block font-semibold mb-2">دسته بندی</label>
              <input
                type="text"
                name="category"
                value={ItemData.category}
                placeholder="انتخاب کنید"
                onChange={handleInputChange}
                onFocus={() => setShowCategoryDropdown(true)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              {showCategoryDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category, index) => (
                      <div
                        key={category}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCategorySelect(category, index)}
                      >
                        {category}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500">نتیجه‌ای یافت نشد</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3 " dir="rtl">
            <div>
              <h2 className="font-semibold mb-2">قیمت</h2>
              <input
                type="text"
                name="price"
                value={convertToPersianNumbers(ItemData.price)}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <span className="absolute left-115 text-gray-500 mt-2">تومان</span>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
            <div>
              <h2 className="font-semibold mb-2">تعداد در بسته</h2>
              <input
                type="text"
                name="number"
                value={convertToPersianNumbers(String(ItemData.number))}
                onChange={(e) => setItemData((prev) => ({
                  ...prev,
                  number: Number(convertPersianToNumber(e.target.value)),
                }))}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
            </div>
            <div>
              <h2 className="font-semibold mb-2">موجودی</h2>
              <input
                type="text"
                name="stock"
                value={convertToPersianNumbers(String(ItemData.stock))}
                onChange={(e) => setItemData((prev) => ({
                  ...prev,
                  stock: Number(convertPersianToNumber(e.target.value)),
                }))}
                className="w-full p-2 border border-gray-300 rounded"
              />

              {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2" dir="rtl">
              توضیحات محصول
            </h2>
            <textarea
              dir="rtl"
              name="description"
              value={ItemData.description}
              onChange={(e) => {
                setItemData(prev => ({
                  ...prev,
                  description: e.target.value
                }));
                setErrors(prev => ({ ...prev, description: undefined }));
              }}
              className="w-full min-w-155 h-32 p-2 border border-gray-300 rounded resize-none"
              style={{ minHeight: '120px', maxHeight: '200px', overflowY: 'auto' }}
            />
            {errors.description && (
              <p className="text-red-500 text-sm" dir="rtl">
                {errors.description}
              </p>
            )}
          </div>
        </div>
        <button
          className="px-4 py-2 text-white rounded-md bg-[#f18825] ml-7 mb-5 hover:bg-orange-400 hover:scale-106"
          onClick={handleSubmit}
        >
          افزودن محصول
        </button>
      </div>
    </div>
  );
};

export default AddItemModal;
// components/CategoryCard.tsx
import React, { useState, useEffect, useRef } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Image from 'next/image';
import { useCategory } from "../../../../context/AdminAddCategory";
import photo from "../../../../../public/assets/images.png";
interface CategoryCardProps {
  name: string;
  imageSrc: string;
  color: string;
  id: number;
}

const colorMap: Record<string, string> = {
  "صورتی": "bg-pink-500",
  "زرد": "bg-yellow-500",
  "سبز": "bg-green-500",
};

const CategoryCard: React.FC<CategoryCardProps> = ({ name, imageSrc, color, id }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const {removeAdmincat} = useCategory();  
console.log("Image Source:", imageSrc);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="border border-gray-200 w-full p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative">
      
      <div className={`absolute top-2 left-2 w-4 h-4 rounded-full ${colorMap[color] || "bg-gray-400"} border border-gray-300`} />
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={toggleMenu}
      >
        ⋮
      </button>

      {menuOpen && (
        <div ref={menuRef} className="absolute -top-7 right-4 bg-white border z-50 border-gray-400 rounded-lg shadow-xl p-2 flex flex-col space-y-1 text-sm">
          <div className="flex items-center border-b border-gray-400">
            <DriveFileRenameOutlineIcon className="text-green-500" />
            <button className="text-black py-1 px-0.5">ویرایش</button>
          </div>
          <div className="flex items-center">
            <DeleteOutlineOutlinedIcon className="text-red-500" />
            <button className="text-black py-1 px-0.5" onClick={() => removeAdmincat(id)}>حذف</button>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center mb-3">
        <div className="w-16 h-25 relative">
          <Image 
            src={imageSrc || photo} 
            alt={name}
            fill
            className=" object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/default-bread.png';
            }}
          />
        </div>
      </div>

      <div className="w-full text-center h-12 flex items-center justify-center">
        <p className="font-bold text-base line-clamp-2" title={name}>
          {name}
        </p>
      </div>
    </div>
  );
};
export default CategoryCard;
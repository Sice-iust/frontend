// components/CategoryCard.tsx
import React, { useState, useEffect, useRef } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

interface CategoryCardProps {
  name: string;
  imageSrc: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, imageSrc }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close dropdown when clicking outside
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
    <div className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-md relative">
      {/* Three-dot Menu */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={toggleMenu}
      >
        ⋮
      </button>

      {/* Dropdown Menu (closes when clicking outside) */}
      {menuOpen && (
        <div ref={menuRef} className="absolute top-8 right-2 bg-white border border-gray-400 rounded-lg shadow-xl p-2 flex flex-col space-y-1 text-sm">
          <div className="flex items-center border-b border-gray-400">
            <DriveFileRenameOutlineIcon className="text-green-500" />
            <button className="text-black py-1 px-0.5">ویرایش</button>
          </div>
          <div className="flex items-center">
            <DeleteOutlineOutlinedIcon className="text-red-500" />
            <button className="text-black py-1 px-0.5">حذف</button>
          </div>
        </div>
      )}

      {/* Image & Name */}
      <img src={imageSrc} alt={name} className="w-24 h-24 rounded-lg mb-2" />
      <p className="text-center font-semibold">{name}</p>
    </div>
  );
};

export default CategoryCard;
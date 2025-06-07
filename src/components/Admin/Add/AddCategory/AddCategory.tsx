import { MdPhoneEnabled } from "react-icons/md";
import { DialogActions, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCheck } from "react-icons/fa"; 
import CategoryCard from "./CategoryCard";
import CategoryModal from "./AddCategoryModal";
import { color } from "html2canvas/dist/types/css/types/color";
import { useCategory } from "../../../../context/AdminAddCategory";


export default function AddCategory() {
//   const categories = [
//     { name: "بربری", imageSrc: "/images/barbari.jpg" ,color:"pink" ,id:2},
//     { name: "سنگک", imageSrc: "/images/sangak.jpg" ,color:"green" ,id:2 }
//   ];
  const { categories } = useCategory(); // Get categories from context
console.log("get categories",categories);
 const [isModalOpen, setIsModalOpen] = useState(false);

    return (
<div className="flex flex-col p-5" dir="rtl">
      {/* Add Category Button */}
     <div className="box-content bg-[#F18825] rounded-2xl w-40 p-2 mb-5
                                 flex items-center text-white font-medium cursor-pointer 
                                 hover:bg-orange-400 transition duration-300 hover:scale-105">
                     <button className="flex flex-row-reverse gap-2 cursor-pointer" onClick={() => setIsModalOpen(true)} >
                         افزودن محصول جدید <FaPlus className="h-4 w-4 mt-1" />
                     </button>
                 </div>

      {/* Category List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2.5">
        {categories.map((category, index) => (
          <CategoryCard 
            key={category.id} 
            name={category.category} 
            imageSrc={category.photo } 
            color={category.box_color} 
            id={category.id} 
          />

        ))}
      </div>
        <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>

    );
}


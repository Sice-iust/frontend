import React, { useEffect, useState } from "react";
import AdminItemCard from "./ItemCard";
import img from "../../../../../public/assets/breads/barbari.png";
import { FaPlus } from "react-icons/fa";
import AddItemModal from './AddModal';
import { useAdminItem } from "../../../../context/AdminAddItem";
interface BreadProps {
  id: string;
  title: string;
  stock: number;
  price: number;
}

export default function AddItem() {
    const { data , categories} = useAdminItem();
    const [showForm, setShowForm] = useState(false);

    return (
        <>
        <div className="flex flex-col p-5" dir="rtl">
            <div className="box-content bg-[#F18825] rounded-2xl w-40 p-2 mb-5
                            flex items-center text-white font-medium cursor-pointer 
                            hover:bg-orange-400 transition duration-300 hover:scale-105">
                <button className="flex flex-row-reverse gap-2 cursor-pointer" onClick={() => setShowForm(true)}>
                    افزودن محصول جدید <FaPlus className="h-4 w-4 mt-1" />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 " dir="rtl">
                {data.map((bread) => (
                    <div key={bread.id} className="w-full">
                        <AdminItemCard 
                            id={bread.id} 
                            title={bread.name} 
                            stock={bread.stock} 
                            price={bread.price}
                            image={bread.image}
                            des={bread.description}
                            category={bread.category}
                            number={bread.box_type}
                        />
                    </div>
                ))}
            </div>
        </div>
        {showForm && (<AddItemModal onClose={() => setShowForm(false)} categories={categories} />)}
        </>
    );
}
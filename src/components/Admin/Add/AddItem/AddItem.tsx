import React, { useState } from "react";
import AdminItemCard from "./ItemCard";
import img from "../../../../../public/assets/breads/barbari.png";
import { FaPlus } from "react-icons/fa";
import AddItemModal from './AddModal';
interface BreadProps {
  id: string;
  title: string;
  stock: number;
  price: number;
}

export default function AddItem() {
    const [showForm, setShowForm] = useState(false);
    const breads: BreadProps[] = [
        { id: '1', title: 'نان فانتزی', stock: 3, price: 10000 },
        { id: '2', title: 'نان جو دوسر', stock: 5, price: 12000 },
        { id: '3', title: 'نان کنجدی', stock: 20, price: 15000 },
        { id: '4', title: 'نان سبوس دار', stock: 18, price: 13000 },
        { id: '5', title: 'نان چوب شور', stock: 14, price: 14000 },
        { id: '6', title: 'نان پیتا', stock: 12, price: 11000 },
        { id: '7', title: 'نان بربری مخصوص', stock: 13, price: 16000 }
    ];

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
                {breads.map((bread) => (
                    <div key={bread.id} className="w-full">
                        <AdminItemCard 
                            id={bread.id} 
                            title={bread.title} 
                            stock={bread.stock} 
                            price={bread.price}
                            image={img}
                        />
                    </div>
                ))}
            </div>
        </div>
        {showForm && (
        <AddItemModal
                    onClose={() => setShowForm(false)}      />)}
        </>
    );
}
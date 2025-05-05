import React from 'react';
import AddressCard from '../../AddressCard/AddressCard';
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

export default function AddressModal({ onClose }) {
  const addresses = [
    {
      id: 1,
      label: "خانه",
      isselect: true,
      description:
        "تهران، شهرفرش، پایتخت، بزرگراه شهید چمران، باغ‌مشت غربی، دنباله بعد از فریزنبل،سلام،نمیدونم، بلوک ۳۴، پلاک ۲، واحد ۲",
    },
    {
      id: 2,
      label: "دانشگاه",
      isselect: false,
      description:
        "تهران، صنعت، غدیر، بلور، بلوار تکاوران، دانشگاه علم و صنعت ایران، دبیرستان و دانشگاه",
    },
  ];

  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 ">
      <div className="bg-white p-4 rounded-lg shadow-lg  w-auto">
          <div className="relative flex justify-center items-center">
            <h2 className="text-xl font-semibold mb-4">انتخاب آدرس</h2>
            <IoMdClose 
              className="absolute right-0 top-0 h-7 w-5 text-gray-600 cursor-pointer" 
              onClick={onClose} 
            />
          </div>
        {addresses.map((add) => (
          <AddressCard
            key={add.id}
            id={add.id}
            title={add.label}
            address={add.description}
            isSelected={add.isselect}
            isprofile={false}
            name={"ss"}
            phone={"ss"}
          />
        ))}
        <div className='flex flex-row-reverse'>
          <button className='bg-[#F18825] rounded-2xl w-auto p-2 pl-4 pr-3 
                             flex items-center gap-2 text-white font-medium cursor-pointer 
                             hover:bg-orange-400 transition duration-300 hover:scale-105'>
            افزودن آدرس جدید <FaPlus/>
          </button>
        </div>
      </div>
    </div>
  );
}
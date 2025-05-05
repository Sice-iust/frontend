import React from 'react';
import AddressCard from '../../AddressCard/AddressCard';

export default function AddressModal({ onClose }) {
  const addresses = [
    {
      id: 1,
      label: "خانه",
      isselect: true,
      description:
        "تهران، شهرفرش، پایتخت، بزرگراه شهید چمران، باغ‌مشت غربی، دنباله بعد از فریزنبل، بلوک ۳۴، پلاک ۲، واحد ۲",
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
        <h2 className="text-xl font-semibold mb-4">ویرایش آدرس</h2>

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

        <button 
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded" 
          onClick={onClose}
        >
          بستن
        </button>
      </div>
    </div>
  );
}
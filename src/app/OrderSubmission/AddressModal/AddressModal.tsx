import React, { useEffect, useState } from 'react';
import AddressCard from '../../AddressCard/AddressCard';
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';

export default function AddressModal({ onClose,id_user }) {

  const [data, setData] = useState<Array<{
    id: number;
    username: string;
    address: string;
    name: string;
    receiver: string;
    phone: string;
    isChosen: boolean;
  }>>([]);
  const [loading, setLoading] = useState(true);

  console.log("id: ",id_user);
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      setLoading(true);
      try {
        const response = await axios.get("https://nanziback.liara.run/users/locations/mylocation/", {
          headers: { Authorization: `Bearer ${id_user}` },
        });

        console.log("Raw Response:", response.data);

        if (Array.isArray(response.data)) {
          setData(response.data.map((item) => ({
            id: item.id,
            username: item.user?.username || "Unknown",
            address: item.address,
            name: item.name,
            receiver: item.reciver,
            phone: item.phonenumber,
            isChosen: item.is_choose
          })));
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="fixed inset-0 flex justify-center items-center z-10">
    <div className="fixed inset-0 bg-black opacity-50 transition-opacity  " aria-hidden="true"></div> 
      <div className="relative bg-white p-4 rounded-lg shadow-lg  min-w-120 min-h-30 w-auto">
          <div className="relative flex justify-center items-center">
            <h2 className="text-xl font-semibold mb-4">انتخاب آدرس</h2>
            <IoMdClose 
              className="absolute right-0 top-0 h-7 w-5 text-gray-600 cursor-pointer" 
              onClick={onClose} 
            />
          </div>
        {data.map((add) => (
          <AddressCard
            key={add.id}
            id={add.id}
            title={add.name}
            address={add.address}
            isSelected={add.isChosen}
            isprofile={false}
            name={"ss"}
            phone={"ss"}
          />
        ))}
        <div className='flex flex-row-reverse mt-5'>
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
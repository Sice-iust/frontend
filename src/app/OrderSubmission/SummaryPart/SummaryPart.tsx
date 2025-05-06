import React, { useState } from 'react';
import { useTheme } from "../../theme"
import AddressModal from "../AddressModal/AddressModal"
import { CgNotes } from "react-icons/cg";
import { useCart } from "../../../context/Receiptcontext";
import Image from 'next/image';

export default function SummaryPart() {
  const { isDarkMode } = useTheme();
  const { cartItems, counts, totalDiscount, totalActualPrice, loading ,
      incrementQuantity, decrementQuantity, removeItem} = useCart(); 
  const [isModalOpen, setModalOpen] = useState(false);
  
  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className='box-content bg-white rounded-2xl h-auto mt-5'>
        <div className='flex flex-col'>
          <div className='flex flex-row-reverse justify-between mr-10 ml-10'>
            <div className='flex flex-row-reverse mt-3 gap-1 '>
              <CgNotes className='h-5 w-5 text-[#F18825]'/>
              <span className='font-semibold text-xl'>خلاصه سفارش</span>
            </div>
          </div>
          <div className='flex flex-row-reverse mt-6 mr-10 ml-10 mb-6 gap-7 overflow-x-auto max-w-230'>
                {cartItems.map((item)=>(
                    <div className='box-content border-1 min-w-50 h-55 w-auto rounded-2xl flex-shrink-0 '>
                        <div className='flex flex-col mt-3 gap-3 justify-center items-center'>
                            {/* <Image src={item.product.photo} alt='bread'/> */}
                            <span className='p-3 text-right text-md font-semibold'>{item.product.name}</span>
                        </div>
                    </div>
                    
                ))
                }
            </div>
        </div>
      </div>

      {isModalOpen && <AddressModal onClose={handleCloseModal} id_user={localStorage.getItem("token")} />}
    </>
  );
}
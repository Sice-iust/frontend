'use client';
import { IoIosArrowBack } from "react-icons/io";


export default function HamburgerButton({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  if (isOpen) return null;

  return (
    <button
      onClick={toggle}
      className="lg:hidden fixed top-4 right-4 z-50 flex items-center justify-center gap-2
                 bg-[#B8681D] text-white px-4 py-2 rounded-lg text-sm font-medium"
      aria-label="بازگشت"
    >
      
      <span>بازگشت</span>
      <IoIosArrowBack className="rotate-180"/>
    </button>
  );
}
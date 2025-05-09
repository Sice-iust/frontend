'use client';

import { useRouter } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.push('/profile')}
      className={`flex items-center text-[#B8681D] ${className}`}
    >
      <FaArrowRight className="ml-2" />
      <span>بازگشت</span>
    </button>
  );
}
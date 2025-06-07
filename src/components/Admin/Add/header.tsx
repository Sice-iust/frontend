import Link from "next/link";
import Image from "next/image";
import React from "react";
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
export default function AdminHeader() {
  return (
    <header className="flex md:justify-between items-center bg-white text-black  dark:bg-black dark:text-white p-4 shadow-lg text-nowrap">
      {/* Logo */}
      <div className="hidden md:flex md:flex-shrink-0 mr-auto">
            <Link href="/">
                <div className="relative w-[150px] h-[40px] md:w-[200px] md:h-[60px]">
                    <Image
                    src="/assets/logo.png"
                    alt="Logo"
                    fill
                    className="object-contain dark:hidden"
                    />
                    <Image
                    src="/assets/logo-dark.png"
                    alt="Logo"
                    fill
                    className="object-contain hidden dark:block"
                    />
                </div>
            </Link>
          </div>

      <nav className="flex gap-6 justify-center">
        <a href="/products" className="hover:underline">پشتیبانی
        <HeadsetMicOutlinedIcon className="text-[#F18825] ml-0.5"/></a>
        <a href="/AdminAddPage" className="hover:underline">ویرایش و افزودن
               <DriveFileRenameOutlineIcon className="text-[#F18825] ml-0.5"/></a>

        <a href="/orders" className="hover:underline">سفارش ها
        <TextSnippetOutlinedIcon className="text-[#F18825] ml-0.5"/></a>

      </nav>

      
    </header>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function AdminHeader() {
  const pathname = usePathname(); // Get current page path

  return (
    <header className="flex items-center  text-sm md:text-base bg-white text-black dark:bg-black dark:text-white md:p-2 p-4 shadow-lg">
      <div className="hidden md:flex md:mr-auto">
        <Link href="/">
          <div className="relative w-[150px] h-[40px] md:w-[200px] md:h-[60px] ">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              fill
              className="object-contain dark:hidden focus:outline-none  border-none"
            />
            <Image
              src="/assets/logo-dark.png"
              alt="Logo"
              fill
              className="object-contain hidden dark:block focus:outline-none  border-none"
            />
          </div>
        </Link>
      </div>

      <nav className="w-full md:w-auto flex justify-center md:justify-end gap-6 text-nowrap">
        <Link
          href="/products"
          className={`relative pb-1 ${
            pathname === "/products" ? "border-b-2 border-[#F18825]" : ""
          }`}
        >
          پشتیبانی
          <HeadsetMicOutlinedIcon className="text-[#F18825] ml-0.5" />
        </Link>

        <Link
          href="/AdminAddPage"
          className={`relative pb-1 ${
            pathname === "/AdminAddPage" ? "border-b-2 border-[#F18825]" : ""
          }`}
        >
          ویرایش و افزودن
          <DriveFileRenameOutlineIcon className="text-[#F18825] ml-0.5" />
        </Link>

        <Link
          href="/OrdersAdmin"
          className={`relative pb-1 ${
            pathname === "/OrdersAdmin" ? "border-b-2 border-[#F18825]" : ""
          }`}
        >
          سفارش ها
          <TextSnippetOutlinedIcon className="text-[#F18825] ml-0.5" />
        </Link>
      </nav>
    </header>
  );
}
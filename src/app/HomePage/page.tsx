'use client'
import React from "react";
import CategoryWrapper from "./category/categoryWrapper";
import CardSlider from "./ProductCard/cardSlider";
import Image from "next/image";
import { useTheme } from "../theme";

export default function HomePage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <Image height={100} width={10000} 
      src={isDarkMode ? `/assets/darkHomePagePhoto.png`:`/assets/homePagePhoto.png`} alt={``} 
      className="hidden md:flex"
      />

    
      <div
      className="p-2 bg-neutral-200 dark:bg-neutral-700">
        <CategoryWrapper />
        <CardSlider color={"#F18825"} text={" تخفیف های روز %"} url={"https://nanziback.liara.run/product/discount/"} type={"dis"} />
        <CardSlider color={"#B7B3AC"} text={" محبوب ترین نان ها "} url={"https://nanziback.liara.run/product/popular/"} type={"other"} />
      </div>
    </>
  );
}; 
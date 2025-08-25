'use client'
import React from "react";
import CategoryWrapper from "../../components/HomePage/category/categoryWrapper";
import CardSlider from "../../components/HomePage/ProductCard/cardSlider";
import HeaderImage from "../../components/HomePage/HeaderImage";
import { useTheme } from "../../components/theme";

export default function HomePage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <HeaderImage isDarkMode={isDarkMode}></HeaderImage>
      <div
        className="p-2 bg-neutral-200 dark:bg-neutral-700">
        <CategoryWrapper />
        <CardSlider color={"#F18825"} text={" تخفیف های روز %"} url={"https://nanziback.liara.run/product/discount/"} type={"dis"} />
        <CardSlider color={"#B7B3AC"} text={" محبوب ترین نان ها "} url={"https://nanziback.liara.run/product/popular/"} type={"other"} />
      </div>
    </>
  );
}; 
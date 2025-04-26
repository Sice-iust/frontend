import React, { useState, useEffect } from "react";
import Header from "../header";
import Header2 from "../header2";
import CategoryWrapper from "./category/categoryWrapper";
import CardSlider from "./ProductCard/cardSlider";

export default function HomePage() {

  return (
    <>
      <div style={{ padding: '10px'}}>
        <CategoryWrapper />
        <CardSlider color={"#F18825"} text={" تخفیف های روز %"} url={"https://nanziback.liara.run/product/discount/"} type={"dis"}/>
        <CardSlider color={"#B7B3AC"} text={" محبوب ترین نان ها "} url={"https://nanziback.liara.run/product/popular/"} type={"other"}/>
      </div>
    </>
  );
}; 
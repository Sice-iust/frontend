import React, { useState, useEffect } from "react";
import CategoryWrapper from "../CardWrapper/categoryWrapper";
import CardSlider from "../CardWrapper/cardSlider";

export default function HomePage() {

  return (
    <>
      <div style={{ background: '#F5F4F4', padding: '10px'}}>
        <CategoryWrapper />
        <CardSlider color={"#F18825"} text={" تخفیف های روز"} url={"https://nanziback.liara.run/product/discount/"}/>
        <CardSlider color={"#B7B3AC"} text={"محبوب ترین نان ها"} url={"https://nanziback.liara.run/product/popular/"}/>
      </div>
    </>
  );
}; 
import React from "react";
import CategoryWrapper from "./category/categoryWrapper";
import CardSlider from "./ProductCard/cardSlider";
import Image from "next/image";
export default function HomePage() {

  return (
    <>
      <div>
        <Image height={100} width={10000} src={`/assets/idk.jpg`} alt={``} />
      </div>
      <div style={{ padding: '10px' }}>
        <CategoryWrapper />
        <CardSlider color={"#F18825"} text={" تخفیف های روز %"} url={"https://nanziback.liara.run/product/discount/"} type={"dis"} />
        <CardSlider color={"#B7B3AC"} text={" محبوب ترین نان ها "} url={"https://nanziback.liara.run/product/popular/"} type={"other"} />
      </div>
    </>
  );
}; 
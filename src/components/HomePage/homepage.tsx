import React, { useState, useEffect } from "react";
import CategoryWrapper from "../CardWrapper/categoryWrapper";
import CardSlider from "../CardWrapper/cardSlider";

export default function HomePage() {

  return (
    <div>
      <div style={{ background: '#EAEAEA'}}>
        <CategoryWrapper />
        <CardSlider />
        <CardSlider />
      </div>
    </div>
  );
}; 
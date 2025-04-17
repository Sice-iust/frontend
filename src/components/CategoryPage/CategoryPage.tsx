import React, { useState, useEffect } from "react";

import Navbar from "../HomePage/navbar";
import Receipt from '../ShoppingReceipt/ShoppingReceipt';
export default function CategoryPage() {

  return (
    <>
      <Navbar showImage={false} />
      <Receipt/>
    </>
  );
}; 
import React, { useState, useEffect } from "react";
import Navbar from "../HomePage/navbar";
import Receipt from '../ShoppingReceipt/ShoppingReceipt';
import CategoryList from "./CategoryList";
export default function CategoryPage() {

  return (
    <>
      <Navbar showImage={false} />
      <div className='flex flex-row'>  
          <div className='flex-shrink-0'>  
              <Receipt />  
          </div>  
          <CategoryList catNumber={1}/>
      </div>  
    </>
  );
}; 
'use client';

import React, { useEffect, useState } from 'react';
import Receipt from '../ShoppingReceipt/ShoppingReceipt';
import { useTheme } from "../theme"

export default function OrderSubmission() {

  const { isDarkMode } = useTheme();

  return (
    <div className={`flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"} flex flex-row`}>
      <div className={`flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"} hidden sm:block`}>
        <Receipt />
      </div>

    </div>
  );
}
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import CategoryList from '../../../components/CategoryPage/CategoryList';
import Receipt from '../../../components/ShoppingReceipt/ShoppingReceipt';

export default function Bread() {
  const params = useParams();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (params?.id) {
      if (typeof params.id === 'string') {
        setId(params.id);
      } else if (Array.isArray(params.id) && params.id.length > 0) {
        setId(params.id[0]);
      }
    }
  }, [params]);

  return (
    <div className={`flex-shrink-0 bg-[#f5f5f5] dark:bg-[#383535] flex flex-row`}>
      <div className={`flex-shrink-0 hidden md:block`}>
        <Receipt />
      </div>
      <CategoryList category={id} />
    </div>
  );
}
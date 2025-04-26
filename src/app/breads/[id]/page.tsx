'use client'
import React from 'react';
import { useRouter } from 'next/router';
import {useParams} from 'next/navigation';
import Receipt from '../../ShoppingReceipt/ShoppingReceipt';
import CategoryList from '../../CategoryPage/CategoryList';
import { useTheme } from '../../theme';

export default function Bread() {
    const router = useParams();
    const  id  = router?.id;
    const { isDarkMode, toggleDarkMode } = useTheme();
    return (
        <>
            <div className={` flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"} flex flex-row`}>
                <div className={` flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"}  hidden sm:block `}>
                    <Receipt />
                </div>
                <CategoryList category={id} />
            </div>
        </>
    );
};
import React from 'react';
import { useRouter } from 'next/router';
import Header from '../header';
import Receipt from '../ShoppingReceipt/ShoppingReceipt';
import CategoryList from '../CategoryPage/CategoryList';


export default function Bread() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Header showImage={false} />
            <div className='flex flex-row'>
                <div className='flex-shrink-0'>
                    <Receipt />
                </div>
                <CategoryList catNumber={id} />
            </div>
        </>
    );
};
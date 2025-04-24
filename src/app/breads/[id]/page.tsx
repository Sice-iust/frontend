'use client'
import React from 'react';
import { useRouter } from 'next/router';
import {useParams} from 'next/navigation';
import Header from '../../navbar';
import Receipt from '../../ShoppingReceipt/ShoppingReceipt';
import CategoryList from '../../CategoryPage/CategoryList';


export default function Bread() {
    const router = useParams();
    const  id  = router?.id;

    return (
        <>
            <Header showImage={false} />
            <div className='flex flex-row'>
                <div className='flex-shrink-0'>
                    <Receipt />
                </div>
                <CategoryList category={id} />
            </div>
        </>
    );
};
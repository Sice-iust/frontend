import React from 'react';
import CategoryCard from '../ProductCard/categoryCard';
import axios from 'axios';
import { data } from 'react-router';
const CardData = [
    {
        src: '/breads/barbari.png',
        text: 'بربری',
        id:1,
    },
    {
        src: '/breads/barbari.png',
        text: 'سنگک',
        id:2,
    },
    {
        src: '/breads/barbari.png',
        text: 'لواش',
        id:6,
    },
    {
        src: '/breads/barbari.png',
        text: 'تافتون',
        id:3,
    },
    {
        src: '/breads/barbari.png',
        text: 'نان فانتزی',
        id:5,

    },
    {
        src: '/breads/barbari.png',
        text: 'نان های محلی',
        id:4,
    }
];
export default function CategoryWrapper() {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <h2>
                        دسته بندی ها
                    </h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-around', columnGap: '70px',rowGap: '50px'}}>
                    {CardData.map((card, index) => <CategoryCard key={index} img_src={card.src} text={card.text} id={card.id} />)}
                </div>
            </div >
        </>
    );
}
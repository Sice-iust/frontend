import React from 'react';
import CategoryCard from '../ProductCard/categoryCard';
import axios from 'axios';
import { data } from 'react-router';
const CardData = [
    {
        src: '/breads/barbari.png',
        text: 'بربری',
    },
    {
        src: '/breads/barbari.png',
        text: 'سنگک',
    },
    {
        src: '/breads/barbari.png',
        text: 'لواش',
    },
    {
        src: '/breads/barbari.png',
        text: 'تافتون',
    },
    {
        src: '/breads/barbari.png',
        text: 'سایر',
    },
    {
        src: '/breads/barbari.png',
        text: 'سایر',
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
                    {CardData.map((card, index) => <CategoryCard key={index} img_src={card.src} text={card.text} ref={""} />)}
                </div>
            </div >
        </>
    );
}
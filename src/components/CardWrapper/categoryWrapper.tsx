import React from 'react';
import CategoryCard from '../ProductCard/categoryCard';
const CardData = [
    {
        src: 'images/img-2.jpg',
        text: 'Travel ',
    },
    {
        src: 'images/img-4.jpg',
        text: 'Experience ',
    },
    {
        src: 'images/img-3.jpg',
        text: 'Swimming',
    },
    {
        src: 'images/img-3.jpg',
        text: 'Swimming',
    },
    {
        src: 'images/img-3.jpg',
        text: 'Swimming',
    },
    {
        src: 'images/img-3.jpg',
        text: 'Swimming',
    },
    {
        src: 'images/img-3.jpg',
        text: 'Swimming',
    },
    {
        src: 'images/img-3.jpg',
        text: 'Swimming',
    }
];
export default function CategoryWrapper() {
    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', padding: '16px' }}>
                {CardData.map((card,index) => <CategoryCard/>)}
            </div>
        </>
    );
}
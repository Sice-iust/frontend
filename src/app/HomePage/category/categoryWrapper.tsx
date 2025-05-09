import React from 'react';
import CategoryCard from './categoryCard';
const CardData = [
    {
        src: '/assets/breads/barbaric.png',
        text: 'بربری',
        id:1,
    },
    {
        src: '/assets/breads/sangak.png',
        text: 'سنگک',
        id:2,
    },
    {
        src: '/assets/breads/lavash.png',
        text: 'لواش',
        id:6,
    },
    {
        src: '/assets/breads/taftan.png',
        text: 'تافتون',
        id:3,
    },
    {
        src: '/assets/breads/baguette.png',
        text: 'نان فانتزی',
        id:5,

    },
    {
        src: '/assets/breads/mahali.png',
        text: 'نان های محلی',
        id:4,
    }
];
export default function CategoryWrapper() {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
                <div className='flex justify-end text-xl font-bold my-4'>
                        دسته بندی ها
                </div>
                <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-around', columnGap: '50px',rowGap: '50px'}}>
                    {CardData.map((card, index) => <CategoryCard key={index} img_src={card.src} text={card.text} id={card.id} />)}
                </div>
            </div >
        </>
    );
}
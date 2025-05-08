'use client'

import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from '../ProductCard/productCard';
import axios from 'axios';


export default function CardSlider({ text, color, url, type }) {
    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        axios.get(url)
            .then(
                (response) => {
                    const data = response?.data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        image: item.photo_url,
                        discount: item.discount,
                        price: item.discounted_price,
                        rate: item.average_rate
                    }));
                    setProducts(data);
                    console.log(response)
                }
            )
    }, []);

    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className='rounded-2xl px-8 py-1 pb-8 m-10 drop-shadow-xl/25' style={{ backgroundColor: color }}>
            <div className={`text-white dark:text-black flex text-right justify-end text-3xl font-bold my-4 `}>
                {text}
            </div>
            <Slider {...settings}>
                {products.slice(0, 5).map((product) => (
                    <ProductCard
                        key={product.id}
                        img_src={product.image}
                        text={product.name}
                        ref={product.id}
                        percent={product.discount}
                        price={product.price}
                        rate={product.rate}
                        type={type} />
                ))}
            </Slider>
        </div>
    );
};
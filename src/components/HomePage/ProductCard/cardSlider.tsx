'use client'

import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from '../ProductCard/productCard';
import axios from 'axios';
import { useCart } from "../../../context/Receiptcontext";
import ProductPage from '../../ProductPage/ProductPage';


export default function CardSlider({ text, color, url, type }) {
    const { fetchDatauser } = useCart();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (id) => {
        console.log("id",id)
        setSelectedItem(id); 
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };


    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        fetchDatauser();
        axios.get(url)
            .then(
                (response) => {
                    const data = response?.data.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        image: item.photo_url,
                        discount: item.discount,
                        price:item.price,
                        discountedprice: item.discounted_price,
                        rate: item.average_rate,
                        stock:item.stock
                    }));
                    setProducts(data);
                    console.log(response)
                }
            )
    }, []);
    

    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
        <div className='rounded-2xl md:px-8 py-1 pb-8 m-6 px-8 md:m-10 drop-shadow-xl/25' style={{ backgroundColor: color }}>
            <div className='text-white dark:text-black
            text-xl
            flex text-right justify-end md:text-3xl 
            font-bold my-4'>
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
                        discountedprice={product.discounted_price||Math.round(product.price * (1 - product.discount / 100))}
                        price={product.price}
                        rate={product.rate}
                        stock={product.stock}
                        type={type}
                        onOpenModal={handleOpenModal}
                     />
                ))}
            </Slider>
        </div>
        {isOpen && (
        <ProductPage
            open={isOpen}
            itemid={selectedItem}
            onClose={handleCloseModal}
        />
        )}</>
    );
};
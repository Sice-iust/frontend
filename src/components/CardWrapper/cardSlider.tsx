import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from '../ProductCard/productCard';
import axios from 'axios';
import { Percent } from '@mui/icons-material';


export default function CardSlider({ text, color, url }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(url)
            .then(
                (response) => {
                    for (let i = 0; i < response?.data.length; i++) {
                        setProducts(
                            [
                                ...products,
                                {
                                    id: response?.data[i].id,
                                    name: response?.data[i].name,
                                    image: response?.data[i].photo,
                                    discount: response?.data[i].discount,
                                    price: response?.data[i].discounted_price,
                                }])
                        console.log(response?.data[i])
                    }
                }
            )
    }, []);

    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
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
        <div style={{ paddingBottom: "40px", paddingRight: "30px", paddingLeft: "30px", background: color, margin: '30px', borderRadius: '8px', }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <h2 style={{ marginRight: '30px', color: 'white' }}>
                    {text}
                </h2>
            </div>
            <Slider {...settings}>
                {products.map((product) => (
                    <ProductCard key={product.id} img_src={product.image} text={product.name} ref={product.id} percent={product.discount} price={product.price}/>
                ))}
            </Slider>
        </div>
    );
};
import React from 'react';
import Image from 'next/image';
import bread from "../../assets/breads/barbari.png";
import Link from 'next/link';

export default function CategoryCard({ img_src, text, ref }) {
    return (
        <>
            <div style={{
                background: 'white', border: '1px solid black',
                height: '145px', width: '145px',
                borderRadius: '30px', padding: '10px',
                display: 'flex', flexDirection: 'column', alignContent: 'center'
            }}>
                <Image src={bread}
                    width={100}
                    height={100}
                    alt="Nanzi Logo"
                    style={{ margin: 'auto' }} />
                <Link
                    style={{
                        display: 'flex', justifyContent: 'center'
                        , color: 'black', textDecoration: 'none'
                    }}
                    href={{ pathname: `/breads:1` }}
                >
                    {text}
                </Link>
            </div>
        </>
    );
}
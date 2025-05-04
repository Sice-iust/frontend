import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryCard({ img_src, text, id }) {
    return (
        <>
            <div style={{
                background: 'white', border: '1px solid gray',
                height: '145px', width: '145px',
                borderRadius: '30px', padding: '10px',
                display: 'flex', flexDirection: 'column', alignContent: 'center',
            }} className='drop-shadow-xl/15 hover:drop-shadow-xl/30 '>
                <Image src={img_src}
                    width={100}
                    height={100}
                    alt="Nanzi Logo"
                    style={{ margin: 'auto',  height:'100px'}} />
                <Link
                    style={{
                        display: 'flex', justifyContent: 'center'
                        , color: 'black', textDecoration: 'none'
                    }}
                    href={`/breads/${id}`}
                >
                    {text}
                </Link>
            </div>
        </>
    );
}
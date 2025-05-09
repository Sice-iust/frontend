import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryCard({ img_src, text, id }) {
    return (
        <>
            <Link
                href={`/breads/${id}`}
            >
                <div className='bg-white border border-gray-500 
                dark:bg-black dark:text-white
                rounded-3xl
                h-36 w-36 p-2
                drop-shadow-xl/15 hover:drop-shadow-xl/30 '>
                    <Image src={img_src}
                        width={100}
                        height={100}
                        alt="Nanzi Logo"
                        style={{ margin: 'auto', height: '100px' }} />

                    <span className='flex justify-center'>{text}</span>
                </div>
            </Link>
        </>
    );
}
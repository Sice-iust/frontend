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
                h-28 w-28
                md:h-36 md:w-36 p-2
                drop-shadow-xl/15 hover:drop-shadow-xl/30 '>
                    <Image src={img_src}
                        width={100}
                        height={100}
                        alt="Nanzi Logo"
                        className='m-auto md:h-25 md:w-25 h-16 w-16'/>

                    <span className='flex justify-center'>{text}</span>
                </div>
            </Link>
        </>
    );
}
import React from 'react';
import Image from 'next/image';
import Logo from "../../assets/logo.png";
import Link from 'next/link';

export default function CategoryCard() {
    return (
        <>
            <div style={{ background: 'white',border: '1px solid black',
                borderRadius: '8px', padding: '10px', margin: '10px' ,
                display: 'flex', flexDirection: 'column', alignContent: 'center'}}>
                <Image src={Logo}
                        width={100}
                        height={100}
                        alt="Nanzi Logo"
                        style={{margin: 'auto'}} />
                <a >nanzi</a>
                <Link href={{pathname:`/breads`,query: {slug: 1}}}>links</Link>
            </div>
        </>
    );
}
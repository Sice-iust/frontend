import Image from 'next/image';
import React from 'react';

export default function ProductCard({ img_src, text, ref, percent, price, type, rate }) {

    const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

    return (
        <>
            <div className=' flex flex-col content-center
            bg-white dark:bg-neutral-900 dark:text-white
            mx-3
            border-1
            h-60 rounded-2xl p-4
            hover:drop-shadow-xl/30'>
                <Image src={img_src}
                    width={100}
                    height={100}
                    alt="Nanzi Logo"
                    className='m-auto w-20' />
                <div dir='rtl' style={{ height: '60px', display: 'flex', justifyContent: 'space-between' }}>
                    <h3 >{text}</h3>
                    {type == "dis" ?
                        <p style={{
                            background: "#5BCD79", color: 'white',
                            padding: '5px',
                            borderRadius: '60px', borderColor: 'white',
                            height: '30px'
                        }}>{e2p(String(percent))}%</p>
                        :
                        <p dir='rtl' style={{
                            background: "LightGray", color: 'black',
                            padding: '5px',
                            borderRadius: '60px', borderColor: 'white',
                            height: '30px'
                        }}>⭐️{e2p(String(rate))}</p>
                    }
                </div>
                <div style={{ height: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 dir='rtl'> {e2p(String(price))} تومان</h3>
                    <button
                        style={{
                            background: "#F18825", color: 'white',
                            height: '30px', width: '100px',
                            borderRadius: '60px', borderColor: 'white'
                        }}
                    >
                        افزودن
                    </button>
                </div>
            </div>
        </>
    );
}
import React from 'react';

export default function ProductCard({ img_src, text, ref, percent, price }) {
    return (
        <>
            <div style={{
                background: 'white', border: '1px solid black',
                height: '250px', width: '250px',
                borderRadius: '15px', padding: '30px',
                display: 'flex', flexDirection: 'column', alignContent: 'center',
                margin: 'auto', marginBottom: '20px'
            }}>
                <img src={img_src}
                    width={100}
                    height={100}
                    alt="Nanzi Logo"
                    style={{ margin: 'auto' }} />
                <div style={{ height:'60px',display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{
                         background: "#5BCD79", color: 'white',
                         padding: '5px',
                          borderRadius: '60px', borderColor: 'white'
                        }}>{percent}%</p>
                    <h3>{text}</h3>
                </div>
                <div style={{ height:'40px',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>تومان {price} </h3>
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
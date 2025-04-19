// pages/breads/[id].tsx  
import React from 'react';  
import Navbar from '../../src/components/HomePage/navbar';  
import Receipt from '../../src/components/ShoppingReceipt/ShoppingReceipt';  
import CategoryList from '../../src/components/CategoryPage/CategoryList';  
import { useRouter } from 'next/router';
const Bread = () => {  
    const router = useRouter();
    const { id } = router.query;

    return (  
        <>  
        <Navbar showImage={false} />
        <div className='flex flex-row'>  
            <div className='flex-shrink-0'>  
                <Receipt />  
            </div>  
            <CategoryList catNumber={id}/>
        </div>  
        </>  
    );  
};  

export default Bread;  
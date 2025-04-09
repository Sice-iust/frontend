import React from 'react';  
import './navbar.module.scss';  
import Link from "next/link";  

const Navbar = () => {  
  return (  
    <div className='nav'>  
      <div className='nav-container'>  
        <div className='second-container'>  
          <ul className='nav-texts'>  
            
          <li><Link href="" >data.home</Link></li>
  
            
            {/* Add more links here if needed */}  
          </ul>  
        </div>  
      </div>  
    </div>  
  )  
}  

export default Navbar;  
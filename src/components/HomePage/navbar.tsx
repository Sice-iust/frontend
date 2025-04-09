import React from 'react';  
import styles from  './navbar.module.scss'; // Import the SCSS file  
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Logo from "../../assets/logo.png";
import Image from 'next/image';
import { useState } from 'react';

const Header: React.FC = () => {  
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Initial state: not logged in  

    return (  
        <header className={styles.header}> 
           
          <div className={styles.headerContent}>  
                <button className={styles.loginButton}>ورود / عضویت</button>
                <div className={styles.divider} /> 
                <div className={styles.cartContainer}>  
                    <h1>سبد خرید</h1>
                    <ShoppingCartIcon className={styles.cartIcon} />  
                    <span className={styles.cartBadge}>2</span>  
                </div>  
                <div className={styles.divider} />
                <span className={styles.statusText} >حالت شب</span>
                <Brightness2OutlinedIcon className={styles.drakModeIcon} />  

                <div className={styles.searchContainer} dir="rtl">  
                    <span className={styles.searchIcon}><SearchOutlinedIcon /></span>   
                    <input   
                        type="text"   
                        className={styles.searchInput}  
                        placeholder=" نام کالای مورد نظر را جستجو کنید ..."   
                    />  
                    </div> 
                    <div className={styles.logoContainerNav}>  
                        <Image src={Logo} alt="Logo" className={styles.logoNav} />  
                    </div>  
            </div>  
           {/* Conditionally render the large background image if not logged in */}  
           {!isLoggedIn && (  
            <div className={styles.backgroundImageContainer}>  
                <img src="/path/to/your/background-image.jpg" alt="Background" className={styles.backgroundImage} />  
            </div>  
        )}  
        </header>  
          
        
    );  
};  

export default Header;  
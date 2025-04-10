import React from 'react';  
import styles from  './navbar.module.scss'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Logo from "../../assets/logo.png";
import DarkLogo from "../../assets/logo-dark.png"
import HomePagePhoto from "../../assets/homePagePhoto.png";
import DrakHomePagePhoto from "../../assets/darkHomePagePhoto.png"
import LoginModal from "../login/login"; 
import { useTheme } from '../theme';   
import Image from 'next/image';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useState ,useEffect} from 'react';
import { colors } from '@mui/material';

const Header: React.FC = () => {  
    const { isDarkMode, toggleDarkMode } = useTheme(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);  
    const breadTypes = ["بربری", "سنگک", "تافتون", "لواش", "محلی", "فانتزی"];  
    const [currentBreadType, setCurrentBreadType] = useState(breadTypes[0]); 
    const [fading, setFading] = useState(false);  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {  
        const interval = setInterval(() => {  
          setFading(true);
          setTimeout(() => {  
            setCurrentBreadType(prev => {  
              const currentIndex = breadTypes.indexOf(prev); 
              const nextIndex = (currentIndex + 1) % breadTypes.length;   
              return breadTypes[nextIndex];
            });  
            setFading(false); 
          }, 1000);
        }, 2000);  
    
        return () => clearInterval(interval);  
      }, [breadTypes]);  


    return (  
        <div  className={isDarkMode ? styles.darkNav : styles.lightNav}>
            <header className={styles.header} > 
            
                <div className={styles.headerContent}>  
                    <button className={styles.loginButton}         onClick={handleOpenModal}
                    >ورود / عضویت</button>
                    <div className={styles.divider} /> 
                    <div className={styles.cartContainer}>  
                        <h1 style={{ color: isDarkMode ? 'white' : 'black'}}>سبد خرید</h1>
                        <ShoppingCartIcon className={styles.cartIcon} />  
                        <span className={styles.cartBadge}>2</span>  
                    </div>  
                    <div className={styles.divider} />
                    <span className={styles.statusText}     onClick={toggleDarkMode}   >
                        {isDarkMode? 'حالت روز':'حالت شب'}</span>
                 
                    {isDarkMode?<WbSunnyOutlinedIcon className={styles.drakModeIcon} /> : <Brightness2OutlinedIcon className={styles.drakModeIcon} /> } 

                    <div className={styles.searchContainer} dir="rtl">  
                        <span className={styles.searchIcon}><SearchOutlinedIcon /></span>   
                        <input   
                            type="text"   
                            className={styles.searchInput}  
                            placeholder=" نام کالای مورد نظر را جستجو کنید ..."   
                        />  
                    </div> 
                        <div className={styles.logoContainerNav}>  
                            <Image src={isDarkMode?DarkLogo:Logo} alt="Logo" className={styles.logoNav} />  
                        </div>  
                </div>  
          
            
            </header>  
            {!isLoggedIn && (  
                <div className={styles.backgroundImageContainer}>  
                    <Image src={isDarkMode?DrakHomePagePhoto:HomePagePhoto} alt="Background" className={styles.backgroundImage}/> 
                    <div className={styles.overlayText}>  
                    <h2 className={styles.breadTitleContainer}>  
                        <span className={styles.breadTypeContainer}>  
                            <section className={styles.animation}>  
                                <div className={`${styles.breadType} ${fading ? styles.fadeOut : ''}`}>  
                                    <div>{currentBreadType}</div>  
                                </div>  
                            </section>  
                        </span>  
                        <span style={{ color: isDarkMode ? '#B2A7A7' : '#555050'}}>  
        سفارش انواع نان  
      </span>  
                    </h2>  
                        <div className={styles.locationContainer} dir="rtl"> 
                            <span className={styles.locationIcon}><LocationOnIcon /></span>   
                                <input   
                                    type="text"   
                                    className={styles.locationInput}  
                                    placeholder=" آدرس خود را عوض کنید"   
                                /> 

                        </div>    
                    </div>
                </div> 
            )}
            {isModalOpen && <LoginModal onClose={handleCloseModal} open={isModalOpen} />}
                
        </div>
          
        
    );  
};  

export default Header;  
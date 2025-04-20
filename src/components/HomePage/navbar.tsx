import React from 'react';  
import Search from "./search";
import styles from  './navbar.module.scss'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Logo from "../../assets/logo.png";
import DarkLogo from "../../assets/logo-dark.png"
import HomePagePhoto from "../../assets/homePagePhoto_LE_upscale_balanced.jpg";
import DrakHomePagePhoto from "../../assets/darkHomePagePhoto.png"
import LoginModal from "../login/login"; 
import { useTheme } from '../theme';   
import Image from 'next/image';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { useState ,useEffect} from 'react';
import axios from "axios";

import { colors } from '@mui/material';

interface HeaderProps {   
    showImage: boolean;   
  }  

const Header: React.FC<HeaderProps> = ({showImage=true}) => {  
    const { isDarkMode, toggleDarkMode } = useTheme(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);  
    const breadTypes = ["بربری", "سنگک", "تافتون", "لواش", "محلی", "فانتزی"];  
    const [currentBreadType, setCurrentBreadType] = useState(breadTypes[0]); 
    const [fading, setFading] = useState(false);  
    const [shoppingNum,setShoppingNum]=useState(2);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState(null);  

    const getUsername = async () => {  
        const token = localStorage.getItem("token");  
        console.log('Retrieved Token:', token);  
        
        if (token=="undefined" || !token) {  
            console.log('No token found');  
            return;  
        }  
        // localStorage.removeItem('token');  
        else{
                try {  
                const response = await axios.get('https://nanziback.liara.run/header/', {  
                    headers: {  
                        'Authorization': `Bearer ${token}`, // Note: Make sure it starts with "Bearer "  
                    }  
                });  
                
                if (response.data.is_login) {  
                    setUsername(response.data.username);   
                    setIsLoggedIn(response.data.is_login);  
                    setShoppingNum(response.data.nums);  
                }  
                console.log('Username:', response.data.username); // Correctly log the username  
            } catch (error) {  
                console.error('Error fetching username:', error);  
            }  
        }
    };  
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

      useEffect(() => {  
        getUsername(); 
    }, []);
    return (  
        <div  className={isDarkMode ? styles.darkNav : styles.lightNav}>
            <header className={styles.header} > 
            
                <div className={styles.headerContent}>  
                    <button className={styles.loginButton}         onClick={handleOpenModal}
                    > {isLoggedIn  ? username : 'ورود / عضویت'}   </button>
                    <div className={styles.divider} /> 
                    <div className={styles.cartContainer}>  
                        <h1 style={{ color: isDarkMode ? 'white' : 'black'}}>سبد خرید</h1>
                        <ShoppingCartIcon className={styles.cartIcon} />  
                        {}
                        {shoppingNum > 0 && <span className={styles.cartBadge}>{shoppingNum}</span>}   
                        </div>  
                    <div className={styles.divider} />
                    <span className={styles.statusText}     onClick={toggleDarkMode}   >
                        {isDarkMode? 'حالت روز':'حالت شب'}</span>
                 
                    {isDarkMode?<WbSunnyOutlinedIcon className={styles.drakModeIcon} /> : <Brightness2OutlinedIcon className={styles.drakModeIcon} /> } 

                    <Search isDarkMode={isDarkMode} />

                        <div className={styles.logoContainerNav}>  
                            <Image src={isDarkMode?DarkLogo:Logo} alt="Logo" className={styles.logoNav} />  
                        </div>  
                </div>  
          
            
            </header>  
            {(!isLoggedIn && showImage) && (  
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
                        <span style={{ color: isDarkMode ? '#B2A7A7' : '#555050' ,marginBottom:'5px'}}>  
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
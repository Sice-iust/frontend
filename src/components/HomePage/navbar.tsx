import React from 'react';  
import styles from  './navbar.module.scss'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Logo from "../../assets/logo.png";
import HomePagePhoto from "../../assets/homePagePhoto.png";
import LoginModal from "../login/login"; 
import { useTheme } from '../theme';   
import Image from 'next/image';
import { useState ,useEffect} from 'react';

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
        <div>
            <header className={styles.header}> 
            
                <div className={styles.headerContent}>  
                    <button className={styles.loginButton}         onClick={handleOpenModal}
                    >ورود / عضویت</button>
                    <div className={styles.divider} /> 
                    <div className={styles.cartContainer}>  
                        <h1>سبد خرید</h1>
                        <ShoppingCartIcon className={styles.cartIcon} />  
                        <span className={styles.cartBadge}>2</span>  
                    </div>  
                    <div className={styles.divider} />
                    <span className={styles.statusText}     onClick={toggleDarkMode}   >حالت شب</span>
                 
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
          
            
            </header>  
            {!isLoggedIn && (  
                <div className={styles.backgroundImageContainer}>  
                    <Image src={HomePagePhoto} alt="Background" className={styles.backgroundImage}/> 
                    <div className={styles.overlayText}>  
                        <h2 style={{ display: 'flex', alignItems: 'center' ,textAlign:'right' }}>  
                        
                            <span style={{ marginLeft: '10px', padding: '5px',textAlign:'right' }}>  
                            <section className={styles.animation}>  
                                <div className={`${styles.breadType} ${fading ? styles.fadeOut : ''}`}>  
                                <div>{currentBreadType}</div>  
                                </div>  
                            </section>  
                            </span>  
                            سفارش انواع نان  
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
                </div> )}
                      {isModalOpen && <LoginModal onClose={handleCloseModal} open={isModalOpen} />}
                
        </div>
          
        
    );  
};  

export default Header;  
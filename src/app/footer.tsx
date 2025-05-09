'use client'

import React from 'react';
import styles from './footer.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faXTwitter,
  faTelegram,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import { useTheme } from './theme';

const Footer = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
  // const persianNumber = ;


  return (
    <footer className={`${styles.footer} ${isDarkMode ? styles.darkFooter : styles.lightFooter}`}>
      <div className={styles.container}>
        <div className={styles.rightContainer}>
          <div className={styles.logoSection}>
            <Image
              src={isDarkMode ? `/assets/logo-dark.png` : `/assets/logo.png`}
              alt="Logo"
              width={50}
              height={50}
              className={styles.logo}
            />
            <div className={styles.logoText}>
              <h3 className={styles.title}>نانزی</h3>
              <p className={styles.slogan}>نانزی،طعمی فراموش نشدنی</p>
            </div>
          </div>
          <p className={styles.description}>
            فقط در چند دقیقه می توانید سبد  خرید خود را از انواع  نان
            خوشمزه پر کنید و در کمترین زمان ممکن، آن هارا درب منزل
            دریافت کنید . تجربه ای راحت و سریع از خرید نان ، حالا با نانزی در
            دسترس شماست.
          </p>
          <div className={styles.roundedSocialButtons}>
            <a
              className={`${styles.socialButton} ${styles.linkedin}`}
              href="https://t.me/TripTide_Channel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              className={`${styles.socialButton} ${styles.youtube}`}
              href="https://www.youtube.com/@TripTide2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTelegram} />
            </a>
            <a
              className={`${styles.socialButton} ${styles.instagram}`}
              href="https://www.instagram.com/triptide2024"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              className={`${styles.socialButton} ${styles.twitter}`}
              href="https://x.com/Triptide2024?s=35"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>


          </div>
        </div>


        {/* Center Container */}
        <div className={styles.centerContainer}>
          <div className={styles.faqSection}>
            <div className={styles.faqColumn}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqTitle}>درباره نانزی</h3>
                <div className={styles.faqDivider} />
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqTitle}>تماس با  نانزی</h3>
                <div className={styles.faqDivider} />
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqTitle}>قوانین سایت </h3>
                <div className={styles.faqDivider} />
              </div>
            </div>
            <div className={styles.faqColumn}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqTitle}> پرسش های متداول </h3>
                <div className={styles.faqDivider} />
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqTitle}>ثبت شکایات</h3>
                <div className={styles.faqDivider} />
                <p className={styles.faqText}>ساعت کاری : همه روزه از صبح تا شب</p>


              </div>

            </div>


            <div className={styles.faqItem}>
              <p className={styles.faqText}>    رسیدگی به انتقادات و پیشنهادات: {e2p('1111-1111-021')}
              </p>
            </div>
          </div>
        </div>

        {/* Left Container */}
        <div className={styles.leftContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={isDarkMode ? `/assets/darkFooterSymbol.png` : `/assets/footerSymbol.png`}
              alt="First Image"
              width={350}
              height={150}
              className={styles.image}
            />
            {/* <Image 
              src="/image2.png" 
              alt="Second Image" 
              width={100} 
              height={50} 
              className={styles.image}
            /> */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
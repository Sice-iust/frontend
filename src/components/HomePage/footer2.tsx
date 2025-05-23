'use client'
import { faFacebook, faInstagram, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useTheme } from "../theme";


export default function Footer2() {
    const { isDarkMode, toggleDarkMode } = useTheme();
    return (
        <div>
            <div className={`flex flex-col-reverse md:flex-row dark:bg-[#191919] bg-white border-t-4 border-t-gray-400 p-5`}>
                <div className="basis-2/8 flex flex-col p-5">
                    <Image alt="First Image"
                        width={350}
                        height={150}
                        src={isDarkMode ? `/assets/darkFooterSymbol.png`:`/assets/footerSymbol.png`} />
                </div>
                <div dir="rtl" className={`basis-3/8 grid grid-cols-2 gap-x-8 gap-y-4 p-3 dark:text-white text-black`}>
                    <p className="border-b border-b-yellow-600 p-2 content-center">درباره نانزی</p>
                    <p className="border-b border-b-yellow-600 p-2 content-center">پرسش‌های متداول</p>
                    <p className="border-b border-b-yellow-600 p-2 content-center">تماس با نانزی</p>
                    <p className="border-b border-b-yellow-600 p-2 content-center">ثبت شکایات</p>
                    <p className="border-b border-b-yellow-600 p-2 content-center">قوانین سایت</p>
                    <p className="border-b border-b-yellow-600 p-2 content-center">ساعت کاری:همیشه</p>
                    <p className="border-b border-b-yellow-600 p-2 content-center">رسیدگی به انتقادات و پیشنهادات:</p>
                    <p className="border-b border-b-yellow-600 p-2 content-center">۰۲۱-۱۱۱۱-۱۱۱۱</p>
                </div>
                <div dir="rtl" className="basis-3/8 flex flex-col flex-end p-5">
                    <div className="flex m-2 gap-3">
                        <Image src={isDarkMode ? `/assets/logo-dark.png` : `/assets/logo.png`}
                            alt="Logo"
                            width={150}
                            height={150} />
                        <div className="flex flex-col">
                            <h1 className={`text-5xl text-yellow-700 m-2"`}>نانزی</h1>
                            <p className={`dark:text-gray-200 text-black`}>نانزی،طعمی فراموش نشدنی</p>
                        </div>
                    </div>
                    <div className={`flex m-2 dark:text-white text-black`}>
                        <p className={`text-xl }`}>             فقط در چند دقیقه می توانید سبد  خرید خود را از انواع  نان
                            خوشمزه پر کنید و در کمترین زمان ممکن، آن هارا درب منزل
                            دریافت کنید . تجربه ای راحت و سریع از خرید نان ، حالا با نانزی در
                            دسترس شماست.</p>
                    </div>
                    <div className="flex m-2 gap-5 text-3xl">
                        <a
                            className="
                            w-10
                            text-yellow-700
                            border-yellow-700
                            duration-500
                            hover:rotate-360
                            hover:text-white
                            hover:bg-yellow-700
                            focus:rotate-360
                            foncus:text-white
                            foncus:bg-yellow-700
                            rounded-full
                            border-2
                            p-1
                            justify-center
                            content-center
                            "
                            href="https://x.com/Triptide2024?s=35"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                        <a
                            className="
                            w-10
                            text-yellow-700
                            border-yellow-700
                            duration-500
                            hover:rotate-360
                            hover:text-white
                            hover:bg-yellow-700
                            focus:rotate-360
                            foncus:text-white
                            foncus:bg-yellow-700
                            rounded-full
                            border-2
                            p-1
                            justify-center
                            content-center
                            "
                            href="https://www.instagram.com/triptide2024"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a
                            className="
                            w-10
                            text-yellow-700
                            border-yellow-700
                            duration-500
                            hover:rotate-360
                            hover:text-white
                            hover:bg-yellow-700
                            focus:rotate-360
                            foncus:text-white
                            foncus:bg-yellow-700
                            rounded-full
                            border-2
                            p-1
                            justify-center
                            content-center
                            "
                            href="https://www.youtube.com/@TripTide2024"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faTelegram} />
                        </a>
                        <a
                            className="
                            w-10
                            text-yellow-700
                            border-yellow-700
                            duration-500
                            hover:rotate-360
                            hover:text-white
                            hover:bg-yellow-700
                            focus:rotate-360
                            foncus:text-white
                            foncus:bg-yellow-700
                            rounded-full
                            border-2
                            p-1
                            justify-center
                            content-center
                            "
                            href="https://t.me/TripTide_Channel"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
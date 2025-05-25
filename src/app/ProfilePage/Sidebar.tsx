// components/Profile/Sidebar.tsx
'use client';
import { useRef, useState,useEffect  } from 'react';
import {convertToPersianNumbers} from "../../utils/Coversionutils"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdExit } from "react-icons/io";

import {  
  FaWallet, 
  FaBoxOpen, 
  FaMapMarkerAlt, 
  FaTicketAlt,
  FaChevronDown,
  FaChevronLeft,
  FaEdit
} from "react-icons/fa";
import Image from "next/image";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useTheme } from '../../components/theme';
import CreditPopup from './increaseCredit';

interface UserData {
  username: string;
  profile_photo?: string;
}
export default function Sidebar() {
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUsernameExpanded, setIsUsernameExpanded] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [credit,SetCredit]=useState(0);
  const [showCreditPopup, setShowCreditPopup] = useState(false);

  const [userData, setUserData] = useState<UserData>({

    username: 'در حال بارگذاری...',
    profile_photo: ''
  });
  const isActive = (path: string) => pathname.includes(path);
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') || '';
    }
    return '';
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('https://nanziback.liara.run/users/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUserData({
          username: response.data.username,
          profile_photo: response.data.profile_photo
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('https://nanziback.liara.run/user/wallet/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

                 SetCredit(response.data.balance);

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // if (loading) {
  //   return <div className="p-4">در حال بارگذاری...</div>;
  // }
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };



const handlePayment = async (amount: number) => {
    console.log("Initiating payment for amount:", amount);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No authorization token found.");
        return;
      }

      const response = await axios.post(
        "https://nanziback.liara.run/user/wallet/",
        { 
          type: 1, 
          value: amount.toString(), 
          description: "Wallet charge" 
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json" 
          } 
        }
      );

      console.log("Payment data:", response.data);
      const redirectUrl = response.data.payment_url;

      if (!redirectUrl) {
        alert("Payment processed, but no redirect URL was provided.");
        return;
      }

      window.open(redirectUrl, "_blank", "width=600,height=600");
      setShowCreditPopup(false);
      await fetchCredit();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  // Update your existing payment function to just open the popup
  const handlePaymentClick = () => {
    setShowCreditPopup(true);
  };

const fetchCredit = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.get("https://nanziback.liara.run/user/wallet/", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    SetCredit(response.data.balance); // Update the wallet balance
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
  }
};

  const toggleUsernameSection = () => {
    setIsUsernameExpanded(!isUsernameExpanded);
  };


  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      formData.append('username', editUsername);
      
      if (fileInputRef.current?.files?.[0]) {
        formData.append('profile_photo', fileInputRef.current.files[0]);
      }

      const response = await axios.put(
       'https://nanziback.liara.run/users/profile/update/',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setUserData({
        username: response.data.username,
        profile_photo: response.data.profile_photo
      });
      setIsUsernameExpanded(false);

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  
  return (
    <div className={`w-full  dark:bg-[#191919] bg-white shadow-md rounded-xl p-4 font-vazir mt-10 mr-5 h-screen`} dir="rtl">
      <div className="flex flex-col items-center mb-2 py-4 ">
        <div className="relative mb-4" onClick={handleImageClick}>
          <div className="w-20 h-20 border rounded-full  overflow-hidden flex items-center justify-center">
            
             
              <Image
                src={`/assets/default_profile.jpg`}
                alt="Default Profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />  
                 
          </div>
          {/* <button className="absolute bottom-0 left-0 bg-[#B8681D] text-white p-1 rounded-full transition-all"
           >
            <AddIcon className="text-xs" />
          </button> */}
          {/* <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}

          /> */}
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center flex-col" >
            <h3 className={`text-lg font-semibold dark:text-white text-black mt-2`}>{userData.username} </h3>
            <button 
              className="flex justify-end ml-auto text-[#34A853] text-[15px] mt-4"
              onClick={toggleUsernameSection}
            >          <FaEdit className="text-xl mr-2 ml-2" />

              <span className="justify-end ml-auto">ویرایش نام کاربری</span>
              {isUsernameExpanded ? (
                <FaChevronLeft className="mr-1 mt-1" />
              ) : (
                <FaChevronDown className="mr-1 mt-1" />
              )}
            </button>
          </div>

          {isUsernameExpanded && (
            <div className={`mt-4 flex items-center gap-7 dark:text-white text-black`}>
              <input
                type="text"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                className={`border-none focus:outline-none rounded-md px-5 py-2 flex-1 text-sm dark:bg-[#383535] bg-[#D9D9D9] w-20`}
                placeholder="نام جدید را وارد کنید"
              />
              <button 
                className={`bg-[#5BCD79] dark:text-black text-white px-5 py-2 rounded-lg text-sm `}
                onClick={handleProfileUpdate}
              >
                ثبت
              </button>
            </div>
          )}
        </div>
      </div>

    <div className="mb-6 p-4  border-none  ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-25">
        <div className="flex items-center">
            <FaWallet className="text-[#B8681D] ml-2" />
            <span className={` dark:text-white text-black font-bold`}>کیف پول من</span>
          </div>
        <div className="text-left">
          <span className={` text-xl dark:text-white  `}>  {convertToPersianNumbers(credit )}  تومان </span>
        </div>
        </div>
        
        <div className="flex justify-between items-center">
          
          <button onClick={handlePaymentClick}
            
            className="text-[#B8681D] text-sm   px-3 py-1 rounded-md  mr-5 transition-colors"
          >
            + افزایش موجودی
          </button>
        </div>
      </div>
    </div>

      {/* Navigation Menu */}
      <ul className="space-y-0">
  <MenuItem 
    icon={<FaBoxOpen />} 
    text="سفارش های من" 
    href="/ProfilePage/OrdersPage" 
    isActive={pathname.includes('/profile/orders')} 
  />
  <MenuItem 
    icon={<FaMapMarkerAlt />} 
    text="آدرس های من" 
    href="/ProfilePage/addresses" 
    isActive={pathname.includes('/profile/addresses')} 
  />
  <MenuItem 
    icon={<FaTicketAlt />} 
    text="کدهای تخفیف" 
    href="/ProfilePage/OrdersPage" 
    isActive={pathname.includes('/profile/discounts')} 
  />
  <MenuItem 
    icon={<IoMdExit />} 
    text="خروج" 
    href="/logout" 
    isActive={pathname.includes('/logout')} 
  />
</ul>
 {showCreditPopup && (
    <CreditPopup 
      currentBalance={credit}
      onClose={() => setShowCreditPopup(false)}
      onPayment={handlePayment}
    />
  )}

     
    </div>
  );
}

function MenuItem({ icon, text, href, isActive }: {
  icon: React.ReactNode;
  text: string;
  href: string;
  isActive: boolean;


}) {

  return (
    <li className={`dark:border-white border-black border-t  last:border-b-0`}>
      <Link
        href={href}
        className={`flex items-center p-7 h-full transition-colors ${
          isActive 
            ? 'bg-[#FFE6C1] text-[#B8681D] font-medium hover:bg-[#FFE6C1]' 
            : 'hover:bg-[#FFF5E9] text-gray-500'
        }`}
      >
        <span className={`flex items-center justify-center w-6 ${
          isActive ? 'text-[#B8681D]' : 'text-gray-500'
        }`}>
          {icon}
        </span>
        <span className="flex-1 text-right pr-3">{text}</span>
      </Link>
    </li>
  )
}
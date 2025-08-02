'use client';
import { useRef, useState, useEffect } from 'react';
import { convertToPersianNumbers } from "../../utils/Coversionutils";
import { FaWallet, FaBoxOpen, FaMapMarkerAlt, FaTicketAlt, FaChevronDown, FaChevronLeft, FaEdit } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import Image from "next/image";
import axios from 'axios';
import CreditPopup from './increaseCredit';
import Link from 'next/link';
import { BiSupport } from "react-icons/bi";


interface UserData {
  username: string;
  profile_photo?: string;
}

interface SidebarProps {
  setIsMobileOpen?: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

export default function Sidebar({ setIsMobileOpen, setActiveTab, activeTab }: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUsernameExpanded, setIsUsernameExpanded] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [credit, setCredit] = useState(0);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    username: 'در حال بارگذاری...',
    profile_photo: ''
  });

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

        const [profileResponse, walletResponse] = await Promise.all([
          axios.get('https://nanziback.liara.run/users/profile/', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('https://nanziback.liara.run/user/wallet/', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        setUserData({
          username: profileResponse.data.username,
          profile_photo: profileResponse.data.profile_photo
        });
        setCredit(walletResponse.data.balance);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePayment = async (amount: number) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('لطفا ابتدا وارد حساب کاربری خود شوید');
      }

      const response = await axios.post(
        "https://nanziback.liara.run/user/wallet/",
        { 
          type: 1, 
          value: amount.toString(), 
          description: "افزایش اعتبار کیف پول" 
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          } 
        }
      );

      if (!response.data.payment_url) {
        throw new Error('لینک پرداخت دریافت نشد');
      }

      const newWindow = window.open(response.data.payment_url, '_blank');
      if (!newWindow) {
        throw new Error('پنجره پرداخت مسدود شده است');
      }

      // Check payment status periodically
      const checkPayment = setInterval(async () => {
        try {
          const balanceResponse = await axios.get(
            "https://nanziback.liara.run/user/wallet/",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          if (balanceResponse.data.balance > credit) {
            clearInterval(checkPayment);
            setCredit(balanceResponse.data.balance);
          }
        } catch (err) {
          console.error('Error checking payment:', err);
        }
      }, 5000);

      // Stop checking after 5 minutes
      setTimeout(() => clearInterval(checkPayment), 300000);

    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  };

  const fetchCredit = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found");

      const response = await axios.get("https://nanziback.liara.run/user/wallet/", {
        headers: { "Authorization": `Bearer ${token}` }
      });

      setCredit(response.data.balance);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const toggleUsernameSection = () => {
    setIsUsernameExpanded(!isUsernameExpanded);
    if (!isUsernameExpanded) {
      setEditUsername(userData.username);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const token = getToken();
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
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const MenuItem = ({ icon, text, tabName }: {
    icon: React.ReactNode;
    text: string;
    tabName: string;
  }) => {
    const isActive = activeTab === tabName;
    const handleClick = () => {
      setActiveTab(tabName);
      if (setIsMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    return (
      <li className={`dark:border-white border-black border-t last:border-b-0`}>
        <button
          onClick={handleClick}
          className={`w-full flex items-center p-7 h-full transition-colors ${
            isActive 
              ? 'lg:bg-[#FFE6C1] lg:text-[#B8681D] lg:font-medium hover:bg-[#FFE6C1] text-gray-500' 
              : 'text-gray-500 hover:bg-[#FFF5E9]'
          }`}
        >
          <span className={`flex items-center justify-center w-6 ${
            isActive ? 'lg:text-[#B8681D] text-gray-500' : 'text-gray-500'
          }`}>
            {icon}
          </span>
          <span className="flex-1 text-right pr-3">{text}</span>
        </button>
      </li>
    );
  };

  return (
    <div className={`w-full dark:bg-[#191919] bg-white p-4 font-vazir overscroll-contain max-w-md rounded-xl overflow-y-auto`}>
      <div dir="rtl">
        <div className="flex flex-col items-center mb-2 py-4 mt-6 lg:mt-0">
          <div className="relative mb-4" onClick={handleImageClick}>
            <div className="w-20 h-20 border rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src={profileImage || userData.profile_photo || '/assets/default_profile.jpg'}
                alt="Profile"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />  
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="w-full">
            <div className="flex justify-between items-center flex-col">
              <h3 className={`text-lg font-semibold dark:text-white text-black mt-2`}>
                {userData.username}
              </h3>
              <button 
                className="flex justify-end ml-auto text-[#34A853] text-[15px] mt-4"
                onClick={toggleUsernameSection}
              >
                <FaEdit className="text-xl mr-2 ml-2" />
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
                  className={`border-none focus:outline-none rounded-md px-5 py-2 flex-1 text-sm dark:bg-[#383535] bg-[#D9D9D9]`}
                  placeholder="نام جدید را وارد کنید"
                />
                <button 
                  className={`bg-[#5BCD79] dark:text-black text-white px-5 py-2 rounded-lg text-sm`}
                  onClick={handleProfileUpdate}
                >
                  ثبت
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center">
                <FaWallet className="text-[#B8681D] ml-2" />
                <span className={`dark:text-white text-black font-bold`}>کیف پول من</span>
              </div>
              <span className={`text-xl dark:text-white`}>
                {convertToPersianNumbers(credit)} تومان
              </span>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreditPopup(true)}
                className="text-[#B8681D] text-sm px-3 py-1 rounded-md transition-colors"
              >
                + افزایش موجودی
              </button>
            </div>
          </div>
        </div>

        <ul className="space-y-0">
          <MenuItem 
            icon={<FaBoxOpen />} 
            text="سفارش های من" 
            tabName="orders" 
          />
          <MenuItem 
            icon={<FaMapMarkerAlt />} 
            text="آدرس های من" 
            tabName="addresses" 
          />
          <MenuItem 
            icon={<BiSupport />} 
            text="پشتیبانی" 
            tabName="support" 
          />
          <li className={`dark:border-white border-black border-t last:border-b-0`}>
            <Link
              href="/logout"
              className={`flex items-center p-7 h-full transition-colors hover:bg-[#FFF5E9] text-gray-500`}
            >
              <span className="flex items-center justify-center w-6 text-gray-500">
                <IoMdExit />
              </span>
              <span className="flex-1 text-right pr-3">خروج</span>
            </Link>
          </li>
        </ul>
      </div>

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
'use client';
import { useRef, useState, useEffect } from 'react';
import { convertToPersianNumbers } from "../../utils/Coversionutils";
import { FaWallet, FaBoxOpen, FaMapMarkerAlt, FaTicketAlt, FaChevronDown, FaChevronLeft, FaEdit } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import Image from "next/image";
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
// import { useTheme } from '../../components/theme';
import Link from "next/link";

interface UserData {
  username: string;
  profile_photo?: string;
}

interface SidebarProps {
  setIsMobileOpen?: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  activeTab: string;
  isMobileOpen : boolean
}

export default function Sidebar({ setIsMobileOpen,isMobileOpen, setActiveTab, activeTab }: SidebarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUsernameExpanded, setIsUsernameExpanded] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [credit, setCredit] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    username: 'در حال بارگذاری...',
    profile_photo: ''
  });
  // const { isDarkMode } = useTheme();

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

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('لطفاً یک تصویر انتخاب کنید');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('حجم تصویر باید کمتر از ۲ مگابایت باشد');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setProfileImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
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
              ? 'lg:bg-[#FFE6C1] lg:text-[#B8681D] lg:font-medium hover:bg-[#FFE6C1] text-gray-500 ' 
              : 'text-gray-500 hover:bg-[#FFF5E9]'
          }`}
        >
          <span className={`flex items-center justify-center w-6 
          ${
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
    <div className={`w-full h-full dark:bg-[#191919] bg-white p-4 font-vazir max-w-md`} dir="rtl">
      {/* <button 
        className="lg:hidden absolute top-4 left-4 text-gray-500 text-2xl"
        onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
      >
        ×
      </button> */}

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
                className={`border-none focus:outline-none rounded-md px-5 py-2 flex-1 text-sm 
                  dark:bg-[#383535] bg-[#D9D9D9]`}
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
              onClick={() => {
                setActiveTab('wallet');
                setIsMobileOpen && setIsMobileOpen(false);
              }}
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
          icon={<FaTicketAlt />} 
          text="کدهای تخفیف" 
          tabName="discounts" 
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
  );
}
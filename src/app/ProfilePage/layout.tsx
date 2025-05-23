'use client';

import Sidebar from "./Sidebar";  
import { useTheme } from '../../components/theme';


export default function ProfileLayout({
 

    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div  className={`dark:bg-[#383535] bg-[#f5f5f5]`} >
        
      <div className=" flex  flex-row ">
        {/* Main content comes FIRST (left side) */}
        <div className="flex flex-grow w-full lg:w-[90%] mr-0 ">
          {children}
        
        
        {/* Sidebar comes SECOND (right side) */}
        <div className="w-full  flex flex-grow lg:w-[10%] ml-auto sm:block">
          <Sidebar />
        </div>
        </div>
        
        {/* Clearfix for the float layout */}
        <div className="clear-both"></div>
      </div>
      </div>
    );
  }

//    <div className={` flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"} flex flex-row`}>
//                   {/* <div className={` flex-shrink-0 ${isDarkMode ? "bg-[#383535]" : "bg-[#f5f5f5]"}  `}>
//                       <Receipt />
//                   </div> */}
//                   <CategoryList category={id} />
//               </div>
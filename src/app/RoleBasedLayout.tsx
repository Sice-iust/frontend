"use client"; // Required since we're using hooks

import {  useUserRole } from "./userRole";
import AdminHeader from "../components/Admin/Add/header";
import Header2 from "../components/HomePage/header2";
import AdminPanel from "../../src/app/AdminAddPage/page";
import Footer2 from "../components/HomePage/footer";
import OrdersPage from "../app/OrdersAdmin/page";
import { usePathname } from "next/navigation";

export default function RoleBasedLayout({ children }) {
  const userRole = useUserRole(); 
const pathname = usePathname();
  return (
    <div className="relative">
      {userRole === "admin" ? <AdminHeader /> : <Header2 />}
      {userRole === "admin" ? (
        pathname === "/AdminAddPage" ? <AdminPanel /> :
        pathname === "/OrdersAdmin" ? <OrdersPage /> :
        <AdminPanel /> 
      ) : (
        children 
      )}

      <div className="hidden md:block">{userRole === "user" && <Footer2 />}</div>
    </div>
  );
}
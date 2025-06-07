"use client"; // Required since we're using hooks

import {  useUserRole } from "./userRole";
import AdminHeader from "../components/Admin/Add/header";
import Header2 from "../components/HomePage/header2";
import AdminPanel from "../../src/app/AdminAddPage/page";
import Footer2 from "../components/HomePage/footer";

export default function RoleBasedLayout({ children }) {
  const userRole = useUserRole(); // ✅ This is now correctly inside a Client Component

  return (
    <div className="relative">
      {userRole === "admin" ? <AdminHeader /> : <Header2 />}
      {userRole === "admin" ? <AdminPanel /> : children}
      <div className="hidden md:block">{userRole === "user" && <Footer2 />}</div>
    </div>
  );
}
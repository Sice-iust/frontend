"use client"; // Ensures this runs only on the client

import { createContext, useContext, useEffect, useState } from "react";

const UserRoleContext = createContext("user");

export function UserRoleProvider({ children }) {
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "user";
    setUserRole(storedRole);
  }, []);

  return (
    <UserRoleContext.Provider value={userRole}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  return useContext(UserRoleContext);
}
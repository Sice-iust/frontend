'use client'
import React from "react";
import Tab from "../../components/Admin/Add/Switch";
import { useTheme } from "../../components/theme";

export default function HomePage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <>
      <div>
        <Tab />
      </div>
    </>
  );
}; 
import React, { useState, useEffect } from "react";
import LoginModal from "../login/login"; // Ensure the path is correct 
import { useTheme } from '../theme'; // Import your theme context if needed  
import Navbar from "./navbar";
export default function HomePage() {
  
  return (
    <div>
      <Navbar/>
    </div>
  );
}; 
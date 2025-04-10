import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Margin } from "@mui/icons-material";

export default function HomePage() {
  
  return (
    <div>
      <Navbar/>
      <div style={{marginBottom:'50px'}}></div>
      <Footer/>
    </div>
  );
}; 
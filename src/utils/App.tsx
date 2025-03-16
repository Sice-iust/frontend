import React, { StrictMode } from 'react';  
import { createRoot } from 'react-dom/client';  
import './index.css';  
import { BrowserRouter, Route, Routes } from 'react-router-dom';  
import HomePage from '../components/Homepage/homepage';  

const rootElement = document.getElementById('root') as HTMLElement;  

createRoot(rootElement).render(  
  <StrictMode>  
    <BrowserRouter>  
      <Routes>  
        <Route path="/h" element={<HomePage />} />  
      </Routes>  
    </BrowserRouter>  
  </StrictMode>,  
);  
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../components/Homepage/homepage';
import {ThemeProvider} from '../components/theme';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <ThemeProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            {/* <Route path="blogs" element={<Blogs />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>,
  </ThemeProvider>
);  
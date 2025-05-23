import './globals.css';
import Footer2 from "../components/HomePage/footer2";
import Header2 from '../components/HomePage/header2';

import { ThemeProvider, useTheme } from "../components/theme";
import { CartProvider } from "../context/Receiptcontext";
import { AddressProvider } from "../context/GetAddress";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AddressProvider>
            <ThemeProvider>
              <div className='relative'>
                <Header2 />
                {children}
                <Footer2 />
              </div>
            </ThemeProvider>
          </AddressProvider>
        </CartProvider>
      </body>
    </html>
  );
}
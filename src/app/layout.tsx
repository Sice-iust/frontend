import './globals.css';
import Footer2 from "../components/HomePage/footer2";
import Header2 from '../components/HomePage/header2';

import { ThemeProvider, useTheme } from "../components/theme";
import { CartProvider } from "../context/Receiptcontext";
import { AddressProvider } from "../context/GetAddress";
import { OrderProvider } from '../context/Adminordercontext';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AddressProvider>
            <OrderProvider>
            <ThemeProvider>
              <div className='relative'>
                <Header2 />
                {children}
                <div className="hidden md:block">
                  <Footer2 />
                </div>
              </div>
            </ThemeProvider>
            </OrderProvider>
          </AddressProvider>
        </CartProvider>
      </body>
    </html>
  );
}
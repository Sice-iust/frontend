import './globals.css';
import Footer2 from "../components/HomePage/footer";
import Header2 from '../components/HomePage/header2';

import { ThemeProvider, useTheme } from "../components/theme";
import { CartProvider } from "../context/Receiptcontext";
import { AddressProvider } from "../context/GetAddress";
import { ItemProvider } from '../context/AdminAddItem';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ItemProvider>
          <AddressProvider>
            <ThemeProvider>
              <div className='relative'>
                <Header2 />
                {children}
                <div className="hidden md:block">
                  <Footer2 />
                </div>
              </div>
            </ThemeProvider>
          </AddressProvider>
          </ItemProvider>
        </CartProvider>
      </body>
    </html>
  );
}
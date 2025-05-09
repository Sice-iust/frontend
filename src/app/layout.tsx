import './globals.css';
import Footer2 from "./footer2";
import Header2 from './header2';

import { ThemeProvider } from "./theme";
import { CartProvider } from "../context/Receiptcontext";
import {AddressProvider} from "../context/GetAddress";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AddressProvider>
            <ThemeProvider>
              <Header2 />
              {children}
              <Footer2 />
            </ThemeProvider>
          </AddressProvider>
        </CartProvider>
      </body>
    </html>
  );
}
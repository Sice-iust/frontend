import './globals.css';
import Footer2 from "./footer2";
import Header2 from './header2';

import { ThemeProvider } from "./theme";
import { CartProvider } from "../context/Receiptcontext";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ThemeProvider>
            <Header2 />
            {children}
            <Footer2 />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
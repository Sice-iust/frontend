import './globals.css';
import Footer from "./footer";
import Footer2 from "./footer2";
import { ThemeProvider } from "./theme";
import { CartProvider } from "../context/Receiptcontext";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ThemeProvider>
            {children}
            <Footer2 />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
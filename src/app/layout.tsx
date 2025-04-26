import Footer from "./footer";
import { ThemeProvider } from "./theme";
import './globals.css';
import { CartProvider } from "../context/Receiptcontext";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ThemeProvider>
            {children}
            {/* <Footer /> */}
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
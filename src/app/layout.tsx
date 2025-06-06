import './globals.css';
import Footer2 from "../components/HomePage/footer";
import Header2 from '../components/HomePage/header2';

import { ThemeProvider, useTheme } from "../components/theme";
import { CartProvider } from "../context/Receiptcontext";
import { AddressProvider } from "../context/GetAddress";
import { ItemProvider } from '../context/AdminAddItem';
import AdminPanel from "../../src/app/AdminAddPage/page";
import AdminHeader   from "../components/Admin/Add/header"
export default function Layout({ children }) {
  const userRole ="admin" ;
// console.log("user rollll: ",userRole);
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ItemProvider>
          <AddressProvider>

            <ThemeProvider>
              <div className='relative'>
                 {userRole === "admin" ? <AdminHeader /> : <Header2 />}

                {userRole === "admin" ?<AdminPanel /> :children}

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
import "./globals.css";
import { UserRoleProvider } from "./userRole";
import RoleBasedLayout from "./RoleBasedLayout"; 
import { ThemeProvider } from "../components/theme";
import { CartProvider } from "../context/Receiptcontext";
import { AddressProvider } from "../context/GetAddress";
import { ItemProvider } from "../context/AdminAddItem";
import { OrderProvider } from '../context/Adminordercontext';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserRoleProvider>
          <CartProvider>
            <ItemProvider>
                        <OrderProvider>

              <AddressProvider>
                <ThemeProvider>
                  <RoleBasedLayout>{children}</RoleBasedLayout>
                </ThemeProvider>
              </AddressProvider>
                          </OrderProvider>

            </ItemProvider>
          </CartProvider>
        </UserRoleProvider>
      </body>
    </html>
  );
}
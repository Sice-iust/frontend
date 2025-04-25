import './globals.css';
import Footer from "./footer";
import Footer2 from "./footer2";
import { ThemeProvider } from "./theme";


export default function Layout({ children }) {
  return (
    <>
      <html>
        <body>
          {
            <ThemeProvider>
              {children}
              <Footer2 />
            </ThemeProvider>
          }
        </body>
      </html>
    </>
  )
}
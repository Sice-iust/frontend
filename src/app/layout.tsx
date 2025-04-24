import Footer from "./footer";
import { ThemeProvider } from "./theme";
import './globals.css';


export default function Layout({ children }) {
  return (
    <>
      <html>
        <body>
          {
            <ThemeProvider>
              {children}
              <Footer />
            </ThemeProvider>
          }
        </body>
      </html>

    </>
  )
}
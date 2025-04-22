import Footer from "./footer";
import { ThemeProvider } from "./theme";


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
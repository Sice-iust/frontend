import Footer from "../HomePage/footer";
import Navbar from "../HomePage/navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
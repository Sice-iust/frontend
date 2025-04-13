import Footer from "../HomePage/footer";
import Navbar from "../HomePage/navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
import Footer from "../HomePage/footer";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
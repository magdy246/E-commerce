import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";

export default function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

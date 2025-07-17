import Header from "../../widgets/Header/Header";
import { Outlet } from "react-router";
import Footer from "../../widgets/Footer/Footer";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

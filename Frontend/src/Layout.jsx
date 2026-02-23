import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
   <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 relative">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;

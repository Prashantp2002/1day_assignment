import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="w-full max-w-6xl">
        <Navbar />

        <main className="px-4 py-8 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
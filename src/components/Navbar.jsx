import { Link, NavLink } from "react-router-dom";
import { Boxes, ShoppingCart } from "lucide-react";

import useCartStore from "../store/useCartStore";
import useAuthStore from "../store/useAuthStore";

function Navbar() {
  const items = useCartStore((state) => state.items);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const toggleAdmin = useAuthStore((state) => state.toggleAdmin);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navClass = ({ isActive }) =>
    isActive
      ? "font-medium text-teal-700 transition-colors"
      : "font-medium text-slate-500 transition-colors hover:text-teal-700";

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">

        <div className="flex items-center justify-between py-4">

          <Link
            to="/products"
            className="flex items-center gap-2 text-teal-700 transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md"
          >
            <Boxes size={24} />

            <span className="font-display text-xl font-bold tracking-tight">
              Store
            </span>
          </Link>

          <div className="flex items-center gap-5">

            <NavLink
              to="/products"
              className={navClass}
            >
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className={navClass}
            >
              Cart
            </NavLink>

            <NavLink
              to="/admin"
              className={navClass}
            >
              Admin
            </NavLink>

            <button
              onClick={toggleAdmin}
              className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-teal-700 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:block"
            >
              {isAdmin ? "Logout" : "Admin Login"}
            </button>

            <Link
              to="/cart"
              aria-label="Cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-teal-700 px-1 text-xs font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
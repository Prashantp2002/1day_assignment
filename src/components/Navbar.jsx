import { Link, NavLink } from "react-router-dom";
import {
  Boxes,
  ShoppingCart,
  Search,
  User,
} from "lucide-react";

import useAuthStore from "../store/useAuthStore";

function Navbar() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const toggleAdmin = useAuthStore((state) => state.toggleAdmin);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        <Link
          to="/products"
          className="flex items-center gap-2 text-teal-700"
        >
          <Boxes
            size={26}
            strokeWidth={2}
          />

          <span className="font-display text-xl font-bold tracking-tight">
            Store
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-teal-700"
                : "font-medium text-slate-600 hover:text-teal-700"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-teal-700"
                : "font-medium text-slate-600 hover:text-teal-700"
            }
          >
            Cart
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-teal-700"
                : "font-medium text-slate-600 hover:text-teal-700"
            }
          >
            Admin
          </NavLink>

        </div>


        <div className="flex items-center gap-3">

          <button
            onClick={toggleAdmin}
            className="hidden rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:border-teal-700 hover:text-teal-700 sm:block"
          >
            {isAdmin ? "Logout Admin" : "Log in as admin"}
          </button>

          <button
            aria-label="Search"
            className="text-slate-600 hover:text-teal-700"
          >
            <Search
              size={20}
              strokeWidth={1.75}
            />
          </button>

          <button
            aria-label="Account"
            className="hidden text-slate-600 hover:text-teal-700 sm:block"
          >
            <User
              size={20}
              strokeWidth={1.75}
            />
          </button>

          <Link
            to="/cart"
            aria-label="Cart"
            className="relative text-slate-600 hover:text-teal-700"
          >
            <ShoppingCart
              size={20}
              strokeWidth={1.75}
            />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1 text-xs font-bold text-white">
              2
            </span>
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
import { Link, NavLink } from "react-router-dom";
import {
  Boxes,
  ShoppingCart,
  Search,
  User,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link
          to="/"
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

        {/* Navigation */}
        <div className="hidden items-center gap-6 md:flex">

          <NavLink
            to="/"
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

        {/* Icons */}
        <div className="flex items-center gap-4">

          <button
            className="text-slate-600 hover:text-teal-700"
            aria-label="Search"
          >
            <Search
              size={20}
              strokeWidth={1.75}
            />
          </button>

          <button
            className="text-slate-600 hover:text-teal-700"
            aria-label="Account"
          >
            <User
              size={20}
              strokeWidth={1.75}
            />
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-slate-600 hover:text-teal-700"
            aria-label="Cart"
          >
            <ShoppingCart
              size={20}
              strokeWidth={1.75}
            />

            {/* Temporary cart count */}
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
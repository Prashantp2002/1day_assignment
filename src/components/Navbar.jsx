import { Link } from "react-router-dom";
import { ShoppingCart, Shield } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Product Store
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-black"
          >
            Products
          </Link>

          <Link
            to="/admin"
            className="flex items-center gap-1 text-gray-700 hover:text-black"
          >
            <Shield size={18} />
            Admin
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-1 text-gray-700 hover:text-black"
          >
            <ShoppingCart size={20} />
            Cart
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
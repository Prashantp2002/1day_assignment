import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

import useCartStore from "../store/useCartStore";

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAddToCart(event) {
    event.preventDefault();
    event.stopPropagation();

    addItem(product);
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-52 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-56"
        />

        {product.discountPercentage > 10 && (
          <span className="absolute left-3 top-3 rounded-full bg-teal-700 px-3 py-1 text-xs font-bold text-white">
            {Math.round(product.discountPercentage)}% OFF
          </span>
        )}
      </div>

      <div className="p-4">

        <h2 className="truncate font-display font-bold leading-tight">
          {product.title}
        </h2>

        <p className="mt-1 truncate text-sm text-slate-500">
          {product.brand || "No brand"}
        </p>

        <div className="mt-4 flex items-center justify-between">

          <span className="font-bold">
            ₹{product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-1 text-sm text-slate-600">
            <Star
              size={16}
              fill="currentColor"
              className="text-teal-700"
            />

            <span>{product.rating}</span>
          </div>

        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <ShoppingCart size={18} />

          Add to cart
        </button>

      </div>
    </Link>
  );
}

export default ProductCard;
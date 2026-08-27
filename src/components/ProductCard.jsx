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
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
    >
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
        />

        {product.discountPercentage > 10 && (
          <span className="absolute left-3 top-3 rounded-md bg-teal-700 px-2 py-1 text-xs font-bold tracking-wide text-white">
            {Math.round(product.discountPercentage)}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">

        <div>
          <h2 className="truncate font-display text-base font-bold leading-tight tracking-tight text-slate-900">
            {product.title}
          </h2>

          <p className="mt-1 truncate text-sm text-slate-500">
            {product.brand || "No brand"}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Price
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              ₹{product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5">
            <Star
              size={16}
              strokeWidth={1.75}
              fill="currentColor"
              className="text-teal-700"
            />

            <span className="text-sm font-medium text-slate-700">
              {product.rating}
            </span>
          </div>

        </div>

        <button
          onClick={handleAddToCart}
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <ShoppingCart
            size={18}
            strokeWidth={1.75}
          />

          Add to cart
        </button>

      </div>
    </Link>
  );
}

export default ProductCard;
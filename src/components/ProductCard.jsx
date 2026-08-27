import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";

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
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >

      <div className="relative">

        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-56 w-full object-cover"
        />

        {product.discountPercentage > 10 && (
          <span className="absolute left-3 top-3 rounded-full bg-teal-700 px-3 py-1 text-xs font-bold text-white">
            {Math.round(product.discountPercentage)}% OFF
          </span>
        )}

      </div>

      <div className="p-4">

        <h2 className="truncate font-display font-bold">
          {product.title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {product.brand || "No brand"}
        </p>


        <div className="mt-4 flex items-center justify-between">

          <span className="font-bold text-slate-900">
            ₹{product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-1 text-sm">

            <Star
              size={16}
              fill="currentColor"
              className="text-amber-500"
            />

            <span>
              {product.rating}
            </span>

          </div>

        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-3 font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          <ShoppingCart size={18} />

          Add to cart
        </button>

      </div>

    </Link>
  );
}

export default ProductCard;
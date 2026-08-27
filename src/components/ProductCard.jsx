import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">
          {product.title}
        </h2>

        <p className="text-gray-500 text-sm mt-2">
          {product.category}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold">
            ${product.price}
          </p>

          <Link
            to={`/products/${product.id}`}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
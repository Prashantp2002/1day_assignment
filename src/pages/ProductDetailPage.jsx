import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
} from "lucide-react";

import api from "../api/axiosInstance";
import useCartStore from "../store/useCartStore";
import StateBlock from "../components/StateBlock";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProduct() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/products/${id}`);

      setProduct(response.data);

      setSelectedImage(
        response.data.images?.[0] ||
        response.data.thumbnail
      );
    } catch (error) {
      console.error(error);

      setError(
        "We couldn't find this product."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);


  if (loading) {
    return <StateBlock type="loading" />;
  }


  if (error) {
    return (
      <StateBlock
        type="error"
        message={error}
        onRetry={fetchProduct}
      />
    );
  }


  if (!product) {
    return null;
  }


  return (
    <div>

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 font-medium text-slate-600 hover:text-teal-700"
      >
        <ArrowLeft size={20} />

        Back
      </button>


      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* Images */}
        <div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img
              src={selectedImage}
              alt={product.title}
              className="h-[400px] w-full object-cover sm:h-[500px]"
            />
          </div>


          {/* Gallery */}
          <div className="mt-4 flex gap-3 overflow-x-auto">

            {product.images?.map((image, index) => (
              <button
                key={`${product.id}-${index}`}
                onClick={() => setSelectedImage(image)}
                className={`flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                  selectedImage === image
                    ? "border-teal-700"
                    : "border-slate-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="h-20 w-20 object-cover"
                />
              </button>
            ))}

          </div>

        </div>


        {/* Information */}
        <div>

          <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
            {product.category}
          </p>

          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">
            {product.title}
          </h1>

          <p className="mt-2 text-slate-500">
            {product.brand || "No brand"}
          </p>


          <div className="mt-6 flex items-center gap-2">

            <Star
              size={20}
              fill="currentColor"
              className="text-amber-500"
            />

            <span className="font-medium">
              {product.rating}
            </span>

          </div>


          <p className="mt-6 text-3xl font-bold">
            ₹{product.price.toFixed(2)}
          </p>


          <p className="mt-4 text-slate-600">
            Stock: {product.stock}
          </p>


          <p className="mt-6 leading-relaxed text-slate-600">
            {product.description}
          </p>


          <button
            onClick={() => addItem(product)}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-4 font-medium text-white hover:bg-teal-800 sm:w-auto"
          >
            <ShoppingCart size={20} />

            Add to cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetailPage;
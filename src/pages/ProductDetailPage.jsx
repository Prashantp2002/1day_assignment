import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">
        Product Detail Page
      </h1>

      <p className="mt-2 text-slate-600">
        Product ID: {id}
      </p>
    </div>
  );
}

export default ProductDetailPage;
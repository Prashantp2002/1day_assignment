import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">

      <p className="font-display text-7xl font-bold text-teal-700">
        404
      </p>

      <h1 className="mt-4 font-display text-2xl font-bold">
        Page not found
      </h1>

      <p className="mt-2 text-slate-600">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/products"
        className="mt-6 flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
      >
        <ArrowLeft size={18} />

        Back to Products
      </Link>

    </div>
  );
}

export default NotFoundPage;
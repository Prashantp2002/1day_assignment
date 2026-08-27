import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">

      <h1 className="font-display text-6xl font-bold text-teal-700">
        404
      </h1>

      <h2 className="mt-4 font-display text-2xl font-bold">
        Page not found
      </h2>

      <p className="mt-2 text-slate-600">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/products"
        className="mt-6 rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
      >
        Back to Products
      </Link>

    </div>
  );
}

export default NotFoundPage;
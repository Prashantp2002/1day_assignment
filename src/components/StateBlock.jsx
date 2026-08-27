import {
  AlertCircle,
  LoaderCircle,
  PackageSearch
} from "lucide-react";

function StateBlock({ type, message, onRetry }) {
  if (type === "loading") {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center">
        <LoaderCircle
          size={36}
          className="animate-spin text-teal-700"
        />

        <p className="mt-4 text-slate-600">
          Loading products...
        </p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center px-4 text-center">

        <AlertCircle
          size={40}
          className="text-red-600"
        />

        <h2 className="mt-4 font-display text-xl font-bold">
          Something went wrong
        </h2>

        <p className="mt-2 max-w-md leading-relaxed text-slate-600">
          {message || "We couldn't load the products."}
        </p>

        <button
          onClick={onRetry}
          className="mt-5 h-11 rounded-lg bg-teal-700 px-5 font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Retry
        </button>

      </div>
    );
  }

  if (type === "empty") {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center px-4 text-center">

        <PackageSearch
          size={40}
          className="text-slate-400"
        />

        <h2 className="mt-4 font-display text-xl font-bold">
          No products found
        </h2>

        <p className="mt-2 max-w-md leading-relaxed text-slate-600">
          Try a different search term or choose another category.
        </p>

      </div>
    );
  }

  return null;
}

export default StateBlock;
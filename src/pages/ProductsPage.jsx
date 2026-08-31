import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import StateBlock from "../components/StateBlock";
import BackToTop from "../components/BackToTop";
import { getDiscountedPrice, formatPrice } from "../utils/format";
import { makeComparator } from "../utils/sorting";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  const limit = 12;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const updateParam = useCallback(
    (key, value, replace = true) => {
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous);

          if (!value) {
            next.delete(key);
          } else {
            next.set(key, value);
          }

          if (key !== "page") {
            next.delete("page");
          }

          return next;
        },
        { replace }
      );
    },
    [setSearchParams]
  );

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let response;

      const skip = (page - 1) * limit;

      if (category) {
        response = await api.get(`/products/category/${category}`, {
          params: {
            limit,
            skip,
          },
        });
      } else if (search) {
        response = await api.get("/products/search", {
          params: {
            q: search,
            limit,
            skip,
          },
        });
      } else {
        response = await api.get("/products", {
          params: {
            limit,
            skip,
          },
        });
      }

      setProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
      setError("We couldn't load the products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, category, page]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/products/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (minPrice !== "") {
      result = result.filter(
        (product) =>
          getDiscountedPrice(product) >= Number(minPrice)
      );
    }

    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          getDiscountedPrice(product) <= Number(maxPrice)
      );
    }

    if (sort === "price-asc") {
      result.sort(
        (a, b) =>
          getDiscountedPrice(a) - getDiscountedPrice(b)
      );
    }

    if (sort === "price-desc") {
      result.sort(
        (a, b) =>
          getDiscountedPrice(b) - getDiscountedPrice(a)
      );
    }

    if (sort === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "title-asc") {
      result.sort(makeComparator("title", "asc"));
    }

    if (sort === "title-desc") {
      result.sort(makeComparator("title", "desc"));
    }

    return result;
  }, [products, minPrice, maxPrice, sort]);

  function handleSearchChange(value) {
    updateParam("q", value);
  }

  function handleCategoryChange(value) {
    updateParam("category", value);
  }

  function handleSortChange(value) {
    updateParam("sort", value);
  }

  function handleMinPriceChange(value) {
    updateParam("minPrice", value);
  }

  function handleMaxPriceChange(value) {
    updateParam("maxPrice", value);
  }

  function handlePageChange(newPage) {
    updateParam("page", String(newPage), false);
  }

  function resetFilters() {
    setSearchParams({});
  }

  async function copyLink() {
  await navigator.clipboard.writeText(window.location.href);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
}

  const hasPreviousPage = page > 1;
  const hasNextPage = products.length === limit;

  const activeFilters = [];

  searchParams.forEach((value, key) => {
    if (key === "q") {
      activeFilters.push({
        key,
        label: `Search: ${value}`,
      });
    }

    if (key === "category") {
      activeFilters.push({
        key,
        label: `Category: ${value}`,
      });
    }

    if (key === "sort") {
      activeFilters.push({
        key,
        label: `Sort: ${value}`,
      });
    }

    if (key === "minPrice") {
      activeFilters.push({
        key,
        label: `Over ${formatPrice(value)}`,
      });
    }

    if (key === "maxPrice") {
      activeFilters.push({
        key,
        label: `Under ${formatPrice(value)}`,
      });
    }
  });

  return (
    <div className="mx-auto w-full max-w-8xl">
      <div className="mb-6 sm:mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-700">
          Our collection
        </p>

        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          Products
        </h1>

        <p className="mt-2 max-w-xl leading-relaxed text-slate-600">
          Find something you love from our collection of products.
        </p>
      </div>

      <FilterBar
        search={search}
        category={category}
        sort={sort}
        minPrice={minPrice}
        maxPrice={maxPrice}
        categories={categories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        onReset={resetFilters}
        onCopyLink={copyLink}
        copied={copied}
      />

      {activeFilters.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <button
              key={`${filter.key}-${index}`}
              onClick={() => updateParam(filter.key, "")}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-200"
            >
              {filter.label} ×
            </button>
          ))}
        </div>
      )}

      {!loading && !error && (
        <p className="mb-4 text-sm text-slate-500">
          {filteredAndSortedProducts.length} products found
        </p>
      )}

      {loading && <StateBlock type="loading" />}

      {!loading && error && (
        <StateBlock
          type="error"
          message={error}
          onRetry={fetchProducts}
        />
      )}

      {!loading &&
        !error &&
        filteredAndSortedProducts.length === 0 && (
          <StateBlock type="empty" />
        )}

      {!loading &&
        !error &&
        filteredAndSortedProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          disabled={!hasPreviousPage}
          onClick={() => handlePageChange(page - 1)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <span className="font-medium text-slate-600">
          Page {page}
        </span>

        <button
          disabled={!hasNextPage}
          onClick={() => handlePageChange(page + 1)}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <BackToTop />
    </div>
  );
}

export default ProductsPage;
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import StateBlock from "../components/StateBlock";
import BackToTop from "../components/BackToTop";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let response;

      if (category) {
        response = await api.get(
          `/products/category/${category}`
        );
      } else if (search) {
        response = await api.get("/products/search", {
          params: {
            q: search,
          },
        });
      } else {
        response = await api.get("/products", {
          params: {
            limit: 12,
            skip: 0,
          },
        });
      }

      setProducts(response.data.products);
    } catch (error) {
      console.error(error);

      setError(
        "We couldn't load the products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  async function fetchCategories() {
    try {
      const response = await api.get("/products/categories");

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, []);


  function updateFilter(name, value) {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }

    setSearchParams(newParams);
  }


  function handleSearchChange(value) {
    updateFilter("q", value);
  }


  function handleCategoryChange(value) {
    updateFilter("category", value);
  }


  function handleSortChange(value) {
    updateFilter("sort", value);
  }


  let sortedProducts = [...products];

  if (sort === "price-asc") {
    sortedProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-desc") {
    sortedProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating-desc") {
    sortedProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }


  return (
    <div>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Products
        </h1>

        <p className="mt-2 text-slate-600">
          Find something you love.
        </p>
      </div>


      <FilterBar
        search={search}
        category={category}
        sort={sort}
        categories={categories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />


      {loading && (
        <StateBlock type="loading" />
      )}


      {!loading && error && (
        <StateBlock
          type="error"
          message={error}
          onRetry={fetchProducts}
        />
      )}


      {!loading && !error && sortedProducts.length === 0 && (
        <StateBlock type="empty" />
      )}


      {!loading && !error && sortedProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      )}


      <BackToTop />

    </div>
  );
}

export default ProductsPage;
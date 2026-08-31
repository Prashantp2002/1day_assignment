import { Search, RotateCcw, Copy } from "lucide-react";

function FilterBar({
  search,
  category,
  sort,
  minPrice,
  maxPrice,
  categories,
  copied,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
  onCopyLink,
}) {
  return (
    <div className=" sticky top-[73px] z-30 mb-8 w-full rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-md backdrop-blur-sm sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products..."
            className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-11 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option
              key={item.slug || item}
              value={item.slug || item}
            >
              {item.name || item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-11 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="title-asc">Name: A to Z</option>
          <option value="title-desc">Name: Z to A</option>
        </select>

        <input
          type="number"
          value={minPrice}
          onChange={(event) => onMinPriceChange(event.target.value)}
          placeholder="Min price"
          min="0"
          className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
        />

        <input
          type="number"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
          placeholder="Max price"
          min="0"
          className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
        />
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onReset}
          className="flex h-10 w-40 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-100"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>

        <button
          type="button"
          onClick={onCopyLink}
          className="flex h-10 w-40 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 text-sm font-medium text-white transition-all duration-200 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-100"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}

export default FilterBar;
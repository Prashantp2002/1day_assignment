import { Search } from "lucide-react";

function FilterBar({
  search,
  category,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange
}) {
  return (
    <div className="sticky top-[73px] z-30 mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:mb-8">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search products"
            className="h-11 w-full rounded-lg border border-slate-300 pl-10 pr-4 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
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
          className="h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>

      </div>
    </div>
  );
}

export default FilterBar;
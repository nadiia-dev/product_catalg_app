"use client";
import { ProductFilters } from "@/types";
import "./filters-bar.scss";
import { Search } from "lucide-react";

const FiltersBar = ({
  categories,
  filters,
  onFilterChange,
}: {
  categories?: string[];
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onFilterChange({ searchQuery: e.target.value });

  const handleCategoryChange = (category: string) => {
    const currentCategories = filters.categories ?? [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category];
    onFilterChange({ categories: newCategories });
  };

  const handlePriceChange = (field: string, value: string) =>
    onFilterChange({ [field]: value });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "asc" | "desc";
    onFilterChange({ sortByPrice: value });
  };

  return (
    <aside className="sidebar-filters">
      <div className="filter-group">
        <label>Search</label>
        <div className="filter-group__search">
          <Search width={20} height={20} />
          <input
            type="text"
            placeholder="Search"
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {categories && (
        <div className="filter-group">
          <label>Category</label>
          {categories.map((cat) => (
            <div key={cat} className="filter-group__categories">
              <input
                type="checkbox"
                id={cat}
                checked={filters?.categories?.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              <label htmlFor={cat}>{cat}</label>
            </div>
          ))}
        </div>
      )}

      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Sort by Price</label>
        <select value={filters.sortByPrice} onChange={handleSortChange}>
          <option value="">Select</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </aside>
  );
};

export default FiltersBar;

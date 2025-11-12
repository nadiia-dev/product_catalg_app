"use client";

import {
  useGetCategoriesQuery,
  useGetProductsQuery,
} from "@/store/slices/products";
import "./home-page.scss";
import FiltersBar from "../filters-bar/filters-bar";
import ProductsGrid from "../products-grid/products-grid";
import { useState } from "react";
import { ProductFilters } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { PlusIcon } from "lucide-react";
import Modal from "../modal/modal";
import Spinner from "../spinner/spinner";
import Error from "../error/error";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const [filters, setFilters] = useState<ProductFilters>({
    searchQuery: "",
    categories: [],
    sortByPrice: "asc",
  });

  const { data: products, isLoading, error } = useGetProductsQuery(filters);

  const { data: categories } = useGetCategoriesQuery();

  if (isLoading) return <Spinner />;
  if (error) return <Error text="Error loading products" />;

  return (
    <>
      <div className="products-page">
        <FiltersBar
          categories={categories}
          filters={filters}
          onFilterChange={(newPartialFilters) =>
            setFilters((prev) => ({ ...prev, ...newPartialFilters }))
          }
        />
        <div>
          {isAdmin && (
            <button onClick={() => setOpen(true)}>
              <PlusIcon width={15} height={15} /> <span>Add Product</span>
            </button>
          )}
          {products && <ProductsGrid products={products} />}
        </div>
      </div>
      {open && <Modal onClose={() => setOpen(false)} />}
    </>
  );
};

export default HomePage;

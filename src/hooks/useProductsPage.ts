"use client";
import { useSearchParams } from "next/navigation"; //
import { useProducts, useFilterAndSort, useDebounce } from "@/hooks";

export function useProductsPage() {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "newest";

  const debounced = useDebounce(searchTerm, 500);

  const { products, loading, error } = useProducts(debounced);

  const { sortedProducts } = useFilterAndSort(products, sortOption);

  return {
    loading,
    error,
    sortedProducts,
  };
}

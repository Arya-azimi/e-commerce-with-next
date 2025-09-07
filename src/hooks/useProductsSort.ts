import { useMemo } from "react";
import { Product } from "@/domain";
import { sortProducts, SortOption } from "@/lib/products-sort";

function useProductSort(products: Product[], sortOption: SortOption) {
  const sortedProducts = useMemo(
    () => sortProducts(products, sortOption),
    [products, sortOption]
  );

  return sortedProducts;
}

export { useProductSort };

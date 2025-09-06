import { Suspense } from "react";
import { Product } from "@/domain";
import { getProducts } from "@/services";
import { UI_MESSAGES } from "@/constants";

import { ProductFilter } from "@/components/product-filter/product-filter";
import { Loading } from "@/components/loading/loading";
import { ProductList } from "@/components/product-list/product-list";

async function ProductsGrid({
  search,
  sort,
}: {
  search?: string;
  sort?: string;
}) {
  const products = await getProducts({ searchTerm: search });

  const sortProducts = (
    products: Product[],
    sortOption?: string
  ): Product[] => {
    const productsToSort = [...products];
    switch (sortOption) {
      case "newest":
        return productsToSort.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return productsToSort.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "price-asc":
        return productsToSort.sort((a, b) => a.price - b.price);
      case "price-desc":
        return productsToSort.sort((a, b) => b.price - a.price);
      default:
        return productsToSort;
    }
  };

  const sortedProducts = sortProducts(products, sort);

  if (sortedProducts.length === 0) {
    return <p className="text-center p-8">{UI_MESSAGES.NO_PRODUCTS}</p>;
  }

  return <ProductList products={sortedProducts} />;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    sort?: string;
  };
}) {
  const awaitedSearchParams = await searchParams;
  const search = awaitedSearchParams?.search;
  const sort = awaitedSearchParams?.sort;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductFilter />
      <div className="mt-6">
        <Suspense key={`${search}-${sort}`} fallback={<Loading />}>
          <ProductsGrid search={search} sort={sort} />
        </Suspense>
      </div>
    </div>
  );
}

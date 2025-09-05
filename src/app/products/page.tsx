import { ProductList, ProductFilter, Loading } from "@/components";
import { getProducts } from "@/services";
import { UI_MESSAGES } from "@/constants";
import { Suspense } from "react";

async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { search, sort } = searchParams;

  const products = await getProducts({ searchTerm: search });

  const sortProducts = (products: any[], sortOption: string | undefined) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductFilter />
      <div className="mt-6">
        <Suspense fallback={<Loading />}>
          {sortedProducts.length > 0 ? (
            <ProductList products={sortedProducts} />
          ) : (
            <p>{UI_MESSAGES.FETCH_PRODUCTS}</p>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default ProductsPage;

import { getProducts } from "@/services";
import { ProductList } from "@/components/product-list";
import { sortProducts } from "@/lib/products-sort";

export async function ProductsView({
  search,
  sort,
}: {
  search?: string;
  sort?: string;
}) {
  const products = await getProducts({ searchTerm: search });

  const sortedProducts = sortProducts(products, sort as any);

  return <ProductList products={sortedProducts} />;
}

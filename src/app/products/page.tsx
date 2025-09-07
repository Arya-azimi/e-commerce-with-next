import { Suspense } from "react";
import { ProductFilter } from "@/components/product-filter/product-filter";
import { Loading } from "@/components/loading/loading";
import { ProductsView } from "@/components/products-grid";

async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    sort?: string;
  };
}) {
  const awaitparams = await searchParams;
  const search = awaitparams?.search;
  const sort = awaitparams?.sort;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductFilter />
      <div className="mt-6">
        <Suspense key={`${search}-${sort}`} fallback={<Loading />}>
          <ProductsView search={search} sort={sort} />
        </Suspense>
      </div>
    </div>
  );
}

export default ProductsPage;

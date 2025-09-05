// "use client" را حذف کنید
import { ProductList, ProductFilter } from "@/components";
import { getProducts } from "@/services";
import { Product } from "@/domain";
import { UI_MESSAGES } from "@/constants";

// کامپوننت را async کنید
async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // پارامترهای جستجو را از searchParams بگیرید
  const searchTerm =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  // مستقیماً تابع سرویس را برای گرفتن داده‌ها فراخوانی کنید
  const products: Product[] = await getProducts({ searchTerm });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ProductFilter یک کامپوننت کلاینت است و مشکلی ندارد */}
      <ProductFilter />
      <div className="mt-6">
        {products.length > 0 ? (
          // داده‌های گرفته شده را به عنوان props به ProductList پاس دهید
          <ProductList products={products} />
        ) : (
          <p>{UI_MESSAGES.FETCH_PRODUCTS}</p>
        )}
      </div>
    </div>
  );
}

// export default کنید
export default ProductsPage;

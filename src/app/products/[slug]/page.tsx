// "use client" را حذف کنید
import { ProductImage, ProductInfo, Error } from "@/components";
import { getProductBySlug } from "@/services";

// کامپوننت را async کنید و params را به عنوان prop بگیرید
async function ProductDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    // مستقیماً داده محصول را روی سرور بگیرید
    const product = await getProductBySlug(slug);

    if (!product) {
      return <div className="text-center p-8">محصول یافت نشد.</div>;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <ProductImage imageUrl={product.imageUrl} name={product.name} />
          {/* داده را به عنوان props به کامپوننت‌ها پاس دهید */}
          <ProductInfo product={product} />
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <Error message={"Failed to load product."} />;
  }
}

export default ProductDetail;

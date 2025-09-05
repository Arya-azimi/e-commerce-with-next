import { ProductImage, ProductInfo, Loading, Error } from "@/components";
import { getProductBySlug } from "@/services";
import { Suspense } from "react";

async function ProductDetailPage({ params }: { params: { slug: string } }) {
  try {
    const product = await getProductBySlug(params.slug);

    if (!product) {
      return <div className="text-center p-8">محصول یافت نشد.</div>;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Suspense fallback={<Loading />}>
            <ProductImage imageUrl={product.imageUrl} name={product.name} />
            <ProductInfo product={product} />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <Error message={"خطا در بارگذاری محصول."} />;
  }
}

export default ProductDetailPage;

import { Product } from "@/domain";
import { Card } from "@/components";

function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">محصولات پرفروش</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export { FeaturedProducts };

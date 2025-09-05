import { FeaturedProducts, Hero } from "@/components";
import { getProducts } from "@/services/";
import { Product } from "@/domain";
import { Suspense } from "react";
import { Loading } from "@/components";

async function Home() {
  const products: Product[] = await getProducts({ isFeatured: true });
  return (
    <main className="container mx-auto md:px-4 md:py-8">
      <Hero />
      <Suspense fallback={<Loading />}>
        <FeaturedProducts products={products} />
      </Suspense>
    </main>
  );
}

export default Home;

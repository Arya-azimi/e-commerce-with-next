import { FeaturedProducts } from "@/components/featured-products";
import { Hero } from "@/components/hero";
import { Loading } from "@/components/loading";

import { getProducts } from "@/services/";
import { Product } from "@/domain";
import { Suspense } from "react";

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

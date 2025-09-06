// src/app/page.tsx

import { Suspense } from "react";
import { Product } from "@/domain";
import { getProducts } from "@/services";

// ایمپورت مستقیم
import { Hero } from "@/components/hero/hero";
import { FeaturedProducts } from "@/components/featured-products/featured-products";
import { Loading } from "@/components/loading/loading";

export default async function Home() {
  const featuredProducts: Product[] = await getProducts({ isFeatured: true });

  return (
    <main className="container mx-auto md:px-4 md:py-8">
      <Hero />
      <Suspense fallback={<Loading />}>
        <FeaturedProducts products={featuredProducts} />
      </Suspense>
    </main>
  );
}

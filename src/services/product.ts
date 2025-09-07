import { Product } from "@/domain";
import apiClient from "./apiClient";
import { validateProducts } from "@/lib/validator";

interface GetProductsParams {
  isFeatured?: boolean;
  slug?: string;
  searchTerm?: string;
  ids?: number[];
}

export async function getProducts(
  params?: GetProductsParams
): Promise<Product[]> {
  const query = new URLSearchParams();

  if (params) {
    if (params.isFeatured !== undefined) {
      query.append("isFeatured", String(params.isFeatured));
    }
    if (params.slug) {
      query.append("slug", params.slug);
    }
    if (params.searchTerm) {
      query.append("q", params.searchTerm);
    }
    if (params.ids && params.ids.length > 0) {
      params.ids.forEach((id) => query.append("id", id.toString()));
    }
  }

  const endpoint = `products?${query.toString()}`;
  const rawData = await apiClient.get<any[]>(endpoint);
  return validateProducts(rawData);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const products = await getProducts({ slug });
  if (products.length === 0) {
    throw new Error(`محصول با اسلاگ "${slug}" پیدا نشد.`);
  }
  return products[0];
}

"use client";

import { useUserFavorites } from "@/hooks/useUserFavorites";
import { ItemsList } from "@/components/items-list/items-list";
import { Loading } from "@/components/loading/loading";
import { Error } from "@/components/error/error";

export function UserFavorites() {
  const { favoriteProducts, loading, error } = useUserFavorites();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <ItemsList
      title="لیست علاقه‌مندی‌ها"
      products={favoriteProducts}
      emptyMessage="لیست علاقه‌مندی‌های شما خالی است."
    />
  );
}

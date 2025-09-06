"use client";

import { useUserCart } from "@/hooks";
import { ItemsList } from "@/components/items-list";

export function UserCart() {
  const { items } = useUserCart();

  return (
    <ItemsList
      title="سبد خرید شما"
      products={items}
      emptyMessage="سبد خرید شما خالی است."
    />
  );
}

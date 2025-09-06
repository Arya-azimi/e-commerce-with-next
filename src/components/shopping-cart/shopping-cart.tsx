"use client";

import { useState } from "react";
import { useCart } from "@/hooks";
import { ShoppingCartPanel } from "../shopping-cart-panel";
import { ShoppingCartIcon } from "../shopping-cart-icon";

export function ShoppingCart() {
  const { items, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ShoppingCartIcon
        itemCount={items.length}
        onClick={() => setIsOpen(true)}
      />
      <ShoppingCartPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        items={items}
        onRemoveItem={removeItem}
      />
    </>
  );
}

import { useState } from "react";
import { useCart } from "@/hooks";
import { ShoppingCartIcon, ShoppingCartPanel } from "@/components";

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

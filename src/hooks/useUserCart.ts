import { useCart } from "@/hooks";

function useUserCart() {
  const { items } = useCart();
  return { items };
}

export { useUserCart };

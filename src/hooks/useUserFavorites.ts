import { useState, useEffect } from "react";
import { useWishlist } from "@/hooks";
import { Product } from "@/domain";
import { getProducts } from "@/services";

function useUserFavorites() {
  const { wishlist } = useWishlist();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (wishlist.length === 0) {
      setFavoriteProducts([]);
      setLoading(false);
      return;
    }

    const fetchFavoriteProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts({ ids: wishlist });
        setFavoriteProducts(data);
      } catch (err) {
        setError("Failed to load favorite products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [wishlist]);

  return { favoriteProducts, loading, error };
}

export { useUserFavorites };

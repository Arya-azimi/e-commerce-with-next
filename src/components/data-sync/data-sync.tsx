"use client";

import { useEffect } from "react";
import { useAuth, useWishlist } from "@/hooks";
import { getWishlist, updateWishlist } from "@/services";

function DataSync() {
  const { user } = useAuth();
  const { wishlist, setWishlist, clearWishlist } = useWishlist();

  // همگام‌سازی Wishlist هنگام ورود کاربر
  useEffect(() => {
    const syncWishlist = async () => {
      if (user) {
        const localWishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        if (localWishlist.length > 0) {
          const serverWishlist = await getWishlist(user.userId);
          const mergedWishlist = [
            ...new Set([...serverWishlist, ...localWishlist]),
          ];
          await updateWishlist(user.userId, mergedWishlist);
          setWishlist(mergedWishlist);
          localStorage.removeItem("wishlist");
        } else {
          const serverWishlist = await getWishlist(user.userId);
          setWishlist(serverWishlist);
        }
      } else {
        clearWishlist();
      }
    };

    syncWishlist();
  }, [user, setWishlist, clearWishlist]);

  // ذخیره Wishlist در سرور هنگام تغییر
  useEffect(() => {
    if (user) {
      updateWishlist(user.userId, wishlist);
    }
  }, [wishlist, user]);

  return null;
}

export { DataSync };

"use client";
import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";

type WishlistState = {
  productIds: number[];
};

type WishlistAction =
  | { type: "TOGGLE_ITEM"; payload: number }
  | { type: "SET_WISHLIST"; payload: number[] }
  | { type: "CLEAR_WISHLIST" };

const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction
): WishlistState => {
  switch (action.type) {
    case "TOGGLE_ITEM": {
      const productId = action.payload;
      const isFavorite = state.productIds.includes(productId);
      const newProductIds = isFavorite
        ? state.productIds.filter((id) => id !== productId)
        : [...state.productIds, productId];
      return { ...state, productIds: newProductIds };
    }
    case "SET_WISHLIST":
      return { ...state, productIds: action.payload };
    case "CLEAR_WISHLIST":
      return { ...state, productIds: [] };
    default:
      return state;
  }
};

interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  setWishlist: (productIds: number[]) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

function WishlistProvider({ children }: { children: ReactNode }) {
  const initialState: WishlistState = { productIds: [] };
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        dispatch({ type: "SET_WISHLIST", payload: JSON.parse(storedWishlist) });
      }
    } catch (e) {
      console.error("Failed to parse wishlist from localStorage", e);
      localStorage.removeItem("wishlist");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("wishlist", JSON.stringify(state.productIds));
    }
  }, [state.productIds, isLoaded]);

  const toggleWishlist = useCallback((productId: number) => {
    dispatch({ type: "TOGGLE_ITEM", payload: productId });
  }, []);

  const setWishlist = useCallback((productIds: number[]) => {
    dispatch({ type: "SET_WISHLIST", payload: productIds });
  }, []);

  const clearWishlist = useCallback(() => {
    dispatch({ type: "CLEAR_WISHLIST" });
  }, []);

  const value = useMemo(
    () => ({
      wishlist: state.productIds,
      toggleWishlist,
      setWishlist,
      clearWishlist,
    }),
    [state.productIds, toggleWishlist, setWishlist, clearWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export { WishlistProvider, WishlistContext };

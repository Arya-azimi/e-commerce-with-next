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
import { Product } from "@/domain";
import { useAuth, useNotification } from "@/hooks";
import { getCart, saveCart } from "@/services";
import { ERROR_MESSAGES } from "@/constants";

interface CartItem extends Product {
  quantity: number;
}
interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { productId: number } }
  | { type: "SET_CART"; payload: CartItem[] }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...product, quantity: 1 }] };
    }
    case "REMOVE_ITEM": {
      const { productId } = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: state.items.filter((item) => item.id !== productId),
      };
    }
    case "SET_CART":
      return { ...state, items: action.payload };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  const initialState: CartState = { items: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { showNotification } = useNotification();

  // واکشی اولیه سبد خرید از سرور یا localStorage
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const serverCart = await getCart(user.userId);
          dispatch({ type: "SET_CART", payload: serverCart });
        } else {
          const storedItems = localStorage.getItem("cartItems");
          if (storedItems) {
            dispatch({ type: "SET_CART", payload: JSON.parse(storedItems) });
          }
        }
      } catch (e) {
        console.error("Failed to load cart:", e);
        showNotification(ERROR_MESSAGES.CART_SAVE_FAILED, "error");
      } finally {
        setIsLoading(false);
      }
    };
    loadCart();
  }, [user, showNotification]);

  // ذخیره سبد خرید در localStorage برای کاربران مهمان
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    }
  }, [state.items, user]);

  const addItem = useCallback(
    async (product: Product) => {
      const originalCart = [...state.items];
      dispatch({ type: "ADD_ITEM", payload: product }); // آپدیت خوش‌بینانه UI

      if (user) {
        try {
          const updatedCart = cartReducer(state, {
            type: "ADD_ITEM",
            payload: product,
          });
          await saveCart(user.userId, updatedCart.items);
        } catch (error) {
          showNotification(ERROR_MESSAGES.CART_SAVE_FAILED, "error");
          dispatch({ type: "SET_CART", payload: originalCart });
          console.log(error);
        }
      }
    },
    [state, user, showNotification]
  );

  const removeItem = useCallback(
    async (productId: number) => {
      const originalCart = [...state.items];
      dispatch({ type: "REMOVE_ITEM", payload: { productId } }); // آپدیت خوش‌بینانه UI

      if (user) {
        try {
          const updatedCart = cartReducer(state, {
            type: "REMOVE_ITEM",
            payload: { productId },
          });
          await saveCart(user.userId, updatedCart.items);
        } catch (error) {
          showNotification(ERROR_MESSAGES.CART_SAVE_FAILED, "error");
          dispatch({ type: "SET_CART", payload: originalCart });
          console.log(error);
        }
      }
    },
    [state, user, showNotification]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
    if (user) {
      saveCart(user.userId, []);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      items: state.items,
      addItem,
      removeItem,
      clearCart,
      isLoading,
    }),
    [state.items, addItem, removeItem, clearCart, isLoading]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartContext, CartProvider };
export type { CartItem };

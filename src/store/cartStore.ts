import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getCart,
  addToCart,
  updateQuantityAPI,
  removeFromCartAPI,
} from "@/src/lib/services/cart";
import useAuthStore from "./authStore";

export interface CartItem {
  product_id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  hasHydrated: boolean;
  fetchCart: () => Promise<void>;
  addItem: (product_id: number, quantity: number) => Promise<void>;
  updateQuantity: (product_id: number, quantity: number) => Promise<void>;
  removeItem: (product_id: number) => Promise<void>;
  clearCart: () => void;
  totalItems: () => number;
  deliveryMethod: "pickup" | "delivery" | "";
  shippingCost: number | null;
  setShippingInfo: (
    method: "pickup" | "delivery" | "",
    cost: number | null,
    requiresQuote?: boolean
  ) => void;
  requiresShippingQuote: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      hasHydrated: false,
      deliveryMethod: "",
      shippingCost: null,

      requiresShippingQuote: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      setShippingInfo: (method, cost, requiresQuote = false) => {
        set({ deliveryMethod: method, shippingCost: cost, requiresShippingQuote: requiresQuote });
      },

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await getCart();
          set({ items: data?.items || [], isLoading: false });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
        }
      },

      addItem: async (product_id: number, quantity: number) => {
        set({ isLoading: true, error: null });
        const token = useAuthStore.getState().token;
        if (token) {
          try {
            const data = await addToCart(product_id, quantity);
            if (data && !data.error) {
              set({ items: data.items || [], isLoading: false });
            } else {
              set({
                error: data.error || "Failed to add item",
                isLoading: false,
              });
            }
          } catch (error: any) {
            set({
              error: error.message || "Failed to add item",
              isLoading: false,
            });
          }
        } else {
          const existingItems = get().items;
          const itemIndex = existingItems.findIndex(
            (i) => Number(i.product_id) === Number(product_id),
          );
          let newItems = [...existingItems];
          if (itemIndex >= 0) {
            newItems[itemIndex].quantity += quantity;
          } else {
            newItems.push({ product_id, quantity });
          }
          set({ items: newItems, isLoading: false });
        }
      },

      updateQuantity: async (product_id: number, quantity: number) => {
        set({ isLoading: true, error: null });
        const token = useAuthStore.getState().token;
        if (token) {
          try {
            const data = await updateQuantityAPI(product_id, quantity);
            if (data && !data.error) {
              set({ items: data.items || [], isLoading: false });
            } else {
              set({
                error: data.error || "Failed to update quantity",
                isLoading: false,
              });
            }
          } catch (error: any) {
            set({
              error: error.message || "Failed to update quantity",
              isLoading: false,
            });
          }
        } else {
          const newItems = get().items.map((i) =>
            Number(i.product_id) === Number(product_id)
              ? { ...i, quantity }
              : i,
          );
          set({ items: newItems, isLoading: false });
        }
      },

      removeItem: async (product_id: number) => {
        set({ isLoading: true, error: null });
        const token = useAuthStore.getState().token;
        if (token) {
          try {
            const data = await removeFromCartAPI(product_id);
            if (data && !data.error) {
              set({ items: data.items || [], isLoading: false });
            } else {
              set({
                error: data.error || "Failed to remove item",
                isLoading: false,
              });
            }
          } catch (error: any) {
            set({
              error: error.message || "Failed to remove item",
              isLoading: false,
            });
          }
        } else {
          const newItems = get().items.filter(
            (i) => Number(i.product_id) !== Number(product_id),
          );
          set({ items: newItems, isLoading: false });
        }
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useCartStore;

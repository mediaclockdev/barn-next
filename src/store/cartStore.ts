import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getCart,
  addToCart,
  updateQuantityAPI,
  removeFromCartAPI,
  clearCartAPI,
} from "@/src/lib/services/cart";
import useAuthStore from "./authStore";

export interface CartItem {
  product_id: number;
  variation_id?: number;
  variation_name?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  hasHydrated: boolean;
  fetchCart: () => Promise<void>;
  addItem: (
    product_id: number,
    quantity: number,
    variation_id?: number,
    variation_name?: string,
  ) => Promise<void>;
  updateQuantity: (
    product_id: number,
    quantity: number,
    variation_id?: number,
  ) => Promise<void>;
  removeItem: (product_id: number, variation_id?: number) => Promise<void>;
  clearCart: () => void;
  totalItems: () => number;
  deliveryMethod: "pickup" | "delivery" | "";
  shippingCost: number | null;
  setShippingInfo: (
    method: "pickup" | "delivery" | "",
    cost: number | null,
    requiresQuote?: boolean,
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
        set({
          deliveryMethod: method,
          shippingCost: cost,
          requiresShippingQuote: requiresQuote,
        });
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

      addItem: async (
        product_id: number,
        quantity: number,
        variation_id: number = 0,
        variation_name: string = "",
      ) => {
        set({ isLoading: true, error: null });
        const token = useAuthStore.getState().token;
        if (token) {
          try {
            const data = await addToCart(
              product_id,
              quantity,
              variation_id,
              variation_name,
            );
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
            (i) =>
              Number(i.product_id) === Number(product_id) &&
              Number(i.variation_id || 0) === Number(variation_id),
          );
          let newItems = [...existingItems];
          if (itemIndex >= 0) {
            newItems[itemIndex].quantity += quantity;
            if (variation_name)
              newItems[itemIndex].variation_name = variation_name;
          } else {
            newItems.push({
              product_id,
              quantity,
              variation_id,
              variation_name,
            });
          }
          set({ items: newItems, isLoading: false });
        }
      },

      updateQuantity: async (
        product_id: number,
        quantity: number,
        variation_id: number = 0,
      ) => {
        set({ isLoading: true, error: null });
        const token = useAuthStore.getState().token;
        if (token) {
          try {
            const data = await updateQuantityAPI(
              product_id,
              quantity,
              variation_id,
            );
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
            Number(i.product_id) === Number(product_id) &&
            Number(i.variation_id || 0) === Number(variation_id)
              ? { ...i, quantity }
              : i,
          );
          set({ items: newItems, isLoading: false });
        }
      },

      removeItem: async (product_id: number, variation_id: number = 0) => {
        set({ isLoading: true, error: null });
        const token = useAuthStore.getState().token;
        if (token) {
          try {
            const data = await removeFromCartAPI(product_id, variation_id);
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
            (i) =>
              !(
                Number(i.product_id) === Number(product_id) &&
                Number(i.variation_id || 0) === Number(variation_id)
              ),
          );
          set({ items: newItems, isLoading: false });
        }
      },

      clearCart: async () => {
        const token = useAuthStore.getState().token;
        if (token) {
          try {
            await clearCartAPI();
          } catch (error) {
            console.error("Failed to clear cart in DB:", error);
          }
        }
        set({ items: [] });
      },

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

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getCart,
  addToCart,
  updateQuantityAPI,
  removeFromCartAPI,
  clearCartAPI,
  mergeCartAPI,
} from "@/src/lib/services/cart";
import useAuthStore from "./authStore";

const updateTimeouts: Record<string, NodeJS.Timeout> = {};
const fallbackStates: Record<string, CartItem[]> = {};

export interface CartItem {
  product_id: number;
  variation_id?: number;
  variation_name?: string;
  variation_attributes?: Record<string, string>;
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
    variation_attributes?: Record<string, string>,
  ) => Promise<void>;
  updateQuantity: (
    product_id: number,
    quantity: number,
    variation_id?: number,
  ) => Promise<void>;
  removeItem: (product_id: number, variation_id?: number) => Promise<void>;
  mergeCart: (guestItems: CartItem[]) => Promise<void>;
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
        variation_attributes: Record<string, string> = {},
      ) => {
        const previousItems = [...get().items];

        // Optimistic update — instant UI feedback
        const existingItems = get().items;
        const itemIndex = existingItems.findIndex(
          (i) =>
            Number(i.product_id) === Number(product_id) &&
            Number(i.variation_id || 0) === Number(variation_id),
        );
        let optimisticItems = [...existingItems];
        if (itemIndex >= 0) {
          optimisticItems[itemIndex] = {
            ...optimisticItems[itemIndex],
            quantity: optimisticItems[itemIndex].quantity + quantity,
          };
          if (variation_name)
            optimisticItems[itemIndex].variation_name = variation_name;
          if (
            variation_attributes &&
            Object.keys(variation_attributes).length > 0
          )
            optimisticItems[itemIndex].variation_attributes =
              variation_attributes;
        } else {
          optimisticItems.push({
            product_id,
            quantity,
            variation_id,
            variation_name,
            variation_attributes,
          });
        }
        set({ items: optimisticItems, error: null });

        // Background sync for authenticated users
        const token = useAuthStore.getState().token;
        if (token) {
          try {
            const data = await addToCart(
              product_id,
              quantity,
              variation_id,
              variation_name,
              variation_attributes,
            );
            if (data && !data.error) {
              set({ items: data.items || [] });
            } else {
              set({
                items: previousItems,
                error: data.error || "Failed to add item",
              });
            }
          } catch (error: any) {
            set({
              items: previousItems,
              error: error.message || "Failed to add item",
            });
          }
        }
      },

      updateQuantity: async (
        product_id: number,
        quantity: number,
        variation_id: number = 0,
      ) => {
        const updateKey = `${product_id}_${variation_id}`;

        const existingItem = get().items.find(
          (i) =>
            Number(i.product_id) === Number(product_id) &&
            Number(i.variation_id || 0) === Number(variation_id),
        );
        const variation_attributes = existingItem?.variation_attributes || {};

        // Save the very first snapshot BEFORE the burst starts for accurate rollback
        if (!updateTimeouts[updateKey]) {
          fallbackStates[updateKey] = [...get().items];
        }

        // Optimistic update
        const newItems = get().items.map((i) =>
          Number(i.product_id) === Number(product_id) &&
          Number(i.variation_id || 0) === Number(variation_id)
            ? { ...i, quantity }
            : i,
        );
        set({ items: newItems, error: null });

        // Background sync for authenticated users
        const token = useAuthStore.getState().token;
        if (token) {
          if (updateTimeouts[updateKey]) {
            clearTimeout(updateTimeouts[updateKey]);
          }

          updateTimeouts[updateKey] = setTimeout(async () => {
            const fallback = fallbackStates[updateKey];
            delete updateTimeouts[updateKey];
            delete fallbackStates[updateKey];

            try {
              const data = await updateQuantityAPI(
                product_id,
                quantity,
                variation_id,
                variation_attributes,
              );
              if (data && !data.error) {
                set({ items: data.items || [] });
              } else {
                set({
                  items: fallback,
                  error: data.error || "Failed to update quantity",
                });
              }
            } catch (error: any) {
              set({
                items: fallback,
                error: error.message || "Failed to update quantity",
              });
            }
          }, 600); // 600ms debounce
        }
      },

      removeItem: async (product_id: number, variation_id: number = 0) => {
        const previousItems = [...get().items];

        // Optimistic update
        const newItems = get().items.filter(
          (i) =>
            !(
              Number(i.product_id) === Number(product_id) &&
              Number(i.variation_id || 0) === Number(variation_id)
            ),
        );
        set({ items: newItems, error: null });

        // Background sync for authenticated users
        const token = useAuthStore.getState().token;
        if (token) {
          try {
            const data = await removeFromCartAPI(product_id, variation_id);
            if (data && !data.error) {
              set({ items: data.items || [] });
            } else {
              set({
                items: previousItems,
                error: data.error || "Failed to remove item",
              });
            }
          } catch (error: any) {
            set({
              items: previousItems,
              error: error.message || "Failed to remove item",
            });
          }
        }
      },

      mergeCart: async (guestItems: CartItem[]) => {
        set({ isLoading: true, error: null });
        try {
          const guest_cart = guestItems.map((item) => ({
            product_id: item.product_id,
            variation_id: item.variation_id || 0,
            quantity: item.quantity,
            variation_attributes: item.variation_attributes || {},
          }));
          const data = await mergeCartAPI(guest_cart);
          set({ items: data?.items || [], isLoading: false });
        } catch (error: any) {
          console.error("Cart merge failed:", error);
          // Fallback: fetch the server cart instead
          try {
            const data = await getCart();
            set({ items: data?.items || [], isLoading: false });
          } catch {
            set({
              error: error.message || "Failed to merge cart",
              isLoading: false,
            });
          }
        }
      },

      clearCart: async () => {
        const previousItems = [...get().items];

        // Optimistic: clear immediately
        set({ items: [] });

        const token = useAuthStore.getState().token;
        if (token) {
          try {
            await clearCartAPI();
          } catch (error) {
            console.error("Failed to clear cart in DB:", error);
            set({ items: previousItems });
          }
        }
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

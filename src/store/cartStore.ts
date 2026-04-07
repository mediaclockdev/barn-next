import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCart, addToCart, updateQuantityAPI, removeFromCartAPI } from '@/src/lib/services/cart';

export interface CartItem {
  product_id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (product_id: number, quantity: number) => Promise<void>;
  updateQuantity: (product_id: number, quantity: number) => Promise<void>;
  removeItem: (product_id: number) => Promise<void>;
  clearCart: () => void;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await getCart();
          // Server returned a valid cart
          set({ items: data?.items || [], isLoading: false });
        } catch (error: any) {
          // On error (e.g. not logged in), keep existing local items
          console.error('fetchCart error:', error.message);
          set({ isLoading: false });
        }
      },

      addItem: async (product_id: number, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
          const data = await addToCart(product_id, quantity);
          if (data && !data.error) {
             set({ items: data.items || [], isLoading: false });
          } else {
             set({ error: data.error || 'Failed to add item', isLoading: false });
          }
        } catch (error: any) {
          set({ error: error.message || 'Failed to add item', isLoading: false });
        }
      },

      updateQuantity: async (product_id: number, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
           const data = await updateQuantityAPI(product_id, quantity);
           if (data && !data.error) {
             set({ items: data.items || [], isLoading: false });
           } else {
             set({ error: data.error || 'Failed to update quantity', isLoading: false });
           }
        } catch (error: any) {
           set({ error: error.message || 'Failed to update quantity', isLoading: false });
        }
      },

      removeItem: async (product_id: number) => {
        set({ isLoading: true, error: null });
        try {
           const data = await removeFromCartAPI(product_id);
           if (data && !data.error) {
             set({ items: data.items || [], isLoading: false });
           } else {
             set({ error: data.error || 'Failed to remove item', isLoading: false });
           }
        } catch (error: any) {
           set({ error: error.message || 'Failed to remove item', isLoading: false });
        }
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;

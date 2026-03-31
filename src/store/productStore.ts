import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductState {
  selectedProduct: any | null;
  setSelectedProduct: (product: any) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      selectedProduct: null,
      setSelectedProduct: (product) => set({ selectedProduct: product }),
    }),
    {
      name: 'product-storage',
    }
  )
);

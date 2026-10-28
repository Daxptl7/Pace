import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  clear: () => void
}

// Mutation and pricing rules belong to the catalog/cart phase.
export const useCartStore = create<CartState>()(
  persist((set) => ({ items: [], clear: () => set({ items: [] }) }), {
    name: 'pace-cart-v1',
    version: 1,
    storage: createJSONStorage(() => localStorage),
    partialize: ({ items }) => ({ items }),
  }),
)

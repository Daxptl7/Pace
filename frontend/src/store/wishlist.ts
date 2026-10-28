import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface WishlistState {
  productIds: string[]
  clear: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist((set) => ({ productIds: [], clear: () => set({ productIds: [] }) }), {
    name: 'pace-wishlist-v1',
    version: 1,
    storage: createJSONStorage(() => localStorage),
    partialize: ({ productIds }) => ({ productIds }),
  }),
)

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('persisted storefront state', () => {
  let storage: Map<string, string>
  beforeEach(() => {
    vi.resetModules()
    storage = new Map()
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    })
  })
  afterEach(() => vi.unstubAllGlobals())
  it('starts empty without stored cart or wishlist data', async () => {
    const { useCartStore } = await import('./cart')
    const { useWishlistStore } = await import('./wishlist')
    expect(useCartStore.getState().items).toEqual([])
    expect(useWishlistStore.getState().productIds).toEqual([])
  })
  it('rehydrates existing cart data and persists clearing it', async () => {
    storage.set(
      'pace-cart-v1',
      JSON.stringify({
        version: 1,
        state: { items: [{ productId: 'fixture', size: '8', quantity: 2 }] },
      }),
    )
    const { useCartStore } = await import('./cart')
    expect(useCartStore.getState().items[0]?.quantity).toBe(2)
    useCartStore.getState().clear()
    expect(JSON.parse(storage.get('pace-cart-v1') || '{}').state.items).toEqual(
      [],
    )
  })
  it('rehydrates existing wishlist data and persists clearing it', async () => {
    storage.set(
      'pace-wishlist-v1',
      JSON.stringify({ version: 1, state: { productIds: ['fixture'] } }),
    )
    const { useWishlistStore } = await import('./wishlist')
    expect(useWishlistStore.getState().productIds).toEqual(['fixture'])
    useWishlistStore.getState().clear()
    expect(
      JSON.parse(storage.get('pace-wishlist-v1') || '{}').state.productIds,
    ).toEqual([])
  })
})

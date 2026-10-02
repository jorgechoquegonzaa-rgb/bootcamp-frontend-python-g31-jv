import { create } from 'zustand'

export const useCartStore = create(
  (set) => ({
    // Estado INICIAL
    cart: [
      // { id: 1, title: 'product 1', quantity: 1 },
      // { id: 2, title: 'product 2', quantity: 2 },
    ],
    // Actions
    addToCart: (newProduct) => {
      set((state) => ({ cart: [...state.cart, { ...newProduct, quantity: 1 }] }))
    }
  })
)
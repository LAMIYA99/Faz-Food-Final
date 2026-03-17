import { CartState } from '@/types/global';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      carts: {},
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (userId, item) => {
        const currentCart = get().carts[userId] || [];
        const existingItem = currentCart.find((i) => i._id === item._id);
        
        if (existingItem) {
          const updatedCart = currentCart.map(i => 
            i._id === item._id ? { ...i, qty: i.qty + item.qty } : i
          );
          set({ carts: { ...get().carts, [userId]: updatedCart } });
        } else {
          set({ carts: { ...get().carts, [userId]: [...currentCart, item] } });
        }
      },
      removeItem: (userId, id) => {
        const currentCart = get().carts[userId] || [];
        set({ carts: { ...get().carts, [userId]: currentCart.filter(i => i._id !== id) } });
      },
      updateQty: (userId, id, qty) => {
        const currentCart = get().carts[userId] || [];
        set({ 
          carts: { 
            ...get().carts, 
            [userId]: currentCart.map(i => i._id === id ? { ...i, qty } : i) 
          } 
        });
      },
      clearCart: (userId) => {
        set({ carts: { ...get().carts, [userId]: [] } });
      }
    }),
    {
      name: 'fazfood-cart',
      partialize: (state) => ({ carts: state.carts }),
    }
  )
);

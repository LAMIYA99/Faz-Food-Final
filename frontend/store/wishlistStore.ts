import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

interface WishlistState {
  wishlists: Record<string, WishlistItem[]>;
  addItem: (userId: string, item: WishlistItem) => void;
  removeItem: (userId: string, id: string) => void;
  isInWishlist: (userId: string, id: string) => boolean;
  clearWishlist: (userId: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlists: {},
      addItem: (userId, item) => {
        const currentItems = get().wishlists[userId] || [];
        if (!currentItems.find((i) => i._id === item._id)) {
          set({ 
            wishlists: { 
              ...get().wishlists, 
              [userId]: [...currentItems, item] 
            } 
          });
        }
      },
      removeItem: (userId, id) => {
        const currentItems = get().wishlists[userId] || [];
        set({ 
          wishlists: { 
            ...get().wishlists, 
            [userId]: currentItems.filter((i) => i._id !== id) 
          } 
        });
      },
      isInWishlist: (userId, id) => {
        const currentItems = get().wishlists[userId] || [];
        return currentItems.some((i) => i._id === id);
      },
      clearWishlist: (userId) => {
        set({ 
          wishlists: { 
            ...get().wishlists, 
            [userId]: [] 
          } 
        });
      },
    }),
    {
      name: 'fazfood-wishlist',
    }
  )
);

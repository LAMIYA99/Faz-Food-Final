"use client";

import React from "react";
import { Heart, ShoppingBasket, Star, ChevronDown, LayoutGrid, List } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  image: string;
  rating: number;
  description?: string;
  price: number;
  category: string;
}

interface ShopGridProps {
  products: Product[];
  totalCount: number;
  isLoading: boolean;
  onClearFilters: () => void;
}

export default function ShopGrid({ products, totalCount, isLoading, onClearFilters }: ShopGridProps) {
  const { user } = useAuthStore();
  const userId = user?._id || 'guest';
  
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const { addItem: addCartItem } = useCartStore();

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(userId, product._id)) {
      removeItem(userId, product._id);
      toast.success(`${product.name} removed from wishlist`, {
        icon: '💔',
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
      });
    } else {
      addItem(userId, product);
      toast.success(`${product.name} added to wishlist!`, {
        icon: '❤️',
        style: { borderRadius: '10px', background: '#0F7A3D', color: '#fff' },
      });
    }
  };

  return (
    <div className="flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 pb-4 border-b border-gray-200 gap-4">
        <p className="text-[#646464] text-[15px]">
          Showing {products.length > 0 ? 1 : 0}-{products.length} of {totalCount} results
        </p>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <button className="text-[#C33031]"><LayoutGrid size={24} /></button>
            <button className="text-[#a0a0a0] hover:text-[#C33031] transition-colors"><List size={24} /></button>
          </div>
          
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-[#646464] text-[14px] px-6 py-3 pr-12 rounded-[8px] focus:outline-none focus:border-[#C33031] cursor-pointer">
              <option>Default sorting</option>
              <option>Sort by popularity</option>
              <option>Sort by average rating</option>
              <option>Sort by latest</option>
              <option>Sort by price: low to high</option>
              <option>Sort by price: high to low</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#646464] pointer-events-none" />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-[2.5rem] h-[380px] w-full" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-[30px] p-12 text-center shadow-sm">
          <p className="text-[#646464] font-bold text-[18px] uppercase tracking-widest">
            No products found matching your criteria.
          </p>
          <button 
            onClick={onClearFilters}
            className="mt-6 text-[#C33031] font-bold underline hover:text-[#0F7A3D] transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pt-16">
          {products.map((product: Product) => (
            <div key={product._id} className="relative group w-full pt-16 mt-8">
              <div className="absolute inset-0 top-16 bg-white rounded-[2.5rem] shadow-sm transition-all duration-500 ease-in-out group-hover:-top-10 group-hover:shadow-xl" />
              
              <div className="relative z-20 w-full flex justify-center transition-all duration-500 ease-in-out h-[200px] items-center -mt-16">
                <img
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] object-contain transform transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
                />
              </div>

              <div className="relative z-10 px-6 xl:px-8 pb-10 pt-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="uppercase font-bold text-[20px] md:text-[22px] text-[#212121] leading-tight flex-1">
                    {product.name}
                  </h3>
                  <button 
                    onClick={() => handleWishlistToggle(product)}
                    className="text-[#C33031] transition-all hover:scale-110 cursor-pointer ml-2 shrink-0"
                  >
                    <Heart 
                      size={24} 
                      fill={isInWishlist(userId, product._id) ? "#C33031" : "transparent"} 
                      strokeWidth={isInWishlist(userId, product._id) ? 0 : 2}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-[#ff9f0d]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < (product.rating || 0) ? "#ff9f0d" : "transparent"}
                        strokeWidth={i < (product.rating || 0) ? 0 : 2}
                      />
                    ))}
                  </div>
                  <span className="text-[#646464] text-[13px] font-medium">(5)</span>
                </div>

                <p className="text-[#646464] text-[15px] leading-relaxed mb-8 line-clamp-2 h-[45px]">
                  {product.description || "Minus eaque omnis aut autem deleniti est. Dolores earum sequi..."}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-[#C33031] font-bold text-[26px]">
                    ${product.price ? product.price.toFixed(2) : "0.00"}
                  </span>
                  <button 
                    onClick={() => {
                      addCartItem(userId, { 
                        _id: product._id, 
                        name: product.name, 
                        image: product.image, 
                        price: product.price, 
                        qty: 1 
                      });
                      toast.success(`${product.name} added to cart!`, {
                        icon: '🛒',
                        style: { borderRadius: '10px', background: '#0F7A3D', color: '#fff' }
                      });
                    }}
                    className="w-[54px] h-[54px] bg-[#0F7A3D] text-white rounded-[14px] flex items-center justify-center hover:bg-[#0b5c2e] transition-colors cursor-pointer shrink-0 shadow-md"
                  >
                    <ShoppingBasket size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

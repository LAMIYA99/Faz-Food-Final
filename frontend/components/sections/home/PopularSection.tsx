"use client";

import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Heart, ShoppingBasket, Star, Pizza, Leaf, Coffee, Drumstick, Sandwich, Fish, Hamburger, ArrowRight } from "lucide-react";
import SectionHeading from "../../common/SectionHeading";
import { useQuery } from "@/providers/TanstackQueryProvider";
import api from "@/services/api";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
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

const CATEGORIES = [
  { id: 1, name: "BURGER", icon: <Hamburger size={18} /> },
  { id: 2, name: "PIZZA", icon: <Pizza size={18} /> },
  { id: 3, name: "SUSHI", icon: <Fish size={18} /> },
  { id: 4, name: "SALADS", icon: <Leaf size={18} /> },
  { id: 5, name: "BURRITO", icon: <Sandwich size={18} /> },
  { id: 6, name: "FAST FOOD", icon: <Drumstick size={18} /> },
  { id: 7, name: "BEVERAGES", icon: <Coffee size={18} /> },
];

export default function PopularSection() {
  const [activeCategory, setActiveCategory] = useState<string>("BURGER");
  
  const { user } = useAuthStore();
  const userId = user?._id || 'guest';
  
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const { addItem: addCartItem } = useCartStore();

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(userId, product._id)) {
      removeItem(userId, product._id);
      toast.success(`${product.name} removed from wishlist`, {
        icon: '💔',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      addItem(userId, product);
      toast.success(`${product.name} added to wishlist!`, {
        icon: '❤️',
        style: {
          borderRadius: '10px',
          background: '#0F7A3D',
          color: '#fff',
        },
      });
    }
  };

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
  });

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.getData("/api/products"),
  });

  const filtered: Product[] = allProducts.filter((p: Product) => p.category === activeCategory);

  return (
    <section className="w-full py-24 bg-[#F4F1EA] flex flex-col items-center font-barlow overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading title="POPULAR DISHES" />

        <div className="flex flex-wrap justify-center gap-3 mb-24">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`flex items-center gap-3 px-8 py-4 rounded-[12px] font-bold text-[18px] leading-[23.4px] font-barlow tracking-[1px] transition-all cursor-pointer ${
                activeCategory === category.name ? "bg-[#C33031] text-white shadow-lg" : "bg-white text-[#212121] hover:bg-gray-50 shadow-sm"
              }`}
            >
              <span className={activeCategory === category.name ? "text-white" : "text-[#212121]"}>
                {category.icon}
              </span>
              {category.name}
            </button>
          ))}
        </div>

        <div className="pt-20">
          {isLoading ? (
            <div className="flex gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-[0_0_320px] shrink-0 animate-pulse">
                  <div className="bg-white rounded-[2.5rem] h-[380px]" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-[#646464] font-bold uppercase tracking-widest py-20 w-full">
              No products in this category.
            </p>
          ) : (
            <div className="overflow-visible" ref={emblaRef}>
              <div className="flex gap-12 pt-40 px-4 -mt-40">
                {filtered.map((product: Product) => (
                  <div key={product._id} className="flex-[0_0_300px] md:flex-[0_0_320px] shrink-0 relative group">
                    <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-sm transition-all duration-500 ease-in-out group-hover:-top-40 group-hover:shadow-xl" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center z-20 transition-all duration-500 ease-in-out">
                      <img
                        src={product.image || "/placeholder.png"}
                        alt={product.name}
                        className="w-[240px] h-[240px] object-contain transform transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="relative z-10 px-8 pb-10 pt-32">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="uppercase font-bold text-[22px] text-[#212121] leading-tight flex-1">
                          {product.name}
                        </h3>
                        <button 
                          onClick={() => handleWishlistToggle(product)}
                          className="text-[#C33031] transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Heart 
                            size={24} 
                            fill={isInWishlist(userId, product._id) ? "#C33031" : "transparent"} 
                            strokeWidth={isInWishlist(userId, product._id) ? 0 : 2}
                          />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 mb-4">
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
                      </div>

                      <p className="text-[#464646] text-[15px] leading-relaxed mb-8 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <span className="text-[#C33031] font-bold text-[26px]">
                          ${product.price}
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
                          className="w-[54px] h-[54px] bg-[#0F7A3D] text-white rounded-[14px] flex items-center justify-center hover:bg-[#0b5c2e] transition-colors cursor-pointer"
                        >
                          <ShoppingBasket size={24} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-24 flex flex-col items-center text-center max-w-[800px] mx-auto">
          <p className="text-[#464646] text-[18px] leading-relaxed mb-10 font-barlow">
            Fazfood is a unique and independent quick service brand. Fazfood burgers and shakes are made pretty hot and tasty.
          </p>
          <button className="bg-[#0F7A3D] hover:bg-[#0b5c2e] text-white px-10 py-5 rounded-[12px] font-bold text-[18px] flex items-center gap-3 transition-all cursor-pointer group/btn">
            VIEW ALL
            <span className="group-hover/btn:translate-x-1 transition-transform">
              <ArrowRight size={24} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
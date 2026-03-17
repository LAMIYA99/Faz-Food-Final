"use client";

import React from "react";
import { ChevronDown, Pizza, Leaf, Coffee, Drumstick, Sandwich, Fish, Hamburger, LayoutGrid, Star } from "lucide-react";

export const CATEGORIES = [
  { id: 0, name: "ALL", icon: <LayoutGrid size={18} /> },
  { id: 1, name: "BURGER", icon: <Hamburger size={18} /> },
  { id: 2, name: "BURRITO", icon: <Sandwich size={18} /> },
  { id: 3, name: "FRIES", icon: <Drumstick size={18} /> },
  { id: 4, name: "HOT DRINKS", icon: <Coffee size={18} /> },
  { id: 5, name: "PIZZA", icon: <Pizza size={18} /> },
  { id: 6, name: "SALADS", icon: <Leaf size={18} /> },
  { id: 7, name: "SANDWICH", icon: <Sandwich size={18} /> },
  { id: 8, name: "SPAGHETTI", icon: <Pizza size={18} /> },
  { id: 9, name: "SPECIALS", icon: <Star size={18} /> },
  { id: 10, name: "SUSHI", icon: <Fish size={18} /> },
  { id: 11, name: "TACO", icon: <Sandwich size={18} /> },
  { id: 12, name: "UNCATEGORIZED", icon: <LayoutGrid size={18} /> },
];

interface ShopSidebarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
}

export default function ShopSidebar({ activeCategory, setActiveCategory, priceRange, setPriceRange }: ShopSidebarProps) {
  return (
    <aside className="w-full lg:w-[280px] shrink-0">
      <div className="bg-white/0 mb-10">
        <div className="flex items-center justify-between cursor-pointer mb-6">
          <h3 className="text-[20px] font-extrabold text-[#212121] uppercase tracking-wide">CATEGORIES</h3>
          <ChevronDown size={20} className="text-[#646464]" />
        </div>
        <ul className="space-y-4">
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-3 text-[18px] font-bold font-barlow uppercase tracking-wider transition-colors w-full text-left ${
                  activeCategory === cat.name ? "text-[#C33031]" : "text-[#212121] hover:text-[#C33031]"
                }`}
              >
                <span className={activeCategory === cat.name ? "text-[#C33031]" : "text-[#646464]"}>
                  {cat.icon}
                </span>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white/0">
        <div className="flex items-center justify-between cursor-pointer mb-6">
          <h3 className="text-[20px] font-extrabold text-[#212121] uppercase tracking-wide">FILTER BY PRICE</h3>
          <ChevronDown size={20} className="text-[#646464]" />
        </div>
        
        <div className="px-2">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={priceRange} 
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-[#e0e0e0] rounded-lg appearance-none cursor-pointer accent-[#C33031]"
          />
          <div className="mt-4 text-[#212121] font-bold text-[14px]">
            PRICE: <span className="text-[#646464]">0.00$ — {priceRange.toFixed(2)}$</span>
          </div>
          <button className="mt-6 bg-[#0F7A3D] text-white px-8 py-3 rounded-[8px] font-bold text-[14px] uppercase tracking-widest hover:bg-[#0b5c2e] transition-colors">
            FILTER
          </button>
        </div>
      </div>
    </aside>
  );
}

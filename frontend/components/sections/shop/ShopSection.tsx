"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@/providers/TanstackQueryProvider";
import api from "@/services/api";
import ShopSidebar from "@/components/sections/shop/ShopSidebar";
import ShopGrid from "@/components/sections/shop/ShopGrid";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";

interface Product {
  _id: string;
  name: string;
  image: string;
  rating: number;
  description?: string;
  price: number;
  category: string;
}

export default function ShopSection() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [priceRange, setPriceRange] = useState<number>(40);
  
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.getData("/api/products"),
  });

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p: Product) => {
      const matchCategory = activeCategory === "ALL" || p.category.toUpperCase() === activeCategory.toUpperCase();
      const matchPrice = p.price <= priceRange;
      return matchCategory && matchPrice;
    });
  }, [allProducts, activeCategory, priceRange]);

  const handleClearFilters = () => {
    setActiveCategory("ALL");
    setPriceRange(100);
  };

  return (
    <main className="min-h-screen bg-[#F4F1EA] font-barlow relative overflow-hidden pb-24">
      <BreadcrumbBanner 
        title="SHOP"
        paths={[
          { name: "Home Page", href: "/" },
          { name: "Shop" }
        ]}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] mt-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <ShopSidebar 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />

          <ShopGrid 
            products={filteredProducts}
            totalCount={allProducts.length}
            isLoading={isLoading}
            onClearFilters={handleClearFilters}
          />

        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@/providers/TanstackQueryProvider";
import api from "@/services/api";
import { Blog } from "@/types/global";



export default function BlogSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => api.getData("/api/blogs"),
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  return (
    <section className="w-full py-24 font-barlow overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <span className="text-[#C33031] font-bold text-[14px] uppercase tracking-[0.3em] mb-4 block">
            WHAT&apos;S UP BLOG
          </span>
          <h2 className="text-[48px] md:text-[64px] font-extrabold text-[#212121] uppercase leading-none tracking-tight">
            FAZFOOD &amp; SAUCE NEWS
          </h2>
        </div>

        {isLoading ? (
          <div className="flex -ml-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-8 animate-pulse">
                <div className="aspect-[4/3] rounded-[30px] bg-gray-200 mb-8" />
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-[#646464] font-bold uppercase tracking-widest py-20">No blog posts yet.</p>
        ) : (
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-8">
                {blogs.map((post: Blog) => (
                  <div key={post._id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-8 group cursor-pointer">
                    <div className="flex flex-col">
                      <div className="relative aspect-[4/3] rounded-[30px] overflow-hidden mb-8">
                        <Image
                          src={post.image || "/placeholder.png"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase mb-4">
                        <span className="text-[#C33031]">{post.category}</span>
                        <span className="text-[#646464]">• {post.date}</span>
                        {post.commentsCount !== undefined && (
                          <span className="text-[#646464]">• COMMENTS ({post.commentsCount})</span>
                        )}
                      </div>

                      <h3 className="text-[24px] md:text-[28px] font-extrabold text-[#212121] leading-[1.2] uppercase mb-4 group-hover:text-[#0F7A3D] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-[#646464] text-[15px] leading-relaxed mb-6 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <button className="flex items-center gap-2 text-[#212121] font-bold text-[14px] uppercase tracking-widest hover:text-[#C33031] transition-colors group/btn">
                        READ MORE
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-16">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? "w-8 bg-[#C33031]" : "w-2.5 bg-[#D1D1D1] hover:bg-[#C33031]/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

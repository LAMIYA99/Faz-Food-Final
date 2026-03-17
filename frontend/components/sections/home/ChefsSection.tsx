"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import SectionHeading from "@/components/common/SectionHeading";
import { useQuery } from "@/providers/TanstackQueryProvider";
import api from "@/services/api";

interface Chef {
  _id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export default function ChefsSection() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const { data: chefs = [], isLoading } = useQuery({
    queryKey: ["chefs"],
    queryFn: () => api.getData("/api/chefs"),
  });

  return (
    <section className="w-full py-24 font-barlow">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <SectionHeading title="MEET OUR EXPERT CHEFS" subtitle="" />
        </div>

        {isLoading ? (
          <div className="flex gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] animate-pulse">
                <div className="w-full aspect-[4.5/5] bg-gray-200 rounded-[40px] mb-8" />
                <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : chefs.length === 0 ? (
          <p className="text-center text-[#646464] font-bold uppercase tracking-widest py-20">No chefs added yet.</p>
        ) : (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {chefs.map((chef: Chef) => (
                <div
                  key={chef._id}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-8 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-full aspect-[4.5/5] mb-8 overflow-hidden rounded-[40px] group/img">
                      <Image
                        src={chef.image || "/placeholder.png"}
                        alt={chef.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href="#" className="text-white hover:text-[#C33031] transition-transform hover:scale-125 duration-300">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        </a>
                        <a href="#" className="text-white hover:text-[#C33031] transition-transform hover:scale-125 duration-300">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </a>
                        <a href="#" className="text-white hover:text-[#C33031] transition-transform hover:scale-125 duration-300">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </a>
                      </div>
                    </div>

                    <h3 className="text-[28px] font-bold text-[#212121] mb-3 uppercase">
                      {chef.name}
                    </h3>

                    <div className="inline-block bg-[#0F7A3D] text-white px-4 py-1.5 rounded-[4px] font-bold text-[14px] mb-4 uppercase tracking-wider transition-colors group-hover:bg-[#C33031]">
                      {chef.role}
                    </div>

                    <p className="text-[#646464] text-[16px] leading-relaxed max-w-[280px]">
                      {chef.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

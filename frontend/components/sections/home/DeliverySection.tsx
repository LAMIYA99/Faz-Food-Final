"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Bike, Utensils, Box } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DeliverySection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });


  const xMovement = useTransform(scrollYProgress, [0, 1], [-100, 200]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 mb-10 bg-[#0F7A3D] overflow-hidden font-barlow"
    >
      <div 
        className="absolute inset-0 z-0 opacity-100 pointer-events-none" 
        style={{ 
          backgroundImage: 'url(https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_bn-5.jpg)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }} 
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-20">
          
          <div className="flex-1 w-full relative min-h-[400px] lg:min-h-[500px]">
            <motion.div 
              style={{ x: xMovement }}
              className="absolute bottom-[-100px] left-[-100px] w-full max-w-[750px]"
            >
              <div className="relative">
                <Image 
                  src="https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_delivery.png"
                  alt="Delivery Scooter"
                  width={721}
                  height={566}
                  className="w-full h-auto object-contain"
                  priority
                />
                
               
              </div>
            </motion.div>
          </div>

          <div className="flex-1 text-white pb-10">
            <h2 className="text-[48px] md:text-[64px] lg:text-[76px] font-bold leading-[1.0] mb-8 uppercase tracking-tight">
              YOUR <span className="text-[#FFD200]">FAVORITE BURGER,</span><br />
              ON THE WAY!
            </h2>
            
            <p className="text-[18px] md:text-[20px] text-white/80 leading-relaxed max-w-[550px] mb-12">
              From classic cheeseburgers to unique, gourmet creations, the world of burgers is vast and varied. At our fast food site, we offer a range of burger options to suit every taste and preference.
            </p>

            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="flex-1 min-w-[160px] flex flex-col items-center text-center p-6 border-2 border-dashed border-white/20 rounded-[24px] hover:border-white/50 transition-all group/box hover:bg-white/5 bg-transparent cursor-default">
                <div className="w-14 h-14 flex items-center justify-center mb-4 transition-transform group-hover/box:scale-110">
                  <Bike size={44} className="text-white" />
                </div>
                <h3 className="font-bold text-[15px] uppercase leading-tight tracking-wide">
                  Delivery in<br />30 Minutes
                </h3>
              </div>

              <div className="flex-1 min-w-[160px] flex flex-col items-center text-center p-6 border-2 border-dashed border-white/20 rounded-[24px] hover:border-white/50 transition-all group/box hover:bg-white/5 bg-transparent cursor-default">
                <div className="w-14 h-14 flex items-center justify-center mb-4 transition-transform group-hover/box:scale-110">
                  <Utensils size={44} className="text-white" />
                </div>
                <h3 className="font-bold text-[15px] uppercase leading-tight tracking-wide">
                  Free Shipping<br />from 75$
                </h3>
              </div>

              <div className="flex-1 min-w-[160px] flex flex-col items-center text-center p-6 border-2 border-dashed border-white/20 rounded-[24px] hover:border-white/50 transition-all group/box hover:bg-white/5 bg-transparent cursor-default">
                <div className="w-14 h-14 flex items-center justify-center mb-4 transition-transform group-hover/box:scale-110">
                  <Box size={44} className="text-white" />
                </div>
                <h3 className="font-bold text-[15px] uppercase leading-tight tracking-wide">
                  Delivery on<br />Your Doorstep
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React from "react";
import { ArrowRight } from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="w-full pt-20  pb-3 font-barlow">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="relative h-[550px]  overflow-hidden group cursor-pointer bg-[#0A0505]">
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'url(https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_bn-3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

          <div className="relative z-10 h-full p-12 flex flex-col justify-center">
            <div className="max-w-[300px]">
              <h2 className="text-[72px] font-bold text-white uppercase leading-[1.05em] mb-4">
                SUPER DELICIOUS
              </h2>
              <div className="mb-8">
                <p className="text-white font-bold text-[18px] uppercase tracking-wider mb-1">Call Us Now:</p>
                <p className="text-[#C33031] font-bold text-[36px] leading-none tracking-tight">
                  1-800-555-333
                </p>
              </div>
              <button className="bg-white text-black px-10 py-5 rounded-[12px] font-bold text-[18px] flex items-center gap-3 hover:bg-[#C33031] hover:text-white transition-all cursor-pointer group/btn">
                ORDER NOW
                <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 right-0 z-10 w-[577px] h-[550px] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <img
              src="https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_img-4.png"
              alt="Combo Meal"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="absolute top-20 right-[380px] z-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
            <div className="bg-[#C33031] text-white px-8 py-3 rounded-full font-bold text-[22px] rotate-[-10deg] shadow-2xl border-4 border-white/10">
              COMBO
            </div>
          </div>

          <div className="absolute top-48 right-12 z-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
            <div className="flex flex-col items-center justify-center w-[130px] h-[130px] bg-[#C33031] text-white rounded-full font-bold shadow-2xl border-4 border-dashed border-white/30 rotate-[15deg]">
              <span className="text-[14px] leading-none mb-1 uppercase tracking-wider">Up to</span>
              <span className="text-[42px] leading-none">50%</span>
              <span className="text-[14px] leading-none uppercase tracking-wider">Off</span>
            </div>
          </div>
        </div>

        <div className="relative h-[550px]  overflow-hidden group cursor-pointer bg-[#111111]">
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'url(https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_bn-4.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

          <div className="relative z-10 h-full p-12 flex flex-col justify-center">
            <div className="max-w-[400px]">
              <h2 className="text-[84px] font-bold text-white uppercase leading-[0.95em] mb-6">
                CHEESE PIZZA
              </h2>
              <p className="text-white text-[18px] font-medium uppercase tracking-widest mb-6 opacity-90">
                New Phenomenon<br />Burger Taste
              </p>
              <div className="text-[#FFCC19] font-bold text-[54px] mb-8 leading-none">
                $69,00
              </div>
              <button className="bg-white text-black px-10 py-5 rounded-[12px] font-bold text-[18px] flex items-center gap-3 hover:bg-[#C33031] hover:text-white transition-all cursor-pointer group/btn">
                ORDER NOW
                <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

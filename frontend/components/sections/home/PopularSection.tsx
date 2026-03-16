import { Trash, Trash2 } from "lucide-react";

export default function PopularSection() {
    return (
      <section className="w-full py-24 bg-[#F4F1EA] flex justify-center font-barlow">
  
        <div className="grid grid-cols-4 gap-2">
  
          {/* CARD */}
          <div className="group relative w-[300px]">
  
            {/* IMAGE */}
            <div className="w-[300px] h-[300px] bg-white flex items-end justify-center relative z-20">
  
              <img
                src="https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/product_6.png"
                alt="burger"
                className="w-[272px] h-[272px] object-contain "
              />
  
            </div>
  
            {/* CONTENT */}
            <div
              className="
              w-[300px]
              h-[215px]
              bg-white
              
        
            p-8
              relative
              z-10
           
              
           
              "
            >
  
              {/* TITLE */}
              <div className="flex justify-between items-start  mb-2">
  
                <h3 className="uppercase font-bold text-[20px] text-[#212121] leading-[1.3em]">
                  Classic Roast Beef
                </h3>
  
                <span className="text-gray-400 text-lg">♡</span>
  
              </div>
  
              {/* RATING */}
              <div className="text-[#ff9f0d] text-sm mb-3">
                ★★★★★ <span className="text-gray-500 text-xs">(5)</span>
              </div>
  
              {/* DESCRIPTION */}
              <p className="text-[#464646] text-[18px] mb-4">
                Consequatur explicabo quasi autem sunt. Perferendis quo esse dolorum...
              </p>
  
              {/* PRICE */}
              <div className="flex justify-between  items-center">
  
                <span className="text-[#C33130] font-bold text-[24px]">
                  9.58$
                </span>
  
                <button className="w-[42px] h-[42px] bg-[#0F7A3D] text-white rounded-lg flex items-center justify-center">
                <Trash2 />
                </button>
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
  }
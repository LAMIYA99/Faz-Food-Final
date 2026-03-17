"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function CartDrawer() {
  const { isOpen, closeCart, carts, removeItem } = useCartStore();
  const { user } = useAuthStore();
  
  const userId = user?._id || 'guest';
  const cartItems = carts[userId] || [];
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeCart}
      />
      
      <div 
        className={`fixed top-0 right-0 h-full w-[400px] max-w-[100vw] bg-[#FAF8F5] z-[101] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-[20px] font-extrabold text-[#212121] uppercase">Shopping cart</h2>
          <button 
            onClick={closeCart}
            className="flex items-center gap-2 text-[14px] font-bold text-[#646464] hover:text-[#C33031] transition-colors uppercase"
          >
            Close <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-[#646464] mt-10">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 relative pr-6">
                <div className="w-[80px] h-[80px] shrink-0 bg-white rounded-[10px] p-2 flex items-center justify-center">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="object-contain" />
                </div>
                <div className="flex flex-col flex-1 justify-center">
                  <h3 className="text-[15px] font-bold text-[#212121] uppercase mb-1">{item.name}</h3>
                  <p className="text-[14px] font-medium text-[#646464]">
                    {item.qty} × <span className="font-bold text-[#212121]">{item.price}$</span>
                  </p>
                </div>
                <button 
                  onClick={() => removeItem(userId, item._id)}
                  className="absolute top-1 right-0 text-[#a0a0a0] hover:text-[#C33031] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-200 bg-[#FAF8F5] mt-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[18px] font-extrabold text-[#212121] uppercase">Subtotal:</span>
            <span className="text-[24px] font-extrabold text-[#212121]">{subtotal.toFixed(2)}$</span>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={closeCart}
              className="w-full py-4 rounded-[10px] border-2 border-[#C33031] text-[#C33031] text-[16px] font-extrabold uppercase tracking-wider hover:bg-[#C33031] hover:text-white transition-colors"
            >
              View Cart
            </button>
            <button 
              className="w-full py-4 rounded-[10px] bg-[#C33031] text-white text-[16px] font-extrabold uppercase tracking-wider border-2 border-[#C33031] hover:bg-[#a62829] transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

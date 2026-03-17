"use client";

import React, { useState } from "react";
import { Phone, ChevronDown, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import api from "@/services/api";

export default function ReservationSection() {
  const router = useRouter();
  const { user, isAuthenticated, token } = useAuthStore();
  
  const [persons, setPersons] = useState("1");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10 : 00 AM");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    if (!isAuthenticated() || !token) {
      router.push("/login");
      return;
    }

    if (!date) {
      setMessage("Please select a date");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const reservationData = {
        name: user?.name || "Table Reservation",
        phone: user?.phone || "On File",
        persons: parseInt(persons, 10),
        date,
        time
      };
      
      const res = await api.PostData("/api/reservations", reservationData, { headers: { Authorization: `Bearer ${token}` } });

      setMessage("Reservation successful! Check your profile.");
      setDate("");
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Failed to book table");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section 
      className="relative w-full py-28 my-20  h-[620px] font-barlow flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_bg-1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 text-white max-w-[550px]">
            <h2 className="text-[48px] md:text-[60px] font-bold leading-[1.05] mb-8 uppercase tracking-tight">
              DO YOU HAVE ANY DINNER PLAN TODAY? <span className="text-white">RESERVE YOUR TABLE</span>
            </h2>
            
            <p className="text-[15px] text-white/70 leading-relaxed mb-10 max-w-[480px]">
              Make online reservations, read restaurant reviews from diners, and earn points towards free meals. OpenTable is a real time online reservation.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0F7A3D] rounded-full flex items-center justify-center">
                <Phone size={20} className="text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-[13px] uppercase tracking-widest mb-1">
                  Quick Order 24/7
                </span>
                <span className="text-[#C33031] font-bold text-[28px] md:text-[34px] leading-none">
                  +1 718-904-4450
                </span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[540px] absolute right-60 bottom-[-200px]">
            <div className="bg-[#0F7A3D] rounded-[30px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
                 <div className="text-[120px] font-black rotate-[-15deg] whitespace-nowrap">RESERVATION</div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6">
                  <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 48H52V16H12V48ZM15 19H49V45H15V19Z" fill="white"/>
                    <path d="M22 28H28V34H22V28Z" fill="white"/>
                    <path d="M36 28H42V34H36V28Z" fill="white"/>
                    <rect x="20" y="40" width="24" height="2" fill="white"/>
                    <circle cx="32" cy="10" r="2" fill="white"/>
                    <circle cx="48" cy="8" r="3" fill="white"/>
                  </svg>
                </div>

                <h3 className="text-[42px] md:text-[52px] font-bold text-white uppercase leading-none mb-3 tracking-tighter">
                  RESERVATION
                </h3>
                <p className="text-white font-bold text-[14px] uppercase tracking-[0.25em] mb-4">
                  Book your table
                </p>

                {message && (
                  <div className={`mb-6 p-3 rounded-[12px] text-sm font-bold text-center w-full ${message.includes('successful') ? 'bg-green-500/20 text-green-100' : 'bg-red-500/20 text-red-100'}`}>
                    {message}
                  </div>
                )}

                <div className="w-full space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <select 
                        value={persons}
                        onChange={(e) => setPersons(e.target.value)}
                        className="w-full bg-transparent border border-white/30 rounded-[12px] px-5 py-4 text-white font-bold text-[14px] appearance-none focus:outline-none focus:border-white/60 transition-all cursor-pointer"
                      >
                        <option value="1" className="bg-[#0F7A3D]">1 Person</option>
                        <option value="2" className="bg-[#0F7A3D]">2 People</option>
                        <option value="3" className="bg-[#0F7A3D]">3 People</option>
                        <option value="4" className="bg-[#0F7A3D]">4 People</option>
                        <option value="5" className="bg-[#0F7A3D]">5+ People</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                    </div>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-transparent border border-white/30 rounded-[12px] px-5 py-4 text-white font-bold text-[14px] placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-all color-scheme-dark"
                        style={{ colorScheme: "dark" }}
                      />
                      <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-transparent border border-white/30 rounded-[12px] px-5 py-4 text-white font-bold text-[14px] appearance-none focus:outline-none focus:border-white/60 transition-all cursor-pointer"
                    >
                      <option className="bg-[#0F7A3D]">10 : 00 AM</option>
                      <option className="bg-[#0F7A3D]">12 : 00 PM</option>
                      <option className="bg-[#0F7A3D]">02 : 00 PM</option>
                      <option className="bg-[#0F7A3D]">04 : 00 PM</option>
                      <option className="bg-[#0F7A3D]">06 : 00 PM</option>
                      <option className="bg-[#0F7A3D]">08 : 00 PM</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                  </div>
                </div>

                <button 
                  onClick={handleBooking}
                  disabled={loading}
                  className="w-full mt-8 bg-[#FFD200] hover:bg-[#FFC000] text-[#212121] py-5 rounded-[12px] font-extrabold text-[15px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 shadow-lg active:translate-y-0 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : (
                    <>
                      BOOK NOW
                      <ArrowRight size={18} strokeWidth={3} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

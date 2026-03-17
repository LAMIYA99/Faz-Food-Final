"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const SIDEBAR_ITEMS = [
  { name: "Products", icon: ShoppingBag, href: "/admin/products" },
  { name: "Chefs", icon: Users, href: "/admin/chefs" },
  { name: "Blogs", icon: FileText, href: "/admin/blogs" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F7F5F0] font-barlow">
      <aside className="w-64 bg-[#212121] text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-[#FFD200]">FAZFOOD</span>
            <span className="text-[10px] bg-[#C33031] px-1.5 py-0.5 rounded font-bold">ADMIN</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-[#0F7A3D] text-white" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span className="font-bold uppercase text-sm tracking-widest">{item.name}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active" className="text-white">
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-bold uppercase text-sm tracking-widest">Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-8">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-[#212121] uppercase tracking-tight">
              {SIDEBAR_ITEMS.find(i => i.href === pathname)?.name || "Admin Panel"}
            </h1>
            <p className="text-[#646464] text-sm mt-1 uppercase tracking-widest font-bold opacity-60">
              Welcome back to Faz-Food Manager
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0F7A3D] flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

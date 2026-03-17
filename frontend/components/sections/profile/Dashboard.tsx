"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Calendar, ShoppingBag, Loader2, FastForward, Phone } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import api from "@/services/api";
import SectionHeading from "@/components/common/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { Heart, Trash2, Star, ShoppingBag as ShoppingBagIcon } from "lucide-react";

export default function Dashboard() {
    const router = useRouter();
    const { user, token, logout, isAuthenticated } = useAuthStore();
    const userId = user?._id || 'guest';
    const { wishlists, removeItem, clearWishlist } = useWishlistStore();
    const { addItem: addCartItem } = useCartStore();
    const wishlistItems = wishlists[userId] || [];

    const [activeTab, setActiveTab] = useState<"profile" | "orders" | "reservations" | "wishlist">("profile");

    useEffect(() => {
        if (!isAuthenticated() || !token) {
            router.push("/login");
        }

        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get("tab") === "wishlist") {
                setActiveTab("wishlist");
            }
        }
    }, [isAuthenticated, token, router]);

    const { data: orders = [], isLoading: loadingOrders } = useQuery({
        queryKey: ['myOrders', token],
        queryFn: async () => {
            const res = await api.getData("/api/orders/myorders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res || [];
        },
        enabled: !!token && activeTab === 'orders'
    });

    const { data: reservations = [], isLoading: loadingReservations } = useQuery({
        queryKey: ['myReservations', token],
        queryFn: async () => {
            const res = await api.getData("/api/reservations/myreservations", {
                headers: { Authorization: `Bearer ${token}` }
            });
            return res || [];
        },
        enabled: !!token && activeTab === 'reservations'
    });

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#F4F1EA] pt-24 pb-20 px-4 font-barlow relative overflow-hidden">
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[#0F7A3D]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-[#C33031]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="mb-12">
                    <SectionHeading title="MY DASHBOARD" />
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="w-full lg:w-[350px] shrink-0">
                        <div className="bg-white rounded-[30px] p-8 shadow-xl sticky top-24">
                            <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100">
                                <div className="w-24 h-24 bg-[#0F7A3D] rounded-full flex items-center justify-center text-white text-[32px] font-bold mb-4 shadow-lg shadow-[#0F7A3D]/30">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="text-[24px] font-extrabold text-[#212121] uppercase text-center">
                                    {user.name}
                                </h2>
                                <p className="text-[#646464] font-medium">{user.email}</p>
                                <div className="mt-2 bg-[#C33031]/10 text-[#C33031] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    {user.role}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-[16px] font-bold text-[16px] uppercase tracking-wider transition-all ${activeTab === "profile"
                                            ? "bg-[#0F7A3D] text-white shadow-md shadow-[#0F7A3D]/20"
                                            : "text-[#646464] hover:bg-[#F4F1EA]"
                                        }`}
                                >
                                    <User size={20} />
                                    Profile Details
                                </button>
                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-[16px] font-bold text-[16px] uppercase tracking-wider transition-all ${activeTab === "orders"
                                            ? "bg-[#0F7A3D] text-white shadow-md shadow-[#0F7A3D]/20"
                                            : "text-[#646464] hover:bg-[#F4F1EA]"
                                        }`}
                                >
                                    <ShoppingBag size={20} />
                                    My Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab("reservations")}
                                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-[16px] font-bold text-[16px] uppercase tracking-wider transition-all ${activeTab === "reservations"
                                            ? "bg-[#0F7A3D] text-white shadow-md shadow-[#0F7A3D]/20"
                                            : "text-[#646464] hover:bg-[#F4F1EA]"
                                        }`}
                                >
                                    <Calendar size={20} />
                                    Reservations
                                </button>
                                <button
                                    onClick={() => {
                                        setActiveTab("wishlist");
                                        router.push("/profile", { scroll: false });
                                    }}
                                    className={`w-full flex items-center justify-between px-6 py-4 rounded-[16px] font-bold text-[16px] uppercase tracking-wider transition-all ${activeTab === "wishlist"
                                            ? "bg-[#0F7A3D] text-white shadow-md shadow-[#0F7A3D]/20"
                                            : "text-[#646464] hover:bg-[#F4F1EA]"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Heart size={20} />
                                        Wishlist
                                    </div>
                                    {wishlistItems.length > 0 && (
                                        <span className="bg-[#C33031] text-white text-[12px] px-2 py-0.5 rounded-full">
                                            {wishlistItems.length}
                                        </span>
                                    )}
                                </button>

                                <hr className="my-6 border-gray-100" />

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-4 px-6 py-4 rounded-[16px] font-bold text-[16px] uppercase tracking-wider transition-all text-[#C33031] hover:bg-red-50"
                                >
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-xl min-h-[500px]">

                            {activeTab === "profile" && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-[28px] font-extrabold text-[#212121] uppercase mb-8 flex items-center gap-3">
                                        <User className="text-[#0F7A3D]" size={32} />
                                        Account Information
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="p-6 bg-[#F4F1EA] rounded-[20px]">
                                            <span className="text-[#646464] text-[13px] font-bold uppercase tracking-widest block mb-1">Full Name</span>
                                            <p className="text-[#212121] text-[20px] font-bold">{user.name}</p>
                                        </div>
                                        <div className="p-6 bg-[#F4F1EA] rounded-[20px]">
                                            <span className="text-[#646464] text-[13px] font-bold uppercase tracking-widest block mb-1">Email Address</span>
                                            <p className="text-[#212121] text-[20px] font-bold">{user.email}</p>
                                        </div>
                                        <div className="p-6 bg-[#F4F1EA] rounded-[20px]">
                                            <span className="text-[#646464] text-[13px] font-bold uppercase tracking-widest block mb-1">Phone Number</span>
                                            <p className="text-[#212121] text-[20px] font-bold">{user.phone || "Not provided"}</p>
                                        </div>
                                        <div className="p-6 bg-[#F4F1EA] rounded-[20px]">
                                            <span className="text-[#646464] text-[13px] font-bold uppercase tracking-widest block mb-1">Account Role</span>
                                            <p className="text-[#212121] text-[20px] font-bold capitalize">{user.role}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "orders" && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-[28px] font-extrabold text-[#212121] uppercase mb-8 flex items-center gap-3">
                                        <ShoppingBag className="text-[#C33031]" size={32} />
                                        Order History
                                    </h3>

                                    {loadingOrders ? (
                                        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#0F7A3D]" size={40} /></div>
                                    ) : orders.length === 0 ? (
                                        <div className="text-center py-16 bg-[#F4F1EA] rounded-[20px]">
                                            <FastForward className="mx-auto text-[#D1D1D1] mb-4" size={60} />
                                            <p className="text-[#646464] font-bold text-[18px] uppercase tracking-widest mb-4">No orders placed yet.</p>
                                            <button onClick={() => router.push("/")} className="text-[#0F7A3D] font-bold uppercase tracking-widest hover:underline">Start Ordering</button>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {orders.map((order: any) => (
                                                <div key={order._id} className="border-2 border-[#F4F1EA] rounded-[20px] p-6 hover:border-[#0F7A3D] transition-colors">
                                                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                                                        <div>
                                                            <p className="text-[12px] text-[#646464] font-bold uppercase tracking-widest">Order ID</p>
                                                            <p className="font-mono font-bold text-[#212121]">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[12px] text-[#646464] font-bold uppercase tracking-widest">Date</p>
                                                            <p className="font-bold text-[#212121]">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-[12px] text-[#646464] font-bold uppercase tracking-widest">Status</p>
                                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                                {order.isDelivered ? 'Delivered' : 'Processing'}
                                                            </span>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[12px] text-[#646464] font-bold uppercase tracking-widest">Total Amount</p>
                                                            <p className="text-[20px] font-black text-[#C33031]">${order.totalPrice.toFixed(2)}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col gap-3">
                                                        {order.orderItems.map((item: any, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-4">
                                                                <div className="w-12 h-12 bg-gray-100 rounded-[10px] overflow-hidden">
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="font-bold text-[#212121]">{item.name}</p>
                                                                    <p className="text-sm text-[#646464]">Qty: {item.qty} × ${item.price}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "reservations" && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-[28px] font-extrabold text-[#212121] uppercase mb-8 flex items-center gap-3">
                                        <Calendar className="text-[#0F7A3D]" size={32} />
                                        My Reservations
                                    </h3>

                                    {loadingReservations ? (
                                        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#0F7A3D]" size={40} /></div>
                                    ) : reservations.length === 0 ? (
                                        <div className="text-center py-16 bg-[#F4F1EA] rounded-[20px]">
                                            <Calendar className="mx-auto text-[#D1D1D1] mb-4" size={60} />
                                            <p className="text-[#646464] font-bold text-[18px] uppercase tracking-widest mb-4">No reservations found.</p>
                                            <button onClick={() => router.push("/#reservation")} className="text-[#0F7A3D] font-bold uppercase tracking-widest hover:underline">Book a Table</button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {reservations.map((res: any) => (
                                                <div key={res._id} className="border-2 border-[#F4F1EA] rounded-[20px] p-6 relative overflow-hidden group hover:border-[#0F7A3D] transition-colors">
                                                    <div className={`absolute top-0 right-0 px-4 py-1 text-[11px] font-black uppercase tracking-widest rounded-bl-[16px] text-white ${res.status === 'confirmed' ? 'bg-[#0F7A3D]' :
                                                            res.status === 'cancelled' ? 'bg-[#C33031]' : 'bg-[#eab308]'
                                                        }`}>
                                                        {res.status}
                                                    </div>

                                                    <div className="mb-4 pt-2">
                                                        <p className="text-[32px] font-black text-[#212121] leading-none mb-1">{res.date}</p>
                                                        <p className="text-[#C33031] font-bold text-[18px] uppercase">{res.time}</p>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3 text-[#646464]">
                                                            <User size={16} />
                                                            <span className="font-medium">{res.name} ({res.persons} People)</span>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-[#646464]">
                                                            <Phone size={16} />
                                                            <span className="font-medium">{res.phone}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "wishlist" && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-[28px] font-extrabold text-[#212121] uppercase flex items-center gap-3">
                                            <Heart className="text-[#C33031]" size={32} />
                                            My Wishlist
                                        </h3>

                                        {wishlistItems.length > 0 && (
                                            <button
                                                onClick={() => { clearWishlist(userId); toast.success("Wishlist cleared"); }}
                                                className="flex items-center gap-2 text-[#C33031] font-bold uppercase tracking-widest hover:bg-red-50 px-4 py-2 rounded-lg transition-colors text-sm"
                                            >
                                                <Trash2 size={16} />
                                                Clear
                                            </button>
                                        )}
                                    </div>

                                    {wishlistItems.length === 0 ? (
                                        <div className="text-center py-16 bg-[#F4F1EA] rounded-[20px]">
                                            <Heart className="mx-auto text-[#D1D1D1] mb-4" size={60} />
                                            <p className="text-[#646464] font-bold text-[18px] uppercase tracking-widest mb-4">Your wishlist is empty.</p>
                                            <button onClick={() => router.push("/")} className="text-[#0F7A3D] font-bold uppercase tracking-widest hover:underline">Explore Menu</button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {wishlistItems.map((product) => (
                                                <div key={product._id} className="border-2 border-[#F4F1EA] rounded-[20px] p-6 flex flex-col items-center relative group hover:border-[#0F7A3D] transition-colors">
                                                    <button
                                                        onClick={() => {
                                                            removeItem(userId, product._id);
                                                            toast.success(`${product.name} removed`, { icon: '💔' });
                                                        }}
                                                        className="absolute top-4 right-4 w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-[#C33031] hover:bg-[#C33031] hover:text-white transition-colors z-10"
                                                        title="Remove from wishlist"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>

                                                    <div className="w-[140px] h-[140px] mb-4 relative transform transition-transform duration-500 group-hover:scale-110">
                                                        <img
                                                            src={product.image || "/placeholder.png"}
                                                            alt={product.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>

                                                    <div className="w-full text-center">
                                                        <div className="text-[#ff9f0d] flex justify-center mb-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={14} fill="#ff9f0d" strokeWidth={0} />
                                                            ))}
                                                        </div>

                                                        <h3 className="uppercase font-bold text-[18px] text-[#212121] leading-tight mb-1">
                                                            {product.name}
                                                        </h3>

                                                        <p className="text-[#646464] text-xs uppercase tracking-widest font-bold mb-4">
                                                            {product.category}
                                                        </p>

                                                        <div className="flex justify-between items-center w-full px-2 border-t border-gray-100 pt-4 mt-2">
                                                            <span className="text-[#C33031] font-bold text-[20px]">
                                                                ${product.price}
                                                            </span>
                                                            <button
                                                                onClick={() => {
                                                                    addCartItem(userId, {
                                                                        _id: product._id,
                                                                        name: product.name,
                                                                        image: product.image,
                                                                        price: product.price,
                                                                        qty: 1
                                                                    });
                                                                    toast.success(`${product.name} added to cart!`, {
                                                                        icon: '🛒',
                                                                        style: { borderRadius: '10px', background: '#0F7A3D', color: '#fff' }
                                                                    });
                                                                }}
                                                                className="w-[40px] h-[40px] bg-[#0F7A3D] text-white rounded-[10px] flex items-center justify-center hover:bg-[#0b5c2e] transition-colors cursor-pointer shadow-lg shadow-[#0F7A3D]/30"
                                                            >
                                                                <ShoppingBagIcon size={18} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

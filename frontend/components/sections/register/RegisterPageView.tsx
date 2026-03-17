"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Phone, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import api from "@/services/api";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const setCredentials = useAuthStore((state) => state.setCredentials);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);

        try {
            const data = await api.PostData("/api/users/register", { name, email, phone, password });

            if (data && data.token) {
                setCredentials(
                    { _id: data._id, name: data.name, email: data.email, role: data.role },
                    data.token
                );
                router.push(data.role === 'admin' ? '/admin' : '/profile');
            } else {
                setError("Invalid response format received");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center py-20 px-4 font-barlow relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C33031]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#0F7A3D]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-[550px] bg-white rounded-[30px] p-10 md:p-14 shadow-2xl relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-[40px] font-extrabold text-[#212121] uppercase tracking-tight mb-2">
                        Create Account
                    </h1>
                    <p className="text-[#646464] text-[16px]">
                        Join FazFood to track your orders and reservations
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-[12px] text-sm font-bold text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[14px] font-bold text-[#212121] uppercase tracking-wider block">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#646464]">
                                <User size={20} />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-[#F4F1EA] border-2 border-transparent focus:border-[#0F7A3D] rounded-[16px] outline-none transition-colors text-[#212121] font-medium"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[14px] font-bold text-[#212121] uppercase tracking-wider block">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#646464]">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-[#F4F1EA] border-2 border-transparent focus:border-[#0F7A3D] rounded-[16px] outline-none transition-colors text-[#212121] font-medium"
                                placeholder="hello@fazfood.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[14px] font-bold text-[#212121] uppercase tracking-wider block">
                            Phone Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#646464]">
                                <Phone size={20} />
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-[#F4F1EA] border-2 border-transparent focus:border-[#0F7A3D] rounded-[16px] outline-none transition-colors text-[#212121] font-medium"
                                placeholder="+1 234 567 890"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-[14px] font-bold text-[#212121] uppercase tracking-wider block">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#646464]">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-[#F4F1EA] border-2 border-transparent focus:border-[#0F7A3D] rounded-[16px] outline-none transition-colors text-[#212121] font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[14px] font-bold text-[#212121] uppercase tracking-wider block">
                                Confirm
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#646464]">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-[#F4F1EA] border-2 border-transparent focus:border-[#0F7A3D] rounded-[16px] outline-none transition-colors text-[#212121] font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#C33031] hover:bg-[#a62829] text-white py-4 rounded-[16px] font-bold text-[18px] uppercase tracking-wider transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed mt-6 shadow-lg shadow-[#C33031]/30"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            <>
                                Create Account
                                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-[#646464] font-medium">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#0F7A3D] font-bold hover:underline transition-all">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

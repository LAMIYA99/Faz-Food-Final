import { navBarItems } from "@/constant/navbar";
import {
  ChevronDown,
  Motorbike,
  Search,
  ShoppingBasket,
  User,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import BannerSection from "../sections/home/BannerSection";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
  
  const userId = user?._id || 'guest';
  const { wishlists } = useWishlistStore();
  const { carts, openCart } = useCartStore();
  
  const wishlistItems = wishlists[userId] || [];
  const cartItems = carts[userId] || [];
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  
  const isHome = pathname === "/";

  return (
    <section className={isHome ? "bg-[url('https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/rev_home5.jpg')] h-255 bg-no-repeat bg-cover" : "bg-[#F4F1EA]"}>
      <header className="max-w-458.25 mx-auto py-5 bg-transparent">
        <nav className="flex items-center justify-between">
          <div className="Navigation ">
              <ul className="flex items-center">
                {navBarItems.map((n) => (
                  <li
                    key={n.id}
                    className={`text-[18px] leading-[1.3888888889] font-bold uppercase p-[15px] font-barlow flex hover:text-[#C33130] cursor-pointer duration-300 ${
                      isHome ? "text-white" : (pathname === n.path || (n.path !== '/' && pathname.startsWith(n.path)) ? "text-[#C33130]" : "text-[#212121]")
                    }`}
                  >
                    <Link href={n.path} className="flex items-center gap-1">
                      {n.name}{" "}
                      {n?.icon ? <ChevronDown size={18} strokeWidth={3} /> : ""}
                    </Link>
                  </li>
                ))}
              </ul>
          </div>
          <div className="Logo">
            <Link href="/">
              <Image
                alt="logo"
                width={150}
                height={150}
                src={
                  isHome 
                    ? "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/logo-white.svg"
                    : "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/logo.svg"
                }
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          <div className="Actions">
              <ul className="flex items-center gap-4">
                <li className={`text-[12px] font-barlow font-bold flex items-center gap-2 pr-4 hover:text-[#C33130] cursor-pointer duration-300 ${isHome ? 'text-white' : 'text-[#212121]'}`}>
                  <Search size={16} /> Search
                </li>
                <li>
                  <button
                    className={`
    text-[16px] 
    leading-[24px] 
    flex items-start gap-2
    font-bold 
    font-barlow
    uppercase 
    text-white
    tracking-[0px]
    rounded-[10px]
    px-[25px]
    py-[15px]
    relative
    overflow-hidden
    before:absolute
    before:inset-0
    before:bg-gradient-to-r 
    before:bg-[length:100%] 
    before:bg-no-repeat
    before:left-[110%]
    before:top-0
    before:transition-all
    before:duration-[250ms]
    before:ease-[cubic-bezier(1,1,0,0)]
    ${isHome ? 'bg-[#00833E] before:from-[#C33130] before:to-[#C33130]' : 'bg-[#C33031] before:from-[#00833E] before:to-[#00833E]'}
  `}
                  >
                    <Motorbike size={21} />
                    Order Now
                  </button>
                </li>
                <li>
                  <Link href="/profile?tab=wishlist">
                    <button className="bg-[#00833E] rounded-[10px] min-w-[50px] min-h-[50px] border-0 flex items-center justify-center text-white relative transition-transform hover:scale-105">
                      <Heart size={20} />
                      {wishlistItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#C33031] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#C33031]">
                          {wishlistItems.length}
                        </span>
                      )}
                    </button>
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={openCart}
                    className="bg-[#00833E] rounded-[10px] min-w-[50px] min-h-[50px] border-0 flex items-center justify-center text-white relative transition-transform hover:scale-105"
                  >
                    <ShoppingBasket />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#C33031] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#C33031]">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => router.push(isAuthenticated() ? (user?.role === 'admin' ? '/admin' : '/profile') : '/login')}
                    className="bg-[#00833E] rounded-[10px] min-w-[50px] min-h-[50px] border-0 flex items-center justify-center text-white transition-transform hover:scale-105"
                  >
                    {isAuthenticated() && user ? (
                      <span className="font-bold text-[18px] uppercase">{user.name.charAt(0)}</span>
                    ) : (
                      <User />
                    )}
                  </button>
                </li>
              </ul>
          </div>
        </nav>
      </header>
      {isHome && <BannerSection />}
    </section>
  );
}

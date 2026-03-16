import { navBarItems } from "@/constant/navbar";
import {
  ChevronDown,
  Motorbike,
  Search,
  ShoppingBasket,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BannerSection from "../sections/home/BannerSection";

export default function Header() {
  return (
    <section className="bg-[url('https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/rev_home5.jpg')] h-255 bg-no-repeat bg-cover">
      <header className="max-w-458.25 mx-auto py-5 bg-transparent">
        <nav className="flex items-center justify-between">
          <div className="Navigation ">
            <ul className="flex items-center">
              {navBarItems.map((n) => (
                <li
                  key={n.id}
                  className="text-[18px] leading-[1.3888888889] font-bold uppercase text-white p-[15px] font-barlow flex hover:text-[#C33130] cursor-pointer duration-300 "
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
            <Image
              alt="logo"
              width={150}
              height={150}
              src={
                "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/logo-white.svg"
              }
            />
          </div>
          <div className="Actions">
            <ul className="flex items-center gap-4">
              <li className="text-[12px] text-white font-barlow font-bold flex items-center gap-2 pr-4 hover:text-[#C33130] cursor-pointer duration-300">
                <Search size={16} /> Search
              </li>
              <li>
                <button
                  className="
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
  bg-[#00833E] 
  relative
  overflow-hidden
  before:absolute
  before:inset-0
  before:bg-gradient-to-r 
  before:from-[#C33130] 
  before:to-[#C33130] 
  before:bg-[length:100%] 
  before:bg-no-repeat
  before:left-[110%]
  before:top-0
  before:transition-all
  before:duration-[250ms]
  before:ease-[cubic-bezier(1,1,0,0)]
"
                >
                  <Motorbike size={21} />
                  Order Now
                </button>
              </li>
              <li>
                <button className="bg-[#00833E] rounded-[10px] min-w-[50px] min-h-[50px] border-0 flex items-center justify-center text-white">
                  <ShoppingBasket />
                </button>
              </li>
              <li>
                <button className="bg-[#00833E] rounded-[10px] min-w-[50px] min-h-[50px] border-0 flex items-center justify-center text-white">
                  <User />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <BannerSection />
    </section>
  );
}

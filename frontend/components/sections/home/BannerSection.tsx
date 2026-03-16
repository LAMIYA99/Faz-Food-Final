import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function BannerSection() {
  return (
    <div className="flex items-start pt-20 w-full h-full justify-center">
      <div className="flex items-center flex-col pt-10">
        <h2
          className="
z-[11]
font-barlow
uppercase
text-[#FFCC19]
text-center
leading-[35px]
tracking-[0px]
font-bold
text-[30px]
opacity-100
mb-[20px]
visible
whitespace-normal
"
        >
          SUPER DELICIONG CHEESE
        </h2>
        <h1
          className="
z-[10]
font-barlow
uppercase
text-white
text-center
leading-[110px]
tracking-[0px]
font-extrabold
text-[120px]
opacity-100
mb-[40px]

visible
whitespace-normal
"
        >
          CHEESE <br />
          PIZZA LIMITED
        </h1>
        <h3
          className="
z-[8]
font-barlow
inline-block
w-[487px]
text-white
text-center
leading-[25px]
tracking-[0px]
font-normal
text-[20px]
opacity-100
translate-x-0
translate-y-0
mb-[40px]

visible
whitespace-normal
"
        >
          Extra-virgin olive oil, garlic, mozzarella cheese, onions, mushrooms,
          green olives, black olives, fresh tomatoes.
        </h3>
        <button
          className="
         flex items-center gap-2
z-[6]
bg-[#C33130]
font-barlow
text-white
text-left
leading-[64px]
tracking-[1px]
font-bold
text-[16px]
pl-[35px]
pr-[40px]
rounded-[9px]
transition-[background-size]
duration-[250ms]
ease-[cubic-bezier(1,1,0,0)]
opacity-100
visible
whitespace-normal
border-0
"
        >
          ORDER NOW <ArrowRight />
        </button>
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0">
          <Image
            alt="pizza"
            width={213}
            height={210}
            src={
              "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/rev_home3_1.png"
            }
          />
        </div>
        <div className="absolute top-0 right-0">
          <Image
            alt="pizza"
            width={213}
            height={210}
            src={
              "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/rev_home5_2.png"
            }
          />
        </div>
        <Image
          alt="pizza"
          width={1100}
          height={594}
          src={
            "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/rev_home5_1.png"
          }
        />
      </div>
    </div>
  );
}

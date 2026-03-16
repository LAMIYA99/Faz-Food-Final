import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function SpecialOfferSection() {
  return (
    <section className="flex items-center justify-center pt-50">
      <div className="flex items-center justify-center h-[620px] overflow-hidden rounded-3xl ">
        <div
          className="bg-cover bg-center bg-[#212121] px-[120px] py-[80px] h-full "
          style={{
            backgroundImage:
              "url(https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_shape.png)",
          }}
        >
          <h2 className="mb-[15px] text-[#C33130] text-[18px] font-bold font-barlow uppercase leading-[1.3em] tracking-[1px]">
            THE MENU fazfood?
          </h2>
          <h3 className="text-white text-[70px] font-barlow leading-[1.07em] tracking-[0px] font-bold uppercase mb-[20px]">
            BURGER OF THE <br /> mONTH
          </h3>
          <h4 className="mb-[50px] w-[370px] font-barlow text-white">
            We take pride in crafting each item fresh to order, resulting in a
            truly distinctive and indulgent taste experience for our customers.
          </h4>
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
        <div className=" w-full h-full  ">
          <Image
            width={645}
            height={620}
            src={
              "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_img-1.jpg"
            }
            alt="burger "
          />
        </div>
      </div>
    </section>
  );
}

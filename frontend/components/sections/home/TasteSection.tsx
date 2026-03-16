import { ArrowRight } from "lucide-react";

export default function TasteSection() {
  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-350 mx-auto grid md:grid-cols-2 gap-2.5">
        <div
          className="relative overflow-hidden rounded-3xl group h-[520px] flex items-center"
          style={{
            backgroundImage:
              "url(https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_bn-1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="z-20 pl-15 text-white ">
            <h2 className="text-[70px] font-barlow font-bold leading-[1.07em] mb-2">
              FASH FOOD <br /> MEALS
            </h2>

            <p className="text-[18px] text-white font-barlow font-semibold mb-2 leading-[1.3em]">
              NEW PHENOMENON <br /> BURGER TASTE
            </p>

            <p className="text-[40px] font-barlow font-bold text-[#FFCC19] mb-6">
              $59,00
            </p>

            <button
              className="
         flex items-center gap-2
z-[6]
bg-white
font-barlow
text-black
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
tracking-[1px]
opacity-100
visible
whitespace-normal
border-0
"
            >
              ORDER NOW <ArrowRight />
            </button>
          </div>

          <img
            src="https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_img-2.png"
            className="absolute -right-20  bottom-0 w-[478px] z-10 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4"
          />
        </div>

        <div
          className="relative overflow-hidden rounded-3xl group h-[520px] flex items-center"
          style={{
            backgroundImage:
              "url(https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_bn-2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="z-20 pl-15 text-white max-w-[320px]">
            <h2 className="text-[70px] font-barlow font-bold leading-[1.07em] mb-2">
              BEEF <br /> BURGER
            </h2>

            <p className="ext-[18px] text-white font-barlow font-semibold mb-2 leading-[1.3em]">
              NEW PHENOMENON <br /> BURGER TASTE
            </p>

            <p className="text-[40px] font-barlow font-bold text-[#FFCC19] mb-6">$49,00</p>

            <button
              className="
         flex items-center gap-2
z-[6]
bg-white
font-barlow
text-black
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
tracking-[1px]
opacity-100
visible
whitespace-normal
border-0
"
            >
              ORDER NOW <ArrowRight />
            </button>
          </div>

          <img
            src="https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_img-3.png"
            className="absolute right-0  bottom-0 w-[328px] z-10 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4"
          />
        </div>
      </div>
    </section>
  );
}

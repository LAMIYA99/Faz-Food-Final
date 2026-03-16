import { WhyChooseData } from "@/constant/sections";
import Image from "next/image";

export default function WhyChooseSection() {
  return (
    <section className="relative px-[30px] max-w-[1290px] mx-auto">
      <div className="absolute top-30 -left-30">
        <Image
          src={
            "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h1_vector3.png"
          }
          alt="pizza"
          width={145}
          height={142}
        />
      </div>
      <div className="absolute bottom-30 -left-30">
        <Image
          src={
            "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_decor-1.png"
          }
          alt="pizza"
          width={52}
          height={53}
        />
      </div>
      <div className="absolute top-30 -right-30">
        <Image
          src={
            "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h3_vector2.png"
          }
          alt="pizza"
          width={141}
          height={139}
        />
      </div>
      <div className=" ">
        <div className="flex items-center justify-center flex-col py-[90px] ">
          <h2 className="text-[#C33130] text-[18px] font-bold uppercase leading-[1.3em] tracking-[1px] font-barlow mb-[1em]">
            Why choose fasfood?
          </h2>
          <h3 className="text-[#212121] text-[70px] font-barlow leading-[1.07em] tracking-[0px] font-bold w-[600px] text-center">
            BURGERS MADE WITH LOVE AND CARE
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {WhyChooseData &&
            WhyChooseData.map((item) => (
              <div
                key={item?.id}
                className={`box bg-[#F4F1EA] rounded-[24px] p-[40px] flex items-center justify-center flex-col hover:bg-white duration-300 cursor-pointer ${item?.css ? "transform translate-y-[60px]" : ""}`}
              >
                <div className="mb-[30px] w-[260px] h-[260px] rounded-full overflow-hidden">
                  <Image
                    src={item?.image}
                    alt="avatar"
                    width={260}
                    height={260}
                    className="rounded-full object-cover "
                  />
                </div>
                <div className="flex items-center justify-center flex-col">
                  <h2 className="text-[#212121] font-barlow text-[24px] uppercase font-bold">
                    {item?.title}
                  </h2>{" "}
                  <p className="text-[#464646] font-barlow text-center">
                    {item?.desc}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

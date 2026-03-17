"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import SectionHeading from "../../common/SectionHeading";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TODAYS_PRODUCTS = [
  {
    id: 1,
    name: "HOT DOGS",
    description: "Indulge in our mouth-watering Signature Stacks - each layer packed with bold flavors and textures that will leave you craving for more!",
    image: "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_cat-1.png",
  },
  {
    id: 2,
    name: "FRENCH FRIES",
    description: "Indulge in our mouth-watering Signature Stacks - each layer packed with bold flavors and textures that will leave you craving for more!",
    image: "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_cat-2.png",
  },
  {
    id: 3,
    name: "BURRITO FOOD",
    description: "Indulge in our mouth-watering Signature Stacks - each layer packed with bold flavors and textures that will leave you craving for more!",
    image: "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_cat-5.png",
  },
  {
    id: 4,
    name: "BEEF BURGERS",
    description: "Indulge in our mouth-watering Signature Stacks - each layer packed with bold flavors and textures that will leave you craving for more!",
    image: "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_cat-4.png",
  },
  {
    id: 5,
    name: "CHICKEN BURGERS",
    description: "Indulge in our mouth-watering Signature Stacks - each layer packed with bold flavors and textures that will leave you craving for more!",
    image: "https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/h2_cat-3.png",
  },
];

export default function TodaysSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="flex flex-col items-center justify-center py-32 bg-[#F4F1EA] overflow-hidden">
      <div className="relative w-85 h-85 group cursor-pointer mb-16">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <path
              id="textCircle"
              d="M 200,200 m -105,0 a 105,105 0 1,1 210,0 a 105,105 0 1,1 -210,0"
            />
          </defs>
          <circle cx="200" cy="200" r="125" fill="none" stroke="#B91C1C" strokeWidth="3" />
          <g className="origin-center animate-[spin_15s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] transition-all duration-300">
            <text fill="black" fontSize="20" fontWeight="bold" letterSpacing="4">
              <textPath href="#textCircle">DOWNLOAD MENU - FAZFOOD - SPECIAL MENU -</textPath>
            </text>
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
            <circle cx="55" cy="55" r="55" fill="url(#paint0_linear_todays)" />
            <path
              d="M66.2741 36H55.308L62.7689 43.8439C64.368 42.8589 66.4934 43.0527 67.8811 44.4293L74.0221 50.5208C74.3132 50.8096 74.5246 51.1221 74.6322 51.395C74.7399 51.6679 74.7399 51.9013 74.6123 52.0279C74.3571 52.281 73.6752 52.02 73.093 51.4425L67.3428 45.7346C66.7606 45.1571 66.0787 44.8921 65.8235 45.1492C65.6959 45.2758 65.6959 45.5091 65.8035 45.7821C65.9112 46.055 66.1225 46.3675 66.4136 46.6562L72.1678 52.3601C72.4589 52.6489 72.6703 52.9614 72.778 53.2343C72.8856 53.5073 72.8856 53.7406 72.758 53.8672C72.5028 54.1204 71.8209 53.8593 71.2387 53.2818L65.4845 47.5779C64.9023 47.0004 64.2204 46.7354 63.9652 46.9925C63.8376 47.119 63.8376 47.3524 63.9453 47.6254C64.0529 47.8983 64.2643 48.2108 64.5554 48.4995L70.3096 54.2034C70.6007 54.4922 70.812 54.8047 70.9197 55.0776C71.0274 55.3505 71.0274 55.5839 70.8998 55.7105C70.6446 55.9636 69.9627 55.7026 69.3805 55.1251L63.6302 49.4212C63.048 48.8437 62.3661 48.5786 62.1109 48.8358C61.9833 48.9623 61.9833 49.1957 62.091 49.4686C62.1987 49.7416 62.41 50.0541 62.7011 50.3428L68.4553 56.0467C68.7464 56.3355 68.9578 56.648 69.0654 56.9209C69.1731 57.1938 69.1731 57.4272 69.0455 57.5538C68.7903 57.8069 68.1084 57.5459 67.5262 56.9684L61.3852 50.8768C59.9975 49.5003 59.7981 47.3959 60.787 45.8098L56.5322 41.8344C52.5285 38.0885 47.2329 36 41.7299 36C36.3545 36 32 40.3195 32 45.6515V59.0411C32 64.3731 36.3545 68.6926 41.7299 68.6926H55.4316L53.2503 60.56C50.8099 60.5204 48.3016 58.2974 47.2768 55.038C46.0765 51.2249 47.3565 47.4355 50.1359 46.5732C52.9154 45.7148 56.1414 48.1079 57.3417 51.9211C58.3665 55.1804 57.5809 58.424 55.5951 59.8322L61.1659 77.5214C61.3493 78.1384 62.2186 78.1622 62.4379 77.557L66.2701 68.6886C71.6455 68.6886 76 64.3692 76 59.0371V45.6515C76 40.3195 71.6455 36 66.2741 36Z"
              fill="white"
            />
            <defs>
              <linearGradient id="paint0_linear_todays" x1="116" y1="49" x2="0" y2="49" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C33130" />
                <stop offset="1" stopColor="#FF8A00" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <SectionHeading title="TODAY'S A STACKIN' DAY" />

      <div className="relative w-full px-4 overflow-visible group/carousel">
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex -ml-10">
            {TODAYS_PRODUCTS.map((product) => (
              <div key={product.id} className="flex-[0_0_auto] pl-10">
                <div className="group relative w-[410px] h-[600px] hover:bg-white transition-colors duration-300 cursor-pointer py-12 px-8 rounded-[40px] bg-transparent flex flex-col items-center text-center">
                  <div className="relative w-[340px] h-[340px] flex items-center justify-center mb-10">
                    <div className="absolute top-0 right-0 z-10 opacity-0 scale-50 -translate-x-8 translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500 delay-75 pointer-events-none">
                      <svg className="text-[#FFCC19]" width="60" height="70" viewBox="0 0 72 83" fill="currentColor">
                        <path d="M46.5133 56.0354C52.0354 56.0354 57.3451 56.878 62.0177 59.6166C67.3274 62.7765 70.938 67.2004 72 73.3095C72.6372 77.312 70.0885 80.8933 66.2655 82.1572C63.0796 83.2105 60.1062 82.7892 57.1327 81.9466C52.6726 80.8933 48.2124 79.4187 43.7522 78.3654C37.3805 76.8907 31.0088 75.8374 24.6372 76.2588C20.3894 76.4694 16.1416 77.1014 12.1062 78.7867C11.2566 79.208 10.4071 79.4186 9.55751 79.6293C7.8584 80.0506 6.79645 78.7867 7.22123 77.3121C7.64601 75.6268 8.70795 74.1521 9.98229 72.8882C18.9026 63.6192 29.5221 57.51 42.4779 56.2461C43.5398 56.2461 45.0265 56.0354 46.5133 56.0354Z" />
                        <path d="M6.58407 40.0253C6.58407 33.9162 5.09734 28.6497 3.61062 23.3832C2.54867 19.3807 1.27433 15.1675 1.48672 10.9543C1.69911 7.58373 2.76106 4.42383 5.52212 2.10657C9.34513 -1.05333 14.4425 -0.842669 18.2655 2.73855C22.0885 6.10911 23.7876 10.3223 24.6372 14.9568C25.9115 22.3299 25.0619 29.4924 22.5133 36.6548C19.3274 45.5025 14.2301 53.0863 7.22124 59.1954C6.37168 60.038 5.52212 60.67 4.67256 61.302C4.24778 61.5127 3.61062 61.934 3.18584 61.934C2.12389 62.1446 1.06194 62.1446 0.424776 61.302C-0.212393 60.2487 -0.212393 59.4061 0.424776 58.3528C1.48672 56.6675 2.54867 55.1929 3.39823 53.5076C5.30973 50.137 5.73451 46.5558 6.15929 42.7639C6.37168 41.7106 6.58407 40.6573 6.58407 40.0253Z" />
                        <path d="M57.9823 46.7665C54.3717 46.3452 50.7611 45.9238 47.1504 45.5025C41.6283 44.8705 36.3186 45.7132 31.4336 48.4518C31.0088 48.6624 30.3717 49.0837 29.7345 49.2944C29.0973 49.5051 28.2478 49.5051 27.6106 49.0837C26.9734 48.4518 26.7611 47.8198 26.9734 46.9771C26.9734 46.7665 27.1858 46.5558 27.1858 46.3452C31.2212 38.5507 36.9557 32.6523 45.8761 30.7563C52.6726 29.2817 58.4071 31.599 62.8672 36.8655C63.0796 37.0761 63.0796 37.0761 63.0796 37.2868C64.354 39.1827 65.2035 41.2893 64.1416 43.6066C63.0796 45.9238 60.9557 46.5558 58.6195 46.7665Z" />
                      </svg>
                    </div>

                    <div className="absolute bottom-4 left-4 z-10 opacity-0 scale-50 translate-x-8 -translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-2 group-hover:translate-y-2 transition-all duration-500 delay-150 pointer-events-none">
                      <svg className="text-[#FFCC19]" width="80" height="81" viewBox="0 0 92 93" fill="currentColor">
                        <path d="M8.45148 27.2017C11.4104 24.5263 14.8002 23.9721 18.4763 24.5493C23.0011 25.4119 27.1062 27.5449 31.0704 29.8188C38.4327 34.0822 46.4974 37.076 54.9819 38.7994C60.6382 39.9483 66.29 39.684 71.9363 37.7239C72.7832 37.444 73.0668 37.7276 73.6339 38.2947C74.3428 39.0036 74.3455 39.8515 73.9239 40.5567C73.3623 41.6854 72.5171 42.5305 71.672 43.3757C63.7812 50.4158 54.7525 55.1912 44.2996 56.5704C33.705 57.8078 23.8064 55.7973 14.8837 49.6918C10.0679 46.2845 6.80341 41.8932 6.07801 36.0969C5.21909 32.7025 6.33953 29.5972 8.45148 27.2017Z" />
                        <path d="M55.6509 70.7388C60.1602 66.7966 64.8103 62.7135 69.0351 58.2052C71.5697 55.3871 74.1042 52.569 75.3646 49.0402C75.6445 48.1932 76.2079 47.6298 77.0567 47.9152C78.0464 48.0597 78.4726 48.7677 78.4754 49.6156C79.3407 54.9884 78.9338 60.2157 77.1136 65.4385C74.8718 71.3664 71.9221 76.8682 67.4146 81.3756C65.1618 83.912 62.3419 85.8812 58.8094 86.0111C55.8422 86.1428 53.7184 84.864 52.0152 82.5974C50.4538 80.4726 50.87 78.0716 51.9932 75.8142C52.8347 73.8386 54.1015 72.2882 55.6509 70.7388Z" />
                      </svg>
                    </div>

                    <div className="absolute top-4 left-4 z-10 opacity-0 scale-50 translate-x-8 translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-all duration-500 pointer-events-none">
                      <svg className="text-[#EAEAEA]" width="120" height="155" viewBox="0 0 139 188" fill="currentColor">
                        <path d="M7.43979 80.4707C9.63182 78.703 12.3188 77.5716 15.0765 76.9352C26.2488 74.3896 38.906 78.8444 49.0884 73.6118C57.5737 69.3692 61.7456 59.5404 63.5841 50.2066C65.3518 40.802 65.4225 31.1147 68.6045 22.1344C69.5945 19.4474 71.0794 16.5483 73.625 15.2755C78.0798 13.0835 83.2416 16.5483 86.6357 20.2252C90.1006 23.8315 93.7068 28.1448 98.6566 28.2863C105.374 28.357 109.192 20.8616 111.597 14.6391C114.001 8.41656 118.668 1.06265 125.314 2.0526C130.688 2.90113 133.446 8.62869 135.073 13.932C129.84 26.5185 128.567 40.6606 131.678 53.9542C133.729 62.9345 137.76 71.6319 137.406 80.895C136.982 90.3702 131.466 99.4212 123.264 104.088C118.314 106.917 112.587 108.26 108.344 111.937C101.626 117.665 100.141 127.493 100.778 136.332C101.414 145.171 103.748 153.868 102.758 162.637C101.768 171.405 96.2524 180.597 87.555 181.941C79.8475 183.143 72.8472 177.981 66.1296 173.95C59.4121 169.92 50.3612 166.95 44.28 171.9C39.3303 175.859 37.9868 183.991 31.9057 185.688C26.9559 187.102 21.7233 182.577 20.6627 177.557C19.5313 172.465 21.4405 167.303 23.6325 162.566C25.8953 157.899 28.5823 153.232 29.148 148.141C30.2086 139.585 25.4003 131.382 19.8849 124.736C14.3694 118.089 7.79333 112.078 4.11638 104.3C0.580841 96.5221 0.792976 85.9862 7.43979 80.4707Z" />
                      </svg>
                    </div>

                    <div className="absolute bottom-0 right-0 z-10 opacity-0 scale-50 -translate-x-12 -translate-y-12 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-500 delay-300 pointer-events-none">
                      <svg className="text-[#EAEAEA]" width="160" height="162" viewBox="0 0 190 192" fill="currentColor">
                        <path d="M122.655 169.849C118.107 164.374 111.414 161.055 106.924 155.661C105.793 154.257 104.766 152.656 104.703 150.854C104.58 148.111 106.887 145.838 109.255 144.507C114.979 141.504 121.967 142.149 128.168 144.097C134.311 145.965 140.212 148.867 146.609 150.06C159.739 152.572 174.221 146.85 182.028 135.949C183.036 134.609 183.95 132.968 183.724 131.283C183.535 129.818 182.497 128.717 181.599 127.638C173.87 119.276 164.469 111.501 161.476 100.476C158.577 89.7541 162.512 78.433 168.032 68.805C173.552 59.177 180.633 50.5215 184.965 40.2688C189.158 29.9933 190.277 17.4937 183.802 8.47799C181.877 5.79764 179.244 3.50275 176.125 2.41808C170.622 0.583981 164.572 2.95947 159.43 5.91385C152.93 9.72035 146.932 14.3974 141.738 19.8513C134.191 27.857 127.138 38.0935 116.284 39.6095C101.677 41.7282 89.9441 26.7626 75.326 24.5801C64.6968 22.9801 52.8693 29.9972 51.3506 40.5681C49.6007 51.6743 58.4837 61.2999 61.9639 71.9741C65.69 83.3335 60.6728 98.6331 48.9028 100.93C40.305 102.673 31.6413 96.9529 22.9142 98.1728C15.4306 99.2384 9.50581 105.217 6.10559 111.968C1.14371 121.688 0.47708 133.617 5.23395 143.497C9.93248 153.296 20.2273 160.431 31.1082 160.495L22.5687 162.319C32.331 161.341 42.0883 167.384 51.6733 165.301C55.8327 164.407 59.6627 162.026 63.8701 161.713C72.2265 161.005 78.8825 168.044 85.1279 173.654C92.142 179.821 100.362 184.752 109.135 188.054C113.383 189.682 118.419 190.866 122.331 188.426C128.587 184.795 127.225 175.185 122.655 169.849Z" />
                      </svg>
                    </div>

                    <div className="relative z-20 transform transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={product.image}
                        width={410}
                        height={410}
                        alt={product.name}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-bold text-[34px] font-barlow mb-5 text-[#212121] uppercase leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-[18px] text-[#464646] font-barlow leading-relaxed max-w-[340px]">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-white shadow-xl rounded-full flex items-center justify-center text-[#212121] hover:bg-[#C33031] hover:text-white transition-all z-30 opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
        >
          <ArrowLeft size={32} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-white shadow-xl rounded-full flex items-center justify-center text-[#212121] hover:bg-[#C33031] hover:text-white transition-all z-30 opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
        >
          <ArrowRight size={32} />
        </button>
      </div>
      
      <div className="mt-24 flex justify-center">
        <button className="bg-[#0F7A3D] hover:bg-[#0b5c2e] font-barlow text-white px-[40px] py-[20px] rounded-[14px] font-bold text-[16px] flex items-center gap-3 transition-all cursor-pointer group/btn">
          VIEW OUR FULL MENU
          <span className="group-hover/btn:translate-x-1 transition-transform">
            <ArrowRight size={26} />
          </span>
        </button>
      </div>
    </section>
  );
}

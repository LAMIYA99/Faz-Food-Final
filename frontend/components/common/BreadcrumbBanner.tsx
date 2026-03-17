import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbBannerProps {
  title: string;
  paths: { name: string; href?: string }[];
}

export default function BreadcrumbBanner({ title, paths }: BreadcrumbBannerProps) {
  return (
    <div className="w-full  bg-[url('https://demo2.wpopal.com/fazfood/wp-content/uploads/2023/10/ct-bc.jpg')] bg-cover bg-center py-24 md:py-32 relative flex flex-col items-center justify-center font-barlow">
      <div className="absolute inset-0  z-0" />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-[48px] md:text-[64px] font-extrabold uppercase tracking-tight mb-4">
          {title}
        </h1>
        
        <div className="flex items-center justify-center gap-2 text-[15px] font-bold">
          {paths.map((path, index) => (
            <div key={index} className="flex items-center gap-2">
              {path.href ? (
                <Link 
                  href={path.href}
                  className="text-white hover:text-[#C33031] transition-colors"
                >
                  {path.name}
                </Link>
              ) : (
                <span className="text-[#C33031]">
                  {path.name}
                </span>
              )}
              
              {index < paths.length - 1 && (
                <ChevronRight size={14} className="text-white mt-[2px]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

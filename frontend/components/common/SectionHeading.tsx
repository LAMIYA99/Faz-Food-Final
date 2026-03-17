import { SectionHeadingProps } from "@/types/global";

export default function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col items-center text-center mb-12 ${className}`}>
      {subtitle && (
        <span className="font-barlow text-[70px] font-bold leading-[1.07em] text-black">
          {subtitle}
        </span>
      )}
      <h2 className="font-barlow text-[70px] font-bold leading-[1.07em] text-black">
        {title}
      </h2>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { SectionWrapperProps } from "./SectionWrapper.types";

export default function SectionWrapper({
  children,
  title,
  ...props
}: SectionWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-2", props.className)} {...props}>
      <p className="text-xl ">{title}</p>
      <div className=" border-b-[0.5px] border-white w-full mb-2" />
      {children}
    </div>
  );
}

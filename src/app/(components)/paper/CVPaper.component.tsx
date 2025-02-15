import { capitalizeFirstLetter } from "@/lib/utils";
import { CVFormData } from "@/types/CV.types";
import { useFormContext } from "react-hook-form";

export default function CVPaper({
  isHoveringColor,
  color,
}: {
  isHoveringColor: string | undefined;
  color: string;
}) {
  const { watch } = useFormContext<CVFormData>();

  const values = watch();

  return (
    <div className="w-fit rounded-lg hidden md:block">
      <div
        style={{ color: isHoveringColor ?? color }}
        className="my-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white shadow-2xl ring-1 ring-black/5 flex gap-4 transition-all duration-200 "
      >
        {/* Left side */}
        <div
          style={{ backgroundColor: isHoveringColor ?? color }}
          className="w-[35%] max-w-[33%] transition-all duration-200 px-4 pt-10 text-white"
        ></div>

        {/* Right side */}
        <div className="flex flex-col pt-10 pl-4 max-w-[480px]">
          <h2 className="text-2xl font-bold ">
            {values?.name?.length > 0
              ? capitalizeFirstLetter(values.name)
              : "Your Name"}
          </h2>
          <p className="text-sm font-medium ">
            {values?.position?.length > 0
              ? capitalizeFirstLetter(values.position)
              : "Position"}
          </p>

          <div
            style={{ borderColor: isHoveringColor ?? color }}
            className=" mt-2 border-b-[0.5px] w-full"
          />

          <div className="text-lg pt-6">
            <p className="font-bold">About me</p>
            <p className="text-sm">
              {values?.about?.length > 0
                ? capitalizeFirstLetter(values.about)
                : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

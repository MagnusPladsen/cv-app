import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/lib/utils";
import { CVFormData } from "@/types/CV.types";
import { File } from "lucide-react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useReactToPrint } from "react-to-print";

export default function CVPaper({
  isHoveringColor,
  color,
}: {
  isHoveringColor: string | undefined;
  color: string;
}) {
  const { watch } = useFormContext<CVFormData>();

  const values = watch();

  const documentTitle = `${values.name}-CV`;

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef, documentTitle });

  return (
    <div className="w-fit rounded-lg hidden my-4 md:flex flex-col gap-4">
      <Button onClick={() => reactToPrintFn()} className="w-fit">
        <File className="w-4 h-4 mr-1" />
        Get CV file
      </Button>
      <div
        ref={contentRef}
        style={{ color: isHoveringColor ?? color }}
        className="h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white shadow-2xl ring-1 ring-black/5 flex gap-4 transition-all duration-200 print:w-full print:h-screen print:shadow-none print:ring-none print:border-none print:rounded-none"
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
            <p className="text-sm text-black">
              {values?.about?.length > 0
                ? capitalizeFirstLetter(values.about)
                : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."}
            </p>
          </div>

          <div
            style={{ borderColor: isHoveringColor ?? color }}
            className=" mt-2 border-b-[0.5px] w-full"
          />

          {values.education[0].schoolName.length > 0 && (
            <div className="flex flex-col pt-6">
              <p className="font-bold">Education</p>

              <div className="flex flex-col gap-2 text-black">
                {values.education.map(
                  (education, index) =>
                    education.schoolName.length > 0 && (
                      <div key={index}>
                        <p className="text-sm ">{education.schoolName}</p>
                        {education.schoolDuration.from &&
                          education.schoolDuration.to && (
                            <p className="text-xs text-muted-foreground">
                              {education.schoolDuration.from?.toLocaleDateString()}{" "}
                              -{" "}
                              {education.schoolDuration.to?.toLocaleDateString()}
                            </p>
                          )}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          <div
            style={{ borderColor: isHoveringColor ?? color }}
            className=" mt-2 border-b-[0.5px] w-full"
          />

          {values.experience[0].experienceName.length > 0 && (
            <div className="flex flex-col pt-6">
              <p className="font-bold">Experience</p>

              <div className="flex flex-col gap-2 text-black">
                {values.experience.map(
                  (experience, index) =>
                    experience.experienceName.length > 0 && (
                      <div key={index}>
                        <p className="text-sm ">{experience.experienceName}</p>
                        {experience.experienceDuration.from &&
                          experience.experienceDuration.to && (
                            <p className="text-xs text-muted-foreground">
                              {experience.experienceDuration.from?.toLocaleDateString()}{" "}
                              -{" "}
                              {experience.experienceDuration.to?.toLocaleDateString()}
                            </p>
                          )}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          <div
            style={{ borderColor: isHoveringColor ?? color }}
            className=" mt-2 border-b-[0.5px] w-full"
          />
        </div>
      </div>
    </div>
  );
}

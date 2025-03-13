"use client";

import { CVFormData } from "@/types/CV.types";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import Colors from "./colors/colors.component";
import Education from "./forms/Education.component";
import PersonalInformation from "./forms/PersonalInformation.component";
import Header from "./header/Header.component";
import CVPaper from "./paper/CVPaper.component";
import Experience from "./forms/Experience.component";

export default function CVForm() {
  const methods = useForm<CVFormData>({
    defaultValues: {
      education: [
        {
          schoolName: "University of Technology",
          schoolDuration: { from: new Date(), to: new Date() },
        },
      ],
      experience: [
        {
          experienceName: "Meta",
          experienceTitle: "Software Developer",
          experienceDuration: { from: new Date(), to: new Date() },
        },
      ],
    },
  });
  const { handleSubmit } = methods;

  const initialColor = "#1E6691";
  const [isHoveringColor, setIsHoveringColor] = useState<string | undefined>(
    undefined,
  );
  const [color, setColor] = useState<string>(initialColor);

  const onSubmit = (data: CVFormData) => console.log(data);

  useEffect(() => {
    toast("Thanks for trying out my CV generator!", {
      description: "This is still in a very early stage of development.",
      duration: 5000,
      icon: <Info className="text-primary pr-1" />,
      action: {
        label: "X",
        onClick: () => toast.dismiss(),
      },
    });
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 justify-between min-h-screen text-white pt-8 bg-gradient-to-r from-teal-700 to-gray-900 px-8 pb-20">
          <div className="flex flex-col gap-6 w-full min-h-screen max-w-[600px]">
            <Header />

            <Colors
              color={color}
              setColor={setColor}
              setIsHoveringColor={setIsHoveringColor}
              initialColor={initialColor}
            />

            <div className="flex flex-col gap-8 overflow-y-auto mt-2 max-w-[550px]">
              <PersonalInformation />
              <Education />
              <Experience />
            </div>
          </div>

          <CVPaper isHoveringColor={isHoveringColor} color={color} />
        </div>
      </form>
    </FormProvider>
  );
}

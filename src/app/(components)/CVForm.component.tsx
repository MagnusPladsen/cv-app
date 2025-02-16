"use client";

import FormInput from "@/components/formInput";
import { CVFormData } from "@/types/CV.types";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Colors from "./colors/colors.component";
import Header from "./header/Header.component";
import CVPaper from "./paper/CVPaper.component";

export default function CVForm() {
  const methods = useForm<CVFormData>();
  const { handleSubmit } = methods;

  const initialColor = "#1E6691";
  const [isHoveringColor, setIsHoveringColor] = useState<string | undefined>(
    undefined,
  );
  const [color, setColor] = useState<string>(initialColor);

  const onSubmit = (data: CVFormData) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-2 justify-between min-h-screen text-white pt-8 bg-gradient-to-r from-teal-700 to-gray-900 px-8">
          <div className="flex flex-col gap-6 w-full min-h-screen max-w-[600px]">
            <Header />

            <Colors
              color={color}
              setColor={setColor}
              setIsHoveringColor={setIsHoveringColor}
              initialColor={initialColor}
            />

            <div className="flex flex-col gap-4 overflow-y-auto mt-8 max-w-[550px]">
              <div className="flex flex-col gap-2">
                <p className="text-xl ">Personal information</p>
                <div className=" border-b-[0.5px] border-white w-full mb-4" />

                <FormInput label="Full name" name="name" className="w-full]" />
                <FormInput
                  label="Position"
                  name="position"
                  className="w-full"
                />
                <FormInput
                  label="About you"
                  name="about"
                  textArea
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <CVPaper isHoveringColor={isHoveringColor} color={color} />
        </div>
      </form>
    </FormProvider>
  );
}

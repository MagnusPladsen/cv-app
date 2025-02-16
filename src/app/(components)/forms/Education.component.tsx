import FormDateRangePicker from "@/components/DatePickers/FormDateRangePicker.component";

import FormInput from "@/components/formInput";
import { Button } from "@/components/ui/button";
import { CVFormData } from "@/types/CV.types";
import { Plus, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function Education() {
  const { watch, setValue } = useFormContext<CVFormData>();

  const education = watch("education");

  const addEducation = () => {
    setValue("education", [
      ...education,
      {
        schoolName: "",
        schoolDuration: {
          from: new Date(),
          to: new Date(),
        },
      },
    ]);
  };

  const removeEducation = (index: number) => {
    if (education.length === 1) return;
    setValue(
      "education",
      education.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl ">Education</p>
      <div className=" border-b-[0.5px] border-white w-full mb-4" />

      {education.map((education, index) => (
        <div key={index} className="flex flex-col gap-2">
          <FormInput
            label="School name"
            name={`education.${index}.schoolName`}
            className="w-full"
          />

          <FormDateRangePicker
            label="School duration"
            name={`education.${index}.schoolDuration`}
          />

          {index > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => removeEducation(index)}
            >
              <X className="w-4 h-4" />
              Remove
            </Button>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addEducation} className="mt-4">
        <Plus className="w-4 h-4" />
        Add education
      </Button>
    </div>
  );
}

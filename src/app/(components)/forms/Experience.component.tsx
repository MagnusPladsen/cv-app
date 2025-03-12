import FormDateRangePicker from "@/components/DatePickers/FormDateRangePicker.component";
import FormInput from "@/components/formInput";
import SectionWrapper from "@/components/Section/SectionWrapper.component";
import { Button } from "@/components/ui/button";
import { CVFormData } from "@/types/CV.types";
import { Plus, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function Experience() {
  const { watch, setValue } = useFormContext<CVFormData>();

  const experience = watch("experience");

  const addExperience = () => {
    setValue("experience", [
      ...experience,
      {
        experienceName: "",
        experienceTitle: "",
        experienceDuration: {
          from: new Date(),
          to: new Date(),
        },
      },
    ]);
  };

  const removeExperience = (index: number) => {
    if (experience.length === 1) return;
    setValue(
      "experience",
      experience.filter((_, i) => i !== index),
    );
  };

  return (
    <SectionWrapper title="Experience">
      <div className="flex flex-col gap-8">
        {experience.map((experience, index) => (
          <div key={index} className="flex flex-col gap-2">
            <FormInput
              label="Experience name"
              name={`experience.${index}.experienceName`}
              className="w-full"
            />
            <FormInput
              label="Experience title"
              name={`experience.${index}.experienceTitle`}
              className="w-full"
            />
            <div className="flex justify-between items-end">
              <FormDateRangePicker
                label="Experience duration"
                name={`experience.${index}.experienceDuration`}
              />

              {index > 0 && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeExperience(index)}
                >
                  <X className="w-4 h-4" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={addExperience} variant="outline" className="w-fit mt-4">
        <Plus className="w-4 h-4" />
        Add experience
      </Button>
    </SectionWrapper>
  );
}

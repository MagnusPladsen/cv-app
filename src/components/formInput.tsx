import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { HTMLInputTypeAttribute } from "react";

export default function FormInput({
  label,
  name,
  className,
  textArea,
  type,
}: {
  label: string;
  name: string;
  className?: string;
  textArea?: boolean;
  type?: HTMLInputTypeAttribute;
}) {
  const { register } = useFormContext();

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor="name" className="text-lg font-bold">
        {label}
      </label>
      {textArea ? (
        <Textarea
          {...register(name)}
          className="bg-white text-black"
          rows={4}
        />
      ) : (
        <Input
          {...register(name)}
          className="bg-white text-black"
          type={type}
        />
      )}
    </div>
  );
}

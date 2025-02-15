import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

export default function FormInput({
  label,
  name,
  className,
  textArea,
}: {
  label: string;
  name: string;
  className?: string;
  textArea?: boolean;
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
        <Input {...register(name)} className="bg-white text-black" />
      )}
    </div>
  );
}

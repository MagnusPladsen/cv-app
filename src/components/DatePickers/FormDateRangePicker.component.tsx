import { cn } from "@/lib/utils";
import { DateRangePicker } from "./DateRangePicker.component";
import { useFormContext } from "react-hook-form";

export default function FormDateRangePicker({
  label,
  name,
  className,
}: {
  label: string;
  name: string;
  className?: string;
}) {
  const { register } = useFormContext();

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor="name" className="text-lg font-bold">
        {label}
      </label>
      <DateRangePicker {...register(name)} />
    </div>
  );
}

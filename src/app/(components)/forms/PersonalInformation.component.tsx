import FormInput from "@/components/formInput";

export default function PersonalInformation() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl ">Personal information</p>
      <div className=" border-b-[0.5px] border-white w-full mb-4" />

      <FormInput label="Full name" name="name" className="w-full" />
      <FormInput label="Position" name="position" className="w-full" />
      <FormInput label="About you" name="about" textArea className="w-full" />
    </div>
  );
}

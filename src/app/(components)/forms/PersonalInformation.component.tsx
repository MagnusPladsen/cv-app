import FormInput from "@/components/formInput";
import SectionWrapper from "@/components/Section/SectionWrapper.component";

export default function PersonalInformation() {
  return (
    <SectionWrapper title="Personal information">
      <FormInput label="Full name" name="name" className="w-full" />
      <FormInput label="Position" name="position" className="w-full" />
      <FormInput label="About you" name="about" textArea className="w-full" />
      <FormInput
        label="Picture"
        name="picture"
        className="w-full"
        type="file"
      />
    </SectionWrapper>
  );
}

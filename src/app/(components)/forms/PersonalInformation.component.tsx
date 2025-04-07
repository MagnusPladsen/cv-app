import FormInput from "@/components/formInput";
import ImageUpload from "@/components/ImageUpload/ImageUpload.component";
import SectionWrapper from "@/components/Section/SectionWrapper.component";

export default function PersonalInformation() {
  return (
    <SectionWrapper title="Personal information">
      <ImageUpload
        name="profilePicture"
        label="Profile picture"
        imgWidth={175}
        imgHeight={175}
        optional
      />
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

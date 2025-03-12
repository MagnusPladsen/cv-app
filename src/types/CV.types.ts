import { DateRange } from "react-day-picker";

interface Education {
  schoolName: string;
  schoolDuration: DateRange;
}

interface Experience {
  experienceName: string;
  experienceTitle: string;
  experienceDuration: DateRange;
}

interface CVFormData {
  name: string;
  picture: string;
  position: string;
  about: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  linkedin: string;
  github: string;
  education: Education[];
  experience: Experience[];
}

export type { CVFormData };

import { Toaster } from "@/components/ui/sonner";
import CVForm from "./(components)/CVForm.component";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <Toaster position="top-right" />
        <CVForm />
      </main>
    </div>
  );
}

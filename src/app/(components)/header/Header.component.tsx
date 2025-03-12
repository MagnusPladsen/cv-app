import { Typewriter } from "react-simple-typewriter";

export default function Header() {
  return (
    <h1 className="text-4xl md:text-6xl font-bold mb-4 min-h-[70px]">
      <Typewriter
        words={["Make your CV", "Get your dream job", "Make your CV"]}
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={5000}
        loop={1}
      />
    </h1>
  );
}

import SectionWrapper from "@/components/Section/SectionWrapper.component";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

export default function Colors({
  color,
  setColor,
  setIsHoveringColor,
  initialColor,
}: {
  color: string;
  setColor: (color: string) => void;
  setIsHoveringColor: (color: string | undefined) => void;
  initialColor: string;
}) {
  const [isHoveringColorPicker, setIsHoveringColorPicker] = useState(false);
  const [editColor, setEditColor] = useState(false);

  const themeColors = ["#85b4d0", "#335367", "#f0a500", "#008000", "#000080"];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (editColor && !isHoveringColorPicker) {
      timeoutId = setTimeout(() => {
        setEditColor(false);
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [editColor, isHoveringColorPicker]);

  return (
    <SectionWrapper title="Theme color" className="relative">
      <div className="flex flex-row gap-4 items-center mt-6">
        {themeColors.map((color, index) => (
          <input
            type="button"
            tabIndex={index}
            key={color}
            className="w-[36px] h-[36px] rounded-md shadow-2xl border border-white border-opacity-50 hover:border-opacity-100 transition-all duration-200 hover:scale-[1.05] cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={() => setColor(color)}
            onMouseEnter={() => setIsHoveringColor(color)}
            onMouseLeave={() => setIsHoveringColor(undefined)}
          />
        ))}

        <Button
          variant="ghost"
          className="bg-white text-black"
          onClick={() => setEditColor(true)}
        >
          Custom color
        </Button>
        <div
          className="text-sm opacity-50 hover:opacity-100 cursor-pointer hover:text-red-500 transition-all duration-200"
          onClick={() => setColor(initialColor)}
        >
          X Reset color
        </div>
      </div>
      {editColor && (
        <div
          className="absolute z-10 top-full mt-2"
          onMouseEnter={() => setIsHoveringColorPicker(true)}
          onMouseLeave={() => setIsHoveringColorPicker(false)}
        >
          <HexColorPicker color={color} onChange={setColor} />
        </div>
      )}
    </SectionWrapper>
  );
}

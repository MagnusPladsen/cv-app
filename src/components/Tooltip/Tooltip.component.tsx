import {
  Tooltip as RadixTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as TooltipPrimitives from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

export function Tooltip({
  children,
  content,
  preventOpen,
  className,
}: {
  children: ReactNode;
  content: ReactNode;
  preventOpen?: boolean;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <RadixTooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={className} hidden={preventOpen}>
          <TooltipPrimitives.Arrow className="fill-primary" /> <p>{content}</p>
        </TooltipContent>
      </RadixTooltip>
    </TooltipProvider>
  );
}

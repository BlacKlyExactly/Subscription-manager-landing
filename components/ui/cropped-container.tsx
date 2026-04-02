import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function CroppedContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("max-w-3xl xl:max-w-6xl mx-auto px-6 lg:px-0 ", className)}>
    {children}
  </div>
}

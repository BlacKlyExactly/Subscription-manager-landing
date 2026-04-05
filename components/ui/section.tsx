import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { CroppedContainer } from "./cropped-container";

export function Section({ children, className, disableCrop }: PropsWithChildren<{ className?: string, disableCrop?: boolean }>) {
  const section =
    <section className={cn("relative py-16 lg:py-20 w-full text-center", className)}>
      {children}
    </section>

  if (disableCrop) return section;

  return (
    <CroppedContainer>
      {section}
    </CroppedContainer>
  )
}

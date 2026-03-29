import { PropsWithChildren } from "react";

export function Section({ children }: PropsWithChildren) {
  return (
    <section className="py-16 lg:py-20 w-full text-center">
      {children}
    </section>
  )
}

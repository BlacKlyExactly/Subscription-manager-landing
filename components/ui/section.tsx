import { PropsWithChildren } from "react";

export function Section({ children }: PropsWithChildren) {
  return (
    <section className="py-14 w-full text-center">
      {children}
    </section>
  )
}

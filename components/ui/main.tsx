import { PropsWithChildren } from "react";

export function Main({ children }: PropsWithChildren) {
  return (
    <main className="w-full pt-8">
      {children}
    </main>
  )
}

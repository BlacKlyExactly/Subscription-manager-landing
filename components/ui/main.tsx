import { PropsWithChildren } from "react";

export function Main({ children }: PropsWithChildren) {
  return (
    <main className="w-full max-w-3xl xl:max-w-6xl lg:px-0 px-6 pt-8 mx-auto">
      {children}
    </main>
  )
}

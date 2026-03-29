import { cn } from "@/lib/utils"

export function BlurHighlight({ className }: {
  className?: string
}) {
  return (
    <span className={cn("absolute bg-primary size-36 -z-1 blur-3xl dark:opacity-40 opacity-30", className)} />
  )
}

import { Typography } from "@/lib/components/ui/typography";
import { BlurHighlight } from "../ui/blur-highlight";
import { ReactNode } from "react";
import { Slot } from "../ui/slot";
import { cn } from "@/lib/utils";

type HighlightDirection = "tr" | "tl" | "bl"

type HowItWorksCardProps = {
  icon: ReactNode,
  title: string,
  description: string,
  highlight?: HighlightDirection,
  children?: ReactNode,
};

const HIGHLIGHT_DICT: Record<HighlightDirection, string> = {
  "tr": "card-highlight-tr",
  "tl": "",
  "bl": "card-highlight-bl"
}

export function HowItWorksCard({ icon, title, description, highlight, children }: HowItWorksCardProps) {
  const highlightClassName = highlight ? HIGHLIGHT_DICT[highlight] : "";

  return (
    <article className={cn("card sm:w-2/3 dark:shadow-black/10 shadow-lg shadow-foreground/5 px-6 py-7.5 lg:w-full rounded-3xl flex flex-col items-center", highlightClassName)}>
      {children}
      <Slot className="text-primary size-13">
        {icon}
      </Slot>
      <Typography size="h3" className="mt-4 mb-8">
        {title}
      </Typography>
      <Typography size="small">
        {description}
      </Typography>
    </article>
  )
}

import { Typography } from "@/lib/components/ui/typography";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority"
import { Button } from "../ui/button";
import { ReactNode } from "react";

const pricingCardVariants = cva("relative p-8 rounded-3xl max-w-88 w-full text-left min-h-124.5 flex flex-col justify-between", {
  variants: {
    color: {
      light: "bg-card card card-highlight-tl",
      primary: "bg-primary border border-primary"
    }
  },
  defaultVariants: {
    color: "light"
  }
})

type PricingCardProps = VariantProps<typeof pricingCardVariants> & {
  className?: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
  children?: ReactNode;
};

export function PricingCard({
  className,
  color,
  title,
  description,
  buttonText,
  features,
  price,
  children
}: PricingCardProps) {
  return (
    <article className={cn(pricingCardVariants({ color }), className)}>
      {children}
      <div>
        <Typography size="h2" as="h3" className={cn(color === "light" ? "text-primary" : "text-white")}>{title}</Typography>
        <Typography className={cn("leading-5 mt-2 max-w-[75%]", color === "light" ? "text-foreground" : "text-white")}>{description}</Typography>
        <div className="py-8 flex gap-2 items-end">
          <Typography className={cn("font-semibold text-2xl leading-6", color === "light" ? "text-foreground" : "text-white")}>
            {price} zł
          </Typography>
          <Typography className={cn("text-xs leading-4.5", color === "primary" && "text-white")}>/miesięcznie</Typography>
        </div>
        <ul className={cn("space-y-2 list-disc list-inside", color === "light" && "marker:text-primary")}>
          {features.map((feature) => (
            <Typography size="li" className={cn("text-sm w-full", color === "primary" && "text-white")} key={feature}>{feature}</Typography>
          ))}
        </ul>
      </div>
      <Button size="lg" className={cn("w-fit", color === "primary" && "bg-white text-primary hover:bg-foreground/80")}>
        {buttonText}
      </Button>
    </article>
  )
}

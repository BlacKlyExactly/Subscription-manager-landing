import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import Link from "next/link";

const pricingCardVariants = cva(
  "relative p-8 rounded-3xl max-w-88 w-full text-left min-h-124.5 flex flex-col justify-between",
  {
    variants: {
      color: {
        light: "bg-card card card-highlight-tl",
        primary: "bg-primary/5 backdrop-blur-2xl border border-primary",
      },
    },
    defaultVariants: {
      color: "light",
    },
  },
);

type PricingCardProps = VariantProps<typeof pricingCardVariants> & {
  className?: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
  children?: ReactNode;
  icon?: ReactNode;
};

export function PricingCard({
  className,
  color,
  title,
  description,
  buttonText,
  features,
  price,
  icon,
  children,
}: PricingCardProps) {
  return (
    <article className={cn(pricingCardVariants({ color }), className)}>
      {children}
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <Typography
            size="h2"
            as="h3"
            className={cn(
              color === "primary" ? "text-primary" : "text-foreground",
            )}
          >
            {title}
          </Typography>
        </div>
        <Typography
          size="small"
          className={cn("leading-5 mt-4 max-w-[75%] text-foreground")}
        >
          {description}
        </Typography>
        <div className="py-8 flex gap-2 items-end">
          <Typography
            className={cn("font-semibold text-3xl leading-6 text-foreground")}
          >
            {price} zł
          </Typography>
          <Typography className={cn("text-xs text-foreground/50")}>
            /miesięcznie
          </Typography>
        </div>
        <ul
          className={cn(
            "space-y-2 list-disc list-inside",
            color === "primary" && "marker:text-primary",
          )}
        >
          {features.map((feature) => (
            <Typography
              size="li"
              className={cn("text-sm w-full text-foreground")}
              key={feature}
            >
              {feature}
            </Typography>
          ))}
        </ul>
      </div>
      <Button
        size="lg"
        className={cn("w-fit")}
        variant={color === "light" ? "outline" : "default"}
      >
        <Link href={color === "primary" ? "/login?trypro=true" : "/login"}>
          {buttonText}
        </Link>
      </Button>
    </article>
  );
}

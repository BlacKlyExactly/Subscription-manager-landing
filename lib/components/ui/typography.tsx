import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { HTMLProps, ReactNode } from "react";

const sizeToTags = {
  h1: "h1", h2: "h2", h3: "h3", h4: "h4",
  p: "p", lead: "p", large: "p", small: "small",
  blockquote: "blockquote", li: "li",
} as const;

type TagKey = typeof sizeToTags[keyof typeof sizeToTags];

const textVariants = cva("font-sans text-foreground", {
  variants: {
    size: {
      h1: "text-5xl font-extrabold leading-12 tracking-[-0.012em]",
      h2: "text-3xl font-semibold leading-9 tracking-[-0.0075em]",
      h3: "text-2xl font-semibold leading-8 tracking-[-0.006em]",
      h4: "text-xl font-semibold leading-7 tracking-[-0.005em]",
      p: "text-base font-normal leading-7 text-foreground/70",
      blockquote: "text-base font-normal italic leading-6",
      li: "text-base font-normal leading-6",
      lead: "text-xl font-normal leading-7",
      large: "text-[1.125em] font-semibold leading-7",
      small: "text-sm font-normal leading-5 text-foreground/70",
    }
  },
  defaultVariants: {
    size: "p"
  }
});

type TypographyProps = Omit<HTMLProps<HTMLElement>, "size"> & VariantProps<typeof textVariants> & {
  as?: TagKey;
  children?: ReactNode
}

export function Typography({ className, size, as, children }: TypographyProps) {
  const Component = as ?? sizeToTags[size || "p"];
  return (
    <Component className={cn(textVariants({ size }), className)}>
      {children}
    </Component>
  )
}

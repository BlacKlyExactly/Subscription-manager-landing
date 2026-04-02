import { cn } from "@/lib/utils";
import { cloneElement, HTMLProps, isValidElement, PropsWithChildren } from "react";

type SlotProps = PropsWithChildren<{
  className?: string;
}> & Record<string, any>;

export function Slot({ children, className, ...props }: PropsWithChildren<HTMLProps<HTMLElement>>) {
  if (!isValidElement<SlotProps>(children)) return children;

  return cloneElement(children, {
    className: cn(children.props.className, className),
    ...props,
  });
}

import { ComponentProps } from "react";
import { Button } from "./button";
import { Spinner } from "./spinner";

export const Submit = ({
  children,
  isPending,
  pendingText = "Ładowanie...",
  disabled,
  ...props
}: ComponentProps<typeof Button> & {
  isPending?: boolean;
  pendingText?: string;
}) => {
  return (
    <Button {...props} disabled={disabled || isPending}>
      {isPending && <Spinner />}
      {isPending ? pendingText : children}
    </Button>
  );
};

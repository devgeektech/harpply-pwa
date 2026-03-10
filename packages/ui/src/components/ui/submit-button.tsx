import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button } from "./button";
import { cn } from "@repo/ui/lib/utils";

export interface SubmitButtonProps
  extends Omit<React.ComponentProps<"button">, "type"> {
  /** Show loading spinner and disable while submitting */
  loading?: boolean;
  /** Button variant */
  variant?: React.ComponentProps<typeof Button>["variant"];
  /** Button size */
  size?: React.ComponentProps<typeof Button>["size"];
  /** Optional label when in loading state (e.g. "Submitting...") */
  loadingLabel?: string;
}

function SubmitButton({
  children,
  className,
  disabled,
  loading = false,
  loadingLabel,
  variant = "default",
  size = "default",
  ...props
}: SubmitButtonProps) {
  const isDisabled = disabled ?? loading;

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={isDisabled}
      className={cn(className)}
      aria-busy={loading}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2
            className="size-4 animate-spin"
            aria-hidden
          />
          <span>{loadingLabel ?? children}</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export { SubmitButton };
